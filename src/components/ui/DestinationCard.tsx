import Image from 'next/image';
import Link from 'next/link';
import type {Destination} from '@/types/content';
import {destinationPhotos} from '@/content/stock-photos';
import {destinationCodes} from '@/content/destinations';
import {Icon} from '@/components/ui/Icon';

export function DestinationCard({destination}: {destination:Destination;index?:number;total?:number}) {
  const photo = destinationPhotos[destination.slug];
  return <Link className="destination-card" href={`/study-abroad/${destination.slug}`}>
    <div className="destination-art">{photo
      ? <Image src={photo.src} alt={photo.alt} fill sizes="(max-width:660px) 100vw, (max-width:1040px) 50vw, 33vw"/>
      : destination.illustration && <Image src={destination.illustration} alt="" width={350} height={205}/>}</div>
    <div className="destination-body"><span className="destination-route">Butwal<Icon name="arrow-right" size={14}/>{destinationCodes[destination.slug]}</span><h3>{destination.name}</h3><p>{destination.cardSummary}</p><span className="destination-read-link">View study guide</span></div>
  </Link>;
}
