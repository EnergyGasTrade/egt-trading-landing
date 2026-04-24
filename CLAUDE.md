# EGT trading — corporate business card site

Ukrainian licensed electricity market participant. Import, export, supply, and trading of electric energy across UA and EU markets.

## Mission

Launch a bilingual (uk/en), minimalist, precision-feeling single-page site that signals technical credibility and 15+ years of combined team expertise behind a newly formed company. Site doubles as compliance-ready surface for NEURC licensing requirements (all mandatory legal identifiers exposed).

## Stack (non-negotiable)

- **Astro 5+**, TypeScript strict mode
- **Tailwind v4** via `@tailwindcss/vite`, `@import "tailwindcss"` in global.css (no PostCSS config)
- **@fontsource-variable/inter** self-hosted (no Google Fonts CDN — GDPR + CLS)
- **astro-icon** with Lucide pack (monochrome, 1.5px stroke)
- **@astrojs/sitemap**
- **Astro native i18n**: `defaultLocale: 'uk'`, `locales: ['uk', 'en']`, `prefixDefaultLocale: false`
- **Astro `<ClientRouter />`** for View Transitions

## Theming

Dual light/dark theme. **Dark is first-class**, not an afterthought — it signals technical precision and works well for energy/data brands (reference: Phasic Energy approach in 2026 trend reports).

Implementation:
- CSS custom properties on `:root` and `[data-theme="dark"]`
- Tailwind v4 `@theme` directive referencing the custom properties
- Toggle script: read `prefers-color-scheme` on first visit, persist user choice in `localStorage` under key `theme`
- Apply theme **before paint** via inline `<script is:inline>` in `<head>` to avoid FOUC
- Visible toggle button in header with sun/moon Lucide icon, aria-label localized

## Visual direction

- **Restrained minimalism with one bold accent color**. NOT purple→blue gradients. NOT neon dopamine palette.
- Recommended accent: deep electric blue (~`#1E40FF`) OR signal amber (~`#F59E0B`). Pick ONE at scaffold time and commit across light+dark.
- **Typography as hero**: oversized display headings `clamp(2.5rem, 8vw, 6rem)`, tight letter-spacing, variable-weight animations on hover for nav items
- Generous whitespace, content max-width `1280px`, prose measure `65ch`
- **Forbidden ("AI aesthetic" clichés)**:
  - Centered hero with three icon cards layout
  - Emoji as icons
  - Claymorphism, 3D blobs, rainbow gradients
  - Stock "wind turbine at sunset" / "happy diverse team pointing at laptop" imagery
  - Generic "Solutions for tomorrow" marketing copy
- **Motion**: CSS scroll-driven animations (`animation-timeline: view()`), View Transitions, micro-hover states. All gated by `@media (prefers-reduced-motion: no-preference)`.

## Internationalization

- Routes: `/` (uk), `/en/` (en)
- Content strategy: single set of components consuming JSON dictionaries
  - `src/i18n/uk.json`
  - `src/i18n/en.json`
  - Helper: `src/i18n/useTranslations.ts` — type-safe getter by locale
- Language switcher in header: links to same page in other locale
- `<html lang>` set correctly per locale
- `hreflang` alternates in `<head>` for both pages

## Accessibility (hard requirements)

- **WCAG AA minimum**, aim for AAA on text contrast
- Visible focus rings on all interactive elements, minimum 44×44px tap targets
- Semantic HTML: `<header>`, `<main>`, `<section aria-labelledby>`, `<footer>`
- Skip-to-content link at top of body
- All images: meaningful `alt` or `alt=""` if decorative
- Full keyboard navigation
- `prefers-reduced-motion` respected everywhere

## Performance targets

- Lighthouse: **Performance 95+, Accessibility 100, Best Practices 100, SEO 100**
- Zero client-side JS at page load except theme toggle (inline, <1KB) and count-up observer
- All images via `<Image />` from `astro:assets` — AVIF/WebP with proper `sizes`, never raw `<img>`
- Fonts: preload primary variable woff2, `font-display: swap`
- Total homepage weight: **<200KB gzipped**

