import type {ReactNode} from 'react';
import {Eyebrow} from '@/components/ui/Eyebrow';

export function PageHero({label, title, description, children, numeral}: {label: string; title: string; description: string; children?: ReactNode; numeral?: string}) {
  return <section className="page-hero"><div className="container page-hero-grid"><div className="page-hero-copy"><Eyebrow>{label}</Eyebrow><h1>{title}</h1><p className="lead">{description}</p>{children}</div><div className="page-hero-graphic" aria-hidden="true"><span className="page-hero-numeral">{numeral || 'BG'}</span><span className="page-hero-rule"/></div></div></section>;
}
