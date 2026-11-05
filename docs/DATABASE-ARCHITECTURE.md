# Database and backend architecture

## Scope

The public website stays server-rendered and content-led. Backend code lives under `src/server` and is only imported by route handlers or other server-only modules. Browser components must never import database clients, server environment variables or repository code.

```text
Browser form
  -> POST /api/enquiries
  -> validation and request checks
  -> enquiry repository
  -> libSQL client
  -> local SQLite in development or Turso in production

Admin browser
  -> signed HTTP-only session
  -> /admin and protected admin API routes
  -> enquiry repository
  -> local SQLite in development or Turso in production
```

## Folders

- `src/app/api/`: HTTP route handlers only.
- `src/server/db/`: connection configuration, client and SQL migrations.
- `src/server/enquiries/`: enquiry validation and persistence. Future domains should have their own directory, for example `src/server/users/` or `src/server/appointments/`.
- `src/server/auth/`: administrator environment configuration, signed sessions and API guards.
- `scripts/`: operator commands, including migrations.
- `src/components/`, `src/content/` and `src/app/`: presentation and public content. They must not query the database directly.

## Database environments

The app uses `@libsql/client`, so one repository layer works with both environments:

- Local development: `DATABASE_URL=file:./data/bsb-global.db`
- Turso: `TURSO_DATABASE_URL=libsql://your-database.turso.io` and `TURSO_AUTH_TOKEN=...`

Keep these values server-only. Never prefix them with `NEXT_PUBLIC_`, commit `.env.local`, or expose a Turso token to the browser.

## First enquiry setup

1. Copy `.env.example` to `.env.local`.
2. Choose either a local `DATABASE_URL` or the two Turso variables.
3. Run `npm run db:migrate`.
4. Set `NEXT_PUBLIC_ENQUIRY_API_ENABLED=true`.
5. Restart the development server and submit a test enquiry.

When the public flag is false, the contact form preserves the existing mail-draft flow. When it is true, the form sends an enquiry to the configured database. Do not enable it before migration succeeds.

## Security boundaries

- Inputs are validated on the server and written with parameterised SQL.
- The public form includes a honeypot and rejects cross-origin browser requests.
- The API deliberately does not log enquiry payloads.
- Production still needs host-level rate limiting or a durable rate-limit provider before paid traffic is sent to the form. In-memory limits are not reliable in serverless deployments.
- Enquiries contain personal data. Define response ownership, retention duration, deletion workflow and access roles before enabling online submissions.
- `/admin` is protected by a signed, HTTP-only, `SameSite=Lax` session cookie. Configure `ADMIN_LOGIN_ID`, `ADMIN_PASSWORD` and an `ADMIN_SESSION_SECRET` of at least 32 characters. These values are not stored in source control or exposed to the browser.
- Login requests perform a same-origin check, use timing-safe credential comparison and have an in-memory five-attempt, 15-minute limit. Add a durable or platform-level limit before production, because in-memory limits do not span serverless instances.
- The current design supports one environment-configured administrator. Move to a dedicated identity provider or audited, password-hashed user table before adding staff accounts or roles.

## Migration rule

Create a new numbered SQL file for every schema change and append it to `scripts/migrate.mjs`. Migrations are recorded in `schema_migrations`; do not edit a migration that may already have been run in production.
