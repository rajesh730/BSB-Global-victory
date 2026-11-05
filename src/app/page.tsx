import {HomeHero} from '@/components/sections/HomeHero';
import {DestinationCard} from '@/components/ui/DestinationCard';
import {ArticleCard} from '@/components/ui/ArticleCard';
import {ButtonLink} from '@/components/ui/ButtonLink';
import {CallToActionBand} from '@/components/sections/CallToActionBand';
import {Eyebrow} from '@/components/ui/Eyebrow';
import {SectionHeading} from '@/components/sections/SectionHeading';
import {TextLink} from '@/components/ui/TextLink';
import {Icon} from '@/components/ui/Icon';
import {destinations} from '@/content/destinations';
import {articles} from '@/content/articles';
import {services} from '@/content/services';
import {getPhoto} from '@/content/photos';
import {FeaturedGalleryCarousel} from '@/components/sections/FeaturedGalleryCarousel';
import {buildPageMetadata,isSiteVerified} from '@/lib/site-config';
import {JsonLd} from '@/components/seo/JsonLd';

export const metadata=buildPageMetadata('Study Abroad Consultancy in Butwal','Explore study options in Japan, the UK and South Korea with BSB Global Victory in Butwal. Get course guidance, application support and test preparation.');
const processSteps=[{number:'01',title:'Tell us your goals',description:'Your background, interests and ambitions come first.'},{number:'02',title:'Compare your options',description:'Look at programmes, requirements, fees and fit.'},{number:'03',title:'Make a clear plan',description:'Create an organised checklist with realistic timelines.'},{number:'04',title:'Prepare for what follows',description:'Think beyond the application to what comes next.'}];
const lifeAtBsbPhotoIds=['office-team-celebration','office-counselling-desk','classes-classroom-session','departures-airport-students','departures-passport-handover'];
const faqItems=[
  {question:'Where is BSB Global Victory located?',answer:'Our office is in Milanchowk, Butwal-9, Rupandehi, Nepal. Contact us for directions and current counselling hours.'},
  {question:'Which countries does BSB Global Victory provide study abroad guidance for?',answer:'We provide study abroad guidance for Japan, the United Kingdom and South Korea. We help students compare options by qualifications, interests, language requirements and budget.'},
  {question:'What study abroad services does BSB Global Victory offer in Butwal?',answer:'We provide individual counselling, course and university shortlisting, application preparation, scholarship research, budget planning and pre-departure guidance. We also help students find official visa information.'},
  {question:'Can BSB Global Victory guarantee a university admission or student visa?',answer:'No. Universities and relevant authorities make their own decisions. No consultancy can guarantee an admission or visa outcome.'},
  {question:'How can I book study abroad counselling in Butwal?',answer:'Use the Contact page, call 071-591589, or email info@bsbglobalvictory.com. Bring your qualifications, preferred destination and study interests to help us prepare for the conversation.'}
];
export default function HomePage() {
  return <>
    {isSiteVerified&&<JsonLd data={{'@type':'FAQPage',mainEntity:faqItems.map(item=>({'@type':'Question',name:item.question,acceptedAnswer:{'@type':'Answer',text:item.answer}}))}}/>}
    <HomeHero/>
    <section className="principles-strip"><div className="container principles-grid"><div className="principles-intro">Not just where to study.<br/><strong>Why it makes sense.</strong></div><p><span>01 /</span> Practical information, not promises</p><p><span>02 /</span> A plan built around your goals</p></div></section>
    <section className="section" id="destinations"><div className="container"><SectionHeading eyebrow="Study destinations" title="Explore study options in Japan, the UK and South Korea." description="Compare course pathways, language requirements, costs and application conditions before deciding." href="/study-abroad" linkLabel="Compare destinations"/><div className="destination-grid">{destinations.map((destination,position)=><DestinationCard key={destination.slug} destination={destination} index={position} total={destinations.length}/>)}</div></div></section>
    <section className="section section-tint"><div className="container two-column-process"><div><Eyebrow>Better questions. Better decisions.</Eyebrow><h2 className="editorial-heading">Good guidance doesn’t begin with a brochure. <em>It begins with listening.</em></h2><p className="lead">International education is a big decision. A clear process helps you take it one step at a time.</p><TextLink href="/services">How we work</TextLink></div><ol className="step-list">{processSteps.map(step=><li key={step.number}><span className="step-number">{step.number}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol></div></section>
    <section className="section"><div className="container"><SectionHeading eyebrow="Our services" title="Study abroad counselling and application support." description="Understand the support you need, the questions to ask and the steps you remain responsible for." href="/services" linkLabel="Explore all services"/><div className="service-preview-grid">{services.slice(0,3).map(service=><div key={service.number} className="service-preview"><span className="service-index">{service.number} / {service.shortLabel}</span><div className="service-preview-icon"><Icon name={service.icon} size={27}/></div><h3>{service.title}</h3><p>{service.summary}</p><TextLink href="/services">Learn more</TextLink></div>)}</div></div></section>
    <section className="section section-tint"><div className="container resource-editorial"><div><Eyebrow>Test preparation</Eyebrow><h2>Language classes and test preparation in Butwal.</h2></div><div><p className="lead">Ask about current IELTS, PTE Academic, JLPT, NAT-TEST and TOPIK classes, batch timings and fees. Your course—not a generic score target—should determine the test you prepare for.</p><TextLink href="/test-preparation">Explore test preparation</TextLink></div></div></section>
    <section className="section section-tint"><div className="container"><SectionHeading eyebrow="Life at BSB Global" title="Real people. Real journeys." description="From the first conversation at our Butwal office to the day students set off from the airport." href="/gallery" linkLabel="View the full gallery"/><FeaturedGalleryCarousel photos={lifeAtBsbPhotoIds.map(getPhoto)}/></div></section>
    <section className="section-short"><div className="container"><div className="feature-banner"><div><Eyebrow light>A thoughtful first step</Eyebrow><h2>Don’t rush the destination.<br/><span>Get the direction right.</span></h2><p>Course fit. Realistic budgets. Current requirements. The questions you ask today can change what is possible tomorrow.</p><ButtonLink href="/resources" variant="light">Read our student guides</ButtonLink></div></div></div></section>
    <section className="section"><div className="container"><SectionHeading eyebrow="Notes for the journey" title="Useful reading before you apply." href="/resources" linkLabel="View all resources"/><div className="article-grid">{articles.slice(0,3).map((article,position)=><ArticleCard key={article.slug} article={article} index={position}/>)}</div></div></section>
    <section className="section section-cream"><div className="container faq-layout"><div><Eyebrow>Good questions to ask</Eyebrow><h2>Study abroad counselling in Butwal.</h2><p className="lead">Clear answers help you make informed decisions.</p></div><div className="faq-stack">{faqItems.map(item=><details key={item.question}><summary>{item.question}<Icon name="chevron-down" size={20}/></summary><p>{item.answer}</p></details>)}</div></div></section>
    <CallToActionBand/>
  </>;
}
