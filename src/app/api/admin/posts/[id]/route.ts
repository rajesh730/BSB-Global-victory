import {NextResponse} from 'next/server';
import {isSameOrigin,requireAdminApiSession} from '@/server/auth/request';
import {blogPostSchema} from '@/server/blog/schema';
import {deleteBlogPost,getBlogPostById,updateBlogPost} from '@/server/blog/repository';
import {deleteUnusedBlogImages,postBlobImages} from '@/server/blog/images';

export const runtime='nodejs';
type Context={params:Promise<{id:string}>};
const validId=(id:string)=>/^[0-9a-f-]{36}$/i.test(id);

export async function PATCH(request:Request,{params}:Context) {
  if (!isSameOrigin(request)) return NextResponse.json({message:'Invalid request origin.'},{status:403});
  const auth=await requireAdminApiSession();if (auth.response) return auth.response;
  const {id}=await params;if (!validId(id)) return NextResponse.json({message:'Invalid post ID.'},{status:400});
  let body:unknown;try { body=await request.json(); } catch { return NextResponse.json({message:'Invalid post data.'},{status:400}); }
  const parsed=blogPostSchema.safeParse(body);if (!parsed.success) return NextResponse.json({message:parsed.error.issues[0]?.message || 'Check the post and try again.'},{status:400});
  try {
    const previous=await getBlogPostById(id);
    if (!previous || !await updateBlogPost(id,parsed.data)) return NextResponse.json({message:'Post not found.'},{status:404});
    const kept=new Set(postBlobImages(parsed.data));
    await deleteUnusedBlogImages(postBlobImages(previous).filter(url=>!kept.has(url)));
    return NextResponse.json({ok:true});
  }
  catch (error) { console.error('Unable to update blog post',error);return NextResponse.json({message:'This slug may already be in use. Please choose another one.'},{status:409}); }
}

export async function DELETE(request:Request,{params}:Context) {
  if (!isSameOrigin(request)) return NextResponse.json({message:'Invalid request origin.'},{status:403});
  const auth=await requireAdminApiSession();if (auth.response) return auth.response;
  const {id}=await params;if (!validId(id)) return NextResponse.json({message:'Invalid post ID.'},{status:400});
  try {
    const post=await getBlogPostById(id);
    if (!post || !await deleteBlogPost(id)) return NextResponse.json({message:'Post not found.'},{status:404});
    await deleteUnusedBlogImages(postBlobImages(post));
    return NextResponse.json({ok:true});
  } catch (error) { console.error('Unable to delete blog post',error);return NextResponse.json({message:'Unable to delete the post. Please try again.'},{status:503}); }
}
