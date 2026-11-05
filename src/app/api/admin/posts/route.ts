import {NextResponse} from 'next/server';
import {isSameOrigin,requireAdminApiSession} from '@/server/auth/request';
import {blogPostSchema} from '@/server/blog/schema';
import {createBlogPost} from '@/server/blog/repository';

export const runtime='nodejs';

export async function POST(request:Request) {
  if (!isSameOrigin(request)) return NextResponse.json({message:'Invalid request origin.'},{status:403});
  const auth=await requireAdminApiSession();if (auth.response) return auth.response;
  let body:unknown;try { body=await request.json(); } catch { return NextResponse.json({message:'Invalid post data.'},{status:400}); }
  const parsed=blogPostSchema.safeParse(body);if (!parsed.success) return NextResponse.json({message:parsed.error.issues[0]?.message || 'Check the post and try again.'},{status:400});
  try { return NextResponse.json({id:await createBlogPost(parsed.data)},{status:201}); }
  catch (error) { console.error('Unable to create blog post',error);return NextResponse.json({message:'This slug may already be in use. Please choose another one.'},{status:409}); }
}
