# Data storage and backend architecture

## Scope

The public website stays server-rendered and content-led. Backend code lives under `src/server` and is only imported by route handlers or other server-only modules. Browser components must never import storage code, server environment variables or repository code.

All website data is stored as JSON documents in a **private** Vercel Blob store. There is no SQL database and no migration step.

```text
Browser form
  -> POST /api/enquiries
  -> validation and request checks
  -> enquiry repository
  -> document store (src/server/store/documents.ts)
  -> private Vercel Blob store in production, a local folder in development

Admin browser
  -> signed HTTP-only session
  -> /admin and protected admin API routes
  -> enquiry, blog and site repositories
  -> document store

Public page render
  -> site and blog repositories
  -> cached document read (refreshed the moment the dashboard saves)
  -> defaults in src/server/site/defaults.ts if a document is missing or unreadable
```

## Two Blob stores, two tokens

| Store | Access | Token | Holds |
| --- | --- | --- | --- |
| Images | **public** | `BLOB_READ_WRITE_TOKEN` | Gallery, homepage and blog images (see [Vercel Blob media](VERCEL-BLOB-MEDIA.md)) |
| Data | **private** | `BLOB_DATA_READ_WRITE_TOKEN` | Enquiries, blog posts (including drafts), page copy, office details, gallery list |

A store's access mode is fixed when it is created, so data cannot share the public image store: enquiries are personal data and anyone with a public URL could read them. The document store always passes `BLOB_DATA_READ_WRITE_TOKEN` explicitly, so it can never fall back to the public store's token.

## Documents

| Path | Contents | Why this shape |
| --- | --- | --- |
| `enquiries/<id>.json` | One enquiry | One file each, so simultaneous form submissions never touch the same file |
| `content/blog-posts.json` | Every blog post | One read for public pages; slug uniqueness is checked inside the save |
| `content/site-pages.json` | Saved page copy, keyed by page ID | Pages without a saved entry use the default |
| `content/site-settings.json` | Office and contact details | |
| `content/gallery.json` | Gallery and homepage images, in order | Saved as a whole set, as the dashboard edits it |

## Consistency and caching

- **Safe concurrent saves.** Every update reads the document with its ETag and writes with `ifMatch`. If another save got there first the update is retried on the newer version (`updateDocument`), so edits are never silently lost. New enquiries are create-only writes.
- **Admin reads are always fresh.** Dashboard screens and every write read directly from storage (`useCache: false`).
- **Public reads are cached and invalidated on save.** Pages read through Next.js's data cache, tagged per document. Each save calls `revalidateTag`, so the next visitor sees the change immediately and other visitors share one storage read per change.
- **Scale.** The enquiry list and counts read every enquiry document (eight at a time). This is comfortable for hundreds to a few thousand enquiries. Beyond that, add an index document or move enquiries to a database.

## Folders

- `src/app/api/`: HTTP route handlers only.
- `src/server/store/`: the document store (Blob or local folder), ETag updates and cached reads.
- `src/server/enquiries/`: enquiry validation and persistence. Future domains should have their own directory, for example `src/server/appointments/`.
- `src/server/blog/`: managed blog posts (`repository.ts`), the merged list of public resources (`articles.ts`) and Blob image cleanup (`images.ts`). Post formatting is parsed by `src/lib/post-body.ts` and rendered by `src/components/ui/PostBody.tsx`.
- `src/server/site/`: editable page copy, office details and gallery images. `defaults.ts` holds the fallback content.
- `src/server/auth/`: administrator environment configuration, signed sessions and API guards.
- `scripts/`: operator commands, including `npm run data:check`.
- `src/components/`, `src/content/` and `src/app/`: presentation and public content. They must not read storage directly.

## Setup

**Production (Vercel):**

1. In the Vercel project, open **Storage** and create a new Blob store with **private** access.
2. Connect it to the project with the environment variable prefix `BLOB_DATA`. Vercel then adds `BLOB_DATA_READ_WRITE_TOKEN`.
3. Pull it locally with `vercel env pull .env.local`, or copy it into `.env.local`.
4. Run `npm run data:check`. It writes a test document, reads it back, confirms it is **not** readable without the token, then deletes it.
5. Set `NEXT_PUBLIC_ENQUIRY_API_ENABLED=true` when you are ready to accept online enquiries, and redeploy.

**Local development:** set `LOCAL_DATA_DIR=./data/store` instead. The same documents are written as files in that folder, which is git-ignored. If both variables are set, the Blob store is used, so remove `BLOB_DATA_READ_WRITE_TOKEN` locally to avoid editing live data.

When the public flag is false, the contact form preserves the existing mail-draft flow. When it is true, the form sends an enquiry to the data store.

## Security boundaries

- Inputs are validated on the server. Document paths are built from validated IDs and checked against a strict pattern, so request data cannot choose a storage path.
- The public form includes a honeypot and rejects cross-origin browser requests.
- The API deliberately does not log enquiry payloads.
- Production still needs host-level rate limiting or a durable rate-limit provider before paid traffic is sent to the form. In-memory limits are not reliable in serverless deployments.
- Enquiries contain personal data. Define response ownership, retention duration, deletion workflow and access roles before enabling online submissions.
- `/admin` is protected by a signed, HTTP-only, `SameSite=Lax` session cookie. Configure `ADMIN_LOGIN_ID`, `ADMIN_PASSWORD` and an `ADMIN_SESSION_SECRET` of at least 32 characters. These values are not stored in source control or exposed to the browser.
- Login requests perform a same-origin check, use timing-safe credential comparison and have an in-memory five-attempt, 15-minute limit. Add a durable or platform-level limit before production, because in-memory limits do not span serverless instances.
- The current design supports one environment-configured administrator. Move to a dedicated identity provider before adding staff accounts or roles.
- Keep both Blob tokens server-only. Never prefix them with `NEXT_PUBLIC_` or commit `.env.local`.

## Changing a document's shape

There are no migrations. Repositories read documents defensively and fill missing fields from defaults, so add new fields as optional. If a change cannot be handled that way, write a one-off script under `scripts/` that reads, converts and writes the affected documents with `ifMatch`.
