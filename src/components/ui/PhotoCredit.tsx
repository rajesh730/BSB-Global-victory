import type {StockPhoto} from '@/types/content';

/** Attribution line required by the photo's Creative Commons licence. */
export function PhotoCredit({photo, className = ''}: {photo: StockPhoto; className?: string}) {
  return <p className={`photo-credit ${className}`}>Photo: <a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer">{photo.creator}</a> / {photo.sourceName}, <a href={photo.licenseUrl} target="_blank" rel="license noopener noreferrer">{photo.license}</a></p>;
}
