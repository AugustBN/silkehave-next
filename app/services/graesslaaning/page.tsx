import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Græsslåning Silkeborg & Midtjylland",
  description: "Græsslåning i Midtjylland. Ugentligt eller efter behov i Silkeborg og omegn — vi slår, kanter og rydder op. Fast pris — ring 91 25 10 21.",
  alternates: { canonical: "https://silkehave.dk/services/graesslaaning" },
  openGraph: {
    title: "Græsslåning Silkeborg & Midtjylland | Silkehave",
    description: "Græsslåning i Midtjylland. Ugentligt eller efter behov i Silkeborg og omegn. Fast pris — ring 91 25 10 21.",
    images: [{ url: "/assets/photos/terrasse-have.jpg" }],
  },
};

export default function GraesslaningPage() {
  return (
    <>
      <Header isStatic />

      <section className="page-head">
        <div className="page-head-inner">
          <div className="stb-eyebrow">Ydelse · Have</div>
          <h1>Græsslåning,<br />når du vil have det.</h1>
          <p>Ugentligt eller efter behov. Vi slår, kanter langs fliser og bed, og fejer op — så haven ser ordentlig ud.</p>
        </div>
      </section>

      <article className="starticle">
        <div className="starticle-inner">

          <h2>Hvad vi gør</h2>
          <ul className="check-list">
            <li>Slår græsset i den højde du ønsker.</li>
            <li>Kanter langs fliser, bed og fortov hvis du vil have det.</li>
            <li>Samler klip op eller lader det ligge som mulch — dit valg.</li>
            <li>Fejer og rydder af, så det ser pænt ud når vi kører.</li>
          </ul>

          <h2>Pris</h2>
          <p>Fast pris aftalt på forhånd. Den afhænger af havens størrelse og om vi skal kante. Ring eller skriv, så regner vi på det.</p>

          <aside>
            <h4>Typiske spørgsmål</h4>
            <p><strong>Hvor ofte skal der slås?</strong><br />I vækst­sæsonen typisk hver 1–2 uge. Vi aftaler et interval der passer til din have.</p>
            <p style={{ margin: 0 }}><strong>Skal jeg være hjemme?</strong><br />Nej. Vi aftaler adgang på forhånd og sender et billede når vi er færdige.</p>
          </aside>

          <h2>Få en fast pris</h2>
          <p>Skriv kort hvor du bor og havens størrelse ca. Vi vender tilbage indenfor 1–2 hverdage.</p>
          <p style={{ marginTop: 24 }}>
            <Link href="/kontakt" className="stb stb-primary">
              Send en forespørgsel
              <span className="stb-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </span>
            </Link>
          </p>
        </div>
      </article>

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
