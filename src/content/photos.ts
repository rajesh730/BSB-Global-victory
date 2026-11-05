import type { Photo, PhotoCategory } from '@/types/content';
import {photoSrc} from '@/lib/media';

// Original office photography. Files live in public/photos; width/height are the real pixel sizes.
export const photos: Photo[] = [
  { id: 'office-team-celebration', src: photoSrc('bsb-global-student-team-celebration-butwal.png'), width: 1226, height: 917, category: 'office',
    alt: 'BSB Global staff and students celebrating together at the Butwal office', caption: 'Celebrating together with our students and team in Butwal.' },
  { id: 'office-reception-gathering', src: photoSrc('bsb-global-student-group-reception-butwal.png'), width: 1223, height: 917, category: 'office',
    alt: 'BSB Global students and staff gathered at the Butwal office reception', caption: 'A full house at our Butwal reception.' },
  { id: 'office-counselling-desk', src: photoSrc('bsb-global-office-counselling-team-butwal.png'), width: 726, height: 900, category: 'office',
    alt: 'BSB Global counselling team members standing at the Butwal office reception', caption: 'Our counselling team at the Butwal office.' },
  { id: 'office-team-with-student', src: photoSrc('bsb-global-student-passport-team-butwal.png'), width: 737, height: 917, category: 'office',
    alt: 'BSB Global staff and a student at the Butwal office', caption: 'Our team supporting a student at the next step of their journey.' },
  { id: 'office-team-selfie', src: photoSrc('bsb-global-student-team-selfie-butwal.png'), width: 1226, height: 916, category: 'office',
    alt: 'BSB Global staff and students gathered inside the Butwal office', caption: 'Students and staff at the BSB Global office.' },
  { id: 'classes-classroom-session', src: photoSrc('classes-classroom-session.jpeg'), width: 1280, height: 960, category: 'classes',
    alt: 'Students seated at desks during a class session', caption: 'A class session in our classroom.' },
  { id: 'classes-student-group-butwal', src: photoSrc('classes-student-group-butwal.jpeg'), width: 715, height: 536, category: 'classes',
    alt: 'A large group of students and staff standing together on a street in Butwal', caption: 'Our student community in Butwal.' },
  { id: 'departures-passport-handover', src: photoSrc('bsb-global-passport-handover-student-butwal.png'), width: 735, height: 917, category: 'departures',
    alt: 'BSB Global staff member supporting a student at the Butwal office', caption: 'Supporting a student before their next step.' },
  { id: 'departures-airport-students', src: photoSrc('departures-airport-students.jpeg'), width: 715, height: 953, category: 'departures',
    alt: 'Three students wearing farewell scarves outside the international airport in Kathmandu', caption: 'Students ready to fly from Kathmandu.' },
  { id: 'departures-airport-send-off', src: photoSrc('departures-airport-send-off.jpeg'), width: 715, height: 1270, category: 'departures',
    alt: 'A team member seeing off two students in farewell scarves at the international terminal', caption: 'Seeing our students off at the international terminal.' }
];

export const photoCategories: { id: PhotoCategory; label: string; description: string }[] = [
  { id: 'office', label: 'Our office & team', description: 'The people and the space where conversations about your future begin.' },
  { id: 'classes', label: 'Classes & community', description: 'Students preparing, learning and growing together.' },
  { id: 'departures', label: 'Student departures', description: 'Proud moments as students set out on their journey.' }
];

export function getPhoto(id: string): Photo {
  const photo = photos.find(p => p.id === id);
  if (!photo) throw new Error(`Unknown photo: ${id}`);
  return photo;
}
