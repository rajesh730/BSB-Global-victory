# BSB Global — Visual and Interaction System

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

## Typography

- Primary heading family: **Manrope** with system fallback.
- Body family: **DM Sans** with system fallback.
- Headings use strong weight (800) and *moderate* negative tracking, reduced from the overly-tight previous layout. Body tracking is close to natural (`.004em`) to aid legibility.
- Short all-caps metadata, section labels and dossier stamps use `0.10–0.18em` tracking for intentional rhythm.
- Mobile headings use `clamp` and careful line breaks rather than fixed desktop sizes.
- Body text generally has 1.7–1.96 line height. Avoid letter-spaced long paragraphs; tracking is for short labels, not continuous reading.

## Page-specific visual architecture

| Page | Signature visual |
|---|---|
| Homepage | Navy hero + globe illustration + tilted journal card |
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
- Card hover uses slight movement and a soft shadow, not dramatic transform/blur.
- Intro elements animate once. A gently animated travel card adds personality without masking content.
- Browser’s `prefers-reduced-motion` disables animations and nonessential transitions.
- Buttons describe what they do and remain keyboard navigable.

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
