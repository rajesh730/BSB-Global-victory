import type {Metadata} from 'next';
import Link from 'next/link';
import {AdminPageHeader} from '@/components/admin/AdminPageHeader';
import {listSitePages} from '@/server/site/repository';

export const metadata:Metadata={title:'Admin page content',robots:{index:false,follow:false}};
export default async function AdminPagesPage(){
  let pages:Awaited<ReturnType<typeof listSitePages>>=[];let ready=true;
  try{pages=await listSitePages();}catch{ready=false;}
  return <><AdminPageHeader eyebrow="Website management" title="Page content and search snippets"/>{!ready?<div className="admin-alert"><strong>Database setup needed.</strong> Run <code>npm run db:migrate</code> before editing website pages.</div>:<section className="admin-panel"><div className="admin-panel-head"><div><p>Public pages</p><h2>Core website pages</h2></div><span>{pages.length} pages</span></div><div className="admin-post-list">{pages.map(page=><Link href={`/admin/pages/${page.id}`} key={page.id}><div><strong>{page.label}</strong><small>{page.path} · {page.metaTitle}</small></div><span>Edit</span></Link>)}</div></section>}</>;
}
