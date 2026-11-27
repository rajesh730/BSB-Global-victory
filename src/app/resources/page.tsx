import {CallToActionBand} from '@/components/sections/CallToActionBand';
import {Eyebrow} from '@/components/ui/Eyebrow';
import {PageHero} from '@/components/sections/PageHero';
import {SectionHeading} from '@/components/sections/SectionHeading';
import {ArticleCard} from '@/components/ui/ArticleCard';
import {buildPageMetadata} from '@/lib/site-config';
import {getSitePage} from '@/server/site/repository';
import {listResourceArticles} from '@/server/blog/articles';

export async function generateMetadata(){const page=await getSitePage('resources');return buildPageMetadata(page.metaTitle,page.metaDescription,'/resources');}
export default async function ResourcesPage() {
 const resourceArticles=await listResourceArticles();
 return <><PageHero pageKey="resources" label="Read first. Plan better." title="Study abroad guides for Nepali students" description="Simple, practical guides for the decisions you will make before applying. No hype, shortcuts or vague promises." numeral={String(resourceArticles.length).padStart(2,'0')}/>
   <section className="section"><div className="container"><SectionHeading eyebrow="The reading room" title="Explore the student guides" description="These articles are general starting points. Requirements should always be confirmed with official sources."/><div className="article-grid resource-grid">{resourceArticles.map((article,position)=><ArticleCard key={article.slug} article={article} index={position}/>)}</div></div></section>
   <section className="section section-tint"><div className="container resource-editorial"><div><Eyebrow>Before you take advice</Eyebrow><h2>Information can be useful. Verification is essential</h2></div><p className="lead">Guides help you ask informed questions, but university criteria and immigration policy can change. Check current official sources before applying or spending money.</p></div></section><CallToActionBand/></>;
}
