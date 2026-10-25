import type {ReactNode} from 'react';
import {Header} from './Header';
import {Footer} from './Footer';

export function SiteShell({children}: {children:ReactNode}) {
  return <><a href="#main-content" className="skip-link">Skip to content</a><Header/><main id="main-content">{children}</main><Footer/></>;
}
