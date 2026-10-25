import rawArticles from './articles.json';
import type { Article } from '@/types/content';

export const articles: Article[] = rawArticles;
export const getArticle = (slug: string): Article | undefined => articles.find(article => article.slug === slug);
