import type {Metadata} from 'next';
import {AdminPageHeader} from '@/components/admin/AdminPageHeader';
import {BusinessSettingsForm} from '@/components/admin/BusinessSettingsForm';
import {getBusinessSettings} from '@/server/site/repository';

export const metadata:Metadata={title:'Admin business settings',robots:{index:false,follow:false}};
export default async function AdminSettingsPage(){
  let settings;let ready=true;try{settings=await getBusinessSettings();}catch{ready=false;}
  return <><AdminPageHeader eyebrow="Website management" title="Office and contact details"/>{!ready?<div className="admin-alert"><strong>Data storage setup needed.</strong> Connect a private Vercel Blob store and set <code>BLOB_DATA_READ_WRITE_TOKEN</code> (or <code>LOCAL_DATA_DIR</code> for local development).</div>:<BusinessSettingsForm settings={settings!}/>}</>;
}
