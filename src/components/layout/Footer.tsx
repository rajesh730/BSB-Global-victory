import Image from 'next/image';
import Link from 'next/link';
import {destinations} from '@/content/destinations';
import {business} from '@/lib/site-config';
import {Icon} from '@/components/ui/Icon';

export function Footer() {
  return <footer className="site-footer"><div className="container">
    <div className="footer-main">
      <div className="footer-brand-col"><Link href="/" className="brand footer-brand"><Image src="/brand/bsb-global-logo.webp" alt="" width={57} height={57}/><span className="brand-type"><strong>BSB GLOBAL</strong><small>{business.descriptor}</small></span></Link><p>Helping students approach international education with clearer information, thoughtful questions and a plan that fits their goals.</p><div className="footer-mark">NEPAL <span>↗</span> THE WORLD</div></div>
      <div><h2>Explore</h2><ul><li><Link href="/study-abroad">Study destinations</Link></li><li><Link href="/services">Our services</Link></li><li><Link href="/test-preparation">Test preparation</Link></li><li><Link href="/about">About BSB Global</Link></li><li><Link href="/resources">Resources</Link></li><li><Link href="/gallery">Gallery</Link></li></ul></div>
      <div><h2>Destinations</h2><ul>{destinations.map(destination=><li key={destination.slug}><Link href={`/study-abroad/${destination.slug}`}>{destination.name}</Link></li>)}</ul></div>
      <div><h2>Start a conversation</h2><p className="footer-contact-intro">Not sure where to begin? Start with your questions.</p>{business.emails.map(contactEmail=><a key={contactEmail.address} className="footer-contact" href={`mailto:${contactEmail.address}`}><Icon name="mail" size={16}/>{contactEmail.address}</a>)}{business.phones.map(contactPhone=><a key={contactPhone.tel} className="footer-contact" href={`tel:${contactPhone.tel}`}><Icon name="phone" size={16}/>{contactPhone.display}</a>)}<p className="footer-contact"><Icon name="map" size={16}/>{business.address}</p><Link href="/contact" className="button button-light footer-button">Request counselling <Icon name="arrow-up-right" size={17}/></Link></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {business.legalName} Established {business.foundedLabel}.</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms of use</Link><Link href="/image-credits">Image credits</Link><Link href="/contact">Contact</Link></div><span>Admissions and visas are decided by the relevant institutions and authorities.</span></div>
  </div></footer>;
}
