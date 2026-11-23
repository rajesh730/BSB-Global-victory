import type {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {AdminPageHeader} from '@/components/admin/AdminPageHeader';
import {PostBody} from '@/components/ui/PostBody';
import {isAllowedSiteImage} from '@/lib/blob-store';
import {parsePostBody} from '@/lib/post-body';
import {getBlogPostById} from '@/server/blog/repository';

export const metadata:Metadata={title:'Preview blog post',robots:{index:false,follow:false}};
export default async function PreviewBlogPostPage({params}:{params:Promise<{id:string}>}) {
  const {id}=await params;const post=await getBlogPostById(id).catch(()=>null);if (!post) notFound();
  return <><AdminPageHeader eyebrow={`Preview · ${post.status}`} title={post.title}><Link href={`/admin/blog/${post.id}`} className="admin-primary-action">Back to editor</Link></AdminPageHeader>
    <section className="admin-panel admin-post-preview">
      <p className="admin-post-preview-meta">{post.category} · /resources/{post.slug}</p>
      <p className="admin-post-preview-excerpt">{post.excerpt}</p>
      {post.coverImageUrl&&<Image src={post.coverImageUrl} alt={post.coverImageAlt || post.title} width={1200} height={675} sizes="(max-width:880px) 100vw, 760px"/>}
      <div className="article-content"><PostBody blocks={parsePostBody(post.body,isAllowedSiteImage)}/></div>
    </section></>;
}
