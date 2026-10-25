import type { Destination } from '@/types/content';

// BSB Global's focus destinations, in priority order.
export const destinations: Destination[] = [
  {
    slug: 'japan', name: 'Japan', seriesLabel: '01 / Study destinations', heading: 'Study in Japan.',
    intro: 'Explore Japanese language schools, vocational colleges and universities, the Japanese level each one expects, and the practical steps of student entry.',
    cardSummary: 'Language school, vocational and university pathways with a clearly organised plan.', illustration: '/illustrations/destinations/japan.svg', keyTopics: 'Language · Institutions · Living',
    highlights: [
      {title: 'Language planning', description: 'Most pathways start with Japanese study. Confirm the language of instruction and whether JLPT or NAT-TEST results are expected.'},
      {title: 'Student life', description: 'Understand the city, accommodation options, part-time work conditions and practical living costs.'},
      {title: 'Entry process', description: 'Use official Japan study and immigration resources to verify the Certificate of Eligibility and visa steps.'}
    ],
    checklist: ['Choose between language school, vocational college or university','Check Japanese-language requirements (JLPT / NAT-TEST)','Understand tuition, accommodation and living costs','Organise the institution’s document list','Check official entry and residence guidance'],
    officialSources: [{ label: 'Study in Japan — Immigration and student visas', url: 'https://www.studyinjapan.go.jp/en/planning/immigration-procedures/' }],
    featuredQuestion: {title: 'Do all programmes in Japan require the same Japanese level?', answer: 'No. The language of instruction and required proficiency depend on the institution and programme. Verify requirements directly.'}
  },
  {
    slug: 'united-kingdom', name: 'United Kingdom', seriesLabel: '02 / Study destinations', heading: 'Study in the United Kingdom.',
    intro: 'Look beyond university rankings and compare programme content, duration, entry rules and costs.',
    cardSummary: 'Specialised courses, application schedules and clear budget planning.', illustration: '/illustrations/destinations/united-kingdom.svg', keyTopics: 'Programmes · Duration · Entry',
    highlights: [
      {title: 'Course duration', description: 'Check whether the qualification structure fits your academic and career plans.'},
      {title: 'Applications', description: 'Research the relevant application route, intake dates and institution-specific documentation.'},
      {title: 'Visa responsibilities', description: 'Review current Student visa eligibility and conditions on GOV.UK.'}
    ],
    checklist: ['Identify programme level and specialisation','Check recognised qualifications and English requirements','Confirm actual course dates and fees','Research accommodation and city living costs','Review the UK Student visa requirements'],
    officialSources: [{ label: 'GOV.UK — Student visa', url: 'https://www.gov.uk/student-visa' }],
    featuredQuestion: {title: 'Are all UK master’s courses the same length?', answer: 'No. Course length and structure vary by programme and university. Compare the published course specification before choosing.'}
  },
  {
    slug: 'south-korea', name: 'South Korea', seriesLabel: '03 / Study destinations', heading: 'Study in South Korea.',
    intro: 'Compare Korean-language programmes and university degrees, the TOPIK level each one expects, living costs and the current student visa rules.',
    cardSummary: 'Korean-language and degree pathways with a realistic living budget.', keyTopics: 'Language · Universities · Visas',
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
    featuredQuestion: {title: 'Do I need to speak Korean to study in South Korea?', answer: 'Not always. Some degree programmes are taught in English, but many require a TOPIK result, and daily life is easier with Korean. Check each programme’s published language requirement.'}
  }
];

export function getDestination(slug: string) {return destinations.find(destination => destination.slug === slug);}
