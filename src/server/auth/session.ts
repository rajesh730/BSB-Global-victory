import 'server-only';
import {createHmac, timingSafeEqual} from 'node:crypto';
import {cookies} from 'next/headers';
import {getAdminAuthConfig} from './config';

export const adminSessionCookie='bsb_admin_session';
const sessionLifetimeSeconds=60 * 60 * 8;

type SessionPayload = {loginId:string; expiresAt:number};

function sign(value:string, secret:string) {
  return createHmac('sha256',secret).update(value).digest('base64url');
}

function safeEqual(left:string, right:string) {
  const leftBuffer=Buffer.from(left);
  const rightBuffer=Buffer.from(right);
  return leftBuffer.length===rightBuffer.length && timingSafeEqual(leftBuffer,rightBuffer);
}

export function credentialsMatch(loginId:string, password:string) {
  const config=getAdminAuthConfig();
  return Boolean(config && safeEqual(loginId,config.loginId) && safeEqual(password,config.password));
}

export function createAdminSession(loginId:string) {
  const config=getAdminAuthConfig();
  if (!config) throw new Error('Admin access is not configured.');
  const payload:SessionPayload={loginId,expiresAt:Date.now()+sessionLifetimeSeconds*1000};
  const encoded=Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${encoded}.${sign(encoded,config.sessionSecret)}`;
}

export async function getAdminSession(): Promise<SessionPayload | null> {
  const config=getAdminAuthConfig();
  const token=(await cookies()).get(adminSessionCookie)?.value;
  if (!config || !token) return null;
  const [encoded,signature,...extra]=token.split('.');
  if (!encoded || !signature || extra.length || !safeEqual(signature,sign(encoded,config.sessionSecret))) return null;
  try {
    const payload=JSON.parse(Buffer.from(encoded,'base64url').toString('utf8')) as SessionPayload;
    if (payload.loginId!==config.loginId || !Number.isFinite(payload.expiresAt) || payload.expiresAt<=Date.now()) return null;
    return payload;
  } catch { return null; }
}

export const adminSessionMaxAge=sessionLifetimeSeconds;
