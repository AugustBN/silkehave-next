import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Område: Silkeborg, Viborg, Skanderborg & Midtjylland",
  description: "SilkeHave kører i Silkeborg, Viborg, Skanderborg, Herning, Ikast, Ry og resten af Midtjylland. Hækklipning, fliserens og haveservice nær dig.",
  alternates: { canonical: "https://silkehave.dk/omraade" },
  openGraph: {
    title: "Område: Silkeborg, Viborg, Skanderborg & Midtjylland | SilkeHave",
    description: "SilkeHave kører i Silkeborg, Viborg, Skanderborg, Herning, Ikast, Ry og resten af Midtjylland.",
    images: [{ url: "/assets/photos/haek-klippet.jpg" }],
  },
};

const towns = ["Silkeborg","Viborg","Skanderborg","Herning","Ikast","Brande","Bjerringbro","Hammel","Ry","Them","Kjellerup","Karup","Galten","Engesvang"];

export default function OmraadePage() {
  return (
    <>
      <Header isStatic />
      <section className="page-head">
        <div className="page-head-inner">
          <span className="stb-eyebrow">Område</span>
          <h1>Vi kører primært<br />i Midtjylland.</h1>
          <p>Base i Silkeborg-området. Står du lige udenfor, så ring og spørg. Vi kan ofte godt komme alligevel.</p>
        </div>
      </section>

      <section style={{ background: "var(--cream)" }}>
        <div className="map-wrap">
          <div>
            <h2>Byer vi kører i</h2>
            <ul className="map-list">
              {towns.map((t) => <li key={t}>{t}</li>)}
            </ul>
            <p className="map-note">Listen er ikke udtømmende. Spørg, hvis du er i tvivl.</p>
            <p style={{ marginTop: 24 }}>
              <Link href="/kontakt" className="stb stb-primary">
                Få et tilbud
                <span className="stb-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </span>
              </Link>
            </p>
          </div>
          <div className="big-map" aria-hidden="true">
            <svg viewBox="0 0 480 360" width="100%" height="100%">
              <rect width="480" height="360" fill="#EFEADE"/>
              <path d="M60,140 Q90,90 160,80 Q240,60 300,90 Q380,110 410,170 Q440,240 380,290 Q300,340 200,310 Q100,280 70,220 Q40,180 60,140 Z" fill="#F5F1E8" stroke="#8A8578" strokeWidth="1"/>
              <circle cx="220" cy="195" r="90" fill="rgba(127,166,107,0.18)" stroke="#3B6B45" strokeDasharray="3 4" strokeWidth="1"/>
              <g fontFamily="DM Sans, sans-serif" fontSize="11" fill="#3A2E22">
                <circle cx="220" cy="195" r="7" fill="#1F3A2C"/>
                <text x="234" y="198" fontWeight="700" fill="#1F3A2C">Silkeborg</text>
                <circle cx="170" cy="135" r="3" fill="#3B6B45"/><text x="135" y="128">Viborg</text>
                <circle cx="285" cy="220" r="3" fill="#3B6B45"/><text x="293" y="223">Skanderborg</text>
                <circle cx="130" cy="225" r="3" fill="#3B6B45"/><text x="85" y="240">Herning</text>
                <circle cx="155" cy="195" r="3" fill="#3B6B45"/><text x="105" y="190">Ikast</text>
                <circle cx="265" cy="170" r="3" fill="#3B6B45"/><text x="273" y="165">Hammel</text>
                <circle cx="240" cy="240" r="3" fill="#3B6B45"/><text x="248" y="252">Ry</text>
              </g>
            </svg>
          </div>
        </div>
      </section>

      <section className="stcta">
        <div className="stcta-inner">
          <h2>I tvivl om vi kører til dig?</h2>
          <p>Skriv hvor du bor, så svarer vi inden for et par hverdage.</p>
          <div className="stcta-actions">
            <Link href="/kontakt" className="stb stb-primary-light">
              Spørg om dit område
              <span className="stb-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </span>
            </Link>
            <a className="stcta-phone" href="tel:+4591251021"><Image src="/assets/icon-phone.svg" alt="" width={20} height={20} /> 91 25 10 21</a>
          </div>
        </div>
      </section>
    </>
  );
}
