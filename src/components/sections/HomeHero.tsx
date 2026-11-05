import Image from 'next/image';
import {ButtonLink} from '@/components/ui/ButtonLink';
import {Eyebrow} from '@/components/ui/Eyebrow';

export function HomeHero() {
  return <><section className="home-hero"><div className="container home-hero-grid"><div className="home-hero-copy"><Eyebrow>BSB Global Victory · Butwal</Eyebrow><h1>Study abroad<br/><span>counselling</span><br/>in Butwal<span className="hero-period">.</span></h1><p className="lead">Explore study options in Japan, the UK and South Korea with practical guidance shaped around your qualifications, budget and goals.</p><div className="hero-actions"><ButtonLink href="/contact">Book study abroad counselling</ButtonLink><ButtonLink href="/study-abroad" variant="outline">Explore destinations</ButtonLink></div><p className="hero-note"><span className="note-line"/>Milanchowk, Butwal · Nepal</p></div>
    <div className="hero-editorial" role="img" aria-label="Illustrated globe representing international education"><Image className="hero-globe" src="/illustrations/hero-journey-globe.svg" alt="" width={610} height={560} priority/><div className="hero-travel-card"><span>STUDY DESTINATIONS</span><strong>Japan · United Kingdom · South Korea</strong><p>Start with clear information. Decide at your own pace.</p></div></div></div></section></>;
}
