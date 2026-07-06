"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  // Luk menuen med Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

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
      className={`sth${solid ? " is-solid" : ""}`}
      id="site-header"
      style={solid ? {
        background: "rgba(245,241,232,0.55)",
        backdropFilter: "blur(16px) saturate(1.5)",
        WebkitBackdropFilter: "blur(16px) saturate(1.5)",
        borderBottom: "1px solid rgba(138,133,120,0.18)",
      } : {}}
    >
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", gap: 24, position: "relative", zIndex: 2 }}>
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
            <span style={{ fontFamily: "var(--font-display, 'Bricolage Grotesque')", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>SilkeHave</span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.85, marginTop: 2 }}>Have &amp; Ejendomsservice</span>
          </span>
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: "clamp(6px, 1.6vw, 24px)", marginLeft: "auto" }} className="sth-nav">
          {[
            { href: "/#ydelser", label: "Ydelser" },
            { href: "/om-os", label: "Om os" },
            { href: "/omraade", label: "Område" },
            { href: "/kontakt", label: "Kontakt" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="sth-navlink"
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
            rel="noopener noreferrer"
            style={{ fontSize: 14, fontWeight: 500, color: solid ? "var(--bark)" : "var(--cream)", textDecoration: "none", whiteSpace: "nowrap" }}
          >
            facebook · silkehave
          </a>
          <Link href="/kontakt" className="stb stb-primary">Få et tilbud</Link>
        </div>

        <button
          className="sth-burger"
          aria-label={menuOpen ? "Luk menu" : "Menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          style={{ display: "none", background: "none", border: "none", padding: 10, cursor: "pointer" }}
        >
          <span className={`sth-bars${menuOpen ? " is-open" : ""}`} style={{ color: solid || menuOpen ? "var(--bark)" : "var(--cream)" }}>
            <span /><span /><span />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="sth-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onClick={() => setMenuOpen(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(19,52,36,0.32)", backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)", zIndex: 1 }}
            aria-hidden="true"
          />
        )}
        {menuOpen && (
          <motion.div
            key="sth-panel"
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 16,
              width: "min(300px, calc(100vw - 32px))",
              background: "var(--bone)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--stone-25)",
              boxShadow: "var(--shadow-lifted)",
              padding: 10,
              transformOrigin: "top right",
              zIndex: 3,
            }}
          >
            {[
              { href: "/#ydelser", label: "Ydelser" },
              { href: "/om-os", label: "Om os" },
              { href: "/omraade", label: "Område" },
              { href: "/kontakt", label: "Kontakt" },
            ].map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: 0.05 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={l.href}
                  className="sth-menuitem"
                  style={{ display: "block", padding: "11px 14px", borderRadius: "var(--radius-md)", color: "var(--bark)", textDecoration: "none", fontWeight: 500, fontSize: 15 }}
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{ padding: "6px 4px 4px" }}
            >
              <Link href="/kontakt" className="stb stb-primary" style={{ width: "100%", justifyContent: "center", boxSizing: "border-box" }} onClick={() => setMenuOpen(false)}>Få et tilbud</Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .sth { position: fixed; top: 0; left: 0; right: 0; z-index: 50; transition: background 240ms cubic-bezier(0.22,1,0.36,1), backdrop-filter 240ms cubic-bezier(0.22,1,0.36,1); }
        .sth-menuitem:hover { background: var(--sage-light); color: var(--forest); }
        .sth-bars { display: inline-flex; flex-direction: column; justify-content: center; gap: 5px; width: 22px; height: 18px; }
        .sth-bars span { display: block; height: 2px; width: 100%; background: currentColor; border-radius: 2px; transition: transform 300ms cubic-bezier(0.22,1,0.36,1), opacity 200ms ease; transform-origin: center; }
        .sth-bars.is-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .sth-bars.is-open span:nth-child(2) { opacity: 0; }
        .sth-bars.is-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        .sth-navlink { display: inline-block; padding: 8px 14px; border-radius: 999px; line-height: 1.2; white-space: nowrap; transition: box-shadow 150ms cubic-bezier(0.22,1,0.36,1); }
        .sth-navlink:hover { box-shadow: 0 0 0 1.5px rgba(255,255,255,0.5), 0 0 12px 3px rgba(255,255,255,0.18); }
        .sth.is-solid .sth-navlink:hover { box-shadow: 0 0 0 1.5px rgba(47,140,74,0.4), 0 0 12px 3px rgba(47,140,74,0.14); }
        @media (max-width: 1080px) { .sth-nav, .sth-right { display: none !important; } .sth-burger { display: block !important; margin-left: auto; } }
      `}</style>
    </header>
  );
}
