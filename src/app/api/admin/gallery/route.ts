import {NextResponse} from 'next/server';
import {isSameOrigin,requireAdminApiSession} from '@/server/auth/request';
import {getGalleryItems,saveGalleryItems} from '@/server/site/repository';
import {galleryItemsSchema} from '@/server/site/schema';

export const runtime='nodejs';
export async function GET(){const auth=await requireAdminApiSession();if(auth.response)return auth.response;try{return NextResponse.json({items:await getGalleryItems()});}catch{return NextResponse.json({message:'Database setup is needed before the gallery can be managed.'},{status:503});}}
export async function PUT(request:Request){
  if(!isSameOrigin(request))return NextResponse.json({message:'Invalid request origin.'},{status:403});
  const auth=await requireAdminApiSession();if(auth.response)return auth.response;
  let body:unknown;try{body=await request.json();}catch{return NextResponse.json({message:'Invalid gallery data.'},{status:400});}
  const parsed=galleryItemsSchema.safeParse(body);if(!parsed.success)return NextResponse.json({message:parsed.error.issues[0]?.message || 'Check the gallery and try again.'},{status:400});
  try{await saveGalleryItems(parsed.data);return NextResponse.json({ok:true});}catch(error){console.error('Unable to save gallery',error);return NextResponse.json({message:'Database setup is needed before the gallery can be saved.'},{status:503});}
}
