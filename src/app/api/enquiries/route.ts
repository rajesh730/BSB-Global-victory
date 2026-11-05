import {NextResponse} from 'next/server';
import {getDatabaseConfig} from '@/server/db/config';
import {createEnquiry} from '@/server/enquiries/repository';
import {enquirySchema} from '@/server/enquiries/schema';

export const runtime='nodejs';

export async function POST(request:Request) {
  try {
    if (!getDatabaseConfig()) return NextResponse.json({message:'Online enquiries are not configured.'},{status:503});
  } catch {
    return NextResponse.json({message:'Online enquiries are not configured.'},{status:503});
  }
  const origin=request.headers.get('origin');
  if (origin && origin!==new URL(request.url).origin) return NextResponse.json({message:'Invalid request origin.'},{status:403});

  let body:unknown;
  try { body=await request.json(); } catch { return NextResponse.json({message:'Invalid request body.'},{status:400}); }
  const parsed=enquirySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({message:parsed.error.issues[0]?.message ?? 'Check the form and try again.'},{status:400});
  if (parsed.data.website) return NextResponse.json({ok:true},{status:201});

  try {
    const enquiry=await createEnquiry(parsed.data);
    return NextResponse.json({ok:true,id:enquiry.id},{status:201});
  } catch (error) {
    console.error('Unable to store enquiry',error);
    return NextResponse.json({message:'We could not save your enquiry. Please try again or contact us by email.'},{status:500});
  }
}
