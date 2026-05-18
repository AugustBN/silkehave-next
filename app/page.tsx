import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CompareSlider } from "@/components/ui/CompareSlider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { HedgeClipper } from "@/components/ui/HedgeClipper";

export const metadata: Metadata = {
  title: "SilkeHave — Have‑ og ejendomsservice i Midtjylland",
  description: "Have- og ejendomsservice i Midtjylland. Hækklipning, græsslåning, fliserens og snerydning. Fast pris før vi starter.",
};

const services = [
  { icon: "/assets/icon-haveordning.svg",  title: "Haveordning",  body: "Fast aftale året rundt — vi holder haven, så du ikke skal tænke på det.",         href: "/services/haveordning" },
  { icon: "/assets/icon-haekklipning.svg", title: "Hækklipning",  body: "Bøg, liguster, thuja. Vi klipper, samler op og kører væk.",                       href: "/services/haekklipning" },
  { icon: "/assets/icon-fliserens.svg",    title: "Fliserens",    body: "Højtryk og blødt kemi. Terrassen ser ud som ny igen.",                             href: "/services/fliserens" },
  { icon: "/assets/icon-vinduesrens.svg",  title: "Vinduesrens",  body: "Indvendigt og udvendigt. Karme tørres af. Ingen striber.",                         href: "/services/vinduesrens" },
  { icon: "/assets/icon-snerydning.svg",   title: "Snerydning",   body: "Sæsonaftale eller akut. Saltning og rydning før morgentrafik.",                    href: "/services/snerydning" },
  { icon: "/assets/icon-mappin.svg",       title: "Andet?",       body: "Har du en opgave der ikke passer i boksene? Skriv til os — vi kigger på det.",     href: "/kontakt" },
];

const strip = [
  { src: "/assets/photos/haek-stigen.jpg",    caption: "Hækklipning · liguster" },
  { src: "/assets/photos/boegehaek-tarp.jpg", caption: "Bøgehæk efter klip" },
  { src: "/assets/photos/terrasse-parasol.jpg", caption: "Terrasse · sensommer" },
  { src: "/assets/photos/hoejtryk-doer.jpg",  caption: "Højtryksspuling" },
  { src: "/assets/photos/haek-knael-busk.jpg", caption: "Detaljen i bunden" },
  { src: "/assets/photos/haek-roekke-ny.jpg", caption: "Ny række · klar til vækst" },
];

const towns = ["Silkeborg","Viborg","Skanderborg","Herning","Ikast","Brande","Bjerringbro","Hammel","Ry","Them","Kjellerup","Karup"];

