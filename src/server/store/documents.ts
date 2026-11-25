import 'server-only';
import {createHash} from 'node:crypto';
import {mkdir,readFile,readdir,writeFile} from 'node:fs/promises';
import {dirname,join,relative,resolve,sep} from 'node:path';
import {BlobError,BlobPreconditionFailedError,get,list,put} from '@vercel/blob';
import {revalidateTag,unstable_cache} from 'next/cache';

/**
 * JSON document storage for website data (enquiries, blog posts, page copy, settings, gallery).
 *
 * Production: a PRIVATE Vercel Blob store, addressed by BLOB_DATA_READ_WRITE_TOKEN. Data must never
 * go into the public image store (BLOB_READ_WRITE_TOKEN): enquiries are personal data and drafts are
 * unpublished. Every call passes the data token explicitly so the SDK cannot fall back to the
 * public store's token.
 *
 * Development: LOCAL_DATA_DIR (for example ./data/store) keeps the same documents as files on disk.
 *
 * TEMPORARY (testing only): when neither is set, documents fall back to the PUBLIC image store
 * (BLOB_READ_WRITE_TOKEN). Anyone with a document's URL can read it there, including enquiries.
 * Set BLOB_DATA_READ_WRITE_TOKEN to a private store before real use; it then takes precedence.
 *
 * Writes use ETags (`ifMatch`) so two saves cannot silently overwrite each other.
 */

export type StoredDocument<T>={data:T;etag:string};
export class DocumentConflictError extends Error { constructor(path:string){super(`Document changed while saving: ${path}`);} }

type Access='private' | 'public';
type BlobBackend={kind:'blob';token:string;access:Access};
type Backend=BlobBackend | {kind:'file';root:string};

/** A store's access mode is fixed when it is created; once a call reveals it, remember it per token. */
const detectedAccess=new Map<string,Access>();

function blobBackend(token:string,assumed:Access):BlobBackend {
  const isImageStore=token===process.env.BLOB_READ_WRITE_TOKEN?.trim();
  return {kind:'blob',token,access:detectedAccess.get(token) ?? (isImageStore?'public':assumed)};
}

function backend():Backend | null {
  const token=process.env.BLOB_DATA_READ_WRITE_TOKEN?.trim();
  if (token) return blobBackend(token,'private');
  // Vercel's file system is read-only and not shared between requests, so files there would be lost.
  const dir=process.env.VERCEL?undefined:process.env.LOCAL_DATA_DIR?.trim();
  if (dir) return {kind:'file',root:resolve(dir)};
  const publicToken=process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (publicToken) return blobBackend(publicToken,'public');
  return null;
}

const otherAccess=(access:Access):Access=>access==='private'?'public':'private';
const isAccessMismatch=(error:unknown)=>error instanceof Error && /cannot use (private|public) access on a (public|private) store/i.test(error.message);

/**
 * Runs a Blob call with the store's access mode. If the store turns out to have the other mode
 * (for example a public store connected as the data store), retries once with it and remembers it.
 * Reads retry on any Blob error, because the SDK reports a wrong mode on reads only as a bad request.
 */
async function withAccess<R>(store:BlobBackend,run:(access:Access)=>Promise<R>,{isRead=false}={}):Promise<R> {
  try { return await run(store.access); }
  catch (error) {
    if (!isAccessMismatch(error) && !(isRead && error instanceof BlobError)) throw error;
    const access=otherAccess(store.access);
    let result:R;
    try { result=await run(access); } catch { throw error; }
    detectedAccess.set(store.token,access);
    if (access==='public') console.warn('[data-store] The data store is a PUBLIC Blob store. Use a private store before storing real enquiries.');
    return result;
  }
}

/** Where documents are kept, for the admin dashboard. */
export function dataStoreDescription():string {
  const store=backend();
  if (!store) return 'Storage not configured';
  if (store.kind==='file') return 'Local files (development)';
  return store.access==='public'?'Vercel Blob, public store (testing only)':'Vercel Blob, private store';
}

function requireBackend():Backend {
  const configured=backend();
  if (!configured) throw new Error('Data storage is not configured. Set BLOB_DATA_READ_WRITE_TOKEN (private Vercel Blob store) or LOCAL_DATA_DIR for local development.');
  return configured;
}

export function isDataStoreConfigured() { return backend()!==null; }

const validPath=(path:string)=>/^[a-z0-9-]+(\/[a-z0-9-]+)*\.json$/i.test(path);
function assertPath(path:string) { if (!validPath(path)) throw new Error(`Invalid document path: ${path}`); }
const hash=(text:string)=>createHash('sha1').update(text).digest('hex');

function filePath(root:string,path:string) {
  const target=resolve(root,path);
  if (!target.startsWith(root+sep)) throw new Error(`Invalid document path: ${path}`);
  return target;
}

