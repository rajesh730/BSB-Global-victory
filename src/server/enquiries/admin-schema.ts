import {z} from 'zod';

export const enquiryStatuses=['new','contacted','in_progress','closed'] as const;
export type EnquiryStatus=typeof enquiryStatuses[number];

export const updateEnquirySchema=z.object({
  status:z.enum(enquiryStatuses),
  internalNote:z.string().trim().max(2000).optional()
});
