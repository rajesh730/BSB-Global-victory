'use client';

import type {ReactNode} from 'react';
import {usePathname} from 'next/navigation';
import {Header} from './Header';
import {Footer} from './Footer';

export function SiteShell({children}: {children:ReactNode}) {
  const pathname=usePathname();
  if (pathname.startsWith('/admin')) return <>{children}</>;
  return <><a href="#main-content" className="skip-link">Skip to content</a><Header/><main id="main-content">{children}</main><Footer/></>;
}
