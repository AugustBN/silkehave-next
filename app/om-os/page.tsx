import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Om os — Haveservice i Midtjylland",
  description: "SilkeHave er et lokalt have- og ejendomsservicefirma med base i Silkeborg. Vi kører i hele Midtjylland — vi laver det vi siger, og vi laver det pænt.",
  alternates: { canonical: "https://silkehave.dk/om-os" },
  openGraph: {
    title: "Om os — Haveservice i Midtjylland | SilkeHave",
    description: "SilkeHave er et lokalt have- og ejendomsservicefirma med base i Silkeborg. Vi kører i hele Midtjylland.",
    images: [{ url: "/assets/photos/haek-klippet.jpg" }],
  },
};

export default function OmOsPage() {
  return (
    <>
      <Header isStatic />
      <section className="page-head">
        <div className="page-head-inner">
          <span className="stb-eyebrow">Om os</span>
          <h1>Et par hænder du<br />kan regne med.</h1>
          <p>SilkeHave er et lokalt firma i Midtjylland. Vi laver have‑ og ejendomsservice for både private og boligforeninger — og vi kommer, når vi har sagt det.</p>
        </div>
      </section>

      <section className="starticle">
        <div className="starticle-inner">
          <div className="team">
            <Image src="/assets/photos/haek-roekke-ny.jpg" alt="Hækklipning på sagen" width={959} height={1277} />
            <div>
              <h2>Hvem vi er</h2>
              <p>Vi er et lille team med base i Silkeborg-området. Vi har kørt med haveservice og ejendomsservice i Midtjylland i en årrække — det meste arbejde kommer ind via mund-til-mund.</p>
              <p>Vi tager kun det arbejde vi kan stå inde for. Hellere sige nej end levere noget der ikke er pænt.</p>
            </div>
          </div>

          <h2>Sådan arbejder vi</h2>
          <div className="values">
            <div className="value"><h3>Fast pris først</h3><p>Du får prisen før vi starter. Ingen overraskelser i bunden af regningen.</p></div>
            <div className="value"><h3>Aftaler vi holder</h3><p>Vi siger en dag, og vi kommer den dag. Bliver det forsinket, hører du det fra os.</p></div>
            <div className="value"><h3>Pænt efter os</h3><p>Vi rydder op, fejer og kører grenene væk. Som om vi ikke havde været der.</p></div>
          </div>

          <h2>Lokal forankring</h2>
          <p>Vi kører primært i Silkeborg, Viborg, Skanderborg, Herning og opland. Hvis du står lige uden for området — ring og spørg. Vi kan ofte godt komme alligevel.</p>

          <h2>Privat og boligforeninger</h2>
          <p>Vi laver enkeltopgaver for private — en hækklipning, en omgang fliserens, en sæson med snerydning. Og vi laver faste haveordninger for boligforeninger og ejendomme, hvor det hele kører af sig selv hen over året.</p>

          <p style={{ marginTop: 32 }}>
            <Link href="/kontakt" className="stb stb-primary">
              Få et tilbud
              <span className="stb-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </span>
            </Link>
          </p>
        </div>
      </section>

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
            <a className="stcta-phone" href="tel:+4591251021">
              <Image src="/assets/icon-phone.svg" alt="" width={20} height={20} /> 91 25 10 21
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
