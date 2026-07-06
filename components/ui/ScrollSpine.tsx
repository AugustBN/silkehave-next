"use client";

import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";

// Sektionsmilepæle som andel af sidens samlede scroll
const LEAVES = [0.06, 0.24, 0.44, 0.62, 0.8, 0.94];

function Leaf({ progress, at, side }: { progress: ReturnType<typeof useSpring>; at: number; side: 1 | -1 }) {
  // Bladet folder ud når scrollen passerer milepælen
  const scale = useTransform(progress, [at - 0.02, at + 0.03], [0, 1]);
  const rotate = useTransform(progress, [at - 0.02, at + 0.03], [side * -40, 0]);
  return (
    <motion.g style={{ scale, rotate, transformOrigin: `12px ${at * 1000}px` }}>
      <path
        d={`M12 ${at * 1000} q ${side * 10} -4 ${side * 14} -12 q ${side * -2} 12 -14 12 z`}
        fill="var(--hedge)"
        opacity={0.85}
      />
    </motion.g>
  );
}

export function ScrollSpine() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <div className="spine" aria-hidden="true">
      <svg viewBox="0 0 24 1000" preserveAspectRatio="none" width="24" height="100%">
        {/* Spor */}
        <line x1="12" y1="0" x2="12" y2="1000" stroke="var(--stone-25)" strokeWidth="1.5" />
        {/* Vækst */}
        <motion.line
          x1="12" y1="0" x2="12" y2="1000"
          stroke="var(--hedge)"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ pathLength: progress }}
        />
        {LEAVES.map((at, i) => (
          <Leaf key={at} progress={progress} at={at} side={i % 2 === 0 ? 1 : -1} />
        ))}
      </svg>
      <style>{`
        .spine { position: fixed; top: 0; bottom: 0; left: 18px; width: 24px; z-index: 40; pointer-events: none; }
        .spine svg { display: block; height: 100%; }
        @media (max-width: 1279px) { .spine { display: none; } }
      `}</style>
    </div>
  );
}
