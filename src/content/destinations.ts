import type { Destination } from '@/types/content';

// BSB Global's focus destinations, in priority order.
export const destinations: Destination[] = [
  {
    slug: 'japan', name: 'Japan', seriesLabel: '01 / Study destinations', heading: 'Study in Japan from Nepal.',
    intro: 'Compare Japanese language schools, vocational colleges and university courses, then check the language requirements, costs and application steps that apply to your chosen pathway.',
    cardSummary: 'Compare language school, vocational and university pathways from Nepal.', illustration: '/illustrations/destinations/japan.svg', keyTopics: 'Language · Institutions · Living',
    highlights: [
      {title: 'Japanese language requirements', description: 'Your language preparation depends on your chosen pathway and the programme’s language of instruction. Confirm whether JLPT or NAT-TEST evidence is accepted.'},
      {title: 'Student life', description: 'Understand the city, accommodation options, part-time work conditions and practical living costs.'},
      {title: 'Entry process', description: 'Use official Japan study and immigration resources to verify the Certificate of Eligibility and visa steps.'}
    ],
    checklist: ['Choose between language school, vocational college or university','Check Japanese-language requirements (JLPT / NAT-TEST)','Understand tuition, accommodation and living costs','Organise the institution’s document list','Check official entry and residence guidance'],
    officialSources: [{ label: 'Study in Japan — Immigration and student visas', url: 'https://www.studyinjapan.go.jp/en/planning/immigration-procedures/' }],
    featuredQuestion: {title: 'How can I apply to study in Japan from Nepal?', answer: 'Start by choosing a suitable pathway, then check the institution’s academic and language requirements, fees and deadlines. Requirements differ by provider, so use the institution’s current checklist before preparing documents.'}
  },
  {
    slug: 'united-kingdom', name: 'United Kingdom', seriesLabel: '02 / Study destinations', heading: 'Study in the UK from Nepal.',
    intro: 'Compare UK courses by their content, entry requirements, location, tuition and total living costs—not rankings alone.',
    cardSummary: 'Compare courses, entry requirements, costs and application routes for the UK.', illustration: '/illustrations/destinations/united-kingdom.svg', keyTopics: 'Programmes · Costs · Entry',
    highlights: [
      {title: 'Course structure and entry criteria', description: 'Review programme content, qualification level, assessment approach and institution-specific entry requirements—not course duration alone.'},
      {title: 'Applications', description: 'Research the relevant application route, intake dates and institution-specific documentation.'},
      {title: 'Visa responsibilities', description: 'Review current Student visa eligibility and conditions on GOV.UK.'}
    ],
    checklist: ['Identify programme level and specialisation','Check recognised qualifications and English requirements','Confirm actual course dates and fees','Research accommodation and city living costs','Review the UK Student visa requirements'],
    officialSources: [{ label: 'GOV.UK — Student visa', url: 'https://www.gov.uk/student-visa' }],
    featuredQuestion: {title: 'Can I study in the UK after completing +2 in Nepal?', answer: 'Your options depend on your qualification, grades, subjects and the institution’s published criteria. Some students may consider an undergraduate course or a preparatory pathway where appropriate.'}
  },
  {
    slug: 'south-korea', name: 'South Korea', seriesLabel: '03 / Study destinations', heading: 'Study in South Korea from Nepal.',
    intro: 'Compare Korean-language programmes and university degrees, then check their language requirements, costs and current application conditions.',
    cardSummary: 'Compare Korean-language and university-degree pathways from Nepal.', keyTopics: 'Language · Universities · Visas',
    highlights: [
      {title: 'Korean language', description: 'Many students begin at a university language institute. Check whether your programme is taught in Korean or English and the TOPIK level it requires.'},
      {title: 'Programmes and scholarships', description: 'Compare universities, intake dates and tuition, and research scholarships such as the Global Korea Scholarship (GKS).'},
      {title: 'Visa requirements', description: 'Language-training and degree students apply under different visa types. Confirm current requirements on official Korean government sources.'}
    ],
    checklist: ['Decide between a language programme and a degree','Check TOPIK or English-language requirements','Compare tuition, dormitory and living costs','Prepare the institution’s admission documents','Review current student visa guidance'],
    officialSources: [
      { label: 'Study in Korea — official government study portal', url: 'https://www.studyinkorea.go.kr/en/main.do' },
      { label: 'Korea Visa Portal — visa types and applications', url: 'https://www.visa.go.kr' }
    ],
    featuredQuestion: {title: 'Do I need Korean language skills to study in South Korea?', answer: 'Not always. Some degrees are taught in English, while Korean-taught programmes may require TOPIK evidence. Check the language of instruction and the institution’s exact requirement before applying.'}
  }
];

export function getDestination(slug: string) {return destinations.find(destination => destination.slug === slug);}
