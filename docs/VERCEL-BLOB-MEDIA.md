# Vercel Blob media delivery

Public office and gallery photos can be delivered from a public Vercel Blob store instead of being included in the website deployment. Vercel Blob provides a public CDN URL; Next.js then applies responsive image optimisation for each rendered size.

## One-time setup

1. In the Vercel project, open **Storage** and create a **public** Blob store. Connect it to this project.
2. Add the store's server-only `BLOB_READ_WRITE_TOKEN` to `.env.local`. Vercel adds this value to the linked project's environment automatically; use `vercel env pull .env.local` after linking the local directory.
3. Review the two passport-related images. If all people have provided documented consent and the passport data has been redacted, add `ALLOW_PUBLIC_PASSPORT_MEDIA=true` to `.env.local` for the migration. Otherwise, remove the files from `public/photos` and the gallery before continuing.
4. Upload the local office/gallery photos:

   ```powershell
   npm run media:upload
   ```

5. Copy the printed `NEXT_PUBLIC_VERCEL_BLOB_URL` value into the Vercel project environment variables and `.env.local`, then redeploy.
6. Check the live website, gallery and social preview. Only then remove local photo files:

   ```powershell
   npm run media:remove-local
   ```

The removal command verifies every uploaded URL before it removes files. Do not delete `public/photos` manually.

## Privacy note

The passport/ID handover photos require documented consent and confirmation that personal data is not readable before they are uploaded to a public Blob store. Remove or redact them if that cannot be confirmed.
