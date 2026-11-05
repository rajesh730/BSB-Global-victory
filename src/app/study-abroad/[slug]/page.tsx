import type {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {destinations,getDestination} from '@/content/destinations';
import {ButtonLink} from '@/components/ui/ButtonLink';
import {CallToActionBand} from '@/components/sections/CallToActionBand';
import {Eyebrow} from '@/components/ui/Eyebrow';
import {TextLink} from '@/components/ui/TextLink';
import {Icon} from '@/components/ui/Icon';
import {PhotoCredit} from '@/components/ui/PhotoCredit';
import {destinationPhotos} from '@/content/stock-photos';
import {buildPageMetadata} from '@/lib/site-config';

const highlightIcons=['book','compass','shield'] as const;
const destinationSeo={
  japan:{title:'Japan Study Consultancy in Butwal',description:'Planning to study in Japan from Nepal? Explore pathways, language requirements, costs and application support with BSB Global Victory in Butwal.',summaryTitle:'Study pathways in Japan',checklistTitle:'Japan study application checklist',supportTitle:'Japan study counselling in Butwal',supportText:'Discuss your preferred pathway, qualifications, language preparation and budget with our Butwal team. We can help you identify the questions to ask before choosing an institution.',testHref:'/test-preparation',testLabel:'Explore Japanese language test preparation'},
  'united-kingdom':{title:'UK Study Consultancy in Butwal',description:'Explore studying in the UK from Nepal with BSB Global Victory in Butwal. Get guidance on courses, entry requirements, budgets and university applications.',summaryTitle:'UK study options for Nepali students',checklistTitle:'UK university application checklist',supportTitle:'UK study counselling in Butwal',supportText:'Bring your academic information, preferred course and budget to a counselling session. We can help you identify the course, admissions and English-language information to verify.',testHref:'/test-preparation',testLabel:'Explore IELTS and PTE preparation'},
  'south-korea':{title:'South Korea Study Consultancy in Butwal',description:'Explore Korean-language programmes and university study in South Korea. Get guidance on requirements, costs and applications from BSB Global Victory in Butwal.',summaryTitle:'Korean language programmes and university degrees',checklistTitle:'South Korea study application checklist',supportTitle:'South Korea study counselling in Butwal',supportText:'Discuss Korean-language and university study options with our Butwal team. We can help you identify the application requirements and questions for your chosen institution.',testHref:'/test-preparation',testLabel:'Explore language test preparation'}
} as const;
// Only the slugs from generateStaticParams exist; anything else is a real 404.
export const dynamicParams=false;
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return destinations.map(destination=>({slug:destination.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const destination=getDestination(slug);if(!destination)return {};const photo=destinationPhotos[slug];const seo=destinationSeo[destination.slug as keyof typeof destinationSeo];return buildPageMetadata(seo.title,seo.description,`/study-abroad/${slug}`,{image:photo&&{url:photo.src,width:photo.width,height:photo.height,alt:photo.alt}});}
export default async function DestinationPage({params}:Props) {
  const {slug}=await params;
  const destination=getDestination(slug);
  if(!destination)notFound();
  const seo=destinationSeo[destination.slug as keyof typeof destinationSeo];
  const heroPhoto=destinationPhotos[destination.slug];
  const otherDestinations=destinations.filter(candidate=>candidate.slug!==slug).slice(0,3);
  return <>
    <section className="country-hero"><div className="container country-hero-grid"><div className="country-hero-copy"><Eyebrow>{destination.seriesLabel}</Eyebrow><h1>{destination.heading}</h1><p className="lead">{destination.intro}</p><div className="country-hero-actions"><ButtonLink href="/contact">Discuss your options</ButtonLink><TextLink href="/study-abroad">All destinations</TextLink></div></div><div><div className={`country-hero-image${heroPhoto?' has-photo':''}`}><span className="country-image-label">BSB GLOBAL / DESTINATION DOSSIER</span>{heroPhoto?<Image src={heroPhoto.src} alt={heroPhoto.alt} fill sizes="(max-width:880px) 100vw, 55vw" priority/>:destination.illustration&&<Image src={destination.illustration} alt={`Illustration representing ${destination.name}`} width={700} height={410} priority/>}<div className="country-image-foot"><span>{destination.name.toUpperCase()}</span><span>{destination.keyTopics}</span></div></div>{heroPhoto&&<PhotoCredit photo={heroPhoto}/>}</div></div></section>
    <section className="country-summary"><div className="container country-summary-grid"><div><span>PLAN YOUR JOURNEY / 01</span><h2>{seo.summaryTitle}.</h2></div><p>Every programme and institution has its own criteria. Use this guidance to structure your research, then verify course requirements, published fees and application conditions directly with the provider.</p></div></section>
    <section className="section"><div className="container"><div className="section-head"><div><Eyebrow>The important considerations</Eyebrow><h2>What to think through first.</h2></div></div><div className="detail-grid">{destination.highlights.map((highlight,position)=><article className="detail-card" key={highlight.title}><span className="detail-num">{String(position+1).padStart(2,'0')}</span><Icon name={highlightIcons[position % highlightIcons.length]} size={28}/><h3>{highlight.title}</h3><p>{highlight.description}</p></article>)}</div></div></section>
    <section className="section section-tint"><div className="container country-checklist-layout"><div><Eyebrow>Make it manageable</Eyebrow><h2>{seo.checklistTitle}.</h2><p className="lead">There is no universal application. Build your list around the programme and your circumstances.</p><TextLink href="/resources/application-document-checklist">Read the application document guide</TextLink></div><ol className="checklist-list">{destination.checklist.map((checklistItem,position)=><li key={checklistItem}><span>{String(position+1).padStart(2,'0')}</span>{checklistItem}<Icon name="check" size={17}/></li>)}</ol></div></section>
    <section className="section"><div className="container source-layout"><div><Eyebrow>Verify the rules</Eyebrow><h2>Use the official source.</h2><p className="lead">Visa policies change. For the latest rules, go directly to the responsible authority.</p></div><div className="source-panel"><div className="source-icon"><Icon name="external" size={26}/></div>{destination.officialSources.map(officialSource=><a key={officialSource.url} href={officialSource.url} target="_blank" rel="noopener noreferrer" className="official-link">{officialSource.label}<Icon name="external" size={16}/></a>)}<p>External government guidance. Check the publication date and personal eligibility before acting.</p></div></div></section>
    <section className="section section-cream"><div className="container question-panel"><div><Eyebrow>A question worth asking</Eyebrow><h2>{destination.featuredQuestion.title}</h2></div><p>{destination.featuredQuestion.answer}</p></div></section>
    <section className="section"><div className="container question-panel"><div><Eyebrow>Local support</Eyebrow><h2>{seo.supportTitle}.</h2></div><div><p className="lead">{seo.supportText}</p><TextLink href={seo.testHref}>{seo.testLabel}</TextLink><br/><TextLink href="/contact">Discuss your {destination.name} study plans</TextLink></div></div></section>
    <section className="section"><div className="container"><div className="section-head"><div><Eyebrow>Keep exploring</Eyebrow><h2>Other destinations to consider.</h2></div><TextLink href="/study-abroad">Compare all countries</TextLink></div><div className="other-destination-grid">{otherDestinations.map(otherDestination=><Link key={otherDestination.slug} className="other-destination" href={`/study-abroad/${otherDestination.slug}`}><span>{otherDestination.name}</span><small>View guide</small></Link>)}</div></div></section><CallToActionBand title="An informed decision begins with a conversation." text="Bring your questions. Explore your options without rushing the decision."/>
  </>;
}
