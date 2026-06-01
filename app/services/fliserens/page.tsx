import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Fliserens Silkeborg & Midtjylland",
  description: "Fliserens i Midtjylland. Vi renser terrasse, indkørsel og gangarealer med højtryk i Silkeborg og omegn. Fast pris — ring 91 25 10 21.",
  alternates: { canonical: "https://silkehave.dk/services/fliserens" },
  openGraph: {
    title: "Fliserens Silkeborg & Midtjylland | Silkehave",
    description: "Fliserens i Midtjylland. Vi renser terrasse, indkørsel og gangarealer med højtryk i Silkeborg og omegn. Fast pris — ring 91 25 10 21.",
    images: [{ url: "/assets/photos/fliser-efter.jpg" }],
  },
};

export default function FliserensPage() {
  return (
    <>
      <Header isStatic />

      <section className="page-head">
        <div className="page-head-inner">
          <div className="stb-eyebrow">Ydelse · Ejendom</div>
          <h1>Fliserens,<br />terrassen ser ud som ny.</h1>
          <p>Højtryk og blødt kemi fjerner mos, alger og vejsnavs. Vi passer på fuger og overflader — og rydder op efter os.</p>
        </div>
      </section>

      <article className="starticle">
        <div className="starticle-inner">

          <h2>Hvad vi gør</h2>
          <ul className="check-list">
            <li>Højtryksrenser fliser, indkørsel og terrasse.</li>
            <li>Bruger blødt kemi til mos og alger — skåner fuger og overflader.</li>
            <li>Fejer og samler snavset op — intet tilbage på fliserne.</li>
            <li>Kan behandle med mosforebyggende middel bagefter hvis du vil.</li>
          </ul>

          <h2>Pris</h2>
          <p>Fast pris på den konkrete opgave inden vi starter. Den afhænger af areal og grad af tilgroning. Ring eller skriv, så regner vi på det.</p>

          <aside>
            <h4>Typiske spørgsmål</h4>
            <p><strong>Kan I rense alle typer fliser?</strong><br />Vi renser beton-, natursten- og teglfliser. Vi bruger det kemi og tryk der passer til overfladen.</p>
            <p style={{ margin: 0 }}><strong>Hvornår er det bedst at rense?</strong><br />Forår eller efterår. Undgå stærk sol — kemiet virker bedst på fugtig overflade.</p>
          </aside>

          <h2>Få en fast pris</h2>
          <p>Skriv kort hvor du bor og ca. areal. Vi vender tilbage indenfor 1–2 hverdage.</p>
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
