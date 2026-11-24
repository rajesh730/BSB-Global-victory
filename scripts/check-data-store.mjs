// Checks the private Vercel Blob data store: write, read back, confirm it is NOT publicly readable, clean up.
// Usage: npm run data:check
import {del,get,put} from '@vercel/blob';

const token=process.env.BLOB_DATA_READ_WRITE_TOKEN?.trim();
if (!token) {
  console.error('BLOB_DATA_READ_WRITE_TOKEN is not set. Add the private data store token to .env.local.');
  process.exit(1);
}
if (token===process.env.BLOB_READ_WRITE_TOKEN?.trim()) {
  console.error('BLOB_DATA_READ_WRITE_TOKEN is the same as BLOB_READ_WRITE_TOKEN (the public image store). Data needs its own private store.');
  process.exit(1);
}

const path=`health/check-${Date.now()}.json`;
const body=JSON.stringify({ok:true,at:new Date().toISOString()});
try {
  const written=await put(path,body,{access:'private',token,contentType:'application/json',addRandomSuffix:false});
  console.log('✓ wrote',written.pathname);

  const read=await get(path,{access:'private',token,useCache:false});
  const text=read?.stream?await new Response(read.stream).text():'';
  if (text!==body) throw new Error('Read-back did not match what was written.');
  console.log('✓ read back with the token');

  const anonymous=await fetch(written.url);
  if (anonymous.ok) throw new Error(`The document is publicly readable at ${written.url}. Use a PRIVATE Blob store for data.`);
  console.log(`✓ not readable without the token (HTTP ${anonymous.status})`);
} catch (error) {
  console.error('✗ Data store check failed:',error instanceof Error?error.message:error);
  process.exitCode=1;
} finally {
  await del(path,{token}).catch(()=>{});
}
if (!process.exitCode) console.log('Data store is ready.');
