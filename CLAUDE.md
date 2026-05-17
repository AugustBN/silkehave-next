# Silkehave — Next.js site

Marketing site for **Silkehave** — have- og ejendomsservice i Midtjylland.

## Stack & kommandoer

- **Next.js 16** App Router, TypeScript, Tailwind v4, Framer Motion
- `npm run dev` — start dev-server (Turbopack)
- `npm run build` — produktionsbuild
- **Deploy:** Vercel, auto-deploy fra `main` på `AugustBN/silkehave-next`

## Arkitektur

```
app/
  page.tsx              # Forside
  layout.tsx            # Root layout (Header + Footer)
  globals.css           # Brand tokens via @theme
  api/quote/route.ts    # Telegram-notifikation (POST)
  kontakt/              # Kontaktside + QuoteForm
  om-os/
  omraade/
  services/[slug]/      # 6 service-sider

components/
  layout/               # Header, Footer
  sections/             # Hero, ServicesGrid, BeforeAfterCarousel, CTABand
  ui/                   # AnimateIn, BeforeAfterSlider

public/images/          # Erstat placeholder-*.png med rigtige billeder
```

## Brand

- Forest green `#3d6b35` på cream `#f5f0e8`
- Fonte: Bricolage Grotesque (display) + DM Sans (body)
- Ingen emoji i kode/copy. Dansk vi/du-register.
- Border radius max 12px. Motion ~600ms.

## Before/after carousel

Tilføj billedpar i `app/page.tsx` i `beforeAfterPairs`-arrayet (max 10).

## Telegram

Sæt `TELEGRAM_BOT_TOKEN` og `TELEGRAM_CHAT_ID` i Vercel-dashboard under Settings → Environment Variables. Se `.env.example`.
