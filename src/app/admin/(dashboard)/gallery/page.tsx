import type {Metadata} from 'next';
import {AdminPageHeader} from '@/components/admin/AdminPageHeader';
import {GalleryManager} from '@/components/admin/GalleryManager';
import {getGalleryItems} from '@/server/site/repository';

export const metadata:Metadata={title:'Admin gallery',robots:{index:false,follow:false}};
export default async function AdminGalleryPage(){let items;let ready=true;try{items=await getGalleryItems();}catch{ready=false;}return <><AdminPageHeader eyebrow="Website management" title="Gallery and homepage images"/>{!ready?<div className="admin-alert"><strong>Database setup needed.</strong> Run <code>npm run db:migrate</code> before editing gallery content.</div>:<GalleryManager initialItems={items!}/>}</>}
