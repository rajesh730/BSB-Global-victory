# Production Launch Checklist — BSB Global

This is a tracked gate: do not enable indexing or advertise a functional online enquiry form until the relevant items are complete.

## Business approval (required)

- [ ] Confirm exact legal entity, registered trading name and Nepal licensing/registration status.
- [ ] Check all website claims against the company’s actual authorised services.
- [x] Focus destinations confirmed: Japan, United Kingdom, South Korea.
- [x] Add public telephone numbers and support emails (src/lib/site.ts).
- [ ] Add the office street address and office hours.
- [ ] Publish verified public service-charge schedule and refund terms if legally required.
- [ ] Approve the privacy notice, terms and any required government-mandated notices with a qualified reviewer.
- [ ] Verify original logo usage rights and any planned staff/student photography permissions.
- [ ] Add real team/qualification details only with evidence and consent.

## Technical verification (required)

- [ ] Use supported Node.js version (20.9+).
- [ ] Run `npm install` and commit generated `package-lock.json`.
- [ ] Run `npm run audit`, `npm run typecheck`, `npm run lint`, `npm run build`.
- [ ] Test every 20 designed pages in desktop and mobile browsers. Include keyboard navigation and 320px width.
- [ ] Check loading, error and not-found states.
- [ ] Confirm no accidental HTTP resources, mixed content or console errors.
- [ ] Check colour contrast, zoom at 200%, focus rings, form labels and reduced-motion behaviour.
- [ ] Run Lighthouse and inspect meaningful issues in Core Web Vitals, SEO, Best Practices and Accessibility.
- [ ] Validate JSON-LD and canonical URLs against the actual HTTPS live domain.
- [ ] Configure and test secure hosting, TLS, backup and error monitoring.

## Enquiry handling (required)

- [ ] Configure a verified inbox or, preferably, a secure server-side form ingestion flow.
- [ ] Test actual receipt from mobile and desktop, and distinguish drafts from received enquiries.
- [ ] Add rate limiting, spam mitigation and validated error/success states to any live API.
- [ ] Establish staff response ownership and handling of personal information.
- [ ] Publish an accurate approved retention/privacy policy for enquiry data.

## Content and search release

- [ ] Recheck official immigration links for each destination.
- [ ] Update any time-sensitive study-visa references and remove unsupported claims.
- [ ] Review all page headings, spelling and responsive text wrapping.
- [ ] Configure `NEXT_PUBLIC_SITE_URL` to the real live HTTPS domain.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the custom domain once connected (indexing is automatic).
- [ ] Confirm `robots.txt` and `sitemap.xml` in production.
- [ ] Verify Google Search Console and submit sitemap.
- [ ] Publish accurate Google Business Profile details if eligible.
- [ ] Add approved analytics and consent controls *only if needed*.
- [ ] Create content ownership and quarterly official-source review reminders.

## Known preview constraints

- The delivered package is the **complete frontend source**, not a hosted website or production backend.
- The form intentionally copies/opens an email draft; it does not send to a server.
- Deployment build is **not verified** in the creation environment because npm registry access is unavailable.
