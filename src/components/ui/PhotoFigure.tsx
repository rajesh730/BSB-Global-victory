import Image from 'next/image';
import type {CSSProperties} from 'react';
import type {Photo} from '@/types/content';

type Props = {photo: Photo; sizes: string; className?: string; priority?: boolean; caption?: boolean};

/** Captioned photo. The frame keeps the photo's own ratio unless a parent class overrides `aspect-ratio`. */
export function PhotoFigure({photo, sizes, className = '', priority = false, caption = true}: Props) {
  const ratio = {'--photo-ratio': `${photo.width} / ${photo.height}`} as CSSProperties;
  return <figure className={`photo-figure ${className}`}>
    <div className="photo-frame" style={ratio}><Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} className="photo-img"/></div>
    {caption && <figcaption>{photo.caption}</figcaption>}
  </figure>;
}
