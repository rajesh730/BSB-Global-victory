import type { SVGProps, ReactNode } from 'react';

export type IconName = 'arrow-up-right' | 'arrow-right' | 'chevron-down' | 'menu' | 'close' | 'check' | 'globe' | 'book' | 'compass' | 'file' | 'mail' | 'phone' | 'map' | 'clock' | 'external' | 'copy' | 'shield';
type Props = SVGProps<SVGSVGElement> & {name: IconName; size?: number};

export function Icon({name, size = 20, ...props}: Props) {
  const shared = {width:size,height:size,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.8,strokeLinecap:'round' as const,strokeLinejoin:'round' as const,'aria-hidden':true as const};
  const shapes: Record<IconName, ReactNode> = {
    'arrow-up-right': <><path d="M7 17 17 7M8 7h9v9"/></>,
    'arrow-right': <><path d="M4 12h16m-7-7 7 7-7 7"/></>,
    'chevron-down': <><path d="m6 9 6 6 6-6"/></>,
    'menu': <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    'close': <><path d="M6 6l12 12M18 6 6 18"/></>,
    'check': <><path d="m5 12 4 4L19 6"/></>,
    'globe': <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-5 4-5 14 0 18M12 3c5 4 5 14 0 18"/></>,
    'book': <><path d="M12 5C9 3 6 3 3 4v15c3-1 6-1 9 1m0-15c3-2 6-2 9-1v15c-3-1-6-1-9 1V5Z"/></>,
    'compass': <><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/></>,
    'file': <><path d="M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm7 0v5h5M9 13h6M9 17h6"/></>,
    'mail': <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
    'phone': <><path d="M7 3H5a2 2 0 0 0-2 2c0 9 7 16 16 16a2 2 0 0 0 2-2v-2l-5-2-2 2c-3-1-6-4-7-7l2-2-2-5Z"/></>,
    'map': <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Zm6-3v15m6-12v15"/></>,
    'clock': <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/></>,
    'external': <><path d="M14 4h6v6M20 4l-9 9"/><path d="M20 14v5H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></>,
    'copy': <><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></>,
    'shield': <><path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z"/><path d="m9 12 2 2 4-4"/></>
  };
  return <svg {...shared} {...props}>{shapes[name]}</svg>;
}
