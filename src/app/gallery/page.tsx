import {Breadcrumbs} from '@/components/ui/Breadcrumbs';
import {CallToActionBand} from '@/components/sections/CallToActionBand';
import {Eyebrow} from '@/components/ui/Eyebrow';
import {PageHero} from '@/components/sections/PageHero';
import {PhotoFigure} from '@/components/ui/PhotoFigure';
import {photoCategories,photos} from '@/content/photos';
import {buildPageMetadata} from '@/lib/site-config';

export const metadata=buildPageMetadata('Photo Gallery','Photos from the BSB Global office in Butwal: our team, classes and students setting off to study abroad.','/gallery');
export default function GalleryPage() {
 return <><div className="container breadcrumb-wrap"><Breadcrumbs items={[{label:'Gallery'}]}/></div><PageHero label="Moments from our journey" title="The people behind every plan." description="A look inside our Butwal office: the team, the classroom and the proud moments when students set off for their next chapter." numeral={String(photos.length).padStart(2,'0')}/>
   <section className="section"><div className="container">{photoCategories.map(category=><div className="gallery-group" key={category.id} id={category.id}><div className="gallery-group-head"><div><Eyebrow>{photos.filter(photo=>photo.category===category.id).length} photos</Eyebrow><h2>{category.label}</h2></div><p>{category.description}</p></div><div className="gallery-grid">{photos.filter(photo=>photo.category===category.id).map(photo=><PhotoFigure key={photo.id} photo={photo} sizes="(max-width:660px) 100vw, (max-width:1040px) 50vw, 33vw"/>)}</div></div>)}</div></section><CallToActionBand/></>;
}
