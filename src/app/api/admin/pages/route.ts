import {NextResponse} from 'next/server';
import {requireAdminApiSession} from '@/server/auth/request';
import {listSitePages} from '@/server/site/repository';

export const runtime='nodejs';
export async function GET(){
  const auth=await requireAdminApiSession();if(auth.response)return auth.response;
  try{return NextResponse.json({pages:await listSitePages()});}catch(error){console.error('Unable to list site pages',error);return NextResponse.json({message:'Database setup is needed before site content can be managed.'},{status:503});}
}
