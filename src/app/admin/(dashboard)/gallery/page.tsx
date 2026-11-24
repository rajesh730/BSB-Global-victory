import type {Metadata} from 'next';
import {AdminPageHeader} from '@/components/admin/AdminPageHeader';
import {GalleryManager} from '@/components/admin/GalleryManager';
import {getGalleryItems} from '@/server/site/repository';

export const metadata:Metadata={title:'Admin gallery',robots:{index:false,follow:false}};
export default async function AdminGalleryPage(){let items;let ready=true;try{items=await getGalleryItems();}catch{ready=false;}return <><AdminPageHeader eyebrow="Website management" title="Gallery and homepage images"/>{!ready?<div className="admin-alert"><strong>Data storage setup needed.</strong> Connect a private Vercel Blob store and set <code>BLOB_DATA_READ_WRITE_TOKEN</code> (or <code>LOCAL_DATA_DIR</code> for local development).</div>:<GalleryManager initialItems={items!}/>}</>}
