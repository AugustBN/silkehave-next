import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Haveordning Silkeborg & Midtjylland",
  description: "Fast haveordning i Midtjylland for private og boligforeninger i Silkeborg og omegn. Hele sæsonen — uden at du skal tænke på det.",
  alternates: { canonical: "https://silkehave.dk/services/haveordning" },
  openGraph: {
    title: "Haveordning Silkeborg & Midtjylland | SilkeHave",
    description: "Fast haveordning i Midtjylland for private og boligforeninger i Silkeborg og omegn. Hele sæsonen — uden at du skal tænke på det.",
    images: [{ url: "/assets/photos/haek-klippet.jpg" }],
  },
};

export default function HaveordningPage() {
  return (
    <>
      <Header isStatic />

      <section className="page-head">
        <div className="page-head-inner">
          <div className="stb-eyebrow">Ydelse · Have</div>
          <h1>Haveordning,<br />kører af sig selv.</h1>
          <p>Fast aftale året rundt for private og boligforeninger. Hækklipning, græsslåning, ukrudt og oprydning — du behøver ikke tænke på det.</p>
        </div>
      </section>

      <article className="starticle">
        <div className="starticle-inner">

          <h2>Hvad vi gør</h2>
          <ul className="check-list">
            <li>Klipper hæk og slår græs efter fast interval.</li>
            <li>Fjerner ukrudt i bed og langs kanter.</li>
            <li>Beskæring af buske og stauder efter behov.</li>
            <li>Løbende oprydning — blade, grene og affald.</li>
          </ul>

          <h2>Til hvem</h2>
          <p>Vi laver haveordninger for private husstande og boligforeninger. Særligt populært hos boligforeninger der vil have ét fast firma til al grøn drift — så slipper bestyrelsen for koordinering.</p>

          <h2>Pris</h2>
          <p>Fast månedspris eller sæsonpris aftalt ud fra havens størrelse og omfang. Ring eller skriv, så laver vi et tilbud der passer til din situation.</p>

          <aside>
            <h4>Typiske spørgsmål</h4>
            <p><strong>Kan vi tilpasse hvad der er med?</strong><br />Ja. Vi sammensætter ordningen ud fra hvad du har brug for — og justerer undervejs.</p>
            <p style={{ margin: 0 }}><strong>Hvad med vinter?</strong><br />Haveordningen kan inkludere snerydning — så dækker aftalen hele året.</p>
          </aside>

          <h2>Få en fast pris</h2>
          <p>Skriv kort hvad du har brug for og hvor du bor. Vi vender tilbage indenfor 1–2 hverdage.</p>
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
            <a className="stcta-phone" href="tel:+4591251021">
              <Image src="/assets/icon-phone.svg" alt="" width={20} height={20} /> 91 25 10 21
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
