import {readdir,readFile,rm} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {put} from '@vercel/blob';

const photoDirectory=resolve('public/photos');
const deleteLocal=process.argv.includes('--delete-local');
const imagePattern=/\.(avif|jpe?g|png|webp)$/i;
const hasPassportMedia=(filename)=>filename.includes('passport');

if (!existsSync(photoDirectory)) throw new Error('public/photos does not exist.');

const files=(await readdir(photoDirectory)).filter(filename=>imagePattern.test(filename));
if (!files.length) throw new Error('No photo files found in public/photos.');
if (files.some(hasPassportMedia) && process.env.ALLOW_PUBLIC_PASSPORT_MEDIA!=='true') {
  throw new Error('Passport-related images are not uploaded to a public store by default. Confirm consent and redaction, then set ALLOW_PUBLIC_PASSPORT_MEDIA=true for this one migration.');
}

const uploads=[];
for (const filename of files) {
  const localPath=resolve(photoDirectory,filename);
  const pathname=`photos/${filename}`;
  process.stdout.write(`Uploading ${pathname}…\n`);
  const blob=await put(pathname,await readFile(localPath),{access:'public',addRandomSuffix:false,allowOverwrite:true});
  uploads.push({filename,url:blob.url});
}

const baseUrl=new URL(uploads[0].url).origin;
if (!uploads.every(upload=>upload.url.startsWith(`${baseUrl}/photos/`))) throw new Error('Uploads were not written to one Blob store under photos/.');
console.log(`\nUploaded ${uploads.length} photos.`);
console.log(`Set NEXT_PUBLIC_VERCEL_BLOB_URL=${baseUrl} in Vercel and .env.local, then redeploy.`);

if (deleteLocal) {
  for (const upload of uploads) {
    const response=await fetch(upload.url,{method:'HEAD'});
    if (!response.ok) throw new Error(`Blob verification failed for ${upload.filename}; local images were not removed.`);
  }
  for (const upload of uploads) await rm(resolve(photoDirectory,upload.filename));
  console.log('Verified all remote images and removed the local public/photos copies.');
} else {
  console.log('Local files were kept. Re-run with --delete-local only after the deployed site has been checked.');
}
