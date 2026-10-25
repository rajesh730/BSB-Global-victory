import {Breadcrumbs} from '@/components/ui/Breadcrumbs';
import {Eyebrow} from '@/components/ui/Eyebrow';
import {business,buildPageMetadata} from '@/lib/site-config';

export const metadata=buildPageMetadata('Terms of Use','Important terms for BSB Global’s education information website.','/terms');
const termsSections=[
 {heading:'General educational information',body:'Content on this website is for general informational purposes and is not a binding offer, contract, legal or immigration opinion.'},
 {heading:'Decisions and outcomes',body:'Universities, institutions and public authorities make their own decisions. No admission, scholarship or student visa outcome is guaranteed.'},
 {heading:'Official sources',body:'Programme fees, eligibility, visas and deadlines may change. Verify current information with the relevant institution or authority before applying.'},
 {heading:'Service scope and fees',body:'The scope of any paid service, its fees and any refund conditions are explained and agreed in writing before you commit.'},
 {heading:'External links',body:'Third-party websites have separate terms and privacy practices. BSB Global does not control external content.'},
 {heading:'Accuracy and updates',body:'We aim to keep guidance useful, but information may become outdated. Important changes should be reviewed by a qualified person.'},
 {heading:'Contact and governing details',body:`This website is operated by ${business.legalName}, established on ${business.foundedLabel} in ${business.location}. Contact us at ${business.email} or ${business.phone.display}.`}
];
export default function TermsPage(){return <><div className="container breadcrumb-wrap"><Breadcrumbs items={[{label:'Terms of use'}]}/></div><section className="legal-cover"><div className="container"><Eyebrow>Important information</Eyebrow><h1>Terms of use.</h1><p className="lead">Please read these terms before using the information on this website.</p></div></section><div className="container legal-page"><div className="legal-content">{termsSections.map(termsSection=><section key={termsSection.heading}><h2>{termsSection.heading}</h2><p>{termsSection.body}</p></section>)}</div><aside className="legal-aside"><span>IMPORTANT</span><h3>No guaranteed outcomes.</h3><p>Education and immigration decisions are made by independent institutions and authorities.</p></aside></div></>}
