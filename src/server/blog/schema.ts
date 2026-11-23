import {z} from 'zod';
import {isAllowedSiteImage} from '@/lib/blob-store';

const slug=z.string().trim().min(3).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/,'Use lowercase words separated by hyphens.');
const coverImage=z.string().trim().max(2048).refine(isAllowedSiteImage,'Upload the feature image through this dashboard.').optional().or(z.literal(''));

export const blogPostSchema=z.object({
  title:z.string().trim().min(8,'Enter a descriptive title.').max(160),
  slug,
  category:z.string().trim().min(2).max(60),
  excerpt:z.string().trim().min(20,'Write a short summary of at least 20 characters.').max(300),
  body:z.string().trim().min(80,'Write at least 80 characters of useful content.').max(20000),
  coverImageUrl:coverImage,
  coverImageAlt:z.string().trim().max(180).optional().or(z.literal('')),
  status:z.enum(['draft','published'])
}).superRefine((value,context)=>{
  if (value.coverImageUrl && !value.coverImageAlt) context.addIssue({code:'custom',path:['coverImageAlt'],message:'Add descriptive alternative text for the feature image.'});
});

export type BlogPostInput=z.infer<typeof blogPostSchema>;
