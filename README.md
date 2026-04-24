# EGT Trading — Corporate Website

Bilingual (UK/EN) single-page corporate website for EGT Trading, a licensed electricity market participant in Ukraine. Built with Astro 5, Tailwind v4, TypeScript strict mode.

## Commands

| Command           | Action                                   |
| :---------------- | :--------------------------------------- |
| `npm install`     | Install dependencies                     |
| `npm run dev`     | Start dev server at `localhost:4321`     |
| `npm run build`   | Build production site to `./dist/`       |
| `npm run preview` | Preview production build locally         |

## Stack

- **Astro 5** — static site generator
- **Tailwind CSS v4** — utility-first CSS via `@tailwindcss/vite`
- **TypeScript** — strict mode
- **Inter Variable** — self-hosted font (no Google Fonts CDN)
- **astro-icon** + Lucide — icon system
- **@astrojs/sitemap** — auto-generated sitemap

## i18n

- Default locale: `uk` (Ukrainian) — routes at `/`
- English locale: `en` — routes at `/en/`
- Dictionaries: `src/i18n/uk.json`, `src/i18n/en.json`
- Type-safe helper: `src/i18n/useTranslations.ts`

## Placeholder Tokens

The following tokens appear throughout the i18n dictionaries and components. Replace them with real data before production deployment:

| Token | Description | Example format |
| :--- | :--- | :--- |
| `[COMPANY_LEGAL_NAME_UK]` | Full legal name in Ukrainian | ТОВ «EGT Trading» |
| `[COMPANY_LEGAL_NAME_EN]` | Full legal name in English | EGT Trading LLC |
| `[EDRPOU]` | State registry code (EDRPOU/ЄДРПОУ) | 8 digits |
| `[VAT]` | VAT / IPN number | 12 digits |
| `[EIC_X]` | EIC X-type code (energy market participant ID, ENTSO-E scheme, issued by Ukrenergo) | 16 characters |
| `[ECRB]` | Wholesale electricity market participant code (NEURC registry) | string |
| `[NEURC_LICENSE]` | NEURC license number + issue date | string |
| `[LEGAL_ADDRESS_UK]` | Registered legal address in Ukrainian | string |
| `[LEGAL_ADDRESS_EN]` | Registered legal address in English | string |
| `[OFFICE_ADDRESS_UK]` | Physical office address in Ukrainian (if different from legal) | string |
| `[OFFICE_ADDRESS_EN]` | Physical office address in English | string |
| `[PHONE]` | Main phone with country code | +380XXXXXXXXX |
| `[EMAIL]` | Primary contact email | info@egt-trading.com.ua |
| `[MAP_EMBED_URL]` | Google Maps embed iframe src URL | `https://www.google.com/maps/embed?pb=...` |
| `[DIRECTOR_NAME_UK]` | CEO/Director name in Ukrainian | string |
| `[DIRECTOR_NAME_EN]` | CEO/Director name in English | string |

These tokens appear in:
- `src/i18n/uk.json` and `src/i18n/en.json` — main content dictionaries
- `src/layouts/Base.astro` — JSON-LD structured data
- `src/components/sections/Contacts.astro` — map iframe src

### Where to find the values

- **EDRPOU**: [Unified State Register](https://usr.minjust.gov.ua/)
- **EIC code**: Assigned by [Ukrenergo](https://ua.energy/) per ENTSO-E scheme
- **ECRB code**: NEURC wholesale market participant registry
- **NEURC license**: Issued by the National Energy and Utilities Regulatory Commission

## Public Assets

- `public/favicon.svg` — SVG favicon (letter "E" on accent blue)
- `public/favicon.ico` — ICO fallback (replace with generated version)
- `public/og/og-image.png` — OG image placeholder (replace with 1200x630 PNG)
- `public/fonts/inter-variable.woff2` — Self-hosted Inter Variable font
- `public/robots.txt` — Search engine directives

## Theming

Dual light/dark theme with dark as default. Theme persists in `localStorage` under key `theme`. Toggle in site header.

## Deployment

`npm run build` produces static output in `dist/`. Deploy to any static hosting. No SSR adapter needed.
