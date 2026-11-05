const blobBaseUrl=process.env.NEXT_PUBLIC_VERCEL_BLOB_URL?.trim().replace(/\/+$/,'');

/**
 * Uses Vercel Blob for public gallery media once configured. The local path is
 * intentionally retained as a deployment-safe fallback until migration is complete.
 */
export function photoSrc(filename:string) {
  return blobBaseUrl ? `${blobBaseUrl}/photos/${filename}` : `/photos/${filename}`;
}
