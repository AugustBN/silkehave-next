"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionConfig } from "framer-motion";

const line = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 0.9, delay: 0.15 + i * 0.14, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={ref}
        style={{
          position: "relative",
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
          backgroundColor: "var(--moss-deep)",
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{ position: "absolute", inset: "-12% 0 0 0", y: imgY }}
          initial={{ scale: 1.07 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/assets/photos/terrasse-parasol.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "50% 45%" }}
          />
        </motion.div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(31,58,44,0.30) 0%, rgba(31,58,44,0.55) 55%, rgba(31,58,44,0.85) 100%)" }} />

        <motion.div
          style={{ position: "relative", maxWidth: "var(--container-max)", margin: "0 auto", padding: "120px 24px 96px", color: "var(--cream)", width: "100%", opacity: fade }}
        >
          <motion.span
            className="stb-eyebrow"
            style={{ color: "rgba(245,241,232,0.8)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Have‑ og ejendomsservice · Midtjylland
          </motion.span>

          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(38px, 7.2vw, 84px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.04, maxWidth: 820, margin: "0 0 20px", color: "var(--cream)" }}>
            {["Hækken trænger til en tur.", "Vi kommer forbi."].map((t, i) => (
              <span key={t} style={{ display: "block", overflow: "hidden", paddingBottom: "0.08em", marginBottom: "-0.08em" }}>
                <motion.span style={{ display: "block" }} variants={line} initial="hidden" animate="show" custom={i}>
                  {t}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: "clamp(16px, 2.1vw, 19px)", lineHeight: 1.5, maxWidth: 540, margin: "0 0 28px", color: "rgba(245,241,232,0.92)" }}
          >
            Vi klipper, samler op og kører væk. Du får en have, der ser ud som du vil have den, uden at du selv skal bruge weekenden på det.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}
          >
            <Link href="/kontakt" className="stb stb-primary">
              Få et tilbud
              <span className="stb-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </span>
            </Link>
            <Link href="/#arbejdet" className="stb stb-ghost-light">Se arbejdet ske</Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{ display: "flex", gap: "16px 24px", flexWrap: "wrap", paddingTop: 20, borderTop: "1px solid rgba(245,241,232,0.2)", fontSize: 13, color: "rgba(245,241,232,0.85)", maxWidth: 700 }}
          >
            <span><strong style={{ color: "var(--cream)", fontWeight: 600 }}>Lokal</strong> · Midtjylland</span>
            <span><strong style={{ color: "var(--cream)", fontWeight: 600 }}>Fast pris</strong> før vi starter</span>
            <span><strong style={{ color: "var(--cream)", fontWeight: 600 }}>Privat</strong> + boligforeninger</span>
          </motion.div>
        </motion.div>

        {/* Scroll-cue */}
        <motion.div
          aria-hidden="true"
          style={{ position: "absolute", bottom: 24, left: "50%", x: "-50%", opacity: cueOpacity, color: "var(--cream)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600 }}
        >
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ display: "inline-flex" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
          </motion.span>
          Rul
        </motion.div>
      </section>
    </MotionConfig>
  );
}
