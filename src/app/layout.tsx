import type {Metadata, Viewport} from 'next';
import type {ReactNode} from 'react';
import {SiteShell} from '@/components/layout/SiteShell';
import {JsonLd} from '@/components/seo/JsonLd';
import {siteOrigin, isSiteVerified, business, absoluteUrl} from '@/lib/site-config';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {default:'BSB Global | Study Abroad Consultancy in Butwal, Nepal', template:'%s | BSB Global'},
  description:'BSB Global Victory Education Consultancy in Butwal, Nepal: study abroad counselling for Japan, the United Kingdom and South Korea, plus IELTS, PTE, JLPT, NAT and TOPIK preparation guidance.',
  applicationName: business.legalName,
  openGraph: {siteName:'BSB Global',type:'website',locale:'en_GB'},
  robots: {index:isSiteVerified,follow:isSiteVerified}
};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#28388b'};

const organizationData = {
  '@type': ['EducationalOrganization', 'LocalBusiness'],
  name: business.name,
  legalName: business.legalName,
  foundingDate: business.foundingDate,
  url: siteOrigin,
  logo: absoluteUrl('/brand/bsb-global-logo.webp'),
  image: absoluteUrl('/photos/office-counselling-desk.jpeg'),
  email: business.email,
  telephone: business.phone.tel,
  address: {'@type': 'PostalAddress', streetAddress: 'Milanchowk, Butwal-9', addressLocality: 'Butwal', addressRegion: 'Lumbini Province', addressCountry: 'NP'},
  areaServed: 'NP',
  contactPoint: business.phones.map(contactPhone => ({'@type': 'ContactPoint', telephone: contactPhone.tel, contactType: 'customer service', areaServed: 'NP', availableLanguage: ['en', 'ne']}))
};

export default function RootLayout({children}: {children:ReactNode}) {
  return <html lang="en" data-scroll-behavior="smooth"><body>{isSiteVerified && <JsonLd data={organizationData}/>}<SiteShell>{children}</SiteShell></body></html>;
}
