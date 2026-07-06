"use client";

import { useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { CompareSlider } from "@/components/ui/CompareSlider";

export interface ComparePair {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  label?: string;
}

// Karrusel af foer/efter-par: det aktive kort glider til siden,
// det naeste glider ind fra pilens retning. Roligt og forudsigeligt.
export function BeforeAfterDeck({ pairs }: { pairs: ComparePair[] }) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const n = pairs.length;
  const go = (d: number) => { setDir(d); setActive((a) => (a + d + n) % n); };
  const p = pairs[active];

  return (
    <MotionConfig reducedMotion="user">
      <div>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.div
              key={p.after.src}
              custom={dir}
              initial={{ opacity: 0, x: dir * 90 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -90 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <CompareSlider before={p.before} after={p.after} />
            </motion.div>
          </AnimatePresence>
        </div>

        {n > 1 && (
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: -24, marginBottom: 8 }}>
            {p.label && (
              <motion.span
                key={p.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontSize: 14, fontWeight: 600, color: "var(--forest)", letterSpacing: "-0.01em" }}
              >
                {p.label}
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
