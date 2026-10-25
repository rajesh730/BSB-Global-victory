/** Repo-level consistency audit; intentionally has no external dependencies. */
import {readFileSync, existsSync, readdirSync} from 'node:fs';
import {join,resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const project=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const requiredPages=[
 'src/app/page.tsx','src/app/study-abroad/page.tsx','src/app/study-abroad/[slug]/page.tsx',
 'src/app/services/page.tsx','src/app/test-preparation/page.tsx','src/app/about/page.tsx',
 'src/app/resources/page.tsx','src/app/resources/[slug]/page.tsx','src/app/contact/page.tsx',
 'src/app/privacy/page.tsx','src/app/terms/page.tsx','src/app/gallery/page.tsx','src/app/image-credits/page.tsx','src/app/not-found.tsx'
];
const errors=[];
requiredPages.forEach(page=>{if(!existsSync(join(project,page)))errors.push(`Missing route: ${page}`);});
const assets=['public/brand/bsb-global-logo.webp','public/brand/bsb-global-logo-source.jpeg','public/illustrations/hero-journey-globe.svg'];
assets.forEach(asset=>{if(!existsSync(join(project,asset)))errors.push(`Missing asset: ${asset}`);});
const photoSrcs=['src/content/photos.ts','src/content/stock-photos.ts'].flatMap(file=>[...readFileSync(join(project,file),'utf8').matchAll(/src: '([^']+)'/g)].map(match=>match[1]));
photoSrcs.forEach(src=>{if(!existsSync(join(project,'public',src)))errors.push(`Missing photo: ${src}`);});
const articles=JSON.parse(readFileSync(join(project,'src/content/articles.json'),'utf8'));
for (const a of articles) {
 if (!a.slug||!a.title||a.sections.length<3) errors.push(`Incomplete article: ${a.slug}`);
 if(new Set(a.sections.map(s=>s.heading)).size!==a.sections.length)errors.push(`Duplicate headings: ${a.slug}`);
}
const destText=readFileSync(join(project,'src/content/destinations.ts'),'utf8');
const slugs=['japan','united-kingdom','south-korea'];
slugs.forEach(slug=>{if(!destText.includes(`slug: '${slug}'`))errors.push(`Missing country: ${slug}`);});
const pages=findTsx(join(project,'src/app'));
for(const page of pages){const text=readFileSync(page,'utf8');if(text.includes('href="#"'))errors.push(`Empty link in ${page}`);}
function findTsx(folder){return readdirSync(folder,{withFileTypes:true}).flatMap(x=>x.isDirectory()?findTsx(join(folder,x.name)):x.name.endsWith('.tsx')?[join(folder,x.name)]:[]);}
if(errors.length){console.error('Audit FAILED:\n'+errors.map(e=>' - '+e).join('\n'));process.exit(1);}
console.log(`Audit passed: ${requiredPages.length-1} route files including 2 dynamic templates, ${slugs.length} destinations, ${articles.length} articles, ${assets.length} essential assets, ${photoSrcs.length} photos.`);
console.log('IMPORTANT: This checks files and content consistency; run npm run check to verify TypeScript and the production build.');
