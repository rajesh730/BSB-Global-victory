import Link from 'next/link';
import type {ReactNode} from 'react';

type ButtonVariant = 'primary' | 'outline' | 'light';

export function ButtonLink({href, children, variant = 'primary', className = ''}: {href: string; children: ReactNode; variant?: ButtonVariant; className?: string}) {
  return <Link href={href} className={`button button-${variant} ${className}`.trim()}>{children}</Link>;
}
