'use client';

import type {ReactNode} from 'react';
import {usePathname} from 'next/navigation';
import {Header} from './Header';
import {Footer} from './Footer';
import {ScrollReveal} from './ScrollReveal';
import type {PublicBusinessProfile} from '@/server/site/repository';

export function SiteShell({children,business}:{children:ReactNode;business:PublicBusinessProfile}) {
  const pathname=usePathname();
  if (pathname.startsWith('/admin')) return <>{children}</>;
  return <><a href="#main-content" className="skip-link">Skip to content</a><Header business={business}/><main id="main-content">{children}</main><Footer business={business}/><ScrollReveal/></>;
}
