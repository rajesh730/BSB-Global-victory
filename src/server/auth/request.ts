import 'server-only';
import {NextResponse} from 'next/server';
import {getAdminSession} from './session';

export function isSameOrigin(request:Request) {
  const origin=request.headers.get('origin');
  return !origin || origin===new URL(request.url).origin;
}

export async function requireAdminApiSession() {
  const session=await getAdminSession();
  if (!session) return {session:null,response:NextResponse.json({message:'Authentication required.'},{status:401})};
  return {session,response:null};
}