## SEO

- Unique `<title>` and meta description per page per locale
- OG image 1200×630 (static in `public/og/` initially; can generate on build later)
- Canonical URLs per locale
- Hreflang alternates
- **JSON-LD Schema.org** on homepage: `Organization` + `LocalBusiness` with `legalName`, `vatID`, `taxID`, `address` (PostalAddress), `telephone`, `email`, `areaServed` (UA + EU countries)
- `robots.txt` (allow all) + `sitemap.xml` via `@astrojs/sitemap`

## Content sections (single-page with anchor navigation)

### 1. Header
Sticky, thin, `backdrop-filter: blur(12px)` on scroll.
- Left: logo (text-based "EGT trading" in display font until SVG provided)
- Center/right: nav — About · Services · Contacts
- Right edge: language switch (UK/EN) · theme toggle

### 2. Hero
- H1 = company name in display font, oversized
- One-line positioning statement (tagline)
- 1–2 supporting sentences
- Subtle scroll indicator
- **No hero image by default** — typography carries it. Optional subtle animated SVG grid background, reduced-motion respecting.

### 3. About
- H2 + 2–3 concise paragraphs
- Angle: "Нова компанія. 15+ років експертизи команди на ринку електроенергії." / "A new company built on 15+ years of combined team expertise in electricity markets."
- No stock team photography unless real photos provided by client

### 4. Key Numbers
- 3–4 stat cards with animated count-up triggered by IntersectionObserver (vanilla JS, disabled for reduced-motion)
- Examples: `15+ years combined team experience` / `UA + EU markets` / `24/7 trading desk`

### 5. Services
- 4 cards: **Import / Export / Supply / Trading**
- Each: Lucide icon, short title, 2-line description
- Layout: 2×2 grid desktop, stack mobile
- Hover: subtle lift + accent color edge reveal

### 6. Contacts
- Two columns:
  - Left: address, phone (`tel:` link), email (`mailto:` link), working hours
  - Right: Google Maps `<iframe loading="lazy" src="[MAP_EMBED_URL]">`
- Below columns: compact legal strip — EDRPOU, VAT, EIC, ECRB, license number

### 7. Footer
- Full legal name
- Full legal identifiers (see "Legal data" below)
- Legal address
- Link to `/privacy` (stub page acceptable for v1)
- Copyright line

## Legal data to surface (placeholders — client fills in)

Use these tokens in i18n dictionaries. Document them in README for handoff.

| Token | Meaning | Format |
|---|---|---|
| `ТОВ "ЕГТ трейдинг"` | Full legal name Ukrainian | ТОВ «EGT trading» |
| `[COMPANY_LEGAL_NAME_EN]` | Full legal name English | EGT trading LLC |
| `[EDRPOU]` | State registry code | 8 digits |
| `[VAT]` | VAT / IPN number | 12 digits |
| `[EIC_X]` | EIC X-type code (energy market participant ID, issued by Ukrenergo per ENTSO-E scheme) | 16 chars |
| `[ECRB]` | Wholesale electricity market participant code (NEURC) | string |
| `[NEURC_LICENSE]` | NEURC license number + issue date | string |
| `[LEGAL_ADDRESS_UK]` / `[LEGAL_ADDRESS_EN]` | Registered legal address | string |
| `[OFFICE_ADDRESS_UK]` / `[OFFICE_ADDRESS_EN]` | Physical office (if different) | string |
| `[PHONE]` | Main phone with country code | `+380...` |
| `[EMAIL]` | Primary contact email | string |
| `[MAP_EMBED_URL]` | Google Maps embed src URL | string |
| `[DIRECTOR_NAME_UK]` / `[DIRECTOR_NAME_EN]` | CEO / director | string |

