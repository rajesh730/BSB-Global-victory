import type {ReactNode} from 'react';

export function Eyebrow({children, light = false}: {children: ReactNode; light?: boolean}) {
  return <p className={`eyebrow${light ? ' eyebrow-light' : ''}`}>{children}</p>;
}
