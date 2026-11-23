import type {MetadataRoute} from 'next';
import {destinations} from '@/content/destinations';
import {articles} from '@/content/articles';
import {isSiteVerified,siteOrigin} from '@/lib/site-config';
import {listPublishedBlogPosts} from '@/server/blog/repository';

export const dynamic='force-dynamic';

export default async function sitemap():Promise<MetadataRoute.Sitemap>{
 if(!isSiteVerified)return [];
 const managedPosts=await listPublishedBlogPosts().catch(()=>[]);
 const sitePaths=[...new Set(['/','/study-abroad','/services','/test-preparation','/education-consultancy-butwal','/language-classes-butwal','/about','/gallery','/resources','/contact','/privacy','/terms','/image-credits',...destinations.map(destination=>`/study-abroad/${destination.slug}`),...articles.map(article=>`/resources/${article.slug}`),...managedPosts.map(post=>`/resources/${post.slug}`)])];
 return sitePaths.map(path=>({url:`${siteOrigin}${path}`,changeFrequency:path==='/'?'weekly':'monthly',priority:path==='/'?1:path.startsWith('/resources/')?.55:.75}));
}
