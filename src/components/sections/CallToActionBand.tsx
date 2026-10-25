import {Eyebrow} from '@/components/ui/Eyebrow';
import {ButtonLink} from '@/components/ui/ButtonLink';

export function CallToActionBand({title = 'Your next step should feel clearer.', text = 'Tell us what you want to study. Start with a conversation, not a commitment.'}: {title?: string; text?: string}) {
  return <section className="cta-band"><div className="container cta-inner"><div><Eyebrow light>Let’s get started</Eyebrow><h2>{title}</h2><p>{text}</p></div><ButtonLink href="/contact" variant="light">Request counselling</ButtonLink></div></section>;
}
