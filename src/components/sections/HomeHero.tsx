import Image from 'next/image';
import {ButtonLink} from '@/components/ui/ButtonLink';
import {Eyebrow} from '@/components/ui/Eyebrow';
import {Icon} from '@/components/ui/Icon';
import {getPhoto} from '@/content/photos';
import {headline} from '@/lib/headline';

type Props={eyebrow?:string;title?:string;description?:string};

export function HomeHero({
  eyebrow='BSB Global Victory · Butwal',
  title='Study abroad counselling in Butwal',
  description='Explore study options in Japan, the UK and South Korea with practical guidance shaped around your qualifications, budget and goals.'
}:Props) {
  const departure=getPhoto('departures-airport-students');
  return <section className="home-hero">
    <div className="container home-hero-grid">
      <div className="home-hero-copy">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{headline(title)}</h1>
        <p className="lead">{description}</p>
        <div className="hero-actions">
          <ButtonLink href="/contact">Book study abroad counselling</ButtonLink>
          <ButtonLink href="/study-abroad" variant="outline">Explore destinations</ButtonLink>
        </div>
      </div>
      <figure className="hero-visual">
        <div className="hero-photo">
          <Image src={departure.src} alt={departure.alt} fill priority sizes="(max-width:660px) 100vw, 456px"/>
        </div>
        <div className="hero-pass" aria-label="From Butwal to Japan, the United Kingdom and South Korea">
          <div className="hero-pass-line" aria-hidden="true"><Icon name="plane" size={16}/></div>
          <div className="hero-pass-route">
            <div><small>From</small><strong>Butwal</strong><span>Milanchowk, Rupandehi</span></div>
            <div aria-hidden="true"/>
            <div><small>To</small><strong>JP · GB · KR</strong><span>Japan, UK, South Korea</span></div>
          </div>
          <p>Plan it face to face at our Milanchowk office. Decide at your own pace.</p>
        </div>
        <figcaption>Students from our Butwal office on departure day</figcaption>
      </figure>
    </div>
  </section>;
}
