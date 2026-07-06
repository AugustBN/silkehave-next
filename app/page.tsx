import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { HomeHero } from "@/components/sections/HomeHero";
import { ServiceTour } from "@/components/sections/ServiceTour";
import { AreaSection } from "@/components/sections/AreaSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { BeforeAfterDeck } from "@/components/ui/BeforeAfterDeck";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { FilmStrip } from "@/components/ui/FilmStrip";

export const metadata: Metadata = {
  title: "Haveservice i Silkeborg & Midtjylland | SilkeHave",
  description: "Lokal have- og ejendomsservice i Midtjylland. Hækklipning, fliserens, vinduesrens og snerydning i Silkeborg og omegn. Fast pris, ring 91 25 10 21.",
  alternates: { canonical: "https://silkehave.dk" },
  openGraph: {
    title: "Haveservice i Silkeborg & Midtjylland | SilkeHave",
    description: "Lokal have- og ejendomsservice i Midtjylland. Hækklipning, fliserens, vinduesrens og snerydning i Silkeborg og omegn. Fast pris, ring 91 25 10 21.",
    url: "https://silkehave.dk",
    images: [{ url: "/assets/photos/fliser-efter.jpg" }],
  },
};

const faq = [
  { q: "Hvad koster hækklipning?", a: "Prisen afhænger af hækkens længde, højde og adgangsforhold. Du får en fast pris på den konkrete opgave, inden vi starter. Ring 91 25 10 21 eller send en forespørgsel." },
  { q: "Hvilke byer kører I i?", a: "Vi kører primært i Silkeborg og resten af Midtjylland, blandt andet Viborg, Skanderborg, Herning, Ikast, Brande, Bjerringbro, Hammel, Ry, Them og Kjellerup. Står du uden for listen, så ring og spørg." },
  { q: "Skal jeg være hjemme, når I kommer?", a: "Det behøver du ikke. Vi aftaler detaljerne på forhånd, og du får et billede, når vi er færdige." },
  { q: "Hvornår skal hækken klippes?", a: "De fleste hækarter trives med en runde i juni og en i sensommeren. En bøgehæk står flot med en enkelt klipning sidst i august." },
  { q: "Hvad tilbyder I udover hækklipning?", a: "Vi laver fliserens, vinduesrens, snerydning og faste haveordninger for private og boligforeninger i Silkeborg og omegn." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <FloatingCTA />

      {/* ---- 1. Løftet ---- */}
      <HomeHero />

      {/* ---- 2. Arbejdet: tre trin, pinned gennemgang ---- */}
      <ProcessSection />

      {/* ---- 3. Ydelserne ---- */}
      <ServiceTour />

      {/* ---- 4. Beviset: før/efter ---- */}
      <section style={{ position: "relative", padding: "120px 0", background: "var(--ceramic)", overflow: "hidden" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" }}>
          <ScrollReveal>
            <div style={{ marginBottom: 40, maxWidth: 600 }}>
              <span className="stb-eyebrow">Før / efter</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 600, color: "var(--forest)", margin: 0, letterSpacing: "-0.015em", lineHeight: 1.1 }}>
                Se forskellen selv.
              </h2>
              <p className="lead" style={{ maxWidth: 540, marginTop: 8, fontSize: 18, lineHeight: 1.5 }}>
                Træk i håndtaget og se, hvad højtryksspuleren gør ved en helt almindelig dansk indkørsel. Flere før- og efterbilleder ligger på{" "}
                <a href="https://www.facebook.com/profile.php?id=61574788933190" target="_blank" rel="noopener noreferrer">vores Facebook</a>.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <BeforeAfterDeck
              pairs={[
                {
                  before: { src: "/assets/photos/haek-hjoerne-foer.jpg", alt: "Overgroet hækhjørne før klipning" },
                  after: { src: "/assets/photos/haek-hjoerne-efter.jpg", alt: "Skarpt klippet hækhjørne" },
                  label: "Hækklipning · hjørnet mod vejen",
                },
                {
                  before: { src: "/assets/photos/fliser-foer.jpg", alt: "Fliser før højtryksspuling" },
                  after: { src: "/assets/photos/fliser-efter.jpg", alt: "Fliser efter højtryksspuling" },
                  label: "Fliserens · indkørsel",
                },
                {
                  before: { src: "/assets/photos/haek-roser-foer.jpg", alt: "Hæk med pjusket top ved rosenbed" },
                  after: { src: "/assets/photos/haek-roser-efter.jpg", alt: "Nyklippet hæk ved rosenbed" },
                  label: "Hækklipning · ved rosenbedet",
                },
                {
                  before: { src: "/assets/photos/haek-gang-foer.jpg", alt: "Havegang med udvokset hæk" },
                  after: { src: "/assets/photos/haek-gang-efter.jpg", alt: "Havegang med glat klippet hæk" },
                  label: "Hækklipning · havegangen",
                },
                {
                  before: { src: "/assets/photos/haek-legehus-foer.jpg", alt: "Hæk vokset op over legehuset" },
                  after: { src: "/assets/photos/haek-legehus-efter.jpg", alt: "Hæk klippet ned ved legehuset" },
                  label: "Hækklipning · ved legehuset",
                },
              ]}
            />
          </ScrollReveal>
        </div>

        {/* Filmstrimlen driver sidelæns med din scroll */}
        <FilmStrip />
      </section>

      {/* ---- 5. Området ---- */}
      <AreaSection />

      {/* ---- 6. Spørgsmålene ---- */}
      <section style={{ background: "var(--cream)", padding: "80px 0 100px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px" }}>
          <ScrollReveal>
            <span className="stb-eyebrow">Spørgsmål og svar</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 600, color: "var(--forest)", margin: "0 0 40px", letterSpacing: "-0.015em", lineHeight: 1.1 }}>
              Det folk oftest spørger om.
            </h2>
          </ScrollReveal>
          {faq.map(({ q, a }, i) => (
            <ScrollReveal key={q} delay={i * 0.05}>
              <details style={{ borderBottom: "1px solid var(--stone-25)", padding: "4px 0" }}>
                <summary style={{ cursor: "pointer", padding: "20px 0", fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, color: "var(--bark)", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                  {q}
                  <span style={{ fontSize: 20, fontWeight: 400, color: "var(--forest)", flexShrink: 0 }}>+</span>
                </summary>
                <p style={{ paddingBottom: 20, margin: 0, color: "var(--stone)", lineHeight: 1.65 }}>{a}</p>
              </details>
            </ScrollReveal>
          ))}
        </div>
        <style>{`details[open] summary span { transform: rotate(45deg); display: inline-block; } details summary::-webkit-details-marker { display: none; }`}</style>
      </section>

      {/* ---- 7. Aftalen ---- */}
      <section className="stcta" id="bund-cta">
        <div className="stcta-inner">
          <ScrollReveal>
            <h2>Skal vi kigge forbi?</h2>
            <p>Ring, eller skriv hvad du har brug for. Vi vender tilbage med en fast pris.</p>
            <div className="stcta-actions">
              <Link href="/kontakt" className="stb stb-primary-light">
                Bestil et besøg
                <span className="stb-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </span>
              </Link>
              <a className="stcta-phone" href="tel:+4591251021">
                <Image src="/assets/icon-phone.svg" alt="" width={20} height={20} /> +45 91 25 10 21
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
