# Architecture and Engineering Decisions

## Overview

**Rendering:** Next.js App Router + React Server Components. Client components are used only for stateful interactions (responsive navigation and contact-draft form) and progressive viewport reveal behaviour. Data and public-facing content are maintained separately from page components.

**Architecture priorities:** predictability, static renderability, content governance, accessibility, low dependency count, clear concerns and no hidden server-side state. The application is a frontend with no database or email-sending endpoint.

```text
Typed content in src/content
           │
           ├── Static route pages under src/app
           │          └── Reusable components: cards, heroes, CTA, article layouts
           │
           ├── generateStaticParams() on destination and article templates
           │
           └── Route metadata/sitemap -> verification gate

Public branding / illustration assets -> next/image -> accessible layout
Verified public configuration -> site shell + footer + email draft form
```

## Content model

- `Destination`: slug, name, hero summary, 3 useful considerations, checklist, official guidance links, common question.
- `Article`: slug, category, reading time, introduction, series of structured sections.
- `Service`: identifying number, short description, bullet-point scope.
- `src/lib/site-config.ts`: business contact configuration, verified public origin, SEO metadata, navigation.

The three focus destinations (Japan, United Kingdom, South Korea) and four articles are model-driven, so changing a destination label updates link and page content wherever reused. Authoritative rules must be updated manually and reviewed; no live university feed is claimed.

## Deployment readiness

1. Install packages, run `npm run audit`, `npm run typecheck` and `npm run build`.
2. Verify actual services, licence/disclosures, fee schedule, legal pages, images and domain.
3. Confirm intended contact channel and deploy appropriate secure form submission if email drafts are not sufficient.
4. Set `NEXT_PUBLIC_SITE_URL` to verified HTTPS origin.
5. Indexing switches on automatically once a public URL is known; set `NEXT_PUBLIC_SITE_VERIFIED=false` to keep the site out of search engines.
6. Deploy on a Node-compatible Next.js host such as Vercel, Render or an appropriate Node hosting environment.
7. Monitor access and error logs, Search Console indexing and Core Web Vitals after deployment.

## Security / privacy boundaries

- Backend secrets MUST be stored only in server environment variables and never use `NEXT_PUBLIC_`.
- The current form does not submit to any API or store student data, reducing initial data-collection risk.
- Security response headers cover sniffing, referrer information and unnecessary device permissions.
- Consider a tested Content-Security-Policy before live deployment; it depends on final integrations and must not break scripts/fonts.
- Add rate limiting and abuse controls if an API or server action is later added.
- Add data retention, access controls and consent mechanics if analytics or a CRM is introduced.

## Accessibility decisions

- Single content landmark per page, visible skip link, semantic nav, list, headings, labelled fields and accessible interactive controls.
- Focus indicators and 44px-ish mobile targets, plus constrained line lengths and explicit typography hierarchy.
- Native `<details>` FAQ, no needless JavaScript accordion.
- Reduced-motion support and content visible without scroll reveal JS.
- Decorative SVGs use empty alt/aria-hidden; meaningful external links have real destinations.

## Known limitations

- No executable production build was possible within the creation environment due to npm registry DNS failure.
- There is no production form ingestion, calendar, analytics, map, CRM, database or translated Nepali copy.
- Website copy is a professionally drafted starting point and must be verified by the actual business owner.