export default function HomePage() {
  return (
    <>
      {/* ---- Hero ---- */}
      <section style={{
        position: "relative",
        minHeight: 620,
        display: "flex",
        alignItems: "center",
        backgroundColor: "var(--moss-deep)",
        backgroundImage: "linear-gradient(180deg, rgba(31,58,44,0.30) 0%, rgba(31,58,44,0.55) 55%, rgba(31,58,44,0.85) 100%), url('/assets/photos/terrasse-parasol.jpg')",
        backgroundSize: "cover, cover",
        backgroundPosition: "50% 45%, 50% 45%",
        backgroundRepeat: "no-repeat, no-repeat",
      }}>
        <div style={{ position: "relative", maxWidth: "var(--container-max)", margin: "0 auto", padding: "120px 24px 64px", color: "var(--cream)", width: "100%" }}>
          <span className="stb-eyebrow" style={{ color: "rgba(245,241,232,0.8)" }}>Have‑ og ejendomsservice · Midtjylland</span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 7vw, 80px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.04, maxWidth: 800, margin: "0 0 20px", color: "var(--cream)" }}>
            Hækken trænger til en tur.<br />Vi kommer forbi.
          </h1>
          <p style={{ fontSize: "clamp(16px, 2.1vw, 19px)", lineHeight: 1.5, maxWidth: 540, margin: "0 0 28px", color: "rgba(245,241,232,0.92)" }}>
            Vi klipper, samler op og kører væk. Du får en have der ser ud, som du gerne vil have den — uden at skulle gøre det selv.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
            <Link href="/kontakt" className="stb stb-primary">
              Få et tilbud
              <span className="stb-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </span>
            </Link>
            <Link href="/#ydelser" className="stb stb-ghost-light">Se hvad vi laver</Link>
          </div>
          <div style={{ display: "flex", gap: "16px 24px", flexWrap: "wrap", paddingTop: 20, borderTop: "1px solid rgba(245,241,232,0.2)", fontSize: 13, color: "rgba(245,241,232,0.85)", maxWidth: 700 }}>
            <span><strong style={{ color: "var(--cream)", fontWeight: 600 }}>Lokal</strong> · Midtjylland</span>
            <span><strong style={{ color: "var(--cream)", fontWeight: 600 }}>Fast pris</strong> før vi starter</span>
            <span><strong style={{ color: "var(--cream)", fontWeight: 600 }}>Privat</strong> + boligforeninger</span>
          </div>
        </div>
      </section>

      {/* ---- Hedge clipper ---- */}
      <HedgeClipper />

      {/* ---- Service grid ---- */}
      <section style={{ padding: "96px 0", background: "var(--cream)" }} id="ydelser">
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ maxWidth: 640, marginBottom: 48 }}>
            <span className="stb-eyebrow">Det vi laver</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 600, letterSpacing: "-0.015em", color: "var(--forest)", margin: "0 0 16px", lineHeight: 1.05 }}>
              Seks ting vi gør godt.
            </h2>
            <p className="lead" style={{ fontSize: 18, lineHeight: 1.5, color: "var(--bark)" }}>
              Vælg én — eller bind dem sammen i en haveordning, så det hele kører af sig selv.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="stsg-grid">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.07}>
                <Link href={s.href} style={{ display: "block", background: "var(--bone)", borderRadius: "var(--radius-lg)", padding: 28, boxShadow: "var(--shadow-card)", textDecoration: "none", color: "var(--bark)", transition: "transform 240ms cubic-bezier(0.22,1,0.36,1), box-shadow 240ms cubic-bezier(0.22,1,0.36,1)" }}
                  className="stsg-card"
                >
                  <Image src={s.icon} alt="" width={32} height={32} style={{ marginBottom: 16, filter: "brightness(0) saturate(100%) invert(31%) sepia(15%) saturate(1234%) hue-rotate(85deg) brightness(95%) contrast(86%)" }} />
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, color: "var(--forest)", margin: "0 0 8px", letterSpacing: "-0.01em" }}>{s.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.5, color: "var(--bark)", margin: "0 0 16px" }}>{s.body}</p>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "var(--hedge)", letterSpacing: "-0.01em" }}>Læs mere →</span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
        <style>{`.stsg-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-lifted); } @media (max-width: 880px) { .stsg-grid { grid-template-columns: 1fr 1fr !important; } } @media (max-width: 560px) { .stsg-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* ---- Before / After ---- */}
      <section style={{ padding: "96px 0", background: "var(--ceramic)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ marginBottom: 40, maxWidth: 600 }}>
            <span className="stb-eyebrow">Før / efter</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 600, color: "var(--forest)", margin: 0, letterSpacing: "-0.015em", lineHeight: 1.1 }}>
              Fliserens, der faktisk gør en forskel.
            </h2>
            <p className="lead" style={{ maxWidth: 540, marginTop: 8, fontSize: 18, lineHeight: 1.5 }}>
              Træk i håndtaget — eller lad det selv vise dig, hvad højtryksspuleren gør ved en alm. dansk indkørsel. Følg med i flere før/efter-billeder på{" "}
              <a href="https://www.facebook.com/profile.php?id=61574788933190" target="_blank" rel="noopener">vores Facebook</a>.
            </p>
          </div>

          <CompareSlider
            before={{ src: "/assets/photos/fliser-foer.jpg", alt: "Fliser før højtryksspuling" }}
            after={{ src: "/assets/photos/fliser-efter.jpg", alt: "Fliser efter højtryksspuling" }}
          />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, marginTop: 48 }} className="stba-strip">
            {strip.map((p) => (
              <figure key={p.src} style={{ margin: 0 }}>
                <Image
                  src={p.src}
                  alt={p.caption}
                  width={600}
                  height={800}
                  style={{ aspectRatio: "3/4", objectFit: "cover", width: "100%", borderRadius: "var(--radius-md)", marginBottom: 8 }}
                  loading="lazy"
                />
                <figcaption style={{ fontSize: 12, color: "var(--stone)" }}>{p.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
        <style>{`@media (max-width: 880px) { .stba-strip { grid-template-columns: repeat(3, 1fr) !important; } } @media (max-width: 560px) { .stba-strip { grid-template-columns: repeat(2, 1fr) !important; } }`}</style>
      </section>

      {/* ---- Area ---- */}
      <section style={{ padding: "96px 0", background: "var(--cream)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="stas-inner">
          <ScrollReveal>
            <div>
              <span className="stb-eyebrow">Område</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 600, color: "var(--forest)", margin: "0 0 16px", letterSpacing: "-0.015em", lineHeight: 1.1 }}>
                Vi kører primært i Midtjylland.
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.55, margin: "0 0 24px", maxWidth: 480 }}>
                Base i Silkeborg-området, og vi kører ud i en god radius derfra. Står du udenfor listen — ring og spørg, vi kan ofte godt komme alligevel.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                {towns.map((t) => (
                  <span key={t} style={{ fontSize: 13, padding: "6px 12px", background: "var(--bone)", border: "1px solid var(--stone-25)", borderRadius: "var(--radius-pill)", color: "var(--bark)" }}>{t}</span>
                ))}
              </div>
              <Link href="/omraade" className="stb stb-ghost">Se kort over området</Link>
            </div>
          </ScrollReveal>
          <div style={{ aspectRatio: "1", background: "var(--ceramic)", borderRadius: "var(--radius-lg)", border: "1px solid var(--stone-25)", overflow: "hidden" }} aria-hidden="true">
            <svg viewBox="0 0 320 320" width="100%" height="100%">
              <rect width="320" height="320" fill="#EFEADE"/>
              <path d="M40,120 Q60,80 110,70 Q160,55 200,80 Q260,95 270,140 Q285,200 240,240 Q190,280 130,260 Q70,240 50,190 Q30,160 40,120 Z" fill="#F5F1E8" stroke="#8A8578" strokeWidth="1"/>
              <circle cx="155" cy="170" r="60" fill="rgba(127,166,107,0.18)" stroke="#3B6B45" strokeDasharray="3 4" strokeWidth="1"/>
              <circle cx="155" cy="170" r="6" fill="#1F3A2C"/>
              <text x="170" y="172" fontFamily="DM Sans, sans-serif" fontSize="11" fill="#1F3A2C" fontWeight="600">Silkeborg</text>
              <circle cx="115" cy="125" r="3" fill="#3B6B45"/>
              <text x="80" y="118" fontFamily="DM Sans" fontSize="10" fill="#3A2E22">Viborg</text>
              <circle cx="200" cy="195" r="3" fill="#3B6B45"/>
              <text x="208" y="198" fontFamily="DM Sans" fontSize="10" fill="#3A2E22">Skanderborg</text>
              <circle cx="90" cy="205" r="3" fill="#3B6B45"/>
              <text x="55" y="220" fontFamily="DM Sans" fontSize="10" fill="#3A2E22">Herning</text>
            </svg>
          </div>
        </div>
        <style>{`@media (max-width: 880px) { .stas-inner { grid-template-columns: 1fr !important; gap: 32px !important; } }`}</style>
      </section>

      {/* ---- Reviews ---- */}
      <section style={{ padding: "96px 0", background: "var(--bone)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ marginBottom: 40, maxWidth: 640 }}>
            <span className="stb-eyebrow">Hvad kunder siger</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 600, color: "var(--forest)", margin: 0, letterSpacing: "-0.015em", lineHeight: 1.1 }}>
              Lavt drama, fast pris, pænt resultat.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="strv-grid">
            {[
              { quote: "De kom da de havde aftalt, klippede hækken og ryddede pænt op efter sig. Fast pris, ingen overraskelser.", name: "Mette S.", sub: "Privatkunde · Silkeborg" },
              { quote: "Vi har en haveordning til vores ejendom. Det er bare nemt — de kommer, og det ser pænt ud hele sæsonen.", name: "Boligforening · Viborg", sub: "Erhvervskunde" },
              { quote: "Fliserne lignede nye bagefter. De viste mig hvad de gjorde, og hvad det kom til at koste, før de begyndte.", name: "Jens P.", sub: "Privatkunde · Ry" },
            ].map((r) => (
              <ScrollReveal key={r.name}>
                <figure style={{ position: "relative", background: "var(--cream)", borderRadius: "var(--radius-lg)", padding: 28, margin: 0, boxShadow: "var(--shadow-card)" }}>
                  <Image src="/assets/icon-quote.svg" alt="" width={24} height={24} style={{ opacity: 0.35, marginBottom: 12 }} />
                  <blockquote style={{ fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.55, color: "var(--bark)", margin: "0 0 20px" }}>{r.quote}</blockquote>
                  <figcaption style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <strong style={{ fontSize: 14, fontWeight: 600, color: "var(--forest)" }}>{r.name}</strong>
                    <span style={{ fontSize: 13, color: "var(--stone)" }}>{r.sub}</span>
                  </figcaption>
                  <span style={{ position: "absolute", top: 16, right: 16, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--stone)", background: "var(--ceramic)", padding: "3px 8px", borderRadius: "var(--radius-sm)" }}>eksempel</span>
                </figure>
              </ScrollReveal>
            ))}
          </div>
        </div>
        <style>{`@media (max-width: 880px) { .strv-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* ---- CTA band ---- */}
      <section className="stcta">
        <div className="stcta-inner">
          <h2>Skal vi kigge forbi?</h2>
          <p>Ring, eller skriv hvad du har brug for. Vi vender tilbage med en fast pris.</p>
          <div className="stcta-actions">
            <Link href="/kontakt" className="stb stb-primary-light">
              Bestil et besøg
              <span className="stb-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </span>
            </Link>
            <span className="stcta-phone">
              <Image src="/assets/icon-phone.svg" alt="" width={20} height={20} /> -- -- -- --
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
