import type {MetadataRoute} from 'next';
import {business} from '@/lib/site-config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: business.legalName,
    short_name: business.name,
    description: 'Study abroad guidance for Japan, the United Kingdom and South Korea from Butwal, Nepal.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fffefb',
    theme_color: '#28388b',
    icons: [
      {src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png'},
      {src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png'},
      {src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable'}
    ]
  };
}
