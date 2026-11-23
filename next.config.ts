import type { NextConfig } from 'next';

import {blobStoreOrigin} from './src/lib/blob-store';

const blobOrigin=blobStoreOrigin();

const config: NextConfig = {
  // The app is nested inside a wrapper workspace; pin the root to this folder.
  outputFileTracingRoot: __dirname,
  // Lets verification builds use a separate folder so they never disturb a running `npm run dev`.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Only this project's own Blob store, so the optimiser cannot be pointed at other hosts.
    remotePatterns: blobOrigin ? [new URL(`${blobOrigin}/**`)] : []
  },
  async headers() {
    return [{ source: '/(.*)', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
    ] }];
  }
};

export default config;
