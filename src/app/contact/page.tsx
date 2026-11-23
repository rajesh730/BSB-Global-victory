import {Eyebrow} from '@/components/ui/Eyebrow';
import {PageHero} from '@/components/sections/PageHero';
import {EnquiryForm} from '@/components/forms/EnquiryForm';
import {Icon} from '@/components/ui/Icon';
import {PhotoFigure} from '@/components/ui/PhotoFigure';
import {getPhoto} from '@/content/photos';
import {buildPageMetadata} from '@/lib/site-config';
import {getBusinessProfile,getSitePage} from '@/server/site/repository';

export async function generateMetadata(){const page=await getSitePage('contact');return buildPageMetadata(page.metaTitle,page.metaDescription,'/contact');}
export default async function ContactPage(){
  const business=await getBusinessProfile();
  const directions=business.directionsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`;
  const whatsappDigits=business.whatsapp.replace(/\D/g,'');
  return <><PageHero pageKey="contact" label="Your questions are welcome" title="Contact BSB Global Victory in Butwal." description="Book a study abroad counselling session or ask about current language classes, fees and batch availability." numeral="01"/>
    <section className="section"><div className="container contact-layout"><div className="contact-aside"><Eyebrow>Book counselling</Eyebrow><h2>Start with the details that matter.</h2><p className="lead">Tell us about your qualifications, interests and study plans. You do not need to send private academic or financial documents in your initial enquiry.</p>
      <div className="contact-methods">
        <div><span className="contact-method-icon"><Icon name="mail" size={23}/></span><div><h3>Email</h3><ul className="contact-list">{business.emails.map(contactEmail=><li key={contactEmail.address}><small>{contactEmail.label}</small><a href={`mailto:${contactEmail.address}`}>{contactEmail.address}</a></li>)}</ul></div></div>
        <div><span className="contact-method-icon"><Icon name="phone" size={23}/></span><div><h3>Telephone</h3><ul className="contact-list">{business.phones.map(contactPhone=><li key={contactPhone.tel}><small>{contactPhone.label}</small><a href={`tel:${contactPhone.tel}`}>{contactPhone.display}</a></li>)}</ul></div></div>
        <div><span className="contact-method-icon"><Icon name="map" size={23}/></span><div><h3>Office</h3><p>{business.address || 'Nepal'}</p><p className="contact-note">{business.legalName}<br/>Established {business.foundedLabel}</p></div></div>
      </div>
      <PhotoFigure photo={getPhoto('office-reception-gathering')} className="contact-photo" sizes="(max-width:880px) 100vw, 40vw"/>
      <div className="contact-ethical-note"><Icon name="shield" size={26}/><p>Admission and visa decisions belong to the relevant institutions and authorities. We do not publish guarantees of an outcome.</p></div>
      {business.openingHours&&<p className="contact-note contact-hours"><strong>Office hours</strong><br/>{business.openingHours}</p>}
      {whatsappDigits&&<p><a className="text-link" href={`https://wa.me/${whatsappDigits}`} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a></p>}<a className="text-link" href={directions} target="_blank" rel="noopener noreferrer">Get directions to our Butwal office</a>
    </div><EnquiryForm enquiryEmail={business.enquiryEmail}/></div></section>
    <section className="section section-tint"><div className="container contact-followup"><span>PREPARE FOR YOUR CONVERSATION</span><h2>Three things worth thinking about.</h2><div><p><strong>01.</strong> Your current qualifications</p><p><strong>02.</strong> Your subject interests</p><p><strong>03.</strong> Your budget and timeline</p></div></div></section>
  </>;
}
