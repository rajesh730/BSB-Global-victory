import 'server-only';

export type AdminAuthConfig = {loginId:string; password:string; sessionSecret:string};

/**
 * Reads credentials only on the server. Admin credentials deliberately live in
 * environment variables instead of source control or a browser-accessible value.
 */
export function getAdminAuthConfig(): AdminAuthConfig | null {
  const loginId=process.env.ADMIN_LOGIN_ID?.trim();
  const password=process.env.ADMIN_PASSWORD;
  const sessionSecret=process.env.ADMIN_SESSION_SECRET;
  if (!loginId || !password || !sessionSecret || sessionSecret.length<32) return null;
  return {loginId,password,sessionSecret};
}
