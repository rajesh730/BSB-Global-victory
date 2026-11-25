import 'server-only';
import {randomUUID} from 'node:crypto';
import {cache} from 'react';
import {listDocumentPaths,readDocument,readDocuments,updateDocument,writeDocument} from '@/server/store/documents';
import type {EnquiryInput} from './schema';
import type {EnquiryStatus} from './admin-schema';

export type AdminEnquiry = {
  id:string;
  name:string;
  email:string;
  phone:string | null;
  destination:string | null;
  studyLevel:string | null;
  message:string;
  status:EnquiryStatus;
  internalNote:string | null;
  createdAt:string;
  updatedAt:string;
};

/** One private document per enquiry, so simultaneous form submissions never touch the same file. */
type StoredEnquiry=AdminEnquiry;

const folder='enquiries/';
const validId=(id:string)=>/^[0-9a-f-]{36}$/i.test(id);
const pathFor=(id:string)=>`${folder}${id}.json`;

function toAdminEnquiry(stored:StoredEnquiry):AdminEnquiry {
  const {id,name,email,phone,destination,studyLevel,message,status,internalNote,createdAt,updatedAt}=stored;
  return {id,name,email,phone,destination,studyLevel,message,status,internalNote,createdAt,updatedAt};
}

/** Every enquiry, newest first. Cached per request so the overview's stats and list share one read. */
const loadEnquiries=cache(async()=>{
  const enquiries=await readDocuments<StoredEnquiry>(await listDocumentPaths(folder));
  return enquiries.sort((a,b)=>b.createdAt.localeCompare(a.createdAt));
});

export async function createEnquiry(input: EnquiryInput) {
  const id=randomUUID();
  const now=new Date().toISOString();
  const enquiry:StoredEnquiry={
    id,name:input.name,email:input.email,phone:input.phone || null,destination:input.destination || null,studyLevel:input.studyLevel || null,
    message:input.message,status:'new',internalNote:null,createdAt:now,updatedAt:now
  };
  await writeDocument(pathFor(id),enquiry,{ifMatch:null});
  return {id,createdAt:now};
}

export async function getEnquiryStats() {
  const enquiries=await loadEnquiries();
  const count=(status:EnquiryStatus)=>enquiries.filter(enquiry=>enquiry.status===status).length;
  return {total:enquiries.length,new:count('new'),contacted:count('contacted'),inProgress:count('in_progress')};
}

export async function listEnquiries(limit=100) {
  return (await loadEnquiries()).slice(0,Math.min(Math.max(limit,1),100)).map(toAdminEnquiry);
}

export async function updateEnquiry(id:string, status:EnquiryStatus, internalNote?:string) {
  if (!validId(id) || !await readDocument(pathFor(id))) return false;
  await updateDocument<StoredEnquiry | null>(pathFor(id),null,current=>{
    if (!current) throw new Error('Enquiry not found');
    return {...current,status,internalNote:internalNote || null,updatedAt:new Date().toISOString()};
  });
  return true;
}
