import Image from 'next/image';
import Link from 'next/link';
import type {Destination} from '@/types/content';
import {destinationPhotos} from '@/content/stock-photos';
import {Icon} from './Icon';

export function DestinationCard({destination,index,total}: {destination:Destination;index:number;total:number}) {
  const photo = destinationPhotos[destination.slug];
  return <Link className="destination-card" href={`/study-abroad/${destination.slug}`}>
    <div className="destination-art"><span className="card-counter">{String(index+1).padStart(2,'0')} / {String(total).padStart(2,'0')}</span>{photo
      ? <Image src={photo.src} alt={photo.alt} fill sizes="(max-width:660px) 100vw, (max-width:1040px) 50vw, 33vw"/>
      : destination.illustration && <Image src={destination.illustration} alt="" width={350} height={205}/>}</div>
    <div className="destination-body"><div><h3>{destination.name}</h3><p>{destination.cardSummary}</p></div><span className="circle-arrow"><Icon name="arrow-up-right" size={19}/></span></div>
  </Link>;
}
