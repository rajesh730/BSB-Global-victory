import type {ReactNode} from 'react';

export function AdminPageHeader({eyebrow,title,children}:{eyebrow:string;title:string;children?:ReactNode}) {
  return <header className="admin-page-header"><div><p>{eyebrow}</p><h1>{title}</h1></div>{children}</header>;
}
