import {Eyebrow} from '@/components/ui/Eyebrow';
import {TextLink} from '@/components/ui/TextLink';

export function SectionHeading({eyebrow, title, description, href, linkLabel}: {eyebrow: string; title: string; description?: string; href?: string; linkLabel?: string}) {
  return <div className="section-head"><div><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2>{description && <p className="section-description">{description}</p>}</div>{href && <TextLink href={href}>{linkLabel || 'Explore more'}</TextLink>}</div>;
}
