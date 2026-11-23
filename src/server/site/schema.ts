import {z} from 'zod';
import {sitePageDefinitions} from './defaults';
import {isAllowedSiteImage} from '@/lib/blob-store';

const pageId=z.enum(sitePageDefinitions.map(page=>page.id) as [string,...string[]]);
const required=z.string().trim().min(2).max(240);
export const sitePageSchema=z.object({
  eyebrow:required.max(100),title:required.max(180),description:required.max(420),metaTitle:required.max(60),metaDescription:required.max(160)
});
export const sitePageIdSchema=pageId;

const optionalUrl=z.string().trim().url().max(2048).or(z.literal(''));
const telephone=z.string().trim().max(40);
export const businessSettingsSchema=z.object({
  name:required.max(100),legalName:required.max(180),descriptor:required.max(120),address:required.max(260),location:required.max(100),generalEmail:z.string().trim().email().max(160),enquiryEmail:z.string().trim().email().max(160),officePhone:telephone,officeTel:telephone,mobilePhone:telephone,mobileTel:telephone,whatsapp:telephone,directionsUrl:optionalUrl,openingHours:z.string().trim().max(1000)
});

const imageUrl=z.string().trim().min(1).max(2048).refine(
  isAllowedSiteImage,
  'Use a local /photos/ image or upload an image through this dashboard.'
);
const galleryItemSchema=z.object({
  id:z.string().trim().min(3).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),src:imageUrl,width:z.number().int().min(100).max(10000),height:z.number().int().min(100).max(10000),category:z.enum(['office','classes','departures']),alt:required.max(180),caption:required.max(240),featured:z.boolean(),sortOrder:z.number().int().min(1).max(999)
});
export const galleryItemsSchema=z.object({items:z.array(galleryItemSchema).min(1).max(80).superRefine((items,context)=>{if(new Set(items.map(item=>item.id)).size!==items.length)context.addIssue({code:'custom',message:'Each gallery image needs a unique ID.'});})});

export type SitePageInput=z.infer<typeof sitePageSchema>;
export type BusinessSettingsInput=z.infer<typeof businessSettingsSchema>;
export type GalleryItemsInput=z.infer<typeof galleryItemsSchema>;
