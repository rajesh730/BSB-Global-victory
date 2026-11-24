import 'server-only';
import {randomUUID} from 'node:crypto';
import {invalidateDocument,readCachedDocument,readDocument,updateDocument} from '@/server/store/documents';
import type {BlogPostInput} from './schema';

export type BlogPost={id:string;slug:string;title:string;category:string;excerpt:string;body:string;coverImageUrl:string | null;coverImageAlt:string | null;status:'draft'|'published';publishedAt:string | null;createdAt:string;updatedAt:string};

/** All posts live in one private document; the dashboard is the only writer. */
export const blogPostsPath='content/blog-posts.json';

export class SlugInUseError extends Error { constructor(){super('This slug is already used by another post.');} }

const newestFirst=(a:string | null,b:string | null)=>(b || '').localeCompare(a || '');

/** Latest saved posts, read directly from storage (dashboard and writes). */
async function readPosts() { return (await readDocument<BlogPost[]>(blogPostsPath))?.data ?? []; }
/** Posts for public pages, cached until the next save. */
async function readPublicPosts() { return (await readCachedDocument<BlogPost[]>(blogPostsPath)) ?? []; }

async function savePosts(change:(posts:BlogPost[])=>BlogPost[]) {
  await updateDocument<BlogPost[]>(blogPostsPath,[],change);
  invalidateDocument(blogPostsPath);
}

function assertSlugFree(posts:BlogPost[],slug:string,exceptId?:string) {
  if (posts.some(post=>post.slug===slug && post.id!==exceptId)) throw new SlugInUseError();
}

export async function listBlogPosts() {
  return (await readPosts()).sort((a,b)=>a.status===b.status?newestFirst(a.updatedAt,b.updatedAt):a.status==='draft'?-1:1);
}

export async function listPublishedBlogPosts() {
  return (await readPublicPosts()).filter(post=>post.status==='published').sort((a,b)=>newestFirst(a.publishedAt,b.publishedAt));
}

export async function getBlogPostById(id:string) {
  return (await readPosts()).find(post=>post.id===id) ?? null;
}

export async function getPublishedBlogPostBySlug(slug:string) {
  return (await readPublicPosts()).find(post=>post.slug===slug && post.status==='published') ?? null;
}

function fromInput(input:BlogPostInput) {
  return {slug:input.slug,title:input.title,category:input.category,excerpt:input.excerpt,body:input.body,coverImageUrl:input.coverImageUrl || null,coverImageAlt:input.coverImageAlt || null,status:input.status};
}

export async function createBlogPost(input:BlogPostInput) {
  const id=randomUUID();const now=new Date().toISOString();
  await savePosts(posts=>{
    assertSlugFree(posts,input.slug);
    return [...posts,{id,...fromInput(input),publishedAt:input.status==='published'?now:null,createdAt:now,updatedAt:now}];
  });
  return id;
}

export async function updateBlogPost(id:string,input:BlogPostInput) {
  let found=false;
  await savePosts(posts=>{
    const existing=posts.find(post=>post.id===id);
    found=Boolean(existing);
    if (!existing) return posts;
    assertSlugFree(posts,input.slug,id);
    const now=new Date().toISOString();
    return posts.map(post=>post.id===id?{...post,...fromInput(input),publishedAt:input.status==='published'?(existing.publishedAt || now):null,updatedAt:now}:post);
  });
  return found;
}

export async function deleteBlogPost(id:string) {
  let found=false;
  await savePosts(posts=>{found=posts.some(post=>post.id===id);return posts.filter(post=>post.id!==id);});
  return found;
}
