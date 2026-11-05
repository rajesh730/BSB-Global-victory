import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {AdminPageHeader} from '@/components/admin/AdminPageHeader';
import {BlogPostForm} from '@/components/admin/BlogPostForm';
import {getBlogPostById} from '@/server/blog/repository';
export const metadata:Metadata={title:'Edit blog post',robots:{index:false,follow:false}};
export default async function EditBlogPostPage({params}:{params:Promise<{id:string}>}){const {id}=await params;const post=await getBlogPostById(id);if (!post) notFound();return <><AdminPageHeader eyebrow="Content management" title="Edit post"/><BlogPostForm post={{...post,coverImageUrl:post.coverImageUrl || '',coverImageAlt:post.coverImageAlt || ''}}/></>;}
