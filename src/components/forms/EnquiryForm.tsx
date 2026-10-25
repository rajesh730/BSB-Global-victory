'use client';

import {useState, type FormEvent} from 'react';
import Link from 'next/link';
import {destinations} from '@/content/destinations';
import {Icon} from '@/components/ui/Icon';
import {business} from '@/lib/site-config';

const enquiryInbox = business.enquiryEmail;

type Enquiry = {name:string;email:string;phone:string;destination:string;studyLevel:string;message:string;consent:boolean};
const emptyEnquiry:Enquiry={name:'',email:'',phone:'',destination:'',studyLevel:'',message:'',consent:false};

function formatEnquiryDraft(values:Enquiry){
  return [
    'BSB Global — counselling enquiry',
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    `Phone: ${values.phone.trim() || 'Not provided'}`,
    `Destination: ${values.destination || 'Undecided'}`,
    `Intended study level: ${values.studyLevel || 'Not specified'}`,
    `Questions: ${values.message.trim()}`
  ].join('\n');
}

export function EnquiryForm(){
  const [values,setValues]=useState<Enquiry>(emptyEnquiry);
  const [status,setStatus]=useState('');
  const updateField=(field:keyof Enquiry,value:string|boolean)=>{setValues(previous=>({...previous,[field]:value}));setStatus('');};
  const handleSubmit=async(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if(!values.consent){setStatus('Please acknowledge the privacy notice.');return;}
    const draft=formatEnquiryDraft(values);
    if(enquiryInbox){
      window.location.href=`mailto:${enquiryInbox}?subject=${encodeURIComponent('BSB Global counselling enquiry')}&body=${encodeURIComponent(draft)}`;
      setStatus('Your email app should open with the enquiry draft. Please review and send it there.');
      return;
    }
    try{
      await navigator.clipboard.writeText(draft);
      setStatus('Your enquiry has been copied to the clipboard. It has not been sent.');
    }catch{
      setStatus('No verified enquiry inbox is configured yet. Please contact BSB Global through its verified channels after publication.');
    }
  };
  return <form className="enquiry-form" onSubmit={handleSubmit}>
    <div className="form-heading"><span>YOUR ENQUIRY / 01</span><h2>Tell us a little about your plans.</h2><p>No document uploads, no pressure. Start with the basics.</p></div>
    <div className="form-fields">
      <label className="field">Full name <span aria-hidden="true">*</span><input required name="name" autoComplete="name" maxLength={100} placeholder="Your full name" value={values.name} onChange={event=>updateField('name',event.target.value)}/></label>
      <label className="field">Email address <span aria-hidden="true">*</span><input required type="email" name="email" autoComplete="email" maxLength={160} placeholder="you@example.com" value={values.email} onChange={event=>updateField('email',event.target.value)}/></label>
      <label className="field">Phone / WhatsApp (optional)<input type="tel" name="phone" autoComplete="tel" maxLength={32} placeholder="+977 …" value={values.phone} onChange={event=>updateField('phone',event.target.value)}/></label>
      <label className="field">Preferred destination<select name="destination" value={values.destination} onChange={event=>updateField('destination',event.target.value)}><option value="">Still exploring</option>{destinations.map(destination=><option key={destination.slug} value={destination.name}>{destination.name}</option>)}</select></label>
      <label className="field full-field">Intended study level<select name="studyLevel" value={values.studyLevel} onChange={event=>updateField('studyLevel',event.target.value)}><option value="">Not sure yet</option><option>Undergraduate</option><option>Postgraduate</option><option>Diploma / vocational</option><option>Language programme</option><option>Other</option></select></label>
      <label className="field full-field">How can we help? <span aria-hidden="true">*</span><textarea required name="message" rows={5} maxLength={2000} placeholder="Tell us what you want to study and what questions you have…" value={values.message} onChange={event=>updateField('message',event.target.value)}/></label>
    </div>
    <label className="privacy-check"><input type="checkbox" required checked={values.consent} onChange={event=>updateField('consent',event.target.checked)}/><span>I understand this form creates an enquiry draft, and I have read the <Link href="/privacy">privacy information</Link>. <b aria-hidden="true">*</b></span></label>
    <button className="button button-primary form-submit" type="submit">{enquiryInbox?'Open enquiry in email':'Copy enquiry draft'} <Icon name={enquiryInbox?'arrow-up-right':'copy'} size={18}/></button>
    <p className="form-disclosure">{enquiryInbox?'Your email application will handle delivery. The website does not store or transmit your message.':'Preview mode: this form does not send or save enquiries. A verified email address or secure backend is needed for live submissions.'}</p>
    <p className="form-status" role="status" aria-live="polite">{status}</p>
  </form>;
}
