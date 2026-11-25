# BSB Global: Next.js Frontend

A designed, content-driven education consultancy website for **BSB Global, Nepal**. This is a professional, modular frontend built with **Next.js 15 App Router, React 19, TypeScript and modern CSS**. It uses the original BSB Global logo and illustrated assets from the approved design direction.

This is **not a deployed website** or a complete CRM, and not a representation that BSB Global’s unverified services and business details are already approved. It includes a backend-ready enquiry boundary that stores data as JSON documents in a private Vercel Blob store (or a local folder in development) when explicitly configured.

## Quick start

Requirements: **Node.js 20.9+**, npm, and internet access for the initial package installation.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Windows users can manually copy `.env.example` to `.env.local`.

```bash
npm run typecheck
npm run audit
npm run build
npm run start
```

`npm run dev` starts the local development server, `npm run build` makes a production build, and `npm run start` serves the production build. `npm run audit` uses only Node.js and checks critical local files and article data.

## Routes

| URL | Purpose |
| --- | --- |
| `/` | Homepage: editorial brand hero, destinations, services, process, articles, FAQ |
| `/study-abroad` | All destinations |
| `/study-abroad/[slug]` | Japan, United Kingdom and South Korea guides with licensed photos |
| `/services` | Six service areas and transparent scope |
| `/test-preparation` | English test requirements and preparation planning |
| `/education-consultancy-butwal` | Local landing page: what a Butwal counselling session covers, with FAQ |
| `/language-classes-butwal` | Local landing page for IELTS, PTE, Japanese and Korean classes |
| `/about` | Mission, principles and company-credential placeholders |
| `/resources` | Student guides index |
| `/resources/[slug]` | Four fully written editorial resources |
| `/contact` | Accessible enquiry-draft form and business contacts |
| `/gallery` | Office, class and departure photos |
| `/image-credits` | Licence credits for stock photos |
| `/privacy`, `/terms` | Draft privacy and terms notices |
| `/admin/login` | Private administrator sign-in |
| `/admin`, `/admin/enquiries` | Protected enquiry dashboard and workflow |
| `/admin/pages`, `/admin/settings`, `/admin/gallery`, `/admin/blog` | Protected editors for page copy and search snippets, office details, gallery images and blog posts |
| `/sitemap.xml`, `/robots.txt` | Auto-generated metadata routes |

Public pages render on request (the root layout is `force-dynamic`) so changes saved in the dashboard appear without a redeploy. If data storage is unavailable, every page falls back to the defaults in `src/server/site/defaults.ts`.

## Folder architecture

```text
bsb-global-nextjs/
├── public/
│   ├── brand/                  # Original and optimised logo
│   ├── icons/                  # UI icons
│   ├── illustrations/          # Hand-authored SVG illustrations
│   ├── photos/                 # Office and student photos (gallery)
│   └── stock-photos/           # Licensed destination photos
├── src/
│   ├── app/                    # App Router pages, metadata, sitemap, robots
│   │   ├── study-abroad/[slug]/
│   │   ├── resources/[slug]/
│   │   └── globals.css         # Design tokens, layout, responsive, motion
│   ├── components/
│   │   ├── layout/             # Header, Footer and main shell
│   │   ├── ui/                 # Buttons, cards, breadcrumbs, page covers
│   │   ├── sections/           # Homepage editorial hero
│   │   └── forms/              # Enquiry draft (client component)
│   ├── content/                # Typed destinations, services and articles
│   ├── lib/                    # Business configuration and SEO helpers
│   └── types/                  # Cross-page TypeScript models
├── scripts/content-audit.mjs           # Dependency-free structure audit
├── docs/                        # Architecture, design, SEO and launch notes
├── next.config.ts
├── tsconfig.json
└── .env.example
```

The default rendering model is **React Server Components**. Only the mobile navigation, scroll enhancement, and enquiry form are client components. Country data, article content and navigation are centralised to avoid copy-and-paste pages.

