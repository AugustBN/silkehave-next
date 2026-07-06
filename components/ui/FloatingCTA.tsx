"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";

// Flydende "Få et tilbud" der dukker op når hero-knappen er scrollet forbi,
// og trækker sig når bundens CTA-bånd selv er på skærmen.
export function FloatingCTA() {
  const [pastHero, setPastHero] = useState(false);
  const [nearEndCta, setNearEndCta] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const target = document.getElementById("bund-cta");
    let io: IntersectionObserver | null = null;
    if (target && "IntersectionObserver" in window) {
      io = new IntersectionObserver((entries) => setNearEndCta(entries[0].isIntersecting), { threshold: 0.15 });
      io.observe(target);
    }
    return () => { window.removeEventListener("scroll", onScroll); io?.disconnect(); };
  }, []);

  const visible = pastHero && !nearEndCta;

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "fixed", right: "max(20px, env(safe-area-inset-right))", bottom: "max(20px, env(safe-area-inset-bottom))", zIndex: 46 }}
          >
            <Link href="/kontakt" className="stb stb-primary stb-float">
              Få et tilbud
              <span className="stb-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
