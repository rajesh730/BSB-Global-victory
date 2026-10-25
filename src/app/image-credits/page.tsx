import Image from 'next/image';
import {Breadcrumbs} from '@/components/ui/Breadcrumbs';
import {Eyebrow} from '@/components/ui/Eyebrow';
import {stockPhotos} from '@/content/stock-photos';
import {buildPageMetadata} from '@/lib/site-config';

export const metadata=buildPageMetadata('Image Credits','Credits and licences for the freely licensed photographs used on the BSB Global website.','/image-credits');
export default function ImageCreditsPage(){
 return <><div className="container breadcrumb-wrap"><Breadcrumbs items={[{label:'Image credits'}]}/></div>
   <section className="legal-cover"><div className="container"><Eyebrow>Thank you, photographers</Eyebrow><h1>Image credits.</h1><p className="lead">Photos of our office, classes and students are our own. The destination and guide photos below are used under free Creative Commons licences. Photos marked CC BY or CC BY-SA require the credit shown.</p></div></section>
   <section className="section"><div className="container"><ul className="credits-list">{stockPhotos.map(photo=><li key={photo.src}>
     <div className="credits-thumb"><Image src={photo.src} alt={photo.alt} fill sizes="120px"/></div>
     <div><h2>{photo.subject}</h2><p>By <a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer">{photo.creator}</a> on {photo.sourceName}</p><p>Licence: <a href={photo.licenseUrl} target="_blank" rel="license noopener noreferrer">{photo.license}</a>{photo.license.startsWith('CC BY')?' (resized and cropped for this website)':''}</p></div>
   </li>)}</ul></div></section></>;
}
