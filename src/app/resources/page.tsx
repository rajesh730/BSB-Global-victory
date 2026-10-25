import {Breadcrumbs} from '@/components/ui/Breadcrumbs';
import {CallToActionBand} from '@/components/sections/CallToActionBand';
import {Eyebrow} from '@/components/ui/Eyebrow';
import {PageHero} from '@/components/sections/PageHero';
import {SectionHeading} from '@/components/sections/SectionHeading';
import {ArticleCard} from '@/components/ui/ArticleCard';
import {articles} from '@/content/articles';
import {buildPageMetadata} from '@/lib/site-config';

export const metadata=buildPageMetadata('Student Guides and Resources','Practical guides on selecting courses, budgeting, application documents and checking student visa information.','/resources');
export default function ResourcesPage() {
 return <><div className="container breadcrumb-wrap"><Breadcrumbs items={[{label:'Resources'}]}/></div><PageHero label="Read first. Plan better." title="Useful notes for a bigger journey." description="Simple, practical guides for the decisions you will make before applying. No hype, shortcuts or vague promises." numeral="04"/>
   <section className="section"><div className="container"><SectionHeading eyebrow="The reading room" title="Explore the student guides." description="These articles are general starting points. Requirements should always be confirmed with official sources."/><div className="article-grid resource-grid">{articles.map((article,position)=><ArticleCard key={article.slug} article={article} index={position}/>)}</div></div></section>
   <section className="section section-tint"><div className="container resource-editorial"><div><Eyebrow>Before you take advice</Eyebrow><h2>Information can be useful. Verification is essential.</h2></div><p className="lead">Guides help you ask informed questions, but university criteria and immigration policy can change. Check current official sources before applying or spending money.</p></div></section><CallToActionBand/></>;
}
