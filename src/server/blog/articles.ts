import 'server-only';
import {articles,articleFromManagedPost} from '@/content/articles';
import type {Article} from '@/types/content';
import {listPublishedBlogPosts} from './repository';

/**
 * Every public resource: published dashboard posts first (newest first), then the built-in guides.
 * A dashboard post with the same slug replaces the built-in guide. Falls back to the built-in
 * guides alone when the database is not configured.
 */
export async function listResourceArticles():Promise<Article[]> {
  const managed=await listPublishedBlogPosts().catch(()=>[]);
  const slugs=new Set(managed.map(post=>post.slug));
  return [...managed.map(articleFromManagedPost),...articles.filter(article=>!slugs.has(article.slug))];
}
