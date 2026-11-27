import type {Photo, PhotoCategory} from '@/types/content';
import {photoSrc} from '@/lib/media';

export type SitePageDefinition={
  id:string;
  path:string;
  label:string;
  eyebrow:string;
  title:string;
  description:string;
  metaTitle:string;
  metaDescription:string;
};

export const sitePageDefinitions:SitePageDefinition[]=[
  {id:'home',path:'/',label:'Homepage',eyebrow:'BSB Global Victory · Butwal',title:'Study abroad counselling in Butwal',description:'Explore study options in Japan, the UK and South Korea with practical guidance shaped around your qualifications, budget and goals.',metaTitle:'Study Abroad Consultancy in Butwal',metaDescription:'Explore study options in Japan, the UK and South Korea with BSB Global Victory in Butwal. Get course guidance, application support and test preparation.'},
  {id:'study-abroad',path:'/study-abroad',label:'Study abroad',eyebrow:'Your options, considered',title:'Study abroad destinations for Nepali students',description:'Compare study options in Japan, the United Kingdom and South Korea before choosing a pathway that fits your qualifications, budget and goals.',metaTitle:'Study Abroad Destinations for Nepali Students',metaDescription:'Compare study options in Japan, the UK and South Korea from Nepal, including course pathways, language requirements, costs and official sources.'},
  {id:'services',path:'/services',label:'Services',eyebrow:'What we help you plan',title:'Study abroad counselling and application support in Butwal',description:'Understand what we can help you prepare, what to verify with institutions, and what you remain responsible for throughout your journey.',metaTitle:'Study Abroad Counselling in Butwal',metaDescription:'Get study abroad counselling in Butwal with BSB Global Victory. Explore course selection, application support, budget planning and pre-departure guidance.'},
  {id:'test-preparation',path:'/test-preparation',label:'Test preparation',eyebrow:'Preparation with purpose',title:'Language classes and test preparation in Butwal',description:'Choose an English, Japanese or Korean test based on the requirements of your intended course, not a generic score target.',metaTitle:'IELTS, PTE and Language Classes in Butwal',metaDescription:'Explore IELTS, PTE, Japanese and Korean language preparation in Butwal. Contact BSB Global Victory for current classes, fees and batch availability.'},
  {id:'education-consultancy-butwal',path:'/education-consultancy-butwal',label:'Education consultancy in Butwal',eyebrow:'Milanchowk, Butwal',title:'Education consultancy and study abroad counselling in Butwal',description:'Visit BSB Global Victory to discuss international study plans, compare realistic options and prepare for the next step with clearer information.',metaTitle:'Education Consultancy in Butwal',metaDescription:'Visit BSB Global Victory in Milanchowk, Butwal for study abroad counselling, university shortlisting, application preparation and language-class enquiries.'},
  {id:'language-classes-butwal',path:'/language-classes-butwal',label:'Language classes in Butwal',eyebrow:'Butwal language classes',title:'Language classes and test preparation in Butwal',description:'Ask about current IELTS, PTE, Japanese and Korean language classes after confirming the test your chosen programme actually accepts.',metaTitle:'Language Classes in Butwal',metaDescription:'Ask BSB Global Victory in Butwal about current IELTS, PTE, Japanese and Korean language classes, batch timings, fees and study-pathway requirements.'},
  {id:'about',path:'/about',label:'About',eyebrow:'Established 8 February 2024',title:'About BSB Global Victory Education Consultancy',description:'BSB Global Victory Education Consultancy Pvt. Ltd. helps students in Nepal plan international education with clear information, honest advice and a plan built around their own goals.',metaTitle:'About BSB Global Victory Education Consultancy, Butwal',metaDescription:'Learn about BSB Global Victory Education Consultancy in Butwal and our approach to helping Nepali students plan studies in Japan, the UK and South Korea.'},
  {id:'resources',path:'/resources',label:'Resources',eyebrow:'Read first. Plan better.',title:'Study abroad guides for Nepali students',description:'Simple, practical guides for the decisions you will make before applying. No hype, shortcuts or vague promises.',metaTitle:'Study Abroad Guides for Nepali Students',metaDescription:'Read study abroad guides for Nepali students from BSB Global Victory. Explore course selection, budget planning, application documents and official sources.'},
  {id:'contact',path:'/contact',label:'Contact',eyebrow:'Your questions are welcome',title:'Contact BSB Global Victory in Butwal',description:'Book a study abroad counselling session or ask about current language classes, fees and batch availability.',metaTitle:'Contact BSB Global Victory | Milanchowk, Butwal',metaDescription:'Contact BSB Global Victory in Milanchowk, Butwal, for study abroad counselling and class enquiries. Find our phone number, email and office location.'},
  {id:'gallery',path:'/gallery',label:'Gallery',eyebrow:'Moments from our journey',title:'The people behind every plan',description:'A look inside our Butwal office, the classroom and the proud moments when students set off for their next chapter.',metaTitle:'Photo Gallery',metaDescription:'Photos from the BSB Global office in Butwal: our team, classes and students setting off to study abroad.'}
];

