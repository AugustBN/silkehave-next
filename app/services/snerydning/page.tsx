import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Snerydning — Silke Total Service",
  description: "Snerydning i Midtjylland. Sæsonaftale eller akut. Saltning og rydning før morgentrafik.",
};

export default function SnerydningPage() {
  return (
    <>
      <Header isStatic />

      <section className="page-head">
        <div className="page-head-inner">
          <div className="stb-eyebrow">Ydelse · Vinter</div>
          <h1>Snerydning,<br />klar når det gælder.</h1>
          <p>Sæsonaftale eller akut. Saltning og rydning af indkørsel og fortov — gerne inden morgentrafik.</p>
        </div>
      </section>

      <article className="starticle">
        <div className="starticle-inner">

          <h2>Hvad vi gør</h2>
          <ul className="check-list">
            <li>Rydder sne fra indkørsel, fortov og stiarealer.</li>
            <li>Salter og gruser mod glat underlag.</li>
            <li>Kører tidligt om morgenen hvis du har brug for det.</li>
            <li>Giver besked når vi er færdige.</li>
          </ul>

          <h2>Pris</h2>
          <p>Vi tilbyder sæsonaftaler med fast pris — eller akutopkald når uvejret rammer. Ring eller skriv, så laver vi en aftale.</p>

          <aside>
            <h4>Typiske spørgsmål</h4>
            <p><strong>Kan I komme akut?</strong><br />Ja, vi prøver altid. Sæsonkunder prioriteres — er du ikke tilmeldt, ring og vi finder en løsning.</p>
            <p style={{ margin: 0 }}><strong>Hvad dækker en sæsonaftale?</strong><br />Rydning og saltning ved hver snehændelse i aftalt periode. Fast månedspris uanset vejret.</p>
          </aside>

          <h2>Få en fast pris</h2>
          <p>Skriv kort hvor du bor og hvad der skal ryddes. Vi vender tilbage indenfor 1–2 hverdage.</p>
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
