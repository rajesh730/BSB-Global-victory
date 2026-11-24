import 'server-only';
import {del} from '@vercel/blob';
import {blobStoreOrigin} from '@/lib/blob-store';
import {bodyImageUrls} from '@/lib/post-body';
import {readDocument} from '@/server/store/documents';
import {blogPostsPath,type BlogPost} from './repository';
import {galleryPath,type StoredGallery} from '@/server/site/repository';

type PostImages={coverImageUrl?:string | null;body:string};

/** Blob files this post uses that were uploaded to the dashboard's blog folder. */
export function postBlobImages(post:PostImages) {
  const origin=blobStoreOrigin();if (!origin) return [];
  const prefix=`${origin}/blog/`;
  return [...new Set([post.coverImageUrl || '',...bodyImageUrls(post.body)])].filter(url=>url.startsWith(prefix));
}

/**
 * Removes blog images from the public image store once no post or gallery item references them.
 * Best effort: a failure is logged and never blocks saving or deleting a post.
 */
export async function deleteUnusedBlogImages(candidates:string[]) {
  if (!candidates.length || !process.env.BLOB_READ_WRITE_TOKEN) return;
  try {
    const [posts,gallery]=await Promise.all([readDocument<BlogPost[]>(blogPostsPath),readDocument<StoredGallery>(galleryPath)]);
    const referenced=new Set<string>();
    for (const post of posts?.data ?? []) for (const url of postBlobImages(post)) referenced.add(url);
    for (const item of gallery?.data.items ?? []) referenced.add(item.src);
    const unused=candidates.filter(url=>!referenced.has(url));
    // Images live in the public store, so this uses its token (BLOB_READ_WRITE_TOKEN), not the data store's.
    if (unused.length) await del(unused,{token:process.env.BLOB_READ_WRITE_TOKEN});
  } catch (error) {
    console.error('Unable to remove unused blog images',error);
  }
}