export const defaultBusinessSettings={
  name:'BSB Global',legalName:'BSB Global Victory Education Consultancy Pvt. Ltd.',descriptor:'Victory Education Consultancy',address:'Milanchowk, Butwal-9, Rupandehi, Nepal',location:'Nepal',
  generalEmail:'info@bsbglobalvictory.com',enquiryEmail:'inquiry@bsbglobalvictory.com',officePhone:'071-591589',officeTel:'+97771591589',mobilePhone:'9857089947',mobileTel:'+9779857089947',whatsapp:'',directionsUrl:'',openingHours:''
} as const;

export type GalleryItem=Photo & {featured:boolean;sortOrder:number};
export const defaultGalleryItems:GalleryItem[]=[
  {id:'office-team-celebration',src:photoSrc('bsb-global-student-team-celebration-butwal.png'),width:1226,height:917,category:'office',alt:'BSB Global staff and students celebrating together at the Butwal office',caption:'Celebrating together with our students and team in Butwal.',featured:true,sortOrder:1},
  {id:'office-reception-gathering',src:photoSrc('bsb-global-student-group-reception-butwal.png'),width:1223,height:917,category:'office',alt:'BSB Global students and staff gathered at the Butwal office reception',caption:'A full house at our Butwal reception.',featured:false,sortOrder:2},
  {id:'office-counselling-desk',src:photoSrc('bsb-global-office-counselling-team-butwal.png'),width:726,height:900,category:'office',alt:'BSB Global counselling team members standing at the Butwal office reception',caption:'Our counselling team at the Butwal office.',featured:true,sortOrder:3},
  {id:'office-team-with-student',src:photoSrc('bsb-global-student-passport-team-butwal.png'),width:737,height:917,category:'office',alt:'BSB Global staff and a student at the Butwal office',caption:'Our team supporting a student at the next step of their journey.',featured:false,sortOrder:4},
  {id:'office-team-selfie',src:photoSrc('bsb-global-student-team-selfie-butwal.png'),width:1226,height:916,category:'office',alt:'BSB Global staff and students gathered inside the Butwal office',caption:'Students and staff at the BSB Global office.',featured:false,sortOrder:5},
  {id:'classes-classroom-session',src:photoSrc('classes-classroom-session.jpeg'),width:1280,height:960,category:'classes',alt:'Students seated at desks during a class session',caption:'A class session in our classroom.',featured:true,sortOrder:6},
  {id:'classes-student-group-butwal',src:photoSrc('classes-student-group-butwal.jpeg'),width:715,height:536,category:'classes',alt:'A large group of students and staff standing together on a street in Butwal',caption:'Our student community in Butwal.',featured:false,sortOrder:7},
  {id:'departures-passport-handover',src:photoSrc('bsb-global-passport-handover-student-butwal.png'),width:735,height:917,category:'departures',alt:'BSB Global staff member supporting a student at the Butwal office',caption:'Supporting a student before their next step.',featured:true,sortOrder:8},
  {id:'departures-airport-students',src:photoSrc('departures-airport-students.jpeg'),width:715,height:953,category:'departures',alt:'Three students wearing farewell scarves outside the international airport in Kathmandu',caption:'Students ready to fly from Kathmandu.',featured:true,sortOrder:9},
  {id:'departures-airport-send-off',src:photoSrc('departures-airport-send-off.jpeg'),width:715,height:1270,category:'departures',alt:'A team member seeing off two students in farewell scarves at the international terminal',caption:'Seeing our students off at the international terminal.',featured:false,sortOrder:10}
];

export const galleryCategories: {id:PhotoCategory;label:string;description:string}[]=[
  {id:'office',label:'Our office & team',description:'The people and the space where conversations about your future begin.'},
  {id:'classes',label:'Classes & community',description:'Students preparing, learning and growing together.'},
  {id:'departures',label:'Student departures',description:'Proud moments as students set out on their journey.'}
];
