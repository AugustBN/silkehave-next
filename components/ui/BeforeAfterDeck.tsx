"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, MotionConfig, useReducedMotion } from "framer-motion";
import { CompareSlider } from "@/components/ui/CompareSlider";

export interface ComparePair {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  label?: string;
}

const AUTO_MS = 8000;
const ease = [0.22, 1, 0.36, 1] as const;

// Karrusel med side-kig og auto-timer:
// naboparrene skimtes daempet i siderne (klikbare), og en ring paa
// naeste-pilen taeller ned til automatisk skift. Hover eller traek pauser.
export function BeforeAfterDeck({ pairs }: { pairs: ComparePair[] }) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0);
  const reduced = useReducedMotion();
  const n = pairs.length;

  const go = (d: number) => {
    setDir(d);
    setActive((a) => (a + d + n) % n);
    setCycle((c) => c + 1);
  };

  // Auto-skift med fuld nulstilling ved pause/manuel navigation
  useEffect(() => {
    if (n < 2 || paused || reduced) return;
    const t = setTimeout(() => go(1), AUTO_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, cycle, paused, reduced, n]);

  const p = pairs[active];
  const prev = pairs[(active - 1 + n) % n];
  const next = pairs[(active + 1) % n];
  const ringOn = n > 1 && !paused && !reduced;

  return (
    <MotionConfig reducedMotion="user">
      <div
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => { setPaused(false); setCycle((c) => c + 1); }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "clamp(28px, 6vw, 72px) 1fr clamp(28px, 6vw, 72px)", gap: "clamp(8px, 1.4vw, 18px)", alignItems: "stretch" }}>
          {/* Kig til forrige */}
          <PeekCard pair={prev} side="left" onClick={() => go(-1)} show={n > 1} />

          <div style={{ position: "relative", overflow: "hidden", minWidth: 0 }}>
            <AnimatePresence mode="popLayout" initial={false} custom={dir}>
              <motion.div
                key={p.after.src}
                custom={dir}
                initial={{ opacity: 0, x: dir * 90 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -90 }}
                transition={{ duration: 0.45, ease }}
              >
                <CompareSlider before={p.before} after={p.after} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Kig til næste */}
          <PeekCard pair={next} side="right" onClick={() => go(1)} show={n > 1} />
        </div>

        {n > 1 && (
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: -24, marginBottom: 8, padding: "0 clamp(36px, 7.4vw, 90px)" }}>
            {p.label && (
              <motion.span
                key={p.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease }}
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
              <button type="button" className="stbad-arrow stbad-next" onClick={() => go(1)} aria-label="Næste før og efter">
                {/* Nedtællingsring */}
                {ringOn && (
                  <svg key={`${active}-${cycle}`} className="stbad-ring" viewBox="0 0 46 46" aria-hidden="true">
                    <circle cx="23" cy="23" r="20.5" fill="none" stroke="var(--hedge)" strokeWidth="2.5" strokeLinecap="round" pathLength={100} />
                  </svg>
                )}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        )}

        <style>{`
          .stbad-arrow { position: relative; width: 46px; height: 46px; border-radius: 50%; border: 1.5px solid var(--hedge); background: var(--bone); color: var(--hedge); display: grid; place-items: center; cursor: pointer; transition: background 150ms cubic-bezier(0.22,1,0.36,1), color 150ms cubic-bezier(0.22,1,0.36,1), transform 150ms cubic-bezier(0.22,1,0.36,1); }
          .stbad-arrow:hover { background: var(--hedge); color: #fff; transform: translateY(-1px); }
          .stbad-arrow:active { transform: scale(0.94); }
          .stbad-next { border-color: var(--stone-25); }
          .stbad-ring { position: absolute; inset: -2px; width: calc(100% + 4px); height: calc(100% + 4px); transform: rotate(-90deg); pointer-events: none; }
          .stbad-ring circle { stroke-dasharray: 100; stroke-dashoffset: 100; animation: stbad-count ${AUTO_MS}ms linear forwards; }
          @keyframes stbad-count { to { stroke-dashoffset: 0; } }
          .stbad-peek { position: relative; border: none; padding: 0; border-radius: var(--radius-md); overflow: hidden; cursor: pointer; opacity: 0.5; filter: saturate(0.8); transform: scale(0.96); transition: opacity 240ms cubic-bezier(0.22,1,0.36,1), transform 240ms cubic-bezier(0.22,1,0.36,1); margin: 16px 0 48px; background: var(--bark); }
          .stbad-peek:hover { opacity: 0.85; transform: scale(1); }
        `}</style>
      </div>
    </MotionConfig>
  );
}

function PeekCard({ pair, side, onClick, show }: { pair: ComparePair; side: "left" | "right"; onClick: () => void; show: boolean }) {
  if (!show) return <span />;
  return (
    <button
      type="button"
      className="stbad-peek"
      onClick={onClick}
      aria-label={side === "left" ? "Vis forrige før og efter" : "Vis næste før og efter"}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={pair.after.src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Image
            src={pair.after.src}
            alt=""
            fill
            sizes="80px"
            style={{ objectFit: "cover", objectPosition: side === "left" ? "100% 50%" : "0% 50%" }}
          />
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
