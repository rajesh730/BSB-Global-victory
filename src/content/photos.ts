import type { Photo, PhotoCategory } from '@/types/content';

// Original office photography. Files live in public/photos; width/height are the real pixel sizes.
export const photos: Photo[] = [
  { id: 'office-team-celebration', src: '/photos/office-team-celebration.jpeg', width: 1280, height: 960, category: 'office',
    alt: 'Smiling team members and students gathered together inside the BSB Global office', caption: 'Celebrating together with our students and team.' },
  { id: 'office-reception-gathering', src: '/photos/office-reception-gathering.jpeg', width: 960, height: 1280, category: 'office',
    alt: 'Students and staff standing behind the decorated reception desk at the office', caption: 'A full house at our Butwal reception.' },
  { id: 'office-counselling-desk', src: '/photos/office-counselling-desk.jpeg', width: 715, height: 953, category: 'office',
    alt: 'Two women standing at the counselling desk, with study-destination posters behind them', caption: 'Our counselling desk at Milanchowk, Butwal.' },
  { id: 'office-team-with-student', src: '/photos/office-team-with-student.jpeg', width: 715, height: 820, category: 'office',
    alt: 'Three team members standing with a student holding her passport inside the office', caption: 'Our team with a student ready for the next step.' },
  { id: 'office-team-selfie', src: '/photos/office-team-selfie.jpeg', width: 715, height: 536, category: 'office',
    alt: 'Group selfie of students and staff in front of the language-class notice board', caption: 'Students and staff at the office.' },
  { id: 'classes-classroom-session', src: '/photos/classes-classroom-session.jpeg', width: 1280, height: 960, category: 'classes',
    alt: 'Students seated at desks during a class session', caption: 'A class session in our classroom.' },
  { id: 'classes-student-group-butwal', src: '/photos/classes-student-group-butwal.jpeg', width: 715, height: 536, category: 'classes',
    alt: 'A large group of students and staff standing together on a street in Butwal', caption: 'Our student community in Butwal.' },
  { id: 'departures-passport-handover', src: '/photos/departures-passport-handover.jpeg', width: 715, height: 953, category: 'departures',
    alt: 'A counsellor handing a passport to a smiling student at the office', caption: 'Handing over a passport before departure.' },
  { id: 'departures-airport-students', src: '/photos/departures-airport-students.jpeg', width: 715, height: 953, category: 'departures',
    alt: 'Three students wearing farewell scarves outside the international airport in Kathmandu', caption: 'Students ready to fly from Kathmandu.' },
  { id: 'departures-airport-send-off', src: '/photos/departures-airport-send-off.jpeg', width: 715, height: 1270, category: 'departures',
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
