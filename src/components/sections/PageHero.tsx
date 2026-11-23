import type {ReactNode} from 'react';
import {Eyebrow} from '@/components/ui/Eyebrow';
import {getSitePage} from '@/server/site/repository';

type Props={pageKey?:string;label:string;title:string;description:string;children?:ReactNode;numeral?:string};

export async function PageHero({pageKey,label,title,description,children,numeral}:Props) {
  const page=pageKey?await getSitePage(pageKey):null;
  return <section className="page-hero"><div className="container page-hero-grid"><div className="page-hero-copy"><Eyebrow>{page?.eyebrow || label}</Eyebrow><h1>{page?.title || title}</h1><p className="lead">{page?.description || description}</p>{children}</div><div className="page-hero-graphic" aria-hidden="true"><span className="page-hero-numeral">{numeral || 'BG'}</span><span className="page-hero-rule"/></div></div></section>;
}
