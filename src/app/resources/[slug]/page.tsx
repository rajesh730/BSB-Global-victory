import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {articles,articleFromManagedPost,getArticle} from '@/content/articles';
import {CallToActionBand} from '@/components/sections/CallToActionBand';
import {Eyebrow} from '@/components/ui/Eyebrow';
import {TextLink} from '@/components/ui/TextLink';
import {Icon} from '@/components/ui/Icon';
import Image from 'next/image';
import {PhotoCredit} from '@/components/ui/PhotoCredit';
import {JsonLd} from '@/components/seo/JsonLd';
import {guidePhotos} from '@/content/stock-photos';
import {absoluteUrl,business,buildPageMetadata} from '@/lib/site-config';
import {getPublishedBlogPostBySlug,listPublishedBlogPosts} from '@/server/blog/repository';

type Props={params:Promise<{slug:string}>};
export const dynamic='force-dynamic';
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const managed=await getPublishedBlogPostBySlug(slug).catch(()=>null);const article=managed?articleFromManagedPost(managed):getArticle(slug);if(!article)return {};const stockCover=guidePhotos[slug];const image=article.coverImage?{url:article.coverImage.src,width:1200,height:630,alt:article.coverImage.alt}:stockCover&&{url:stockCover.src,width:stockCover.width,height:stockCover.height,alt:stockCover.alt};return buildPageMetadata(article.title,article.description,`/resources/${slug}`,{type:'article',image});}
export default async function ResourceArticlePage({params}:Props) {
 const {slug}=await params;const managed=await getPublishedBlogPostBySlug(slug).catch(()=>null);const article=managed?articleFromManagedPost(managed):getArticle(slug);if(!article)notFound();
 const stockCover=guidePhotos[article.slug];const cover=article.coverImage || stockCover;
 const managedPosts=await listPublishedBlogPosts().catch(()=>[]);const relatedArticles=[...managedPosts.map(articleFromManagedPost),...articles].filter(candidate=>candidate.slug!==slug).slice(0,2);
 return <><JsonLd data={{'@type':'Article',headline:article.title,description:article.description,inLanguage:'en',...(cover?{image:absoluteUrl(cover.src)}:{}),mainEntityOfPage:absoluteUrl(`/resources/${article.slug}`),author:{'@type':'Organization',name:business.legalName},publisher:{'@type':'Organization',name:business.legalName,logo:{'@type':'ImageObject',url:absoluteUrl('/brand/bsb-global-logo.webp')}}}}/>
   <header className="article-hero"><div className="container article-hero-inner"><div><Eyebrow>{article.category} / BSB Global reading room</Eyebrow><h1>{article.title}</h1><p className="lead">{article.description}</p><div className="read-time"><Icon name="clock" size={16}/>{article.readingMinutes} min read <span>•</span> General educational guidance</div></div>{cover?<figure className="article-cover-photo"><div className="article-cover-frame"><Image src={cover.src} alt={cover.alt} fill sizes="(max-width:880px) 100vw, 40vw" priority/></div>{stockCover&&!article.coverImage&&<PhotoCredit photo={stockCover}/>}</figure>:<div className="article-cover-art" aria-hidden="true"><span>THE STUDENT NOTEBOOK</span><strong>Ideas<br/>into<br/><i>action.</i></strong><small>BSB GLOBAL / FIELD NOTES</small></div>}</div></header>
   <div className="container article-layout"><aside className="article-sidebar"><span>{article.sections.length?'IN THIS GUIDE':'RESOURCE'}</span>{article.sections.length>0&&<nav aria-label="On this page">{article.sections.map((section,position)=><a key={section.heading} href={`#section-${position+1}`}>{String(position+1).padStart(2,'0')} &nbsp; {section.heading}</a>)}</nav>}<Link href="/resources" className="sidebar-back">← All resources</Link></aside><article className="article-content">{article.body?<div className="article-managed-body">{article.body.split(/\n\s*\n/).map((paragraph,index)=><p key={index}>{paragraph}</p>)}</div>:<><p className="article-lead">{article.intro}</p>{article.sections.map((section,position)=><section key={section.heading} id={`section-${position+1}`}><span className="article-section-no">{String(position+1).padStart(2,'0')} / {String(article.sections.length).padStart(2,'0')}</span><h2>{section.heading}</h2><p>{section.body}</p></section>)}</>}<div className="article-endnote"><Icon name="shield" size={25}/><p>This guide is general information, not legal or immigration advice. Verify relevant rules with institutions and official authorities before acting.</p></div><TextLink href="/contact">Discuss your next step</TextLink></article></div>
   <section className="section section-tint"><div className="container"><div className="section-head"><div><Eyebrow>Continue reading</Eyebrow><h2>More practical guidance.</h2></div></div><div className="article-grid related-articles">{relatedArticles.map(relatedArticle=><Link href={`/resources/${relatedArticle.slug}`} className="related-link" key={relatedArticle.slug}><span>{relatedArticle.category}</span><h3>{relatedArticle.title}</h3><small>Read guide</small></Link>)}</div></div></section><CallToActionBand/></>;
}
