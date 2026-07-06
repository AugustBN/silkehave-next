"use client";

import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";

const TOWNS = ["Silkeborg","Viborg","Skanderborg","Herning","Ikast","Brande","Bjerringbro","Hammel","Ry","Them","Kjellerup","Karup"];

const DOTS = [
  { x: 115, y: 125, label: "Viborg",      lx: 80,  ly: 118 },
  { x: 200, y: 195, label: "Skanderborg", lx: 208, ly: 198 },
  { x: 90,  y: 205, label: "Herning",     lx: 55,  ly: 220 },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function AreaSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section style={{ padding: "120px 0", background: "var(--cream)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="stas-inner">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="stb-eyebrow">Område</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 600, color: "var(--forest)", margin: "0 0 16px", letterSpacing: "-0.015em", lineHeight: 1.1 }}>
              Vi kører primært i Midtjylland.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.55, margin: "0 0 24px", maxWidth: 480 }}>
              Vi har base i Silkeborg-området og kører ud i en god radius derfra. Står du uden for listen, så ring og spørg. Vi kan ofte godt komme alligevel.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
              {TOWNS.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: 0.2 + i * 0.04, ease }}
                  style={{ fontSize: 13, padding: "6px 12px", background: "var(--bone)", border: "1px solid var(--stone-25)", borderRadius: "var(--radius-pill)", color: "var(--bark)", display: "inline-block" }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
            <Link href="/omraade" className="stb stb-ghost">Se kort over området</Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            style={{ aspectRatio: "1", background: "var(--ceramic)", borderRadius: "var(--radius-lg)", border: "1px solid var(--stone-25)", overflow: "hidden" }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 320 320" width="100%" height="100%">
              <rect width="320" height="320" fill="#EFEADE"/>
              <path d="M40,120 Q60,80 110,70 Q160,55 200,80 Q260,95 270,140 Q285,200 240,240 Q190,280 130,260 Q70,240 50,190 Q30,160 40,120 Z" fill="#F5F1E8" stroke="#8A8578" strokeWidth="1"/>
              {/* Kørselsradius tegner sig selv */}
              <motion.circle
                cx="155" cy="170" r="60"
                fill="rgba(127,166,107,0.18)"
                stroke="#3B6B45" strokeDasharray="3 4" strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.4, delay: 0.3, ease: "easeInOut" }}
              />
              <motion.circle
                cx="155" cy="170" r="6" fill="#1F3A2C"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.2, ease }}
                style={{ transformOrigin: "155px 170px" }}
              />
              <text x="170" y="172" fontFamily="DM Sans, sans-serif" fontSize="11" fill="#1F3A2C" fontWeight="600">Silkeborg</text>
              {DOTS.map((d, i) => (
                <motion.g
                  key={d.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: 0.7 + i * 0.15, ease }}
                  style={{ transformOrigin: `${d.x}px ${d.y}px` }}
                >
                  <circle cx={d.x} cy={d.y} r="3" fill="#3B6B45"/>
                  <text x={d.lx} y={d.ly} fontFamily="DM Sans" fontSize="10" fill="#3A2E22">{d.label}</text>
                </motion.g>
              ))}
            </svg>
          </motion.div>
        </div>
        <style>{`@media (max-width: 880px) { .stas-inner { grid-template-columns: 1fr !important; gap: 32px !important; } }`}</style>
      </section>
    </MotionConfig>
  );
}
