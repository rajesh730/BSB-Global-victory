import {Breadcrumbs} from '@/components/ui/Breadcrumbs';
import {CallToActionBand} from '@/components/sections/CallToActionBand';
import {Eyebrow} from '@/components/ui/Eyebrow';
import {PageHero} from '@/components/sections/PageHero';
import {TextLink} from '@/components/ui/TextLink';
import {Icon} from '@/components/ui/Icon';
import {services} from '@/content/services';
import {buildPageMetadata} from '@/lib/site-config';

export const metadata=buildPageMetadata('Education Consultancy Services','Explore study counselling, university selection, application support, budgeting and pre-departure planning.','/services');
export default function ServicesPage() {
 return <><div className="container breadcrumb-wrap"><Breadcrumbs items={[{label:'Our services'}]}/></div><PageHero label="What we help you plan" title="Practical support. Step by step." description="The best next step depends on where you are in your journey. Our service framework is designed to make each decision more manageable." numeral="01—06"/>
   <section className="section"><div className="container"><div className="section-head"><div><Eyebrow>From the first question onward</Eyebrow><h2>How guidance takes shape.</h2><p className="section-description">Support for students heading to Japan, the United Kingdom and South Korea, from the first conversation to departure.</p></div></div><div className="services-list">{services.map(service=><article className="service-row" key={service.number}><div className="service-row-top"><span className="service-row-num">{service.number} / {String(services.length).padStart(2,'0')}</span><span className="service-row-icon"><Icon name={service.icon} size={26}/></span></div><div><h3>{service.title}</h3><p>{service.summary}</p></div><ul>{service.benefits.map(benefit=><li key={benefit}><Icon name="check" size={17}/>{benefit}</li>)}</ul></article>)}</div></div></section>
   <section className="section section-tint"><div className="container service-promise"><div><Eyebrow>Transparency first</Eyebrow><h2>Know what you are signing up for.</h2><p className="lead">A clear scope, the applicable service charges and written terms matter as much as the advice itself. Ask for verified details before making a commitment.</p><TextLink href="/terms">Read the website terms</TextLink></div><div className="promise-card"><span>THE BSB GLOBAL STANDARD / 01</span><h3>Clear explanations.<br/>Clear next steps.</h3><p>No fabricated documents. No guaranteed visa claims. No unnecessary pressure.</p><Icon name="shield" size={45}/></div></div></section><CallToActionBand/></>;
}
