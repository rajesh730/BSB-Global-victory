import {NextResponse} from 'next/server';
import {isSameOrigin,requireAdminApiSession} from '@/server/auth/request';
import {updateEnquirySchema} from '@/server/enquiries/admin-schema';
import {updateEnquiry} from '@/server/enquiries/repository';

export const runtime='nodejs';

export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}) {
  if (!isSameOrigin(request)) return NextResponse.json({message:'Invalid request origin.'},{status:403});
  const auth=await requireAdminApiSession();
  if (auth.response) return auth.response;
  const {id}=await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({message:'Invalid enquiry ID.'},{status:400});
  let body:unknown;
  try { body=await request.json(); } catch { return NextResponse.json({message:'Invalid request body.'},{status:400}); }
  const parsed=updateEnquirySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({message:parsed.error.issues[0]?.message ?? 'Check the enquiry update and try again.'},{status:400});
  try {
    const updated=await updateEnquiry(id,parsed.data.status,parsed.data.internalNote);
    return updated ? NextResponse.json({ok:true}) : NextResponse.json({message:'Enquiry not found.'},{status:404});
  } catch (error) {
    console.error('Unable to update enquiry',error);
    return NextResponse.json({message:'We could not update this enquiry. Please try again.'},{status:500});
  }
}
