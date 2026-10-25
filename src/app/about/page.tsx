import {Breadcrumbs} from '@/components/ui/Breadcrumbs';
import {CallToActionBand} from '@/components/sections/CallToActionBand';
import {Eyebrow} from '@/components/ui/Eyebrow';
import {PageHero} from '@/components/sections/PageHero';
import {SectionHeading} from '@/components/sections/SectionHeading';
import {TextLink} from '@/components/ui/TextLink';
import {Icon} from '@/components/ui/Icon';
import {PhotoFigure} from '@/components/ui/PhotoFigure';
import {getPhoto} from '@/content/photos';
import {business,buildPageMetadata} from '@/lib/site-config';

export const metadata=buildPageMetadata('About BSB Global Victory Education Consultancy',`${business.legalName} has been helping students in Nepal plan international education since ${business.foundedLabel}.`,'/about');
const principles=[{number:'01',title:'Listen before advising',description:'Start with the student’s goals, background and priorities instead of a predetermined destination.'},{number:'02',title:'Make information understandable',description:'Explain costs, requirements and trade-offs clearly, including what remains uncertain.'},{number:'03',title:'Put integrity first',description:'Never promote fabricated evidence, guaranteed visa claims or misleading information.'},{number:'04',title:'Keep decisions personal',description:'Help students research options they can genuinely afford and academically pursue.'}];
const officePhotoIds=['office-reception-gathering','office-team-selfie','office-team-with-student'];
export default function AboutPage() {
 return <><div className="container breadcrumb-wrap"><Breadcrumbs items={[{label:'About us'}]}/></div><PageHero label={`Established ${business.foundedLabel}`} title="Education is personal. Guidance should be, too." description={`${business.legalName} helps students in Nepal plan international education with clear information, honest advice and a plan built around their own goals.`} numeral="2024"/>
   <section className="section"><div className="container about-intro"><div><Eyebrow>Our story</Eyebrow><h2 className="editorial-heading">A big decision deserves <em>clear thinking.</em></h2></div><div><p className="lead">BSB Global Victory Education Consultancy opened on {business.foundedLabel} with a straightforward aim: to give students guidance that is honest about costs, entry requirements and what no consultancy can promise.</p><p className="lead">Choosing where and what to study can shape years of your life. We believe students deserve direct answers, a realistic view of the full cost and the space to compare more than one option before deciding.</p><TextLink href="/contact">Start a conversation</TextLink></div></div></section>
   <section className="section section-tint"><div className="container"><div className="section-head"><div><Eyebrow>Our approach</Eyebrow><h2>What good guidance looks like.</h2></div></div><div className="principle-cards">{principles.map(principle=><article className="principle-card" key={principle.number}><span>{principle.number}</span><h3>{principle.title}</h3><p>{principle.description}</p><Icon name="arrow-up-right" size={22}/></article>)}</div></div></section>
   <section className="section"><div className="container about-evidence"><div><Eyebrow>Company profile</Eyebrow><h2>Who we are.</h2><p className="lead">We are a private limited education consultancy based in {business.location}, supporting students from their first questions through course selection, applications and preparing to leave.</p>
     <dl className="company-facts">
       <div><dt>Registered name</dt><dd>{business.legalName}</dd></div>
       <div><dt>Established</dt><dd><time dateTime={business.foundingDate}>{business.foundedLabel}</time></dd></div>
       <div><dt>Based in</dt><dd>{business.address || business.location}</dd></div>
       <div><dt>Email</dt><dd>{business.emails.map(contactEmail=><a key={contactEmail.address} href={`mailto:${contactEmail.address}`}>{contactEmail.address}</a>)}</dd></div>
       <div><dt>Telephone</dt><dd>{business.phones.map(contactPhone=><a key={contactPhone.tel} href={`tel:${contactPhone.tel}`}>{contactPhone.display}</a>)}</dd></div>
     </dl></div>
     <PhotoFigure photo={getPhoto('office-counselling-desk')} className="about-photo" sizes="(max-width:880px) 100vw, 45vw"/></div></section>
   <section className="section section-tint"><div className="container"><SectionHeading eyebrow="Inside our office" title="Where the conversation begins." description="Our team, our students and the everyday moments at Milanchowk, Butwal." href="/gallery" linkLabel="See all photos"/><div className="photo-strip">{officePhotoIds.map(photoId=><PhotoFigure key={photoId} photo={getPhoto(photoId)} sizes="(max-width:520px) 100vw, (max-width:880px) 50vw, 33vw"/>)}</div></div></section><CallToActionBand/></>;
}
