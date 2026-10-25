import Link from 'next/link';
import type {ReactNode} from 'react';
import {Icon} from './Icon';

type ButtonVariant = 'primary' | 'outline' | 'light' | 'navy';

export function ButtonLink({href, children, variant = 'primary', showArrow = true, className = ''}: {href: string; children: ReactNode; variant?: ButtonVariant; showArrow?: boolean; className?: string}) {
  return <Link href={href} className={`button button-${variant} ${className}`}>{children}{showArrow && <Icon name="arrow-up-right" size={17}/>}</Link>;
}
