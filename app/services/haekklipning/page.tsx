import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { ScrollVideo } from "@/components/ui/ScrollVideo";

export const metadata: Metadata = {
  title: "Hækklipning Silkeborg & Midtjylland",
  description: "Hækklipning i Silkeborg og Midtjylland. Bøg, liguster, thuja og laurbær. Vi klipper, samler op og kører væk — fast pris før vi starter.",
  alternates: { canonical: "https://silkehave.dk/services/haekklipning" },
  openGraph: {
    title: "Hækklipning Silkeborg & Midtjylland | Silkehave",
    description: "Hækklipning i Silkeborg og Midtjylland. Bøg, liguster, thuja og laurbær. Vi klipper, samler op og kører væk — fast pris før vi starter.",
    images: [{ url: "/assets/photos/haek-klippet.jpg" }],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Hvor ofte skal hækken klippes?", acceptedAnswer: { "@type": "Answer", text: "De fleste hækarter trives med én runde i juni og én i sensommer. Bøgehæk ser flot ud med én klipning sidst i august." } },
    { "@type": "Question", name: "Skal jeg være hjemme, når I klipper hækken?", acceptedAnswer: { "@type": "Answer", text: "Det behøver du ikke. Vi aftaler højde og facon på forhånd, og sender et billede, når vi er færdige." } },
  ],
};

export default function HaekklipningPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header isStatic />

      <section className="page-head">
        <div className="page-head-inner">
          <div className="stb-eyebrow">Ydelse · Have</div>
          <h1>Hækklipning,<br />gjort ordentligt.</h1>
          <p>Bøg, liguster, thuja og laurbær. Vi klipper, samler op efter os, og kører grenene væk — så terrassen og indkørslen står som da vi kom.</p>
        </div>
      </section>

      <ScrollVideo
        src="/assets/videos/haek-scroll-scrub.mp4"
        poster="/assets/photos/haek-roekke-ny.jpg"
      />

      <article className="starticle">
        <div className="starticle-inner">

          <h2>Hvad vi gør</h2>
          <ul className="check-list">
            <li>Klipper top, sider og bund i den højde og facon du vil have.</li>
            <li>Lægger underlag ud, så græs og fliser ikke får grøn-pletter.</li>
            <li>Samler grenene op i sække eller på trailer — og kører dem væk.</li>
            <li>Fejer og blæser pænt af, før vi tager hjem.</li>
          </ul>

          <h2>Pris</h2>
          <p>Du får en fast pris på den konkrete opgave inden vi starter. Den afhænger af længde, højde og hvor svær hækken er at komme til. Ring eller skriv, så regner vi på det.</p>

          <aside>
            <h4>Typiske spørgsmål</h4>
            <p><strong>Hvor ofte skal hækken klippes?</strong><br />De fleste har en runde i juni og en i sensommer. Bøg står flot med én runde sidst i august.</p>
            <p style={{ margin: 0 }}><strong>Skal jeg være hjemme?</strong><br />Det behøver du ikke. Vi aftaler højde og facon på forhånd, og sender et billede når vi er færdige.</p>
          </aside>

          <h2>Andre ydelser</h2>
          <p>Vi laver også græsslåning, fliserens, vinduesrens, snerydning — og samlede haveordninger, hvor det hele kører af sig selv hen over året.</p>
          <ul>
            <li><strong>Græsslåning</strong> — ugentligt eller efter behov, kanter med hvis du vil have det.</li>
            <li><strong>Fliserens</strong> — højtryk og blødt kemi. Terrassen ser ud som ny igen.</li>
            <li><strong>Vinduesrens</strong> — indvendigt og udvendigt. Karme tørres af. Ingen striber.</li>
            <li><strong>Snerydning</strong> — sæsonaftale eller akut. Saltning og rydning før morgentrafik.</li>
            <li><strong>Haveordning</strong> — fast aftale året rundt, så du ikke skal tænke på det.</li>
          </ul>

          <h2>Hækklipning i Silkeborg og Midtjylland</h2>
          <p>Vi klipper hæk for private og boligforeninger i Silkeborg, Viborg, Skanderborg, Herning og resten af Midtjylland. Ring på <a href="tel:+4591251021">91 25 10 21</a> eller send en forespørgsel.</p>

          <h2>Få en fast pris</h2>
          <p>Skriv kort hvor du bor og hvor lang hækken er. Vi vender tilbage indenfor 1–2 hverdage.</p>
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
