import Link from "next/link";
import { Header } from "@/components/layout/Header";

export default function NotFound() {
  return (
    <>
      <Header isStatic />
      <section className="page-head">
        <div className="page-head-inner">
          <span className="stb-eyebrow">404</span>
          <h1>Den side findes ikke.</h1>
          <p>Siden er enten flyttet eller har aldrig eksisteret. Prøv forsiden, eller skriv til os, hvis du ledte efter noget bestemt.</p>
        </div>
      </section>
      <section style={{ background: "var(--cream)", padding: "64px 24px 96px" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link href="/" className="stb stb-primary">Til forsiden</Link>
          <Link href="/kontakt" className="stb stb-ghost">Kontakt os</Link>
        </div>
      </section>
    </>
  );
}
