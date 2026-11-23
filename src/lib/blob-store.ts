/**
 * Vercel Blob URLs for this project's store.
 *
 * A store's public files live at https://<store id, lowercased>.public.blob.vercel-storage.com.
 * The id comes from BLOB_STORE_ID, or from BLOB_READ_WRITE_TOKEN (vercel_blob_rw_<id>_<secret>),
 * so uploads work as soon as a store is connected, without extra manual configuration.
 *
 * NEXT_PUBLIC_VERCEL_BLOB_URL has a separate meaning: set it only after `npm run media:upload`
 * has copied the office photos into the store. It switches the built-in photos to Blob delivery.
 */
function storeId():string {
  const configured=process.env.BLOB_STORE_ID?.trim();
  if (configured) return configured.replace(/^store_/,'').toLowerCase();
  const tokenParts=process.env.BLOB_READ_WRITE_TOKEN?.trim().split('_') ?? [];
  return tokenParts.length>=5 && tokenParts[0]==='vercel' ? tokenParts[3].toLowerCase() : '';
}

/** Public origin of this project's Blob store, or '' when no store is connected. */
export function blobStoreOrigin():string {
  const explicit=process.env.NEXT_PUBLIC_VERCEL_BLOB_URL?.trim().replace(/\/+$/,'');
  if (explicit) return new URL(explicit).origin;
  const id=storeId();
  return id ? `https://${id}.public.blob.vercel-storage.com` : '';
}

/** Images the dashboard may publish: files shipped in /public, or files in this project's own store. */
export function isAllowedSiteImage(value:string):boolean {
  if (/^\/(photos|stock-photos)\/[\w./-]+$/.test(value) && !value.includes('..')) return true;
  const origin=blobStoreOrigin();
  return Boolean(origin && value.startsWith(`${origin}/`));
}
