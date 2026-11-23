import type {Metadata, Viewport} from 'next';
import type {ReactNode} from 'react';
import {SiteShell} from '@/components/layout/SiteShell';
import {JsonLd} from '@/components/seo/JsonLd';
import {siteOrigin, isSiteVerified, business, absoluteUrl} from '@/lib/site-config';
import {photoSrc} from '@/lib/media';
import {getBusinessProfile} from '@/server/site/repository';
import './globals.css';

// Office details and page copy are managed from the dashboard. Render them at
// request time so a published change is visible without a redeploy.
export const dynamic='force-dynamic';
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
  image: absoluteUrl(photoSrc('bsb-global-office-counselling-team-butwal.png')),
  email: business.email,
  telephone: business.phone.tel,
  address: {'@type': 'PostalAddress', streetAddress: business.address, addressLocality: 'Butwal', addressRegion: 'Lumbini Province', addressCountry: 'NP'},
  areaServed: 'NP',
  contactPoint: business.phones.map(contactPhone => ({'@type': 'ContactPoint', telephone: contactPhone.tel, contactType: 'customer service', areaServed: 'NP', availableLanguage: ['en', 'ne']}))
};

export default async function RootLayout({children}: {children:ReactNode}) {
  const liveBusiness=await getBusinessProfile();
  const liveOrganizationData={...organizationData,name:liveBusiness.name,legalName:liveBusiness.legalName,email:liveBusiness.email,telephone:liveBusiness.phone.tel,address:{'@type':'PostalAddress',streetAddress:liveBusiness.address,addressLocality:'Butwal',addressRegion:'Lumbini Province',addressCountry:'NP'},contactPoint:liveBusiness.phones.map(contactPhone=>({'@type':'ContactPoint',telephone:contactPhone.tel,contactType:'customer service',areaServed:'NP',availableLanguage:['en','ne']}))};
  return <html lang="en" data-scroll-behavior="smooth"><body>{isSiteVerified && <JsonLd data={liveOrganizationData}/>}<SiteShell business={liveBusiness}>{children}</SiteShell></body></html>;
}
