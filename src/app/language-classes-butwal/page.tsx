import {CallToActionBand} from '@/components/sections/CallToActionBand';
import {PageHero} from '@/components/sections/PageHero';
import {Eyebrow} from '@/components/ui/Eyebrow';
import {Icon} from '@/components/ui/Icon';
import {TextLink} from '@/components/ui/TextLink';
import {buildPageMetadata} from '@/lib/site-config';
import {getSitePage} from '@/server/site/repository';

export async function generateMetadata(){const page=await getSitePage('language-classes-butwal');return buildPageMetadata(page.metaTitle,page.metaDescription,'/language-classes-butwal');}

const classAreas=[
  {label:'English',title:'IELTS preparation',description:'Build preparation around the exact IELTS version and score profile accepted by your intended course. Confirm those requirements with the institution before enrolling.'},
  {label:'English',title:'PTE Academic preparation',description:'Check that PTE Academic is accepted for your programme and that you understand the required overall and communicative-skills scores.'},
  {label:'Japanese',title:'Japanese language and test preparation',description:'Explore language development and preparation for JLPT or NAT-TEST only after checking the level your school or programme recognises.'},
  {label:'Korean',title:'Korean language and TOPIK preparation',description:'Consider TOPIK preparation when your Korean-taught programme requests it. English-taught programmes may use different language evidence.'}
];

export default function LanguageClassesButwalPage(){
 return <><PageHero pageKey="language-classes-butwal" label="Butwal language classes" title="Language classes and test preparation in Butwal" description="Ask about current IELTS, PTE, Japanese and Korean language classes after confirming the test your chosen programme actually accepts." numeral="LANG"/>
  <section className="section"><div className="container"><div className="section-head"><div><Eyebrow>Choose with purpose</Eyebrow><h2>Preparation should match your study plan</h2><p className="section-description">Class availability, batch timings and fees can change. Contact our Butwal office for current details before making plans.</p></div></div><div className="test-grid">{classAreas.map((area,index)=><article className="test-card" key={area.title}><span>{area.label}</span><div className="test-visual">{String(index+1).padStart(2,'0')}<small>Language learning</small></div><h3>{area.title}</h3><p>{area.description}</p></article>)}</div></div></section>
  <section className="section section-tint"><div className="container prep-steps-grid"><div><Eyebrow>Before you join</Eyebrow><h2>Four checks before choosing a class</h2><p className="lead">The right course depends on your programme, current level and deadline. A test name alone is not enough.</p><TextLink href="/contact">Ask about current classes</TextLink></div><ol className="prep-steps"><li><span>01</span><div><h3>Confirm the accepted test</h3><p>Use your intended institution&apos;s current requirements.</p></div></li><li><span>02</span><div><h3>Check the score or level</h3><p>Look for the exact overall, section or proficiency requirement.</p></div></li><li><span>03</span><div><h3>Allow enough preparation time</h3><p>Account for learning, practice, test dates and result delivery.</p></div></li><li><span>04</span><div><h3>Confirm current class details</h3><p>Ask the Butwal office about batches, fees and availability.</p></div></li></ol></div></section>
  <section className="section"><div className="container service-promise"><div><Eyebrow>Link learning to your destination</Eyebrow><h2>Use the country guides to ask better questions</h2><p className="lead">Japan, the United Kingdom and South Korea each have different institutional pathways. Review your destination guide before deciding what language evidence you need.</p><TextLink href="/study-abroad">Compare study destinations</TextLink></div><div className="promise-card"><span>Ask before you enrol</span><h3>Current batches.<br/>Current requirements.</h3><p>We do not assume a generic score or language level is right for every applicant.</p><Icon name="shield" size={45}/></div></div></section><CallToActionBand title="Find the preparation that fits" text="Contact BSB Global Victory in Butwal to ask about current language-class availability and your next study step."/>
 </>;
}
