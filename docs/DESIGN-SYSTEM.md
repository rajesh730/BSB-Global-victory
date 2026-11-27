# BSB Global: Visual and Interaction System

## Visual idea

**Editorial travel journal, not a generic agency template.** Brand consistency without clutter: dark navy confidence, royal-blue structure, red emphasis and warm off-white breathing space. The original BSB Global mark remains the primary brand identifier.

## Design tokens

| Token | HEX | Purpose |
|---|---|---|
| Navy | `#171F5D` | Hero, footer, strong contrast |
| Dark navy | `#11194B` | Footer depth |
| Brand blue | `#2B3992` | Links, key UI elements, graphic lines |
| Brand red | `#C11330` | Main CTA and restrained highlights |
| Ink | `#1C2545` | Headings/body emphasis |
| Muted | `#667087` | Body supporting text |
| Paper | `#FFFEFB` | Main canvas |
| Cream | `#F6F2EB` | Editorial surfaces |
| Mist | `#EFF1F8` | Alternating sections |
| Border | `#DFE3EC` | Dividers and card outlines |

The bright red in the original supplied logo is retained inside the logo image. The button red is darkened to improve legibility for white button text.

## Direction (unslop pass, November 2026)

- **Character:** steady, honest, warm.
- **World:** the journey that starts at the Milanchowk, Butwal counselling desk: paperwork, a passport, farewell scarves. Marketing stays local to Butwal and Rupandehi.
- **Moment:** the homepage hero shows a real departure photo with a boarding-pass card.
- **Signature:** the route line `Butwal → JP / GB / KR`, used only on the hero pass, destination cards, the destinations menu and country heroes.

## Typography

- Headlines (h1, h2 and large display letterforms): **Newsreader** 400, `-0.02em` tracking.
- Everything else, including h3, labels, buttons and navigation: **DM Sans** at 400 or 500, with 600 only for the wordmark.
- Labels are sentence case with natural tracking. No uppercase tracked labels, and no text under 12px.
- Headlines and labels have no trailing full stop. `headline()` in `src/lib/headline.ts` strips one from dashboard copy.
- Text roles: `--ink` (primary), `--text-2` (secondary), `--muted` (meta only).

## Spacing, radius and motion

- Every spacing value sits on a 4px grid.
- Radius scale: `--r-control` 8px for buttons and inputs, `--r-card` 12px, `--r-panel` 16px.
- Cards are flat surfaces with a hairline border. On hover only the border color changes; there are no colored top stripes, lifts or image zooms.
- One easing curve, `cubic-bezier(.22,1,.36,1)`. The hero has one short entrance, content below the fold has a short reveal, and nothing loops.

## Page-specific visual architecture

| Page | Signature visual |
|---|---|
| Homepage | Navy hero + real departure photo + Butwal route pass |
| Destinations index | Editorial introduction + illustrated destination grid |
| Country details | Illustrated destination dossier + guidance checklist + official source panel |
| Services | Process/service grid + scope transparency panel |
| Test preparation | Distinct test letterforms + timed preparation steps |
| About | Principle cards + transparent credential/photography slot |
| Resources index | Article library with category, reading time and editorial cards |
| Resource article | Deep reading layout with sticky table of contents and section markers |
| Contact | Split information panel + well-labelled enquiry form |
| Privacy/Terms | Quiet long-form documentation layout |
| 404 | Minimal return-home recovery page |

## Interaction and motion

- The mobile menu and destination flyout use explicit state and accessible labels.
- Hover is a color or border change only. Buttons scale to 0.98 on press.
- With `prefers-reduced-motion`, all animations and nonessential transitions are off.

## Responsive breakpoints

- Above 1170: large desktop with full nav, 3-column country cards.
- Up to 1040: refined desktop spacing, no redundant nav CTA.
- Up to 880: mobile navigation button, 2-column grids.
- Up to 660: single-column, stack contact and country content, simplified cover layouts.
- Up to 400: careful portrait-phone sizes and extra-tight hero/card spacing.

## Images

- Original logo delivered by client, optimized WebP served through `next/image`.
- Local SVG globe/country artwork; no invented student portraits, awards or partner logos.
- Add real original team, classroom and office photography only after consent and approval.

## Brand caveat

The provided logo is visually busy at very small sizes. The site combines the small logo with a clear “BSB GLOBAL” wordmark for recognition. A future simplified horizontal/monogram lockup would improve favicons and social placement, but the approved artwork has not been altered.
