import type { NextConfig } from 'next';

const blobBaseUrl=process.env.NEXT_PUBLIC_VERCEL_BLOB_URL?.trim().replace(/\/+$/, '');

const config: NextConfig = {
  // The app is nested inside a wrapper workspace; pin the root to this folder.
  outputFileTracingRoot: __dirname,
  // Lets verification builds use a separate folder so they never disturb a running `npm run dev`.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: blobBaseUrl ? [new URL(`${blobBaseUrl}/**`)] : []
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
