"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useVelocity,
  useSpring,
  useAnimationFrame,
  useReducedMotion,
  MotionConfig,
} from "framer-motion";

const PHOTOS = [
  { src: "/assets/photos/haek-stigen.jpg",         caption: "Hækklipning · liguster" },
  { src: "/assets/photos/arbejde-trimmer.jpg",     caption: "Toppen tages med maskine" },
  { src: "/assets/photos/haek-skarpt-hjoerne.jpg", caption: "Skarpt hjørne mod vejen" },
  { src: "/assets/photos/boegehaek-tarp.jpg",      caption: "Bøgehæk efter klip" },
  { src: "/assets/photos/haek-ved-roser.jpg",      caption: "Nyklippet ved rosenbedet" },
  { src: "/assets/photos/hoejtryk-doer.jpg",       caption: "Højtryksspuling" },
  { src: "/assets/photos/arbejde-husmur.jpg",      caption: "Klipning ved husmuren" },
  { src: "/assets/photos/haek-rosengang.jpg",      caption: "Rosengangen · efter" },
];

const BASE_SPEED = 26; // px/s naar siden staar stille

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return min + (((v - min) % range) + range) % range;
};

// Uendelig fotostrimmel: driver altid langsomt mod venstre, saetter farten op
// naar man scroller, og kan traekkes med fingeren eller musen.
export function FilmStrip() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [half, setHalf] = useState(0);
  const baseX = useMotionValue(0);
  const reduced = useReducedMotion();

  const dragging = useRef(false);
  const lastX = useRef(0);

  const { scrollY } = useScroll();
  const scrollVel = useVelocity(scrollY);
  const smoothVel = useSpring(scrollVel, { damping: 50, stiffness: 380 });

  // Maal halvdelen af sporet (indholdet er duplikeret)
  useEffect(() => {
    const measure = () => setHalf((trackRef.current?.scrollWidth ?? 0) / 2);
    measure();
    const t = setTimeout(measure, 800);
    window.addEventListener("resize", measure);
    return () => { window.removeEventListener("resize", measure); clearTimeout(t); };
  }, []);

  useAnimationFrame((_, delta) => {
    if (reduced || dragging.current || !half) return;
    const boost = Math.min(4, Math.abs(smoothVel.get()) / 350);
    const move = (BASE_SPEED * (1 + boost) * delta) / 1000;
    baseX.set(wrap(-half, 0, baseX.get() - move));
  });

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    lastX.current = e.clientX;
    try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); } catch { /* ignore */ }
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current || !half) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    baseX.set(wrap(-half, 0, baseX.get() + dx));
  };
  const endDrag = (e: React.PointerEvent) => {
    dragging.current = false;
    try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch { /* ignore */ }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div
        style={{ position: "relative", overflow: "hidden", margin: "56px calc(50% - 50vw) 0", padding: "4px 0", cursor: "grab", touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        role="region"
        aria-label="Fotos fra arbejdet, træk for at se flere"
      >
        <motion.div ref={trackRef} style={{ x: baseX, display: "flex", gap: 14, width: "max-content", paddingLeft: 24 }}>
          {[...PHOTOS, ...PHOTOS].map((p, i) => (
            <figure key={`${p.src}-${i}`} style={{ margin: 0, width: "clamp(180px, 22vw, 280px)", flex: "none" }}>
              <div className="stfs-photo">
                <Image
                  src={p.src}
                  alt={i < PHOTOS.length ? p.caption : ""}
                  width={600}
                  height={800}
                  sizes="(max-width: 880px) 40vw, 280px"
                  style={{ aspectRatio: "3/4", objectFit: "cover", width: "100%", display: "block" }}
                  loading="lazy"
                  aria-hidden={i >= PHOTOS.length}
                />
              </div>
              <figcaption style={{ fontSize: 12, color: "var(--stone)", marginTop: 8 }}>{p.caption}</figcaption>
            </figure>
          ))}
        </motion.div>
        <style>{`
          .stfs-photo { overflow: hidden; border-radius: var(--radius-md); }
          .stfs-photo img { transition: transform 600ms cubic-bezier(0.22,1,0.36,1); user-select: none; -webkit-user-drag: none; }
          .stfs-photo:hover img { transform: scale(1.05); }
        `}</style>
      </div>
    </MotionConfig>
  );
}
