import {Breadcrumbs} from '@/components/ui/Breadcrumbs';
import {CallToActionBand} from '@/components/sections/CallToActionBand';
import {Eyebrow} from '@/components/ui/Eyebrow';
import {PageHero} from '@/components/sections/PageHero';
import {SectionHeading} from '@/components/sections/SectionHeading';
import {TextLink} from '@/components/ui/TextLink';
import {DestinationCard} from '@/components/ui/DestinationCard';
import {destinations} from '@/content/destinations';
import {buildPageMetadata} from '@/lib/site-config';

export const metadata=buildPageMetadata('Study in Japan, the UK and South Korea','Compare studying in Japan, the United Kingdom and South Korea from Nepal: language requirements, programmes, costs and official visa information.','/study-abroad');
export default function StudyAbroadPage() {
  return <><div className="container breadcrumb-wrap"><Breadcrumbs items={[{label:'Study abroad'}]}/></div><PageHero label="Your options, considered" title="Three destinations. One clear plan." description="We focus on Japan, the United Kingdom and South Korea, so our guidance goes deep instead of wide. Start by exploring the differences." numeral={String(destinations.length).padStart(2,'0')}/>
    <section className="section"><div className="container"><SectionHeading eyebrow="Country guides" title="Find the right fit for your future." description="Use these guides as a starting point, then verify programme details and immigration rules with official sources."/><div className="destination-grid">{destinations.map((destination,position)=><DestinationCard key={destination.slug} destination={destination} index={position} total={destinations.length}/>)}</div></div></section>
    <section className="section section-tint"><div className="container compare-layout"><div><Eyebrow>Before you choose</Eyebrow><h2 className="editorial-heading">Look beyond the flag.</h2><p className="lead">The country is important, but so are the course content, requirements, costs and the responsibilities that come with living abroad.</p><TextLink href="/resources/how-to-choose-a-course">Read the course selection guide</TextLink></div><div className="compare-points"><div><span>01</span><h3>Does the course fit?</h3><p>Examine the programme and your current academic background.</p></div><div><span>02</span><h3>Can you fund the full journey?</h3><p>Consider tuition, housing, everyday costs and unexpected expenses.</p></div><div><span>03</span><h3>What do the official rules say?</h3><p>Check the latest institutional and immigration requirements.</p></div></div></div></section><CallToActionBand/></>;
}
