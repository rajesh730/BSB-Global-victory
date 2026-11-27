import Image from 'next/image';
import Link from 'next/link';
import type {Article} from '@/types/content';
import {guidePhotos} from '@/content/stock-photos';

export function ArticleCard({article}: {article:Article;index?:number}) {
  const cover = article.coverImage || guidePhotos[article.slug];
  return <Link href={`/resources/${article.slug}`} className={`article-card${cover?' has-cover':''}`}>
    {cover && <div className="article-card-cover"><Image src={cover.src} alt={cover.alt} fill sizes="(max-width:660px) 100vw, (max-width:1040px) 50vw, 33vw"/></div>}
    <div className="article-meta">{article.category}<span>{article.readingMinutes} min read</span></div>
    <h3>{article.title}</h3><p>{article.description}</p><span className="article-read-link">Read guide</span>
  </Link>;
}
