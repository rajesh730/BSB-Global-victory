import type {Metadata} from 'next';
import {AdminPageHeader} from '@/components/admin/AdminPageHeader';
import {BlogPostForm} from '@/components/admin/BlogPostForm';
export const metadata:Metadata={title:'Write blog post',robots:{index:false,follow:false}};
export default function NewBlogPostPage(){return <><AdminPageHeader eyebrow="Content management" title="Write a post"/><BlogPostForm/></>;}
