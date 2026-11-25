'use client';

import {useRef, useState, type ChangeEvent, type FormEvent} from 'react';
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

type Values={title:string;slug:string;category:string;excerpt:string;body:string;coverImageUrl:string;coverImageAlt:string;status:'draft'|'published'};
type Post=Partial<Values>&{id?:string;publishedAt?:string|null};
const empty:Values={title:'',slug:'',category:'Study abroad',excerpt:'',body:'',coverImageUrl:'',coverImageAlt:'',status:'draft'};
const slugify=(value:string)=>value.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
const imageTypes='image/jpeg,image/png,image/webp,image/avif';

async function uploadImage(image:File) {
  const data=new FormData();data.set('image',image);data.set('folder','blog');
  const response=await fetch('/api/admin/blog-images',{method:'POST',body:data});
  const result=await response.json() as {url?:string;message?:string};
  if (!response.ok || !result.url) throw new Error(result.message || 'Unable to upload image.');
  return result.url;
}

export function BlogPostForm({post}:{post?:Post}) {
  const router=useRouter();const bodyRef=useRef<HTMLTextAreaElement>(null);
  const [values,setValues]=useState<Values>({...empty,...post});const [savedStatus,setSavedStatus]=useState(post?.status);
  const [message,setMessage]=useState('');const [busy,setBusy]=useState<''|'saving'|'cover'|'inline'|'deleting'>('');
  const [inlineAlt,setInlineAlt]=useState('');
  const update=(key:keyof Values,value:string)=>setValues(current=>({...current,[key]:value}));

  const uploadCover=async(event:ChangeEvent<HTMLInputElement>)=>{const image=event.target.files?.[0];event.target.value='';if (!image) return;setBusy('cover');setMessage('');try {update('coverImageUrl',await uploadImage(image));} catch (error) {setMessage(error instanceof Error?error.message:'Unable to upload image.');} finally {setBusy('');}};

  const uploadInline=async(event:ChangeEvent<HTMLInputElement>)=>{
    const image=event.target.files?.[0];event.target.value='';if (!image) return;
    const alt=inlineAlt.trim().replace(/[[\]]/g,'');if (!alt) {setMessage('Describe the image before inserting it.');return;}
    setBusy('inline');setMessage('');
    try {
      const markup=`![${alt}](${await uploadImage(image)})`;
      const textarea=bodyRef.current;const cursor=textarea?textarea.selectionEnd:values.body.length;
      setValues(current=>{const before=current.body.slice(0,cursor).replace(/\s*$/,'');const after=current.body.slice(cursor).replace(/^\s*/,'');return {...current,body:[before,markup,after].filter(Boolean).join('\n\n')};});
      setInlineAlt('');setMessage('Image inserted into the article. Save the post to keep it.');
    } catch (error) {setMessage(error instanceof Error?error.message:'Unable to upload image.');} finally {setBusy('');}
  };

  const submit=async(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();setBusy('saving');setMessage('');
    const method=post?.id?'PATCH':'POST';const url=post?.id?`/api/admin/posts/${post.id}`:'/api/admin/posts';
    try {
      const response=await fetch(url,{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(values)});
      const result=await response.json() as {id?:string;message?:string};
      if (!response.ok) throw new Error(result.message || 'Unable to save post.');
      setSavedStatus(values.status);
      setMessage(values.status==='published'?'Published. The post is now visible on the resources page.':'Draft saved.');
      if (result.id) router.replace(`/admin/blog/${result.id}`);
      router.refresh();
    } catch (error) {setMessage(error instanceof Error?error.message:'Unable to save post.');} finally {setBusy('');}
  };

  const remove=async()=>{
    if (!post?.id || !window.confirm(`Delete “${values.title || 'this post'}” permanently? Its uploaded images are removed too. This cannot be undone.`)) return;
    setBusy('deleting');setMessage('');
    try {
      const response=await fetch(`/api/admin/posts/${post.id}`,{method:'DELETE'});
      const result=await response.json() as {message?:string};
      if (!response.ok) throw new Error(result.message || 'Unable to delete post.');
      router.push('/admin/blog');router.refresh();
    } catch (error) {setMessage(error instanceof Error?error.message:'Unable to delete post.');setBusy('');}
  };

  const disabled=Boolean(busy);
  return <form className="admin-post-form" onSubmit={submit}>
    {post?.id&&<div className="admin-post-links"><Link href={`/admin/blog/${post.id}/preview`}>Preview saved version</Link>{savedStatus==='published'&&<a href={`/resources/${post.slug}`} target="_blank" rel="noreferrer">View on website ↗</a>}</div>}
    <div className="admin-post-grid">
      <label>Title<input required maxLength={160} value={values.title} onChange={event=>{update('title',event.target.value);if (!post?.id) update('slug',slugify(event.target.value));}}/></label>
      <label>URL slug<input required maxLength={100} pattern="[a-z0-9]+(-[a-z0-9]+)*" value={values.slug} onChange={event=>update('slug',slugify(event.target.value))}/><small>Appears as <code>/resources/{values.slug || 'your-post'}</code>{post?.id&&savedStatus==='published'?' · changing it breaks existing links':''}</small></label>
      <label>Category<input required maxLength={60} value={values.category} onChange={event=>update('category',event.target.value)}/></label>
      <label>Publishing status<select value={values.status} onChange={event=>update('status',event.target.value)}><option value="draft">Draft (visible only in admin)</option><option value="published">Published (visible on the website)</option></select></label>
      <label className="admin-form-full">Summary<input required maxLength={300} value={values.excerpt} onChange={event=>update('excerpt',event.target.value)}/><small>A concise search and card summary.</small></label>
      <label className="admin-form-full">Article content<textarea ref={bodyRef} required rows={18} maxLength={20000} value={values.body} onChange={event=>update('body',event.target.value)} placeholder="Write the article. Use blank lines between paragraphs."/><small>Use clear paragraphs, current official sources and no visa or admission guarantees. {values.body.length.toLocaleString()} / 20,000 characters.</small></label>
    </div>
    <details className="admin-format-help"><summary>Formatting guide</summary><dl>
      <dt><code>## Heading</code></dt><dd>Section heading, listed in the article’s “In this guide” sidebar</dd>
      <dt><code>### Subheading</code></dt><dd>Smaller heading inside a section</dd>
      <dt><code>- item</code> or <code>1. item</code></dt><dd>Bulleted or numbered list, one item per line</dd>
      <dt><code>&gt; text</code></dt><dd>Highlighted note</dd>
      <dt><code>**bold**</code></dt><dd>Bold text</dd>
      <dt><code>[link text](https://…)</code></dt><dd>Link to an official source, or to a page on this site such as <code>/contact</code></dd>
      <dt><code>![description](image url)</code></dt><dd>Image on its own line. Use “Insert image” below instead of typing it.</dd>
    </dl></details>
    <fieldset className="admin-image-field"><legend>Images inside the article</legend>
      <label>Image description (alternative text)<input maxLength={180} value={inlineAlt} onChange={event=>setInlineAlt(event.target.value)} placeholder="e.g. Students reviewing documents at the Butwal office"/></label>
      <label>Insert image at cursor<input type="file" accept={imageTypes} onChange={uploadInline} disabled={disabled}/></label>
      <span>{busy==='inline'?'Uploading image…':'Images are stored in Vercel Blob · JPG, PNG, WebP or AVIF · maximum 4 MB'}</span>
    </fieldset>
    <fieldset className="admin-image-field"><legend>Feature image</legend>
      <label>{values.coverImageUrl?'Replace image':'Upload image'}<input type="file" accept={imageTypes} onChange={uploadCover} disabled={disabled}/></label>
      <span>{busy==='cover'?'Uploading image…':'Shown on the article header, resource cards and social previews · maximum 4 MB'}</span>
      {values.coverImageUrl&&<><Image src={values.coverImageUrl} alt="Selected blog feature image" width={720} height={405}/><label>Image alternative text<input required maxLength={180} value={values.coverImageAlt} onChange={event=>update('coverImageAlt',event.target.value)}/></label><div className="admin-form-actions"><button type="button" onClick={()=>setValues(current=>({...current,coverImageUrl:'',coverImageAlt:''}))} disabled={disabled}>Remove feature image</button></div></>}
    </fieldset>
    <div className="admin-form-actions">
      <button type="submit" className="admin-primary-action" disabled={disabled}>{busy==='saving'?'Saving…':values.status==='published'?'Save & publish':'Save draft'}</button>
      {post?.id&&<button type="button" className="admin-danger-button" onClick={remove} disabled={disabled}>{busy==='deleting'?'Deleting…':'Delete post'}</button>}
      <p role="status">{message}</p>
    </div>
  </form>;
}
