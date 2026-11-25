'use client';

import {useEffect} from 'react';
import {usePathname} from 'next/navigation';

/** Lists and grids whose items reveal one after another. */
const groupSelector=[
  '.destination-grid','.service-preview-grid','.article-grid','.detail-grid','.step-list','.faq-stack','.principle-cards',
  '.services-list','.other-destination-grid','.gallery-grid','.test-grid','.photo-mosaic','.checklist-list','.legal-content'
].join(',');

/** Top-level blocks of each section that reveal as a whole. Hero areas are left alone: they are on screen at load. */
const blockSelector='main section:not([class*="hero"]):not(.legal-cover) > .container > *, main > .container:not(.breadcrumb-wrap) > *';

const staggerStep=0.08;
const maxStagger=3;

/**
 * Fades content up as it scrolls into view, for a livelier feel without moving anything the visitor
 * is already looking at. Content starts visible (no JavaScript, reduced motion, or already on screen)
 * and is only hidden once it is safely below the fold.
 */
export function ScrollReveal() {
  const pathname=usePathname();

  useEffect(()=>{
    const main=document.querySelector('main');
    if (!main || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const waiting=new Set<HTMLElement>();
    const reveal=(element:HTMLElement)=>{
      if (!waiting.delete(element)) return;
      observer.unobserve(element);
      element.classList.add('is-revealed');
      // Hand the element back to its own styles (hover transitions and transforms) once it has arrived.
      const delay=parseFloat(element.style.getPropertyValue('--reveal-delay')) || 0;
      window.setTimeout(()=>{ element.removeAttribute('data-reveal');element.classList.remove('is-revealed');element.style.removeProperty('--reveal-delay'); },(delay+0.9)*1000);
    };
    const observer=new IntersectionObserver(entries=>{
      for (const entry of entries) if (entry.isIntersecting) reveal(entry.target as HTMLElement);
    },{rootMargin:'0px 0px -8% 0px',threshold:0.08});

    // A jump (anchor link, End key, restored scroll position) can pass content without it ever
    // intersecting; reveal everything that is now on or above the screen.
    let scrollFrame=0;
    const revealPassed=()=>{ scrollFrame=0;waiting.forEach(element=>{ if (element.getBoundingClientRect().top<window.innerHeight) reveal(element); }); };
    const onScroll=()=>{ if (!scrollFrame) scrollFrame=window.requestAnimationFrame(revealPassed); };
    window.addEventListener('scroll',onScroll,{passive:true});

    const prepare=(element:HTMLElement,index:number)=>{
      if (element.dataset.revealSeen) return;
      element.dataset.revealSeen='true';
      if (element.closest('[data-reveal]') || element.querySelector('[data-reveal]')) return;
      if (element.getBoundingClientRect().top<window.innerHeight*0.92) return;
      element.dataset.reveal='';
      element.style.setProperty('--reveal-delay',`${Math.min(index,maxStagger)*staggerStep}s`);
      waiting.add(element);
      observer.observe(element);
    };

    const scan=()=>{
      main.querySelectorAll<HTMLElement>(groupSelector).forEach(group=>{
        if (group.closest('[class*="hero"]')) return;
        Array.from(group.children).forEach((child,index)=>prepare(child as HTMLElement,index));
      });
      main.querySelectorAll<HTMLElement>(blockSelector).forEach(element=>{
        const siblings=Array.from(element.parentElement?.children ?? []);
        prepare(element,siblings.indexOf(element));
      });
    };

    scan();
    // Pages stream in after navigation; pick up content that arrives later.
    let pending=0;
    const mutations=new MutationObserver(()=>{ window.cancelAnimationFrame(pending);pending=window.requestAnimationFrame(scan); });
    mutations.observe(main,{childList:true,subtree:true});

    return ()=>{
      observer.disconnect();
      mutations.disconnect();
      window.removeEventListener('scroll',onScroll);
      window.cancelAnimationFrame(pending);
      window.cancelAnimationFrame(scrollFrame);
      // Never leave content hidden if the page changes mid-animation.
      main.querySelectorAll<HTMLElement>('[data-reveal]').forEach(element=>{ element.removeAttribute('data-reveal');element.classList.remove('is-revealed'); });
    };
  },[pathname]);

  return null;
}