/** Reads a document directly from storage (never from a cache). Returns null when it does not exist. */
export async function readDocument<T>(path:string):Promise<StoredDocument<T> | null> {
  assertPath(path);
  const store=requireBackend();
  if (store.kind==='file') {
    try { const text=await readFile(filePath(store.root,path),'utf8');return {data:JSON.parse(text) as T,etag:hash(text)}; }
    catch (error) { if ((error as NodeJS.ErrnoException).code==='ENOENT') return null;throw error; }
  }
  const blobStore=store;
  const result=await withAccess(blobStore,access=>get(path,{access,token:blobStore.token,useCache:false}),{isRead:true});
  if (!result || result.statusCode!==200) return null;
  const text=await new Response(result.stream).text();
  return {data:JSON.parse(text) as T,etag:result.blob.etag};
}

/**
 * Writes a document. `ifMatch: null` creates it and fails if it already exists; an ETag string
 * replaces it only if nobody changed it since it was read. Throws DocumentConflictError otherwise.
 */
export async function writeDocument(path:string,data:unknown,{ifMatch}:{ifMatch:string | null}) {
  assertPath(path);
  const store=requireBackend();
  const text=JSON.stringify(data);
  if (store.kind==='file') {
    const target=filePath(store.root,path);
    await mkdir(dirname(target),{recursive:true});
    if (ifMatch===null) {
      try { await writeFile(target,text,{flag:'wx'}); } catch (error) { if ((error as NodeJS.ErrnoException).code==='EEXIST') throw new DocumentConflictError(path);throw error; }
    } else {
      const current=await readFile(target,'utf8').catch(()=>null);
      if (current===null || hash(current)!==ifMatch) throw new DocumentConflictError(path);
      await writeFile(target,text);
    }
    return;
  }
  try {
    const blobStore=store;
    await withAccess(blobStore,access=>put(path,text,{access,token:blobStore.token,contentType:'application/json',addRandomSuffix:false,cacheControlMaxAge:60,...(ifMatch===null?{}:{ifMatch})}));
  } catch (error) {
    if (error instanceof BlobPreconditionFailedError) throw new DocumentConflictError(path);
    // A create-only write fails when the document already exists; report that as a conflict.
    if (ifMatch===null && await readDocument(path).catch(()=>null)) throw new DocumentConflictError(path);
    throw error;
  }
}

/** Paths of every document under a folder prefix such as `enquiries/`. */
export async function listDocumentPaths(prefix:string):Promise<string[]> {
  const store=requireBackend();
  if (store.kind==='file') {
    const dir=resolve(store.root,prefix);
    if (!dir.startsWith(store.root+sep)) throw new Error(`Invalid document prefix: ${prefix}`);
    const names=await readdir(dir).catch(()=>[] as string[]);
    return names.filter(name=>name.endsWith('.json')).map(name=>relative(store.root,join(dir,name)).split(sep).join('/'));
  }
  const paths:string[]=[];let cursor:string | undefined;
  do {
    const page=await list({prefix,cursor,limit:1000,token:store.token});
    paths.push(...page.blobs.map(blob=>blob.pathname).filter(validPath));
    cursor=page.hasMore?page.cursor:undefined;
  } while (cursor);
  return paths;
}

/** Reads many documents, a few at a time, skipping any that disappear meanwhile. */
export async function readDocuments<T>(paths:string[],concurrency=8):Promise<T[]> {
  const results:(T | null)[]=new Array(paths.length).fill(null);
  let next=0;
  await Promise.all(Array.from({length:Math.min(concurrency,paths.length)},async()=>{
    while (next<paths.length) { const index=next++;results[index]=(await readDocument<T>(paths[index]))?.data ?? null; }
  }));
  return results.filter((item):item is T=>item!==null);
}

/**
 * Read, change, write with an ETag check, retrying when another save got there first.
 * `change` may throw to abort (for example when a slug is already taken).
 */
export async function updateDocument<T>(path:string,fallback:T,change:(current:T)=>T):Promise<T> {
  for (let attempt=0;attempt<4;attempt++) {
    const current=await readDocument<T>(path);
    const next=change(current?.data ?? structuredClone(fallback));
    try { await writeDocument(path,next,{ifMatch:current?current.etag:null});return next; }
    catch (error) { if (!(error instanceof DocumentConflictError) || attempt===3) throw error; }
  }
  throw new DocumentConflictError(path);
}

const tagFor=(path:string)=>`doc:${path}`;

/**
 * Cached read for public pages: one storage read per document until the next save, shared across
 * requests. Admin screens and writes use readDocument directly, which always sees the latest data.
 */
export function readCachedDocument<T>(path:string):Promise<T | null> {
  assertPath(path);
  return unstable_cache(async()=>(await readDocument<T>(path))?.data ?? null,['data-document',path],{tags:[tagFor(path)],revalidate:3600})();
}

/** Call after a save so public pages stop serving the previous version of the document. */
export function invalidateDocument(path:string) { revalidateTag(tagFor(path)); }
