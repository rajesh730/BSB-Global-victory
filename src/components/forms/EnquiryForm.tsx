'use client';

import {useState, type FormEvent} from 'react';
import {destinations} from '@/content/destinations';
type Enquiry = {name:string;email:string;phone:string;destination:string;studyLevel:string;message:string;website:string};
const emptyEnquiry:Enquiry={name:'',email:'',phone:'',destination:'',studyLevel:'',message:'',website:''};

/** Sends the enquiry straight to the admin dashboard (via /api/enquiries). Nothing opens on the visitor's device. */
export function EnquiryForm({enquiryEmail}:{enquiryEmail:string}){
  const [values,setValues]=useState<Enquiry>(emptyEnquiry);
  const [status,setStatus]=useState('');
  const [isSending,setIsSending]=useState(false);
  const updateField=(field:keyof Enquiry,value:string)=>{setValues(previous=>({...previous,[field]:value}));setStatus('');};
  const handleSubmit=async(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if(isSending) return;
    setIsSending(true);
    setStatus('Sending your enquiry…');
    try {
      const response=await fetch('/api/enquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(values)});
      const payload=await response.json().catch(()=>({})) as {message?:string};
      if(!response.ok) throw new Error(payload.message || 'We could not send your enquiry.');
      setValues(emptyEnquiry);
      setStatus('Thank you. Your enquiry has been sent. Our team will contact you soon.');
    } catch (error) {
      const fallback=enquiryEmail?` You can also email us at ${enquiryEmail}.`:'';
      setStatus((error instanceof Error ? error.message : 'We could not send your enquiry.')+fallback);
    } finally {
      setIsSending(false);
    }
  };
  return <form className="enquiry-form" onSubmit={handleSubmit}>
    <div className="form-heading"><span>YOUR ENQUIRY / 01</span><h2>Tell us a little about your plans.</h2><p>No document uploads, no pressure. Start with the basics.</p></div>
    <div className="form-fields">
      <label className="honeypot" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" name="website" value={values.website} onChange={event=>updateField('website',event.target.value)}/></label>
      <label className="field">Full name <span aria-hidden="true">*</span><input required name="name" autoComplete="name" maxLength={100} placeholder="Your full name" value={values.name} onChange={event=>updateField('name',event.target.value)}/></label>
      <label className="field">Email address <span aria-hidden="true">*</span><input required type="email" name="email" autoComplete="email" maxLength={160} placeholder="you@example.com" value={values.email} onChange={event=>updateField('email',event.target.value)}/></label>
      <label className="field">Phone / WhatsApp (optional)<input type="tel" name="phone" autoComplete="tel" maxLength={32} placeholder="+977 …" value={values.phone} onChange={event=>updateField('phone',event.target.value)}/></label>
      <label className="field">Preferred destination<select name="destination" value={values.destination} onChange={event=>updateField('destination',event.target.value)}><option value="">Still exploring</option>{destinations.map(destination=><option key={destination.slug} value={destination.name}>{destination.name}</option>)}</select></label>
      <label className="field full-field">Intended study level<select name="studyLevel" value={values.studyLevel} onChange={event=>updateField('studyLevel',event.target.value)}><option value="">Not sure yet</option><option>Undergraduate</option><option>Postgraduate</option><option>Diploma / vocational</option><option>Language programme</option><option>Other</option></select></label>
      <label className="field full-field">How can we help? <span aria-hidden="true">*</span><textarea required name="message" rows={5} maxLength={2000} placeholder="Tell us what you want to study and what questions you have…" value={values.message} onChange={event=>updateField('message',event.target.value)}/></label>
    </div>
    <button className="button button-primary form-submit" type="submit" disabled={isSending}>{isSending?'Sending…':'Send enquiry'}</button>
    <p className="form-disclosure">We will use your details only to respond to your enquiry. Do not send sensitive documents.</p>
    <p className="form-status" role="status" aria-live="polite">{status}</p>
  </form>;
}
