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

const staggerMs=80;
const maxStagger=3;
const keyframes:Keyframe[]=[{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}];
const timing:KeyframeAnimationOptions={duration:400,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'};

/**
 * Fades content up as it scrolls into view, without moving anything the visitor is already looking at.
 *
 * The page streams in, so this runs on elements React has not hydrated yet. It therefore never writes
 * attributes, classes or inline styles: each element gets a paused Web Animation instead, which holds it
 * at the first frame until it scrolls into view. The server-rendered HTML stays exactly as React expects.
 * Content starts visible (no JavaScript, reduced motion, or already on screen) and an animation that is
 * cancelled for any reason simply leaves the element visible.
 */
export function ScrollReveal() {
  const pathname=usePathname();

  useEffect(()=>{
    const main=document.querySelector('main');
    if (!main || !('IntersectionObserver' in window) || !('animate' in Element.prototype) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const seen=new WeakSet<Element>();
    const waiting=new Map<Element,Animation>();

    const reveal=(element:Element)=>{
      const animation=waiting.get(element);
      if (!animation) return;
      waiting.delete(element);
      observer.unobserve(element);
      animation.play();
      // Hand the element back to its own styles once it has arrived.
      animation.finished.then(()=>animation.cancel(),()=>{});
    };
    const observer=new IntersectionObserver(entries=>{
      for (const entry of entries) if (entry.isIntersecting) reveal(entry.target);
    },{rootMargin:'0px 0px -8% 0px',threshold:0.08});

    // A jump (anchor link, End key, restored scroll position) can pass content without it ever
    // intersecting; reveal everything that is now on or above the screen.
    let scrollFrame=0;
    const revealPassed=()=>{ scrollFrame=0;waiting.forEach((_,element)=>{ if (element.getBoundingClientRect().top<window.innerHeight) reveal(element); }); };
    const onScroll=()=>{ if (!scrollFrame) scrollFrame=window.requestAnimationFrame(revealPassed); };
    window.addEventListener('scroll',onScroll,{passive:true});

    /** True when the element sits inside, or contains, something that is already waiting to reveal. */
    const overlapsWaiting=(element:Element)=>{
      for (let parent=element.parentElement;parent && parent!==main;parent=parent.parentElement) if (waiting.has(parent)) return true;
      for (const other of waiting.keys()) if (element.contains(other)) return true;
      return false;
    };

    const prepare=(element:Element,index:number)=>{
      if (seen.has(element)) return;
      seen.add(element);
      if (overlapsWaiting(element)) return;
      if (element.getBoundingClientRect().top<window.innerHeight*0.92) return;
      const animation=element.animate(keyframes,{...timing,delay:Math.min(index,maxStagger)*staggerMs});
      animation.pause();
      waiting.set(element,animation);
      observer.observe(element);
    };

    const scan=()=>{
      main.querySelectorAll(groupSelector).forEach(group=>{
        if (group.closest('[class*="hero"]')) return;
        Array.from(group.children).forEach((child,index)=>prepare(child,index));
      });
      main.querySelectorAll(blockSelector).forEach(element=>{
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
      waiting.forEach(animation=>animation.cancel());
      waiting.clear();
    };
  },[pathname]);

  return null;
}
