'use client';

import {useState} from 'react';
import Image from 'next/image';
import type {Photo} from '@/types/content';

export function FeaturedGalleryCarousel({photos}: {photos:Photo[]}) {
  const [activeIndex,setActiveIndex]=useState(0);
  const activePhoto=photos[activeIndex];
  const goTo=(index:number)=>setActiveIndex(Math.max(0,Math.min(index,photos.length-1)));

  return <section className="featured-gallery" aria-label="Life at BSB Global gallery">
    <div className="featured-gallery-frame">
      <Image key={activePhoto.id} className="featured-gallery-image" src={activePhoto.src} alt={activePhoto.alt} fill sizes="(max-width:700px) 100vw, 72vw" priority={activeIndex===0}/>
    </div>
    <div className="featured-gallery-footer">
      <div><p className="featured-gallery-caption">{activePhoto.caption}</p><p className="featured-gallery-count">{activeIndex+1} of {photos.length}</p></div>
      <div className="featured-gallery-controls"><button type="button" onClick={()=>goTo(activeIndex-1)} disabled={activeIndex===0}>Previous</button><button type="button" onClick={()=>goTo(activeIndex+1)} disabled={activeIndex===photos.length-1}>Next</button></div>
    </div>
    <div className="featured-gallery-dots" role="tablist" aria-label="Choose a gallery image">{photos.map((photo,index)=><button key={photo.id} type="button" role="tab" aria-selected={index===activeIndex} aria-label={`View image ${index+1}: ${photo.caption}`} className={index===activeIndex?'is-active':''} onClick={()=>goTo(index)}/>)}</div>
  </section>;
}
