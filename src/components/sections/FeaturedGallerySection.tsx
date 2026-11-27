import {SectionHeading} from '@/components/sections/SectionHeading';
import {PhotoFigure} from '@/components/ui/PhotoFigure';
import {getGalleryItems} from '@/server/site/repository';

export async function FeaturedGallerySection() {
  const featured = (await getGalleryItems()).filter(photo=>photo.featured).slice(0,5);
  if (!featured.length) return null;

  return (
    <section className="section section-tint" aria-label="Life at BSB Global">
      <div className="container">
        <SectionHeading
          eyebrow="Life at BSB Global"
          title="Our office, classes and student departures"
          href="/gallery"
          linkLabel="View the full gallery"
        />
        <div className="photo-mosaic" data-count={featured.length}>
          {featured.map((photo, index) => (
            <PhotoFigure
              key={photo.id}
              photo={photo}
              sizes={index === 0 ? '(max-width:880px) 100vw, (max-width:1240px) 50vw, 600px' : '(max-width:520px) 100vw, (max-width:880px) 50vw, (max-width:1240px) 25vw, 300px'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
