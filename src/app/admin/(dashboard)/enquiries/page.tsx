import type {Metadata} from 'next';
import {AdminPageHeader} from '@/components/admin/AdminPageHeader';
import {EnquiryTable} from '@/components/admin/EnquiryTable';
import {listEnquiries} from '@/server/enquiries/repository';

export const metadata:Metadata={title:'Admin enquiries',robots:{index:false,follow:false}};

export default async function AdminEnquiriesPage() {
  let enquiries:Awaited<ReturnType<typeof listEnquiries>>=[];
  let isDatabaseReady=true;
  try { enquiries=await listEnquiries(); } catch { isDatabaseReady=false; }
  return <><AdminPageHeader eyebrow="Counselling pipeline" title="Enquiries"/>{!isDatabaseReady ? <div className="admin-alert"><strong>Database setup needed.</strong> Configure SQLite or Turso credentials, then run <code>npm run db:migrate</code>.</div> : <section className="admin-panel admin-enquiries-panel"><div className="admin-panel-head"><div><p>Private student data</p><h2>All enquiries</h2></div><span>{enquiries.length} shown</span></div><EnquiryTable enquiries={enquiries}/></section>}</>;
}
