import {put} from '@vercel/blob';
import {NextResponse} from 'next/server';
import {randomUUID} from 'node:crypto';
import {isSameOrigin,requireAdminApiSession} from '@/server/auth/request';

export const runtime='nodejs';
const types=new Set(['image/jpeg','image/png','image/webp','image/avif']);
const maxBytes=4*1024*1024;

export async function POST(request:Request) {
  if (!isSameOrigin(request)) return NextResponse.json({message:'Invalid request origin.'},{status:403});
  const auth=await requireAdminApiSession();if (auth.response) return auth.response;
  try {
    const form=await request.formData();const file=form.get('image');
    if (!(file instanceof File) || !types.has(file.type) || file.size>maxBytes) return NextResponse.json({message:'Use a JPG, PNG, WebP or AVIF image smaller than 4 MB.'},{status:400});
    const extension=file.type==='image/jpeg'?'jpg':file.type.split('/')[1];
    const blob=await put(`blog/${new Date().getUTCFullYear()}/${randomUUID()}.${extension}`,file,{access:'public',addRandomSuffix:false});
    return NextResponse.json({url:blob.url});
  } catch (error) { console.error('Unable to upload blog image',error);return NextResponse.json({message:'Image upload is not configured. Connect a public Vercel Blob store and try again.'},{status:503}); }
}
