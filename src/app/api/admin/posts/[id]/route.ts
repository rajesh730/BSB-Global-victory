import {NextResponse} from 'next/server';
import {isSameOrigin,requireAdminApiSession} from '@/server/auth/request';
import {blogPostSchema} from '@/server/blog/schema';
import {updateBlogPost} from '@/server/blog/repository';

export const runtime='nodejs';
export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}) {
  if (!isSameOrigin(request)) return NextResponse.json({message:'Invalid request origin.'},{status:403});
  const auth=await requireAdminApiSession();if (auth.response) return auth.response;
  const {id}=await params;if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({message:'Invalid post ID.'},{status:400});
  let body:unknown;try { body=await request.json(); } catch { return NextResponse.json({message:'Invalid post data.'},{status:400}); }
  const parsed=blogPostSchema.safeParse(body);if (!parsed.success) return NextResponse.json({message:parsed.error.issues[0]?.message || 'Check the post and try again.'},{status:400});
  try { return await updateBlogPost(id,parsed.data)?NextResponse.json({ok:true}):NextResponse.json({message:'Post not found.'},{status:404}); }
  catch (error) { console.error('Unable to update blog post',error);return NextResponse.json({message:'This slug may already be in use. Please choose another one.'},{status:409}); }
}
