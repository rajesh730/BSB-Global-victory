import {CallToActionBand} from '@/components/sections/CallToActionBand';
import {Eyebrow} from '@/components/ui/Eyebrow';
import {PageHero} from '@/components/sections/PageHero';
import {PhotoFigure} from '@/components/ui/PhotoFigure';
import {buildPageMetadata} from '@/lib/site-config';
import {galleryCategories} from '@/server/site/defaults';
import {getGalleryItems,getSitePage} from '@/server/site/repository';

export async function generateMetadata(){const page=await getSitePage('gallery');return buildPageMetadata(page.metaTitle,page.metaDescription,'/gallery');}
export default async function GalleryPage() {
 const [page,photos]=await Promise.all([getSitePage('gallery'),getGalleryItems()]);
 return <><PageHero label={page.eyebrow} title={page.title} description={page.description} numeral={String(photos.length).padStart(2,'0')}/>
   <section className="section"><div className="container">{galleryCategories.map(category=><div className="gallery-group" key={category.id} id={category.id}><div className="gallery-group-head"><div><Eyebrow>{photos.filter(photo=>photo.category===category.id).length} photos</Eyebrow><h2>{category.label}</h2></div><p>{category.description}</p></div><div className="gallery-grid">{photos.filter(photo=>photo.category===category.id).map(photo=><PhotoFigure key={photo.id} photo={photo} sizes="(max-width:660px) 100vw, (max-width:1040px) 50vw, 33vw"/>)}</div></div>)}</div></section><CallToActionBand/></>;
}
