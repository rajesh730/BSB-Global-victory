import Link from 'next/link';
import type {ReactNode} from 'react';
import {Icon} from './Icon';

export function TextLink({href, children}: {href: string; children: ReactNode}) {
  return <Link href={href} className="text-link">{children}<Icon name="arrow-up-right" size={18}/></Link>;
}
