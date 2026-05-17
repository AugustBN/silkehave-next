"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const drop = [50,6, 58,18, 80,38, 80,60, 80,78, 67,92, 50,92, 33,92, 20,78, 20,60, 20,38, 42,18, 50,6];
const leaf = [50,6, 50,12, 78,30, 78,50, 78,72, 65,92, 50,92, 35,92, 22,72, 22,50, 22,30, 50,12, 50,6];
const blue  = [82, 158, 209];
const green = [47, 107, 58];
const lerp  = (a: number, b: number, t: number) => a + (b - a) * t;

function morphPath(t: number) {
  const p = drop.map((v, i) => lerp(v, leaf[i], t));
  return `M${p[0]},${p[1]} C${p[2]},${p[3]} ${p[4]},${p[5]} ${p[6]},${p[7]} C${p[8]},${p[9]} ${p[10]},${p[11]} ${p[12]},${p[13]} C${p[14]},${p[15]} ${p[16]},${p[17]} ${p[18]},${p[19]} C${p[20]},${p[21]} ${p[22]},${p[23]} ${p[24]},${p[25]} Z`;
}
function morphColor(t: number) {
  const rgb = blue.map((c, i) => Math.round(lerp(c, green[i], t)));
  return `rgb(${rgb.join(",")})`;
}

export function Header({ isStatic = false }: { isStatic?: boolean }) {
  const [solid, setSolid]     = useState(isStatic);
  const [menuOpen, setMenuOpen] = useState(false);
  const [morphT, setMorphT]   = useState(isStatic ? 1 : 0);
  const rafRef = useRef<number | null>(null);
  const pathname = usePathname();

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isStatic) { setSolid(true); setMorphT(1); return; }
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 80);
      const t = Math.max(0, Math.min(1, y / 520));
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => setMorphT(Math.round(t * 1000) / 1000));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isStatic]);

  const d     = morphPath(morphT);
  const fill  = morphColor(morphT);
  const hlOp  = (1 - morphT) * 0.55;
  const vnOp  = morphT * 0.55;

  return (
    <header
      className="sth"
      id="site-header"
      style={solid ? {
        background: "rgba(245,241,232,0.92)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(138,133,120,0.25)",
      } : {}}
    >
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", gap: 24 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <span style={{ display: "inline-flex", width: 36, height: 36, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))", flex: "none" }}>
            <svg viewBox="0 0 100 100" width="36" height="36" aria-hidden="true">
              <path d={d} fill={fill} />
              <ellipse cx="38" cy="38" rx="6" ry="10" fill="#ffffff" transform="rotate(-20 38 38)" opacity={hlOp} />
              <path stroke="#1f3a2c" strokeWidth="1.6" strokeLinecap="round" fill="none" d="M50,14 L50,86" opacity={vnOp} />
              <path stroke="#1f3a2c" strokeWidth="1" strokeLinecap="round" fill="none" d="M50,38 Q60,42 66,50" opacity={morphT * 0.4} />
              <path stroke="#1f3a2c" strokeWidth="1" strokeLinecap="round" fill="none" d="M50,58 Q60,62 66,68" opacity={morphT * 0.4} />
              <path stroke="#1f3a2c" strokeWidth="1" strokeLinecap="round" fill="none" d="M50,38 Q40,42 34,50" opacity={morphT * 0.4} />
              <path stroke="#1f3a2c" strokeWidth="1" strokeLinecap="round" fill="none" d="M50,58 Q40,62 34,68" opacity={morphT * 0.4} />
            </svg>
          </span>
          <span style={{ display: "inline-flex", flexDirection: "column", lineHeight: 1.05, color: solid ? "var(--forest)" : "var(--cream)" }}>
            <span style={{ fontFamily: "var(--font-display, 'Bricolage Grotesque')", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>Silke</span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.85, marginTop: 2 }}>Total Service</span>
          </span>
        </Link>

        <nav style={{ display: "flex", gap: 28, marginLeft: "auto" }} className="sth-nav">
          {[
            { href: "/#ydelser", label: "Ydelser" },
            { href: "/om-os", label: "Om os" },
            { href: "/omraade", label: "Område" },
            { href: "/kontakt", label: "Kontakt" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 500, color: solid ? "var(--bark)" : "var(--cream)", textDecoration: "none" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }} className="sth-right">
          <a
            href="https://www.facebook.com/profile.php?id=61574788933190"
            target="_blank"
            rel="noopener"
            style={{ fontSize: 14, fontWeight: 500, color: solid ? "var(--bark)" : "var(--cream)", textDecoration: "none" }}
          >
            facebook · silkehave
          </a>
          <Link href="/kontakt" className="stb stb-primary">Få et tilbud</Link>
        </div>

        <button
          className="sth-burger"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          style={{ display: "none", background: "none", border: "none", padding: 8, cursor: "pointer" }}
        >
          <Image src="/assets/icon-menu.svg" alt="" width={24} height={24} style={solid ? {} : { filter: "brightness(0) invert(1)" }} />
        </button>
      </div>

      {menuOpen && (
        <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: "16px 24px 24px", background: "var(--cream)", borderTop: "1px solid var(--stone-25)" }}>
          {[
            { href: "/#ydelser", label: "Ydelser" },
            { href: "/om-os", label: "Om os" },
            { href: "/omraade", label: "Område" },
            { href: "/kontakt", label: "Kontakt" },
          ].map((l) => (
            <Link key={l.href} href={l.href} style={{ padding: "12px 0", color: "var(--bark)", textDecoration: "none", fontWeight: 500, borderBottom: "1px solid var(--stone-12)" }} onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/kontakt" className="stb stb-primary" style={{ marginTop: 8, justifyContent: "center" }} onClick={() => setMenuOpen(false)}>Få et tilbud</Link>
        </div>
      )}

      <style>{`
        .sth { position: fixed; top: 0; left: 0; right: 0; z-index: 50; transition: background 240ms cubic-bezier(0.22,1,0.36,1), backdrop-filter 240ms cubic-bezier(0.22,1,0.36,1); }
        @media (max-width: 880px) { .sth-nav, .sth-right { display: none !important; } .sth-burger { display: block !important; margin-left: auto; } }
      `}</style>
    </header>
  );
}
