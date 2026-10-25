import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {articles,getArticle} from '@/content/articles';
import {Breadcrumbs} from '@/components/ui/Breadcrumbs';
import {CallToActionBand} from '@/components/sections/CallToActionBand';
import {Eyebrow} from '@/components/ui/Eyebrow';
import {TextLink} from '@/components/ui/TextLink';
import {Icon} from '@/components/ui/Icon';
import Image from 'next/image';
import {PhotoCredit} from '@/components/ui/PhotoCredit';
import {JsonLd} from '@/components/seo/JsonLd';
import {guidePhotos} from '@/content/stock-photos';
import {absoluteUrl,business,buildPageMetadata} from '@/lib/site-config';

// Only the slugs from generateStaticParams exist; anything else is a real 404.
export const dynamicParams=false;
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return articles.map(article=>({slug:article.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const article=getArticle(slug);if(!article)return {};const cover=guidePhotos[slug];return buildPageMetadata(article.title,article.description,`/resources/${slug}`,{type:'article',image:cover&&{url:cover.src,width:cover.width,height:cover.height,alt:cover.alt}});}
export default async function ResourceArticlePage({params}:Props) {
 const {slug}=await params;const article=getArticle(slug);if(!article)notFound();
 const cover=guidePhotos[article.slug];
 const relatedArticles=articles.filter(candidate=>candidate.slug!==slug).slice(0,2);
 return <><JsonLd data={{'@type':'Article',headline:article.title,description:article.description,inLanguage:'en',...(cover?{image:absoluteUrl(cover.src)}:{}),mainEntityOfPage:absoluteUrl(`/resources/${article.slug}`),author:{'@type':'Organization',name:business.legalName},publisher:{'@type':'Organization',name:business.legalName,logo:{'@type':'ImageObject',url:absoluteUrl('/brand/bsb-global-logo.webp')}}}}/><div className="container breadcrumb-wrap"><Breadcrumbs items={[{label:'Resources',href:'/resources'},{label:article.title}]}/></div>
   <header className="article-hero"><div className="container article-hero-inner"><div><Eyebrow>{article.category} / BSB Global reading room</Eyebrow><h1>{article.title}</h1><p className="lead">{article.description}</p><div className="read-time"><Icon name="clock" size={16}/>{article.readingMinutes} min read <span>•</span> General educational guidance</div></div>{cover?<figure className="article-cover-photo"><div className="article-cover-frame"><Image src={cover.src} alt={cover.alt} fill sizes="(max-width:880px) 100vw, 40vw" priority/></div><PhotoCredit photo={cover}/></figure>:<div className="article-cover-art" aria-hidden="true"><span>THE STUDENT NOTEBOOK</span><strong>Ideas<br/>into<br/><i>action.</i></strong><small>BSB GLOBAL / FIELD NOTES</small></div>}</div></header>
   <div className="container article-layout"><aside className="article-sidebar"><span>IN THIS GUIDE</span><nav aria-label="On this page">{article.sections.map((section,position)=><a key={section.heading} href={`#section-${position+1}`}>{String(position+1).padStart(2,'0')} &nbsp; {section.heading}</a>)}</nav><Link href="/resources" className="sidebar-back">← All resources</Link></aside><article className="article-content"><p className="article-lead">{article.intro}</p>{article.sections.map((section,position)=><section key={section.heading} id={`section-${position+1}`}><span className="article-section-no">{String(position+1).padStart(2,'0')} / {String(article.sections.length).padStart(2,'0')}</span><h2>{section.heading}</h2><p>{section.body}</p></section>)}<div className="article-endnote"><Icon name="shield" size={25}/><p>This guide is general information, not legal or immigration advice. Verify relevant rules with institutions and official authorities before acting.</p></div><TextLink href="/contact">Discuss your next step</TextLink></article></div>
   <section className="section section-tint"><div className="container"><div className="section-head"><div><Eyebrow>Continue reading</Eyebrow><h2>More practical guidance.</h2></div></div><div className="article-grid related-articles">{relatedArticles.map(relatedArticle=><Link href={`/resources/${relatedArticle.slug}`} className="related-link" key={relatedArticle.slug}><span>{relatedArticle.category}</span><h3>{relatedArticle.title}</h3><Icon name="arrow-up-right" size={22}/></Link>)}</div></div></section><CallToActionBand/></>;
}
