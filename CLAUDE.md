# Silkehave — Next.js site

Marketing site for **Silkehave** — have- og ejendomsservice i Midtjylland.

## Stack & kommandoer

- **Next.js 16** App Router, TypeScript, Tailwind v4 (tokens i globals.css), Framer Motion
- `npm run dev` — start dev-server (Turbopack)
- `npm run build` — produktionsbuild
- **Deploy:** Vercel, auto-deploy fra `main` på `AugustBN/silkehave-next`
- Primært domæne: `silkehave.dk` (uden www). Canonicals, sitemap og schema peger derpå.

## Arkitektur

```
app/
  page.tsx              # Forside (hero, servicegrid, før/efter, område, FAQ)
  layout.tsx            # Root layout (Footer, LocalBusiness-schema, metadata)
  globals.css           # Brand tokens + al delt CSS (.stb, .stqf, .stqw, .stcta ...)
  not-found.tsx         # 404
  api/quote/route.ts    # Telegram-notifikation (POST, rate-limited)
  kontakt/              # Kontaktside + QuoteForm (multi-step wizard)
  om-os/
  omraade/
  privatlivspolitik/
  services/[slug]/      # 5 servicesider: haekklipning, fliserens, haveordning,
                        # snerydning, vinduesrens (graesslaaning redirecter 308 -> /kontakt)

components/
  layout/               # Header (scroll-morph logo), Footer
  sections/             # HomeHero, ProcessSection (pinned 3 trin), ServiceTour, AreaSection
  ui/                   # CompareSlider, ScrollReveal, ScrollSpine, FilmStrip, ScrollVideo
```

**ScrollVideo er parkeret:** komponenten ligger klar i `components/ui/ScrollVideo.tsx`,
men bruges ingen steder. Når der findes rigtig video af en hæk der klippes, læg mp4'en i
`public/assets/videos/` og montér `<ScrollVideo src=... poster=... />` igen (typisk på
forsiden eller /services/haekklipning).

## Brand & copy

- Forest green på cream. Tokens i globals.css `:root`.
- Fonte: Bricolage Grotesque (display) + DM Sans (body).
- Ingen emoji i kode/copy. Dansk vi/du-register.
- **Ingen em-dashes (—) i synlig tekst.** Skriv personligt og professionelt, korte sætninger.
- Border radius max 12px. Motion ~600ms, ease `cubic-bezier(0.22,1,0.36,1)`.
- Græsslåning tilbydes IKKE som selvstændig ydelse. Nævn den ikke i tekst, schema eller meta.

## Tilbudsformular (QuoteForm)

Multi-step wizard, ét spørgsmål pr. trin: ydelser → opgave → billeder → adresse →
kontakt → samtykke/send. Payload til `/api/quote` er uændret (name, phone, email,
address, services, message, images[], consentTimestamp). Billeder komprimeres
client-side til ≤800px JPEG; samlet payload maks ~3,5 MB, brugeren får besked hvis
billeder droppes.

## Telegram

Sæt `TELEGRAM_BOT_TOKEN` og `TELEGRAM_CHAT_ID` i Vercel under Settings → Environment
Variables. Se `.env.example`.