Surfacing these is a **compliance requirement** for licensed electricity traders in Ukraine — NEURC checks site compliance before license issuance.

## Images & assets

- **Avoid stock AI-looking imagery** (flooded on free sources in 2024–2026)
- If photography is needed: Unsplash or Pexels, commercial-use OK, pick architectural / infrastructure / abstract compositions over "people pointing at screens"
- Recommended direction: typography-driven with zero photography, OR one deliberate high-quality shot (substation close-up, grid topology, European map). Not a photo gallery.
- All images in `src/assets/` served via `<Image />`

## Agent workflow & tooling

### MCP: Context7 (required)

**Before writing code that touches Astro, Tailwind v4, or any `@astrojs/*` integration — pull docs from Context7 first.** These libraries evolve fast and training-data knowledge is often stale (Tailwind v4 diverged significantly from v3: CSS-first config, no `postcss.config`, new `@theme` directive; Astro 5 introduced Content Layer API, Server Islands, typed `astro:env`).

Usage:
- Invoke by adding **"use context7"** to any prompt involving these libs, OR call tools directly:
  - `Context7:resolve-library-id` with the package name (e.g. `astro`, `tailwindcss`, `@astrojs/sitemap`)
  - `Context7:query-docs` with the resolved ID and a focused question
- Prefer Context7 over web search for API questions. Web search only when Context7 has no match or question is trend/browser-support/legal.

Libraries to proactively fetch docs for during this project:
- `astro` (routing, i18n config, `<Image />`, View Transitions, `astro:env`)
- `tailwindcss` v4 (CSS-first theme, dark mode strategy, `@theme` tokens)
- `@astrojs/sitemap`
- `astro-icon`
- `@fontsource-variable/inter`

### Skills (auto-loaded)

- **`frontend-design`** — active for this project. Use its patterns for design tokens, layout systems, anti-generic-AI rules. Don't reinvent.

### Git hygiene

- Commit after each meaningful step: scaffold, each section component, each bugfix, each i18n pass.
- English commit messages, conventional style (`feat:`, `fix:`, `chore:`, `refactor:`).
- Never force-push on `main`. Never rewrite pushed history.
- If a user rejects an iteration, `git reset --hard HEAD~1` rather than manual unwinding.

### When to ask the user vs proceed

**Ask first:**
- Deviating from any explicit CLAUDE.md rule
- Choosing between two equally-weighted visual directions with no technical tiebreaker
- Adding a dependency not listed in Stack section
- Creating files outside `src/`, `public/`, root configs
- Any irreversible action (force-push, dependency major version bump, rewriting `i18n` schema after content exists)

**Proceed without asking:**
- Fixing type errors, lint warnings, accessibility issues
- Following explicit CLAUDE.md requirements
- Minor copy polish for UA↔EN consistency
- Adding missing `alt`, `aria-label`, `lang` attributes

### When stuck

1. Library API unclear → Context7 first → web search fallback → then ask
2. Design choice unclear → present 2–3 concrete options briefly, let user pick, don't write speculative code
3. Legal/regulatory data unclear (EIC, NEURC, ECRB) → leave `[TOKEN]` placeholder, don't invent values, document in README

## Build output

`npm run build` → `dist/` (Astro default static mode, no SSR adapter). Deployment is handled separately by the client's existing infrastructure — do not generate deploy configs, CI workflows, `.htaccess`, or nginx snippets.

## Don't

- No UI kit / component library (no shadcn, daisyUI, Flowbite) — build from scratch with Tailwind
- No JS framework in islands unless strictly required — vanilla JS for theme toggle and count-up
- No cookie consent popup in v1 (no tracking → no consent needed)
- No contact forms in v1 — `tel:` and `mailto:` only
- No `any` in TypeScript
- No raw `<img>`. No Google Fonts CDN. No client-side routing beyond View Transitions.
- No hero stock photo. No generic "Powering tomorrow's energy" marketing fluff.
