import {NextResponse} from 'next/server';
import {isSameOrigin} from '@/server/auth/request';
import {adminSessionCookie} from '@/server/auth/session';

export async function POST(request:Request) {
  if (!isSameOrigin(request)) return NextResponse.json({message:'Invalid request origin.'},{status:403});
  const response=NextResponse.json({ok:true});
  response.cookies.set({name:adminSessionCookie,value:'',httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:0});
  return response;
}
