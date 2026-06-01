import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Vinduesrens Silkeborg & Midtjylland",
  description: "Vinduesrens indvendigt og udvendigt i Silkeborg og Midtjylland. Karme tørres af. Ingen striber — fast pris, ring 91 25 10 21.",
  alternates: { canonical: "https://silkehave.dk/services/vinduesrens" },
  openGraph: {
    title: "Vinduesrens Silkeborg & Midtjylland | Silkehave",
    description: "Vinduesrens indvendigt og udvendigt i Silkeborg og Midtjylland. Karme tørres af. Ingen striber.",
    images: [{ url: "/assets/photos/haek-roekke-ny.jpg" }],
  },
};

export default function VinduesrensPage() {
  return (
    <>
      <Header isStatic />

      <section className="page-head">
        <div className="page-head-inner">
          <div className="stb-eyebrow">Ydelse · Ejendom</div>
          <h1>Vinduesrens,<br />ingen striber.</h1>
          <p>Indvendigt og udvendigt. Karme og rammer tørres af. Vi arbejder systematisk og efterlader ingen spor.</p>
        </div>
      </section>

      <article className="starticle">
        <div className="starticle-inner">

          <h2>Hvad vi gør</h2>
          <ul className="check-list">
            <li>Renser vinduer indvendigt og udvendigt — uden striber.</li>
            <li>Tørrer karme og rammer af.</li>
            <li>Arbejder systematisk rum for rum så intet spring over.</li>
            <li>Rydder op efter os — ingen spande og klude efterladt.</li>
          </ul>

          <h2>Pris</h2>
          <p>Fast pris baseret på antal vinduer og etager. Ring eller skriv, så regner vi på det.</p>

          <aside>
            <h4>Typiske spørgsmål</h4>
            <p><strong>Kan I nå høje vinduer?</strong><br />Ja. Vi har udstyr til vinduer i 2 etager. Større opgaver aftaler vi individuelt.</p>
            <p style={{ margin: 0 }}><strong>Hvornår skal vinduer renses?</strong><br />2–4 gange om året er typisk. Foråret og efteråret er de mest populære tidspunkter.</p>
          </aside>

          <h2>Få en fast pris</h2>
          <p>Skriv kort hvor du bor og antal vinduer ca. Vi vender tilbage indenfor 1–2 hverdage.</p>
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
