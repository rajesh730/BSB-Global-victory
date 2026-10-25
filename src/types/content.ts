import type { IconName } from '@/components/ui/Icon';

export type Destination = {
  slug: string;
  name: string;
  seriesLabel: string;
  heading: string;
  intro: string;
  cardSummary: string;
  illustration?: string;
  keyTopics: string;
  highlights: { title: string; description: string }[];
  checklist: string[];
  officialSources: { label: string; url: string }[];
  featuredQuestion: { title: string; answer: string };
};

export type ArticleSection = { heading: string; body: string };
export type Article = {
  slug: string;
  category: string;
  readingMinutes: number;
  title: string;
  description: string;
  intro: string;
  sections: ArticleSection[];
};

export type PhotoCategory = 'office' | 'classes' | 'departures';
export type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  category: PhotoCategory;
};

/** Third-party photo with the attribution its licence requires. */
export type StockPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
  subject: string;
  creator: string;
  license: string;
  licenseUrl: string;
  sourceName: string;
  sourceUrl: string;
};

export type Service = {
  number: string;
  shortLabel: string;
  icon: IconName;
  title: string;
  summary: string;
  benefits: string[];
};
