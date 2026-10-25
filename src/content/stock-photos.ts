import type { StockPhoto } from '@/types/content';

// Freely licensed photos (CC0 / CC BY / CC BY-SA). Files live in public/stock-photos.
// Every entry keeps the credit its licence requires; all are listed on /image-credits.

const CC_BY_SA_4 = { license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' };
const CC0 = { license: 'CC0 1.0 (public domain)', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/' };

export const destinationPhotos: Record<string, StockPhoto> = {
  japan: { src: '/stock-photos/destinations/japan-mount-fuji-chureito-pagoda.jpg', width: 1800, height: 1013,
    alt: 'The red Chureito Pagoda with snow-capped Mount Fuji behind it', subject: 'Chureito Pagoda and Mount Fuji, Japan',
    creator: 'Dang Son', ...CC0, sourceName: 'Wikimedia Commons', sourceUrl: 'https://commons.wikimedia.org/wiki/File:12-Chureito-pagoda-and-Mount-Fuji-Japan_(29677439878).jpg' },
  'united-kingdom': { src: '/stock-photos/destinations/united-kingdom-oxford-radcliffe-camera.jpg', width: 1800, height: 1438,
    alt: 'The domed Radcliffe Camera library in Oxford under a clear sky', subject: 'Radcliffe Camera, Oxford, United Kingdom',
    creator: 'Mike Peel (www.mikepeel.net)', ...CC_BY_SA_4, sourceName: 'Wikimedia Commons', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Radcliffe_Camera,_Oxford.jpg' },
  'south-korea': { src: '/stock-photos/destinations/south-korea-gyeongbokgung-palace.jpg', width: 1800, height: 1012,
    alt: 'Geunjeongjeon throne hall at Gyeongbokgung Palace in Seoul under a blue sky', subject: 'Gyeongbokgung Palace, Seoul, South Korea',
    creator: 'Basile Morin', ...CC_BY_SA_4, sourceName: 'Wikimedia Commons', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Front_view_of_the_Imperial_Throne_Hall_Geunjeongjeon_at_Gyeongbokgung_Palace_with_blue_sky_in_Seoul.jpg' }
};

export const guidePhotos: Record<string, StockPhoto> = {
  'how-to-choose-a-course': { src: '/stock-photos/guides/students-studying-in-library.jpg', width: 1800, height: 1200,
    alt: 'Students studying together at long tables in a university library', subject: 'Students studying in a library',
    creator: 'Gary Todd', ...CC0, sourceName: 'Wikimedia Commons', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Sias_Library_-_Students_Studying_2017.jpg' },
  'study-abroad-budget-checklist': { src: '/stock-photos/guides/budget-calculator-and-coins.jpg', width: 960, height: 641,
    alt: 'A calculator, coins, glasses and a notepad on a desk', subject: 'Calculator and coins',
    creator: 'Artsy Crafty', ...CC0, sourceName: 'StockSnap', sourceUrl: 'https://stocksnap.io/photo/bank-finance-OLL4BSGLBE' },
  'application-document-checklist': { src: '/stock-photos/guides/writing-application-documents.jpg', width: 960, height: 640,
    alt: 'A hand writing on paperwork beside a cup of coffee', subject: 'Writing documents',
    creator: 'Green Chameleon', ...CC0, sourceName: 'StockSnap', sourceUrl: 'https://stocksnap.io/photo/writing-drawing-8Y0EDX4VP9' },
  'checking-student-visa-information': { src: '/stock-photos/guides/travellers-in-airport-terminal.jpg', width: 960, height: 640,
    alt: 'Travellers with backpacks walking through an airport terminal walkway', subject: 'Airport terminal walkway',
    creator: 'Matt Moloney', ...CC0, sourceName: 'StockSnap', sourceUrl: 'https://stocksnap.io/photo/airport-terminal-4LNIPV0W8H' }
};

export const stockPhotos: StockPhoto[] = [...Object.values(destinationPhotos), ...Object.values(guidePhotos)];
