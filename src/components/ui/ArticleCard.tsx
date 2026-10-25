import Image from 'next/image';
import Link from 'next/link';
import type {Article} from '@/types/content';
import {guidePhotos} from '@/content/stock-photos';
import {Icon} from './Icon';

export function ArticleCard({article, index=0}: {article:Article;index?:number}) {
  const cover = guidePhotos[article.slug];
  return <Link href={`/resources/${article.slug}`} className={`article-card${index%3===1?' article-card-accented':''}${cover?' has-cover':''}`}>
    {cover && <div className="article-card-cover"><Image src={cover.src} alt={cover.alt} fill sizes="(max-width:660px) 100vw, (max-width:1040px) 50vw, 33vw"/></div>}
    <div className="article-meta">{article.category}<span>{article.readingMinutes} min read</span></div>
    <h3>{article.title}</h3><p>{article.description}</p><span className="article-arrow"><Icon name="arrow-up-right" size={22}/></span>
  </Link>;
}
