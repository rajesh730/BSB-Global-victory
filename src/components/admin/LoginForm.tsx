'use client';

import {useState, type FormEvent} from 'react';
import {useRouter} from 'next/navigation';

export function LoginForm({isConfigured}:{isConfigured:boolean}) {
  const router=useRouter();
  const [loginId,setLoginId]=useState('');
  const [password,setPassword]=useState('');
  const [message,setMessage]=useState('');
  const [isSubmitting,setIsSubmitting]=useState(false);
  const submit=async(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if (!isConfigured) return;
    setIsSubmitting(true);setMessage('');
    try {
      const response=await fetch('/api/admin/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({loginId,password})});
      const data=await response.json() as {message?:string};
      if (!response.ok) throw new Error(data.message || 'Unable to sign in.');
      router.replace('/admin');router.refresh();
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Unable to sign in.'); }
    finally { setIsSubmitting(false); }
  };
  return <form className="admin-login-form" onSubmit={submit}>
    <label>Login ID<input required autoComplete="username" value={loginId} onChange={event=>setLoginId(event.target.value)} disabled={!isConfigured}/></label>
    <label>Password<input required type="password" autoComplete="current-password" value={password} onChange={event=>setPassword(event.target.value)} disabled={!isConfigured}/></label>
    <button type="submit" disabled={!isConfigured || isSubmitting}>{isSubmitting?'Signing in…':'Sign in'}</button>
    {message && <p role="status" className="admin-form-message">{message}</p>}
  </form>;
}
