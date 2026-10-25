import type {MetadataRoute} from 'next';
import {destinations} from '@/content/destinations';
import {articles} from '@/content/articles';
import {isSiteVerified,siteOrigin} from '@/lib/site-config';
export default function sitemap():MetadataRoute.Sitemap{
 if(!isSiteVerified)return [];
 const sitePaths=['/','/study-abroad','/services','/test-preparation','/about','/gallery','/resources','/contact','/privacy','/terms','/image-credits',...destinations.map(destination=>`/study-abroad/${destination.slug}`),...articles.map(article=>`/resources/${article.slug}`)];
 return sitePaths.map(path=>({url:`${siteOrigin}${path}`,changeFrequency:path==='/'?'weekly':'monthly',priority:path==='/'?1:path.startsWith('/resources/')?.55:.75}));
}
