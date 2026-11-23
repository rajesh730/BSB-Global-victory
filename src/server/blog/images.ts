import 'server-only';
import {del} from '@vercel/blob';
import {blobStoreOrigin} from '@/lib/blob-store';
import {bodyImageUrls} from '@/lib/post-body';
import {getDatabaseClient} from '@/server/db/client';

type PostImages={coverImageUrl?:string | null;body:string};

/** Blob files this post uses that were uploaded to the dashboard's blog folder. */
export function postBlobImages(post:PostImages) {
  const origin=blobStoreOrigin();if (!origin) return [];
  const prefix=`${origin}/blog/`;
  return [...new Set([post.coverImageUrl || '',...bodyImageUrls(post.body)])].filter(url=>url.startsWith(prefix));
}

/**
 * Removes blog images from the Blob store once no post or gallery item references them.
 * Best effort: a failure is logged and never blocks saving or deleting a post.
 */
export async function deleteUnusedBlogImages(candidates:string[]) {
  if (!candidates.length || !process.env.BLOB_READ_WRITE_TOKEN) return;
  try {
    const client=getDatabaseClient();
    const [posts,gallery]=await Promise.all([client.execute('SELECT cover_image_url, body FROM blog_posts'),client.execute('SELECT image_url FROM gallery_items')]);
    const referenced=new Set<string>();
    for (const row of posts.rows) for (const url of postBlobImages({coverImageUrl:typeof row.cover_image_url==='string'?row.cover_image_url:null,body:typeof row.body==='string'?row.body:''})) referenced.add(url);
    for (const row of gallery.rows) if (typeof row.image_url==='string') referenced.add(row.image_url);
    const unused=candidates.filter(url=>!referenced.has(url));
    if (unused.length) await del(unused);
  } catch (error) {
    console.error('Unable to remove unused blog images',error);
  }
}
