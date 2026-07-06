"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, MotionConfig } from "framer-motion";

const STEPS = [
  {
    n: "01",
    title: "Fast pris, før vi starter",
    body: "Ring, eller send et par billeder af opgaven. Du får en fast pris på forhånd, og den holder.",
    img: "/assets/photos/terrasse-have.jpg",
    alt: "Have med terrasse før arbejdet",
  },
  {
    n: "02",
    title: "Vi kommer og ordner det",
    body: "Til aftalt tid, med eget grej. Du behøver ikke være hjemme, og du skal ikke låne os noget.",
    img: "/assets/photos/arbejde-trimmer.jpg",
    alt: "Hækkens top klippes med maskine",
  },
  {
    n: "03",
    title: "Vi rydder op og kører væk",
    body: "Afklip og grene samles på presenning og køres væk. Du får et billede, når vi er færdige.",
    img: "/assets/photos/boegehaek-tarp.jpg",
    alt: "Nyklippet bøgehæk med presenning",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

function PinnedProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(STEPS.length - 1, Math.floor(v * STEPS.length)));
  });

  return (
    <div ref={ref} className="stproc-pin" style={{ position: "relative", height: "320vh" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px", width: "100%", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 72, alignItems: "center" }}>

          {/* Trinliste */}
          <div>
            <span className="stb-eyebrow" style={{ color: "rgba(245,241,232,0.6)" }}>Sådan foregår det</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.2vw, 44px)", fontWeight: 600, color: "var(--cream)", margin: "0 0 36px", letterSpacing: "-0.015em", lineHeight: 1.08 }}>
              Tre trin.<br />Ikke mere bøvl end det.
            </h2>
            <div style={{ position: "relative", paddingLeft: 28 }}>
              {/* Fremdrift */}
              <div style={{ position: "absolute", left: 0, top: 8, bottom: 8, width: 2, background: "rgba(245,241,232,0.16)", borderRadius: 2 }}>
                <motion.div style={{ width: "100%", height: "100%", scaleY: scrollYProgress, transformOrigin: "top", background: "var(--hedge)", borderRadius: 2 }} />
              </div>
              {STEPS.map((s, i) => (
                <div key={s.n} style={{ padding: "18px 0", opacity: active === i ? 1 : 0.42, transition: "opacity 400ms cubic-bezier(0.22,1,0.36,1)" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "var(--hedge)", letterSpacing: "0.06em" }}>{s.n}</span>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 1.8vw, 26px)", fontWeight: 600, color: "var(--cream)", margin: 0, letterSpacing: "-0.01em" }}>{s.title}</h3>
                  </div>
                  <p style={{ fontSize: 15.5, lineHeight: 1.55, color: "rgba(245,241,232,0.75)", margin: "8px 0 0", maxWidth: 380 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Fotostak, krydstoner mellem trin */}
          <div style={{ position: "relative", aspectRatio: "4/5", maxHeight: "74vh", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "0 40px 80px -24px rgba(0,0,0,0.5)" }}>
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={false}
                animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.06 }}
                transition={{ duration: 0.7, ease }}
                style={{ position: "absolute", inset: 0 }}
              >
                <Image src={s.img} alt={s.alt} fill sizes="(max-width: 880px) 100vw, 640px" style={{ objectFit: "cover" }} />
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

function StackedProcess() {
  return (
    <div className="stproc-stack" style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "72px 24px 24px" }}>
      <span className="stb-eyebrow" style={{ color: "rgba(245,241,232,0.6)" }}>Sådan foregår det</span>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 6vw, 36px)", fontWeight: 600, color: "var(--cream)", margin: "0 0 32px", letterSpacing: "-0.015em", lineHeight: 1.08 }}>
        Tre trin. Ikke mere bøvl end det.
      </h2>
      {STEPS.map((s, i) => (
        <motion.div
          key={s.n}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: i * 0.05, ease }}
          style={{ marginBottom: 40 }}
        >
          <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", marginBottom: 16 }}>
            <Image src={s.img} alt={s.alt} width={900} height={700} sizes="100vw" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }} />
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "var(--hedge)" }}>{s.n}</span>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: "var(--cream)", margin: 0 }}>{s.title}</h3>
          </div>
          <p style={{ fontSize: 15.5, lineHeight: 1.55, color: "rgba(245,241,232,0.75)", margin: "8px 0 0" }}>{s.body}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function ProcessSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="arbejdet" style={{ background: "var(--moss-deep)" }}>
        <PinnedProcess />
        <StackedProcess />
        <style>{`
          @media (max-width: 880px) { .stproc-pin { display: none; } }
          @media (min-width: 881px) { .stproc-stack { display: none; } }
          @media (prefers-reduced-motion: reduce) {
            .stproc-pin { display: none; }
            .stproc-stack { display: block !important; }
          }
        `}</style>
      </section>
    </MotionConfig>
  );
}
