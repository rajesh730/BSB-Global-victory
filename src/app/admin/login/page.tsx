import type {Metadata} from 'next';
import Link from 'next/link';
import {LoginForm} from '@/components/admin/LoginForm';
import {getAdminAuthConfig} from '@/server/auth/config';
import {getAdminSession} from '@/server/auth/session';
import {redirect} from 'next/navigation';

export const metadata:Metadata={title:'Admin sign in',robots:{index:false,follow:false}};

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect('/admin');
  const isConfigured=Boolean(getAdminAuthConfig());
  return <main className="admin-login-page"><section className="admin-login-card"><Link href="/" className="admin-login-brand">BSB GLOBAL</Link><p className="admin-login-eyebrow">Private workspace</p><h1>Admin sign in</h1><p className="admin-login-copy">Use the administrator credentials configured for this site.</p><LoginForm isConfigured={isConfigured}/>{!isConfigured && <p className="admin-setup-message">Admin access is not configured. Add <code>ADMIN_LOGIN_ID</code>, <code>ADMIN_PASSWORD</code> and a 32+ character <code>ADMIN_SESSION_SECRET</code> to your environment, then restart the app.</p>}</section></main>;
}
