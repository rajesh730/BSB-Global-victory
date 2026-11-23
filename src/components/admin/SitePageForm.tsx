'use client';

import {useState,type FormEvent} from 'react';
import {useRouter} from 'next/navigation';
import type {SitePageDefinition} from '@/server/site/defaults';

type Values=Pick<SitePageDefinition,'eyebrow'|'title'|'description'|'metaTitle'|'metaDescription'>;
export function SitePageForm({page}:{page:SitePageDefinition}){
  const router=useRouter();const [values,setValues]=useState<Values>(page);const [message,setMessage]=useState('');const [saving,setSaving]=useState(false);
  const update=(field:keyof Values,value:string)=>setValues(current=>({...current,[field]:value}));
  const submit=async(event:FormEvent<HTMLFormElement>)=>{event.preventDefault();setSaving(true);setMessage('');try{const response=await fetch(`/api/admin/pages/${page.id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify(values)});const result=await response.json() as {message?:string};if(!response.ok)throw new Error(result.message || 'Unable to save this page.');setMessage('Saved. The public page and search snippet are updated.');router.refresh();}catch(error){setMessage(error instanceof Error?error.message:'Unable to save this page.');}finally{setSaving(false);}};
  return <form className="admin-post-form" onSubmit={submit}><div className="admin-post-grid"><label>Section label<input required maxLength={100} value={values.eyebrow} onChange={event=>update('eyebrow',event.target.value)}/></label><label>Browser title<input required maxLength={60} value={values.metaTitle} onChange={event=>update('metaTitle',event.target.value)}/><small>Keep it specific to the page and location.</small></label><label className="admin-form-full">Page heading<input required maxLength={180} value={values.title} onChange={event=>update('title',event.target.value)}/></label><label className="admin-form-full">Opening text<textarea required rows={4} maxLength={420} value={values.description} onChange={event=>update('description',event.target.value)}/></label><label className="admin-form-full">Search description<textarea required rows={3} maxLength={160} value={values.metaDescription} onChange={event=>update('metaDescription',event.target.value)}/><small>This may appear under the page title in Google results.</small></label></div><div className="admin-form-actions"><button type="submit" className="admin-primary-action" disabled={saving}>{saving?'Saving…':'Save page content'}</button><p role="status">{message}</p></div></form>;
}
