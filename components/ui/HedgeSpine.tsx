"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionTemplate, useReducedMotion } from "framer-motion";

// Genbrugelig hæk-flise, 36x120 px, tegnet så top og bund mødes sømløst
const TILE = encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='36' height='120' viewBox='0 0 36 120'>` +
    `<rect x='0' y='0' width='20' height='120' fill='#15532C'/>` +
    `<circle cx='17' cy='0' r='12' fill='#1F6B3A'/>` +
    `<circle cx='17' cy='120' r='12' fill='#1F6B3A'/>` +
    `<circle cx='22' cy='28' r='12' fill='#2F8C4A'/>` +
    `<circle cx='14' cy='55' r='13' fill='#1F6B3A'/>` +
    `<circle cx='23' cy='88' r='11' fill='#2F8C4A'/>` +
    `<circle cx='8' cy='16' r='9' fill='#1F6B3A'/>` +
    `<circle cx='7' cy='74' r='10' fill='#2F8C4A'/>` +
    `<circle cx='9' cy='104' r='9' fill='#1F6B3A'/>` +
    `<circle cx='26' cy='14' r='2.4' fill='#7FA66B'/>` +
    `<circle cx='28' cy='42' r='2' fill='#7FA66B'/>` +
    `<circle cx='24' cy='66' r='2.2' fill='#7FA66B'/>` +
    `<circle cx='29' cy='96' r='2' fill='#7FA66B'/>` +
    `<circle cx='12' cy='36' r='2' fill='#7FA66B'/>` +
    `<circle cx='10' cy='90' r='2.2' fill='#7FA66B'/>` +
  `</svg>`
);

export function HedgeSpine() {
  const reduced = useReducedMotion();
  const [m, setM] = useState({ vh: 800, doc: 6000 });

  useEffect(() => {
    const measure = () => setM({ vh: window.innerHeight, doc: document.documentElement.scrollHeight });
    measure();
    const t = setTimeout(measure, 1200);
    window.addEventListener("resize", measure);
    return () => { window.removeEventListener("resize", measure); clearTimeout(t); };
  }, []);

  const { scrollY } = useScroll();

  // Vokser fra hero-sektionen er passeret til siden er scrollet færdig
  const raw = useTransform(scrollY, (y) => {
    const start = m.vh * 0.85;
    const end = Math.max(start + 1, m.doc - m.vh);
    return Math.min(1, Math.max(0, (y - start) / (end - start)));
  });
  const growth = useSpring(raw, { stiffness: 80, damping: 24, mass: 0.5 });

  const rest = useTransform(growth, (g) => `${(1 - g) * 100}%`);
  const clip = useMotionTemplate`inset(0 0 ${rest} 0)`;
  const tipTop = useTransform(growth, (g) => `calc(${g * 100}% - 10px)`);
  const tipOpacity = useTransform(growth, [0, 0.02, 0.96, 1], [0, 1, 1, 0]);
  const opacity = useTransform(scrollY, [m.vh * 0.55, m.vh * 0.95], [0, 1]);

  if (reduced) return null;

  return (
    <div className="hedgespine" aria-hidden="true">
      <motion.div className="hedgespine-fill" style={{ clipPath: clip, opacity }} />
      {/* Vækstspidsen: lille lys skudspids der følger fronten */}
      <motion.div className="hedgespine-tip" style={{ top: tipTop, opacity: tipOpacity }}>
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path d="M8 0 C11 4 13 7 8 12 C3 7 5 4 8 0 Z" fill="#7FA66B" />
        </svg>
      </motion.div>
      <style>{`
        .hedgespine { position: fixed; top: 0; bottom: 0; left: 0; width: 36px; z-index: 30; pointer-events: none; }
        .hedgespine-fill { position: absolute; inset: 0; background-image: url("data:image/svg+xml,${TILE}"); background-repeat: repeat-y; background-size: 36px 120px; filter: drop-shadow(2px 0 6px rgba(19,52,36,0.25)); }
        .hedgespine-tip { position: absolute; left: 6px; }
        @media (max-width: 1279px) { .hedgespine { display: none; } }
      `}</style>
    </div>
  );
}
