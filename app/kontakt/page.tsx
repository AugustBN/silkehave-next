import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { QuoteForm } from "./QuoteForm";

export const metadata: Metadata = {
  title: "Kontakt & tilbud — Haveservice i Midtjylland",
  description: "Få et tilbud fra SilkeHave. Vi kører i Silkeborg og hele Midtjylland — hækklipning, fliserens, græsslåning. Fast pris inden vi starter.",
  alternates: { canonical: "https://silkehave.dk/kontakt" },
  openGraph: {
    title: "Kontakt & tilbud — Haveservice i Midtjylland | SilkeHave",
    description: "Få et tilbud fra SilkeHave. Vi kører i Silkeborg og hele Midtjylland. Fast pris inden vi starter.",
    images: [{ url: "/assets/photos/fliser-efter.jpg" }],
  },
};

export default function KontaktPage() {
  return (
    <>
      <Header isStatic />
      <section className="page-head">
        <div className="page-head-inner">
          <span className="stb-eyebrow">Kontakt</span>
          <h1>Få et tilbud.</h1>
          <p>Skriv kort hvad du har brug for. Vi vender tilbage indenfor 1–2 hverdage med en fast pris — uden bindinger.</p>
        </div>
      </section>

      <section style={{ background: "var(--cream)" }}>
        <div className="kontakt-grid">
          <div className="kontakt-info">
            <h2>Eller fang os direkte</h2>
            <p>Hvis det er nemmere — skriv på Facebook. Vi svarer typisk samme dag.</p>
            <a className="kontakt-line" href="https://www.facebook.com/profile.php?id=61574788933190" target="_blank" rel="noopener noreferrer">
              <Image src="/assets/icon-arrow-right.svg" alt="" width={18} height={18} /> Facebook · silkehave
            </a>
            <Link className="kontakt-line" href="/omraade">
              <Image src="/assets/icon-mappin.svg" alt="" width={18} height={18} /> Midtjylland · se område
            </Link>
            <a className="kontakt-line" href="tel:+4591251021">
              <Image src="/assets/icon-phone.svg" alt="" width={18} height={18} /> +45 91 25 10 21
            </a>
            <a className="kontakt-line" href="mailto:kontaktsilkehave@gmail.com">
              <Image src="/assets/icon-mail.svg" alt="" width={18} height={18} /> kontaktsilkehave@gmail.com
            </a>

            <h2 style={{ marginTop: 40 }}>Hvad sker der nu?</h2>
            <p style={{ marginBottom: 8 }}><strong>1.</strong> Vi læser hvad du har skrevet.</p>
            <p style={{ marginBottom: 8 }}><strong>2.</strong> Vi ringer eller skriver tilbage med spørgsmål — eller en fast pris.</p>
            <p><strong>3.</strong> Når vi er enige, sætter vi en dag i kalenderen.</p>
          </div>

          <QuoteForm />
        </div>
      </section>
    </>
  );
}
