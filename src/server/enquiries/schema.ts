import {z} from 'zod';

const optionalText=(max:number)=>z.string().trim().max(max).optional().default('');

export const enquirySchema=z.object({
  name:z.string().trim().min(2,'Enter your full name.').max(100),
  email:z.string().trim().email('Enter a valid email address.').max(160),
  phone:optionalText(32),
  destination:optionalText(80),
  studyLevel:optionalText(80),
  message:z.string().trim().min(10,'Please add a little more detail to your enquiry.').max(2000),
  consent:z.literal(true,{error:'Please acknowledge the privacy information.'}),
  website:optionalText(200)
});

export type EnquiryInput=z.infer<typeof enquirySchema>;
