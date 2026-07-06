"use client";

import { useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { CompareSlider } from "@/components/ui/CompareSlider";

export interface ComparePair {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  label?: string;
}

const spring = { type: "spring" as const, stiffness: 170, damping: 26, mass: 0.9 };

// Kortstak af foer/efter-par. Kortene bag ligger let loeftet og vinklet,
// og pilene drejer stakken videre som viserne paa et ur (drejepunkt under kortet).
export function BeforeAfterDeck({ pairs }: { pairs: ComparePair[] }) {
  const [active, setActive] = useState(0);
  const n = pairs.length;
  const go = (d: number) => setActive((a) => (a + d + n) % n);

  return (
    <MotionConfig reducedMotion="user">
      <div style={{ position: "relative" }}>
        <div style={{ position: "relative" }}>
          {pairs.map((p, i) => {
            const delta = (i - active + n) % n;
            const conf =
              delta === 0 ? { rotate: 0,   x: 0,  y: 0,   scale: 1,     opacity: 1, zIndex: 3 } :
              delta === 1 ? { rotate: 3.5, x: 26, y: -22, scale: 0.965, opacity: 1, zIndex: 2 } :
              delta === 2 ? { rotate: 6.5, x: 48, y: -40, scale: 0.93,  opacity: 0.85, zIndex: 1 } :
                            { rotate: 9,   x: 64, y: -52, scale: 0.9,   opacity: 0, zIndex: 0 };
            return (
              <motion.div
                key={p.after.src}
                animate={conf}
                transition={spring}
                style={{
                  position: i === 0 ? "relative" : "absolute",
                  inset: i === 0 ? undefined : 0,
                  transformOrigin: "50% 140%",
                  pointerEvents: delta === 0 ? "auto" : "none",
                }}
                aria-hidden={delta !== 0}
              >
                <CompareSlider before={p.before} after={p.after} />
              </motion.div>
            );
          })}
        </div>

        {n > 1 && (
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: -24, marginBottom: 8 }}>
            {pairs[active].label && (
              <motion.span
                key={pairs[active].label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontSize: 14, fontWeight: 600, color: "var(--forest)", letterSpacing: "-0.01em" }}
              >
                {pairs[active].label}
              </motion.span>
            )}
            <span style={{ fontSize: 13, color: "var(--stone)", fontVariantNumeric: "tabular-nums" }}>
              {active + 1} / {n}
            </span>
            <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
              <button type="button" className="stbad-arrow" onClick={() => go(-1)} aria-label="Forrige før og efter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
              </button>
              <button type="button" className="stbad-arrow" onClick={() => go(1)} aria-label="Næste før og efter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        )}

        <style>{`
          .stbad-arrow { width: 46px; height: 46px; border-radius: 50%; border: 1.5px solid var(--hedge); background: var(--bone); color: var(--hedge); display: grid; place-items: center; cursor: pointer; transition: background 150ms cubic-bezier(0.22,1,0.36,1), color 150ms cubic-bezier(0.22,1,0.36,1), transform 150ms cubic-bezier(0.22,1,0.36,1); }
          .stbad-arrow:hover { background: var(--hedge); color: #fff; transform: translateY(-1px); }
          .stbad-arrow:active { transform: scale(0.94); }
        `}</style>
      </div>
    </MotionConfig>
  );
}
