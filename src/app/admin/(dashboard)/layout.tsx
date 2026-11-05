import type {ReactNode} from 'react';
import {redirect} from 'next/navigation';
import {AdminSidebar} from '@/components/admin/AdminSidebar';
import {getAdminSession} from '@/server/auth/session';

export default async function AdminDashboardLayout({children}:{children:ReactNode}) {
  const session=await getAdminSession();
  if (!session) redirect('/admin/login');
  return <main className="admin-shell"><AdminSidebar loginId={session.loginId}/><section className="admin-content">{children}</section></main>;
}
