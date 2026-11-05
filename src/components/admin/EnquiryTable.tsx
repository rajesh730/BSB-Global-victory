'use client';

import {useState} from 'react';
import type {AdminEnquiry} from '@/server/enquiries/repository';
import {enquiryStatuses, type EnquiryStatus} from '@/server/enquiries/admin-schema';

const labels:Record<EnquiryStatus,string>={new:'New',contacted:'Contacted',in_progress:'In progress',closed:'Closed'};

export function EnquiryTable({enquiries}:{enquiries:AdminEnquiry[]}) {
  const [rows,setRows]=useState(enquiries);
  const [message,setMessage]=useState('');
  const updateStatus=async(id:string,status:EnquiryStatus)=>{
    const original=rows.find(row=>row.id===id);
    if (!original) return;
    setRows(current=>current.map(row=>row.id===id?{...row,status}:row));setMessage('');
    try {
      const response=await fetch(`/api/admin/enquiries/${id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({status,internalNote:original.internalNote || undefined})});
      const data=await response.json() as {message?:string};
      if (!response.ok) throw new Error(data.message || 'Unable to update this enquiry.');
    } catch (error) { setRows(current=>current.map(row=>row.id===id?original:row));setMessage(error instanceof Error ? error.message : 'Unable to update this enquiry.'); }
  };
  if (!rows.length) return <div className="admin-empty"><h2>No enquiries yet</h2><p>Submitted counselling enquiries will appear here once the public form is connected and the database migration has run.</p></div>;
  return <><p className="admin-form-message" role="status">{message}</p><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Student</th><th>Interest</th><th>Message</th><th>Received</th><th>Status</th></tr></thead><tbody>{rows.map(enquiry=><tr key={enquiry.id}><td><strong>{enquiry.name}</strong><a href={`mailto:${enquiry.email}`}>{enquiry.email}</a>{enquiry.phone && <a href={`tel:${enquiry.phone}`}>{enquiry.phone}</a>}</td><td>{enquiry.destination || 'Undecided'}<small>{enquiry.studyLevel || 'Study level not specified'}</small></td><td className="admin-message">{enquiry.message}</td><td>{new Intl.DateTimeFormat('en-GB',{dateStyle:'medium',timeStyle:'short'}).format(new Date(enquiry.createdAt))}</td><td><select aria-label={`Status for ${enquiry.name}`} value={enquiry.status} onChange={event=>updateStatus(enquiry.id,event.target.value as EnquiryStatus)}>{enquiryStatuses.map(status=><option key={status} value={status}>{labels[status]}</option>)}</select></td></tr>)}</tbody></table></div></>;
}
