import {NextResponse} from 'next/server';
import {getAdminAuthConfig} from '@/server/auth/config';
import {isSameOrigin} from '@/server/auth/request';
import {adminSessionCookie,adminSessionMaxAge,createAdminSession,credentialsMatch} from '@/server/auth/session';

export const runtime='nodejs';

type Attempt = {count:number; resetAt:number};
const attempts=new Map<string,Attempt>();
const maxAttempts=5;
const windowMs=15*60*1000;

function requestKey(request:Request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

function isRateLimited(key:string) {
  const attempt=attempts.get(key);
  if (!attempt) return false;
  if (attempt.resetAt<=Date.now()) { attempts.delete(key); return false; }
  return attempt.count>=maxAttempts;
}

function recordFailure(key:string) {
  const existing=attempts.get(key);
  if (!existing || existing.resetAt<=Date.now()) attempts.set(key,{count:1,resetAt:Date.now()+windowMs});
  else attempts.set(key,{...existing,count:existing.count+1});
}

export async function POST(request:Request) {
  if (!isSameOrigin(request)) return NextResponse.json({message:'Invalid request origin.'},{status:403});
  if (!getAdminAuthConfig()) return NextResponse.json({message:'Admin access has not been configured yet.'},{status:503});
  const key=requestKey(request);
  if (isRateLimited(key)) return NextResponse.json({message:'Too many sign-in attempts. Please wait 15 minutes and try again.'},{status:429});

  let body:unknown;
  try { body=await request.json(); } catch { return NextResponse.json({message:'Invalid sign-in request.'},{status:400}); }
  if (!body || typeof body!=='object') return NextResponse.json({message:'Invalid sign-in request.'},{status:400});
  const {loginId,password}=body as {loginId?:unknown;password?:unknown};
  if (typeof loginId!=='string' || typeof password!=='string' || loginId.length>120 || password.length>500) return NextResponse.json({message:'Enter your login ID and password.'},{status:400});
  if (!credentialsMatch(loginId.trim(),password)) {
    recordFailure(key);
    return NextResponse.json({message:'The login ID or password is incorrect.'},{status:401});
  }

  attempts.delete(key);
  const response=NextResponse.json({ok:true});
  response.cookies.set({name:adminSessionCookie,value:createAdminSession(loginId.trim()),httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:adminSessionMaxAge});
  return response;
}
