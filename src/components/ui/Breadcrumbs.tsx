import Link from 'next/link';
import {JsonLd} from '@/components/seo/JsonLd';
import {absoluteUrl} from '@/lib/site-config';

export type BreadcrumbItem = {label: string; href?: string};

export function Breadcrumbs({items}: {items: BreadcrumbItem[]}) {
  const trail = [{label: 'Home', href: '/'}, ...items];
  return <nav className="breadcrumbs" aria-label="Breadcrumb">
    <JsonLd data={{'@type': 'BreadcrumbList', itemListElement: trail.map((item, position) => ({'@type': 'ListItem', position: position + 1, name: item.label, ...(item.href ? {item: absoluteUrl(item.href)} : {})}))}}/>
    <Link href="/">Home</Link>{items.map((item, position) => <span key={`${item.label}-${position}`} className="breadcrumb-item"><span aria-hidden> / </span>{item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</span>)}
  </nav>;
}
