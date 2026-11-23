import {NextResponse} from 'next/server';
import {isSameOrigin,requireAdminApiSession} from '@/server/auth/request';
import {getSitePage,saveSitePage} from '@/server/site/repository';
import {sitePageIdSchema,sitePageSchema} from '@/server/site/schema';

export const runtime='nodejs';
export async function GET(_:Request,{params}:{params:Promise<{id:string}>}){
  const auth=await requireAdminApiSession();if(auth.response)return auth.response;
  const {id}=await params;const parsedId=sitePageIdSchema.safeParse(id);if(!parsedId.success)return NextResponse.json({message:'Unknown page.'},{status:404});
  try{return NextResponse.json({page:await getSitePage(parsedId.data)});}catch{return NextResponse.json({message:'Database setup is needed before site content can be managed.'},{status:503});}
}
export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}){
  if(!isSameOrigin(request))return NextResponse.json({message:'Invalid request origin.'},{status:403});
  const auth=await requireAdminApiSession();if(auth.response)return auth.response;
  const {id}=await params;const parsedId=sitePageIdSchema.safeParse(id);if(!parsedId.success)return NextResponse.json({message:'Unknown page.'},{status:404});
  let body:unknown;try{body=await request.json();}catch{return NextResponse.json({message:'Invalid page content.'},{status:400});}
  const parsed=sitePageSchema.safeParse(body);if(!parsed.success)return NextResponse.json({message:parsed.error.issues[0]?.message || 'Check the page content and try again.'},{status:400});
  try{await saveSitePage(parsedId.data,parsed.data);return NextResponse.json({ok:true});}catch(error){console.error('Unable to save site page',error);return NextResponse.json({message:'Database setup is needed before site content can be saved.'},{status:503});}
}
