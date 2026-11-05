import 'server-only';
import {randomUUID} from 'node:crypto';
import {getDatabaseClient} from '@/server/db/client';
import type {BlogPostInput} from './schema';

export type BlogPost={id:string;slug:string;title:string;category:string;excerpt:string;body:string;coverImageUrl:string | null;coverImageAlt:string | null;status:'draft'|'published';publishedAt:string | null;createdAt:string;updatedAt:string};
type Row=Record<string,unknown>;
const text=(value:unknown)=>typeof value==='string'?value:'';
const nullable=(value:unknown)=>typeof value==='string'?value:null;

function mapPost(row:Row):BlogPost {
  return {id:text(row.id),slug:text(row.slug),title:text(row.title),category:text(row.category),excerpt:text(row.excerpt),body:text(row.body),coverImageUrl:nullable(row.cover_image_url),coverImageAlt:nullable(row.cover_image_alt),status:text(row.status)==='published'?'published':'draft',publishedAt:nullable(row.published_at),createdAt:text(row.created_at),updatedAt:text(row.updated_at)};
}

export async function listBlogPosts() {
  const result=await getDatabaseClient().execute('SELECT * FROM blog_posts ORDER BY CASE status WHEN \'draft\' THEN 0 ELSE 1 END, updated_at DESC');
  return result.rows.map(row=>mapPost(row as Row));
}

export async function listPublishedBlogPosts() {
  const result=await getDatabaseClient().execute("SELECT * FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC");
  return result.rows.map(row=>mapPost(row as Row));
}

export async function getBlogPostById(id:string) {
  const result=await getDatabaseClient().execute({sql:'SELECT * FROM blog_posts WHERE id = ?',args:[id]});
  return result.rows[0]?mapPost(result.rows[0] as Row):null;
}

export async function getPublishedBlogPostBySlug(slug:string) {
  const result=await getDatabaseClient().execute({sql:"SELECT * FROM blog_posts WHERE slug = ? AND status = 'published'",args:[slug]});
  return result.rows[0]?mapPost(result.rows[0] as Row):null;
}

export async function createBlogPost(input:BlogPostInput) {
  const id=randomUUID();const now=new Date().toISOString();const publishedAt=input.status==='published'?now:null;
  await getDatabaseClient().execute({sql:`INSERT INTO blog_posts (id,slug,title,category,excerpt,body,cover_image_url,cover_image_alt,status,published_at,created_at,updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,args:[id,input.slug,input.title,input.category,input.excerpt,input.body,input.coverImageUrl || null,input.coverImageAlt || null,input.status,publishedAt,now,now]});
  return id;
}

export async function updateBlogPost(id:string,input:BlogPostInput) {
  const existing=await getBlogPostById(id);if (!existing) return false;
  const now=new Date().toISOString();const publishedAt=input.status==='published'?(existing.publishedAt || now):null;
  const result=await getDatabaseClient().execute({sql:`UPDATE blog_posts SET slug=?,title=?,category=?,excerpt=?,body=?,cover_image_url=?,cover_image_alt=?,status=?,published_at=?,updated_at=? WHERE id=?`,args:[input.slug,input.title,input.category,input.excerpt,input.body,input.coverImageUrl || null,input.coverImageAlt || null,input.status,publishedAt,now,id]});
  return result.rowsAffected>0;
}
