'use client';

import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {useState} from 'react';

const navigation=[{href:'/admin',label:'Overview'},{href:'/admin/enquiries',label:'Enquiries'},{href:'/admin/blog',label:'Blog posts'}];

export function AdminSidebar({loginId}:{loginId:string}) {
  const pathname=usePathname();
  const router=useRouter();
  const [isSigningOut,setIsSigningOut]=useState(false);
  const signOut=async()=>{
    setIsSigningOut(true);
    await fetch('/api/admin/logout',{method:'POST'});
    router.replace('/admin/login');
    router.refresh();
  };
  return <aside className="admin-sidebar">
    <Link href="/admin" className="admin-brand"><span>BSB</span><strong>GLOBAL ADMIN</strong></Link>
    <nav aria-label="Admin navigation" className="admin-navigation">{navigation.map(item=>{
      const active=item.href==='/admin' ? pathname==='/admin' : pathname.startsWith(item.href);
      return <Link href={item.href} className={active?'is-active':''} aria-current={active?'page':undefined} key={item.href}>{item.label}</Link>;
    })}</nav>
    <div className="admin-account"><span>Signed in as</span><strong>{loginId}</strong><button type="button" onClick={signOut} disabled={isSigningOut}>{isSigningOut?'Signing out…':'Sign out'}</button></div>
  </aside>;
}
