import type {MetadataRoute} from 'next';
import {isSiteVerified,siteOrigin} from '@/lib/site-config';
export default function robots():MetadataRoute.Robots{
 return isSiteVerified?{rules:[{userAgent:'*',allow:'/'}],sitemap:`${siteOrigin}/sitemap.xml`}:{rules:[{userAgent:'*',disallow:'/'}]};
}
