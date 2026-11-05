import type {Metadata} from 'next';
import Link from 'next/link';
import {AdminPageHeader} from '@/components/admin/AdminPageHeader';
import {getEnquiryStats, listEnquiries} from '@/server/enquiries/repository';

export const metadata:Metadata={title:'Admin overview',robots:{index:false,follow:false}};

export default async function AdminOverviewPage() {
  let stats={total:0,new:0,contacted:0,inProgress:0};
  let latest:Awaited<ReturnType<typeof listEnquiries>>=[];
  let isDatabaseReady=true;
  try { [stats,latest]=await Promise.all([getEnquiryStats(),listEnquiries(5)]); } catch { isDatabaseReady=false; }
  return <><AdminPageHeader eyebrow="Admin workspace" title="Overview"><Link className="admin-primary-action" href="/admin/enquiries">View enquiries</Link></AdminPageHeader>{!isDatabaseReady && <div className="admin-alert"><strong>Database setup needed.</strong> Configure SQLite or Turso credentials, then run <code>npm run db:migrate</code>. The dashboard will show enquiry data after the migration succeeds.</div>}<section className="admin-stat-grid"><article><span>Total enquiries</span><strong>{stats.total}</strong></article><article><span>New</span><strong>{stats.new}</strong></article><article><span>Contacted</span><strong>{stats.contacted}</strong></article><article><span>In progress</span><strong>{stats.inProgress}</strong></article></section><section className="admin-panel"><div className="admin-panel-head"><div><p>Latest activity</p><h2>Recent enquiries</h2></div><Link href="/admin/enquiries">See all</Link></div>{latest.length?<div className="admin-recent-list">{latest.map(enquiry=><article key={enquiry.id}><div><strong>{enquiry.name}</strong><span>{enquiry.destination || 'Destination undecided'} · {enquiry.email}</span></div><time dateTime={enquiry.createdAt}>{new Intl.DateTimeFormat('en-GB',{dateStyle:'medium'}).format(new Date(enquiry.createdAt))}</time></article>)}</div>:<p className="admin-empty-copy">No enquiries are available yet.</p>}</section></>;
}
