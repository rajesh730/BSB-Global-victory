import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {AdminPageHeader} from '@/components/admin/AdminPageHeader';
import {SitePageForm} from '@/components/admin/SitePageForm';
import {getSitePage} from '@/server/site/repository';
import {sitePageIdSchema} from '@/server/site/schema';

export const metadata:Metadata={title:'Edit website page',robots:{index:false,follow:false}};
export default async function EditSitePage({params}:{params:Promise<{id:string}>}){
  const {id}=await params;const parsed=sitePageIdSchema.safeParse(id);if(!parsed.success)notFound();
  let page;try{page=await getSitePage(parsed.data);}catch{notFound();}
  return <><AdminPageHeader eyebrow={`Website management · ${page.path}`} title={`Edit ${page.label}`}/><SitePageForm page={page}/></>;
}
