'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import {business, primaryNavigation} from '@/lib/site-config';
import {destinations} from '@/content/destinations';
import {Icon} from '@/components/ui/Icon';

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDestinationsMenuOpen, setIsDestinationsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => { setIsMenuOpen(false); setIsDestinationsMenuOpen(false); }, [pathname]);
  useEffect(() => {
    const updateScrolledState = () => setIsScrolled(window.scrollY > 12);
    updateScrolledState(); window.addEventListener('scroll', updateScrolledState, {passive:true});
    return () => window.removeEventListener('scroll', updateScrolledState);
  }, []);
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') {setIsMenuOpen(false); setIsDestinationsMenuOpen(false);} };
    document.addEventListener('keydown',closeOnEscape);
    return () => document.removeEventListener('keydown',closeOnEscape);
  }, []);
  useEffect(() => {
    document.body.classList.toggle('menu-open',isMenuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [isMenuOpen]);

  const isCurrentPage = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  return <>
    <div className="topline"><div className="container topline-inner"><span>Guidance for your next chapter · Est. 2024</span><span className="topline-secondary"><a href={`tel:${business.phone.tel}`}>{business.phone.display}</a> · <a href={`mailto:${business.email}`}>{business.email}</a></span></div></div>
    <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`}>
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="BSB Global — home"><Image src="/brand/bsb-global-logo.webp" alt="" width={56} height={56} priority /><span className="brand-type"><strong>BSB GLOBAL</strong><small>{business.descriptor}</small></span></Link>
        <nav className={`primary-nav${isMenuOpen ? ' is-open' : ''}`} aria-label="Primary navigation" id="primary-navigation">
          {primaryNavigation.map(item => item.href === '/study-abroad'
            ? <div className="nav-dropdown" key={item.href}>
                <div className="nav-dropdown-controls"><Link href={item.href} className={isCurrentPage(item.href)?'is-active':''} aria-current={isCurrentPage(item.href)?'page':undefined}>Study abroad</Link><button className="dropdown-toggle" aria-label="Toggle study destinations" aria-expanded={isDestinationsMenuOpen} onClick={()=>setIsDestinationsMenuOpen(!isDestinationsMenuOpen)} type="button"><Icon name="chevron-down" size={16}/></button></div>
                <div className={`nav-submenu${isDestinationsMenuOpen?' submenu-open':''}`}><p>Explore destinations</p>{destinations.map(destination=><Link key={destination.slug} href={`/study-abroad/${destination.slug}`}>{destination.name}<Icon name="arrow-up-right" size={14}/></Link>)}</div>
              </div>
            : <Link key={item.href} href={item.href} className={isCurrentPage(item.href)?'is-active':''} aria-current={isCurrentPage(item.href)?'page':undefined}>{item.label}</Link>)}
          <Link className="button button-primary mobile-nav-cta" href="/contact">Book counselling <Icon name="arrow-up-right" size={17}/></Link>
        </nav>
        <Link className="button button-primary desktop-nav-cta" href="/contact">Book counselling <Icon name="arrow-up-right" size={16}/></Link>
        <button type="button" className="menu-toggle" aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMenuOpen} aria-controls="primary-navigation" onClick={()=>setIsMenuOpen(!isMenuOpen)}><Icon name={isMenuOpen?'close':'menu'} size={23}/></button>
      </div>
    </header>
  </>;
}