## Configure business information

Copy `.env.example` to `.env.local`, fill only **verified** public values:

```dotenv
NEXT_PUBLIC_SITE_URL=https://your-actual-domain.com
NEXT_PUBLIC_SITE_VERIFIED=
NEXT_PUBLIC_BUSINESS_ADDRESS=
NEXT_PUBLIC_WHATSAPP_NUMBER=
```

- Never commit `.env.local`.
- Without a public URL (e.g. local development) the site is `noindex` with a disallow-all `robots.txt`.
- Indexing, canonical URLs, the sitemap and business structured data switch on automatically once a public URL is known (`NEXT_PUBLIC_SITE_URL`, or Vercel's production URL). Vercel preview deployments stay `noindex`. Set `NEXT_PUBLIC_SITE_VERIFIED=false` to hide the site from search engines.
- Never put API keys or secrets in any `NEXT_PUBLIC_` variable.

## Enquiries

`src/components/forms/EnquiryForm.tsx` submits enquiries to `/api/enquiries`, which saves them to the data store so they appear in the admin dashboard. No email app is opened.

- By default, the form opens a **prefilled email draft** addressed to `business.enquiryEmail` (inquiry@bsbglobalvictory.com) that the visitor must send using their email app.
- If `enquiryEmail` is ever emptied, it falls back to a **copy-to-clipboard enquiry draft** and explicitly says nothing was sent.
- It does **not** upload documents. When online submissions are disabled, it does not persist personal information or falsely display “enquiry submitted.”
- The optional `POST /api/enquiries` route validates input, and stores each enquiry as its own document in the private Vercel Blob data store. Configure a production rate limit, retention policy, response ownership and monitoring before enabling it. Do not send emails using exposed client-side credentials.

See [Database and backend architecture](docs/DATABASE-ARCHITECTURE.md) for the private Blob data store, local development setup and security boundaries.

## Admin dashboard

`/admin` is a protected workspace for reviewing counselling enquiries (new, contacted, in progress or closed) and for managing website content: page headings and search snippets, office contact details and hours, the gallery and homepage photo mosaic, and blog posts. It is deliberately separate from the public website chrome and is never indexed.

1. Set `ADMIN_LOGIN_ID`, `ADMIN_PASSWORD` and a unique 32+ character `ADMIN_SESSION_SECRET` in `.env.local` (or in your deployment environment).
2. Connect a **private** Vercel Blob store for data (`BLOB_DATA_READ_WRITE_TOKEN`) and run `npm run data:check`, or set `LOCAL_DATA_DIR=./data/store` for local development.
   Image uploads (blog and gallery) need a **public** Vercel Blob store connected to the project (`BLOB_READ_WRITE_TOKEN`). The store URL is derived automatically; see [Vercel Blob media](docs/VERCEL-BLOB-MEDIA.md).
3. Open `http://localhost:3000/admin/login` and sign in with the configured login ID and password.

### Blog posts

Posts written at `/admin/blog` appear on `/resources`, the homepage reading list, the sitemap and each post's own `/resources/[slug]` page as soon as they are published. A published post with the same slug as a built-in guide replaces it.

- **Formatting:** `## Heading` (listed in the article's sidebar), `### Subheading`, `- bullets`, `1. numbered lists`, `> notes`, `**bold**` and `[links](https://…)`. Posts are rendered as React elements, never raw HTML, and only `https`, `mailto`, `tel` and same-site links are made clickable.
- **Images:** the feature image and images inside the article are uploaded to the public Vercel Blob store (`blog/` folder). Only images from that store or `/public` are accepted.
- **Drafts and preview:** drafts are visible only in the dashboard; use **Preview saved version** to check a post before publishing.
- **Delete:** deleting a post, or replacing or removing an image, also deletes the Blob files no other post or gallery item still uses.

Admin sessions are signed and stored in HTTP-only cookies. Credentials and Blob tokens must remain server-only; do not add any of them to variables beginning with `NEXT_PUBLIC_`. The local login rate limit is a useful first layer, but production should also have platform-level rate limiting before the dashboard is made internet-accessible.

## Deploy from GitHub (recommended)

1. In Vercel, choose **Add New → Project** and import `rajesh730/BSB-Global-victory`.
2. Keep the detected defaults (Framework: Next.js, root directory: `./`).
3. Optionally add `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_BUSINESS_ADDRESS` and `NEXT_PUBLIC_WHATSAPP_NUMBER` under Environment Variables.
4. Deploy. Every push to `main` then redeploys production, and pull requests get preview URLs.

GitHub Actions (`.github/workflows/ci.yml`) runs lint, typecheck, the content audit and a production build on every push and pull request.

## Deploy to Vercel from the command line

Deploy from **this folder** (`bsb-global-nextjs`), never from the outer workspace folder, which contains unrelated files.

```powershell
npm run deploy        # same as: npx vercel@latest --prod
```

The first run asks you to log in and to confirm the project settings; accept the defaults (Vercel detects Next.js). Running `npm run deploy` from the outer folder forwards to this folder.

- Production gets search indexing, canonical URLs, the sitemap and structured data automatically, using Vercel's production URL. Preview deployments stay `noindex`.
- After connecting a custom domain in Vercel (Settings → Domains), add the environment variable `NEXT_PUBLIC_SITE_URL=https://your-domain` and redeploy so canonical URLs and the sitemap use it.
- Dependencies are pinned to patched releases (`next@15.5.28`, `react@19.1.10`, `postcss` override); `npm audit` should report 0 vulnerabilities before each deploy.

## Design and content adjustments

- Design tokens and responsive layouts: `src/app/globals.css`.
- Navigation: `src/lib/site-config.ts` and `src/components/layout/Header.tsx`.
- Countries and official external links: `src/content/destinations.ts`.
- Service descriptions: `src/content/services.ts`.
- Articles: `src/content/articles.json`.
- Company name, establishment date, emails and phone numbers: `business` in `src/lib/site-config.ts`.
- Office address and WhatsApp number: `.env.local` (`NEXT_PUBLIC_BUSINESS_ADDRESS`, `NEXT_PUBLIC_WHATSAPP_NUMBER`).
- Logo: `public/brand/bsb-global-logo.webp` (source in `bsb-global-logo-source.jpeg`).
- Destination and guide photos: freely licensed (CC0 / CC BY / CC BY-SA) images from Wikimedia Commons and StockSnap in `public/stock-photos/`, listed with their required credits in `src/content/stock-photos.ts`. Credits appear under each photo and on `/image-credits`; keep them when replacing images. Do not use photos copied from Google Images unless you hold the rights.
- Verification builds: `NEXT_DIST_DIR=.next-verify npx next build` builds into a separate folder so a running `npm run dev` is not disturbed.
- Office and student photos: files in `public/photos/`, listed in `src/content/photos.ts`. To add one, copy the file into `public/photos/` with a lowercase-hyphenated name, then add an entry with its real width/height, alt text, caption and category (`office`, `classes` or `departures`). It appears on `/gallery` automatically; `npm run audit` flags any listed file that is missing.

See `docs/DESIGN-SYSTEM.md`, `docs/ARCHITECTURE.md`, `docs/SEO-CONTENT.md` and `docs/LAUNCH-CHECKLIST.md`.

## Scope and verification

The country guides and services are **proposed information architecture**, not confirmation that BSB Global offers every service or has approval to recruit to every location. This project does not claim accreditations, university partnerships, success rates, pricing, team biographies, customer testimonials or guaranteed visa outcomes. Add only evidence-backed claims approved by the business.

Before launch, confirm the consultancy’s licence and disclosure obligations applicable in Nepal, legal entity, office address, actual service and fees, privacy processes, domain, and working enquiry destination. Official destination links must be rechecked immediately before publication and whenever rules change.
