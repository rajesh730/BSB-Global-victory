import rawArticles from './articles.json';
import type { Article } from '@/types/content';

export const articles: Article[] = rawArticles;
export const getArticle = (slug: string): Article | undefined => articles.find(article => article.slug === slug);

type ManagedPost={slug:string;title:string;category:string;excerpt:string;body:string;coverImageUrl:string | null;coverImageAlt:string | null};
export function articleFromManagedPost(post:ManagedPost):Article {
  return {slug:post.slug,category:post.category,readingMinutes:Math.max(1,Math.ceil(post.body.trim().split(/\s+/).length/220)),title:post.title,description:post.excerpt,intro:'',sections:[],body:post.body,coverImage:post.coverImageUrl?{src:post.coverImageUrl,alt:post.coverImageAlt || post.title}:undefined};
}
