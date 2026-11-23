import {put} from '@vercel/blob';
import {NextResponse} from 'next/server';
import {randomUUID} from 'node:crypto';
import {isSameOrigin,requireAdminApiSession} from '@/server/auth/request';

export const runtime='nodejs';
const types=new Set(['image/jpeg','image/png','image/webp','image/avif']);
// Vercel functions accept request bodies up to 4.5 MB; stay below that.
const maxBytes=4*1024*1024;
const folders=new Set(['blog','gallery']);

export async function POST(request:Request) {
  if (!isSameOrigin(request)) return NextResponse.json({message:'Invalid request origin.'},{status:403});
  const auth=await requireAdminApiSession();if (auth.response) return auth.response;
  if (!process.env.BLOB_READ_WRITE_TOKEN) return NextResponse.json({message:'Image upload is not configured. Connect a public Vercel Blob store to this project.'},{status:503});
  try {
    const form=await request.formData();const file=form.get('image');
    const requestedFolder=String(form.get('folder') || 'blog');const folder=folders.has(requestedFolder)?requestedFolder:'blog';
    if (!(file instanceof File) || !types.has(file.type) || file.size>maxBytes) return NextResponse.json({message:'Use a JPG, PNG, WebP or AVIF image smaller than 4 MB.'},{status:400});
    const extension=file.type==='image/jpeg'?'jpg':file.type.split('/')[1];
    const blob=await put(`${folder}/${new Date().getUTCFullYear()}/${randomUUID()}.${extension}`,file,{access:'public',addRandomSuffix:false,contentType:file.type});
    return NextResponse.json({url:blob.url});
  } catch (error) {
    console.error('Unable to upload image',error);
    const message=error instanceof Error && /private access|private store/i.test(error.message)
      ? 'The connected Blob store is private, so website visitors could not see uploaded images. Connect a public Blob store to this project.'
      : 'Image upload failed. Check the Vercel Blob connection and try again.';
    return NextResponse.json({message},{status:503});
  }
}
