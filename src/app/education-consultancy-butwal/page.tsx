import {CallToActionBand} from '@/components/sections/CallToActionBand';
import {PageHero} from '@/components/sections/PageHero';
import {Eyebrow} from '@/components/ui/Eyebrow';
import {Icon} from '@/components/ui/Icon';
import {TextLink} from '@/components/ui/TextLink';
import {JsonLd} from '@/components/seo/JsonLd';
import {buildPageMetadata,business,isSiteVerified} from '@/lib/site-config';
import {getSitePage} from '@/server/site/repository';

export async function generateMetadata(){const page=await getSitePage('education-consultancy-butwal');return buildPageMetadata(page.metaTitle,page.metaDescription,'/education-consultancy-butwal');}

const sessionSteps=[
  {title:'Start with your current profile',description:'Bring the qualifications, subjects, test results and study history that help explain where you are starting from.'},
  {title:'Compare realistic options',description:'Consider course content, entry criteria, teaching language, total budget and application timelines before choosing a destination.'},
  {title:'Leave with clear next questions',description:'Use the session to build a shortlist and a practical checklist. Final requirements must be confirmed with each institution and authority.'}
];

const faqItems=[
  {question:'Where is BSB Global Victory located in Butwal?',answer:`Our office is at ${business.address}. Call or email before visiting to confirm counselling availability.`},
  {question:'What can I discuss in a study abroad counselling session?',answer:'You can discuss your qualifications, preferred subject, destination ideas, language preparation, budget and application timeline. This helps us identify the information you need to verify.'},
  {question:'Which study destinations does BSB Global Victory support?',answer:'BSB Global Victory currently provides guidance for study options in Japan, the United Kingdom and South Korea. Each pathway has its own institutional and immigration requirements.'},
  {question:'Can an education consultancy guarantee a visa or admission?',answer:'No. Admissions decisions are made by institutions and visa decisions are made by the relevant authorities. Be cautious of anyone who promises an outcome.'}
];

export default function EducationConsultancyButwalPage(){
  return <>
    {isSiteVerified&&<JsonLd data={{'@type':'FAQPage',mainEntity:faqItems.map(item=>({'@type':'Question',name:item.question,acceptedAnswer:{'@type':'Answer',text:item.answer}}))}}/>}
    <PageHero pageKey="education-consultancy-butwal" label="Milanchowk, Butwal" title="Education consultancy and study abroad counselling in Butwal" description="Visit BSB Global Victory to discuss international study plans, compare realistic options and prepare for the next step with clearer information." numeral="Butwal"/>
    <section className="section"><div className="container"><div className="section-head"><div><Eyebrow>What a first conversation covers</Eyebrow><h2>Bring your questions. Leave with a clearer plan</h2><p className="section-description">A useful counselling session is about fit and preparation, not pressure. We focus on the details that affect your decision.</p></div></div><div className="detail-grid">{sessionSteps.map((step,index)=><article className="detail-card" key={step.title}><span className="detail-num">{String(index+1).padStart(2,'0')}</span><Icon name={index===0?'book':index===1?'compass':'file'} size={28}/><h3>{step.title}</h3><p>{step.description}</p></article>)}</div></div></section>
    <section className="section section-tint"><div className="container country-checklist-layout"><div><Eyebrow>Before you visit</Eyebrow><h2>What to prepare for counselling</h2><p className="lead">You do not need to bring sensitive financial documents for an initial conversation. Start with the information that helps us understand your plans.</p><TextLink href="/contact">Book study abroad counselling</TextLink></div><ol className="checklist-list"><li><span>01</span>Your most recent qualification and subjects<Icon name="check" size={17}/></li><li><span>02</span>Course or subject interests<Icon name="check" size={17}/></li><li><span>03</span>Destination ideas and preferred intake<Icon name="check" size={17}/></li><li><span>04</span>Any language-test results or preparation plans<Icon name="check" size={17}/></li><li><span>05</span>A realistic budget discussion with your family<Icon name="check" size={17}/></li></ol></div></section>
    <section className="section"><div className="container service-promise"><div><Eyebrow>Explore the right support</Eyebrow><h2>Guidance for the work around your application</h2><p className="lead">Our services cover course and university shortlisting, application preparation, budget planning, official-source research and pre-departure preparation. Ask for a written explanation of the support and charges before committing.</p><TextLink href="/services">Explore study abroad services</TextLink></div><div className="promise-card"><span>Local office, Butwal</span><h3>Milanchowk,<br/>Butwal-9.</h3><p>{business.address}. Contact the office to confirm counselling availability and current language-class information.</p><Icon name="map" size={45}/></div></div></section>
    <section className="section section-cream"><div className="container faq-layout"><div><Eyebrow>Local questions</Eyebrow><h2>Education consultancy in Butwal</h2><p className="lead">The answer should always help you make an informed decision.</p></div><div className="faq-stack">{faqItems.map(item=><details key={item.question}><summary>{item.question}<Icon name="chevron-down" size={20}/></summary><p>{item.answer}</p></details>)}</div></div></section>
    <CallToActionBand title="Start with a useful conversation" text="Tell us what you want to study and where you are starting from. We will help you identify the right questions to ask next."/>
  </>;
}
