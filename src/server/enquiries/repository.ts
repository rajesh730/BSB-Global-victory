import 'server-only';
import {randomUUID} from 'node:crypto';
import {getDatabaseClient} from '@/server/db/client';
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

type EnquiryRow = Record<string, unknown>;

function toText(value:unknown) { return typeof value==='string' ? value : ''; }
function toNullableText(value:unknown) { return typeof value==='string' ? value : null; }

function mapAdminEnquiry(row:EnquiryRow): AdminEnquiry {
  const status=toText(row.status);
  return {
    id:toText(row.id),name:toText(row.name),email:toText(row.email),phone:toNullableText(row.phone),
    destination:toNullableText(row.destination),studyLevel:toNullableText(row.study_level),message:toText(row.message),
    status:status==='contacted'||status==='in_progress'||status==='closed'?status:'new',
    internalNote:toNullableText(row.internal_note),createdAt:toText(row.created_at),updatedAt:toText(row.updated_at)
  };
}

export async function createEnquiry(input: EnquiryInput) {
  const id=randomUUID();
  const now=new Date().toISOString();
  await getDatabaseClient().execute({
    sql:`INSERT INTO enquiries (id,name,email,phone,destination,study_level,message,consent_at,created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args:[id,input.name,input.email,input.phone || null,input.destination || null,input.studyLevel || null,input.message,now,now]
  });
  return {id,createdAt:now};
}

export async function getEnquiryStats() {
  const result=await getDatabaseClient().execute(`SELECT
    COUNT(*) AS total,
    SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) AS new_count,
    SUM(CASE WHEN status = 'contacted' THEN 1 ELSE 0 END) AS contacted_count,
    SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) AS in_progress_count
    FROM enquiries`);
  const row=result.rows[0] as EnquiryRow | undefined;
  const count=(value:unknown)=>typeof value==='number'?value:Number(value || 0);
  return {total:count(row?.total),new:count(row?.new_count),contacted:count(row?.contacted_count),inProgress:count(row?.in_progress_count)};
}

export async function listEnquiries(limit=100) {
  const result=await getDatabaseClient().execute({
    sql:`SELECT id,name,email,phone,destination,study_level,message,status,internal_note,created_at,updated_at
         FROM enquiries ORDER BY created_at DESC LIMIT ?`,args:[Math.min(Math.max(limit,1),100)]
  });
  return result.rows.map(row=>mapAdminEnquiry(row as EnquiryRow));
}

export async function updateEnquiry(id:string, status:EnquiryStatus, internalNote?:string) {
  const now=new Date().toISOString();
  const result=await getDatabaseClient().execute({
    sql:'UPDATE enquiries SET status = ?, internal_note = ?, updated_at = ? WHERE id = ?',
    args:[status,internalNote || null,now,id]
  });
  return result.rowsAffected>0;
}
