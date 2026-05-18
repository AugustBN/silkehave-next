# Ændringer — SilkeHave Next.js site

Dokumentation til eget brug. Kronologisk fra nyeste.

---

## Performance-optimering

- **Hero-billede** — skiftet fra CSS `background-image` til Next.js `<Image fill priority>` for hurtigere LCP (Largest Contentful Paint)
- **HedgeClipper (hækklipper-widget)** — deaktiveret på touchskærme via `@media (pointer: coarse)` og tidlig `return` i `useEffect`; sparer 9 MB på mobil
- **Billedkomprimering** — `haek-klippet.jpg` (3,3 MB PNG → 844 KB JPEG) og `haek-ikke-klippet-sm.png` (5,6 MB → 2,7 MB, resized til 1440px)
- **`sizes`-attributter** — rettet på strip-billeder og CompareSlider for korrekte responsive hints

## Kontaktformular

- **Klientkomprimering** — billeder skaleres til max 800px og komprimeres som JPEG 0.72 i browseren inden upload (var base64 af original)
- **Baggrundssending** — tekstbesked til Telegram sendes straks; billederne uploades bagefter via `after()` fra Next.js, så brugeren ikke venter
- **Billedgrænse hævet** — 4 → 20 billeder
- **Payload-guard** — maks 3,5 MB base64 i alt for at holde sig under Verels 4,5 MB-grænse

## Formular-sikkerhed (Trin 6)

- **Rate limiting** — 5 forespørgsler per IP per 15 min (in-memory Map)
- **Payload-size check** — afviser body > 4 MB inden JSON-parsing
- **Feltvalidering** — påkrævede felter, max-længder, samtykke-timestamp krævet
- **Billedvalidering** — maks 300 KB per billede (decoded), slices til 20
- **Honeypot** — skjult `_gotcha`-felt i formularen stopper simple bots

## GDPR-compliance

- **Audit** — ingen tracking fundet; ingen cookie-banner nødvendig
- **Privatlivspolitik** — ny side på `/privatlivspolitik` (Art. 13 GDPR, dansk, "håndværker-tone")
  - ⚠️ `[FIRMAADRESSE]` på side 25 skal udfyldes manuelt
- **Samtykke i formular** — checkbox der skal hakkes af, ikke forudfyldt; tidsstempel logges i Telegram-besked
- **Privatlivspolitik-link** — i formularen og i footeren
- **EU-region** — Vercel sat til `fra1` (Frankfurt) i `vercel.json`

## Kontaktoplysninger

- **Telefon** — `+45 91 25 10 21` tilføjet på kontaktsiden og i CTA-båndet
- **Email** — `kontaktsilkehave@gmail.com` tilføjet på kontaktsiden

## Telegram-fejl rettet

- **MarkdownV2-escaping** — dansk dato (`18. maj 2026`) indeholdt `.` som er specialtegn i MarkdownV2; rettet med `escMd()` på alle felter inkl. dato og samtykke-timestamp

---

*Senest opdateret: 18. maj 2026*
