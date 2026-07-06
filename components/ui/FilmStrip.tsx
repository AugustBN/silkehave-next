"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionConfig } from "framer-motion";

const PHOTOS = [
  { src: "/assets/photos/haek-stigen.jpg",      caption: "Hækklipning · liguster" },
  { src: "/assets/photos/boegehaek-tarp.jpg",   caption: "Bøgehæk efter klip" },
  { src: "/assets/photos/terrasse-parasol.jpg", caption: "Terrasse · sensommer" },
  { src: "/assets/photos/hoejtryk-doer.jpg",    caption: "Højtryksspuling" },
  { src: "/assets/photos/haek-knael-busk.jpg",  caption: "Detaljen i bunden" },
  { src: "/assets/photos/haek-roekke-ny.jpg",   caption: "Ny række · klar til vækst" },
];

// Filmstrimmel der driver sidelæns i takt med scroll
export function FilmStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-14%"]);

  return (
    <MotionConfig reducedMotion="user">
      <div ref={ref} style={{ position: "relative", overflow: "hidden", margin: "56px calc(50% - 50vw) 0", padding: "4px 0" }}>
        <motion.div style={{ x, display: "flex", gap: 14, width: "max-content", paddingLeft: 24 }}>
          {PHOTOS.map((p) => (
            <figure key={p.src} style={{ margin: 0, width: "clamp(180px, 22vw, 280px)", flex: "none" }}>
              <div className="stfs-photo">
                <Image
                  src={p.src}
                  alt={p.caption}
                  width={600}
                  height={800}
                  sizes="(max-width: 880px) 40vw, 280px"
                  style={{ aspectRatio: "3/4", objectFit: "cover", width: "100%", display: "block" }}
                  loading="lazy"
                />
              </div>
              <figcaption style={{ fontSize: 12, color: "var(--stone)", marginTop: 8 }}>{p.caption}</figcaption>
            </figure>
          ))}
        </motion.div>
        <style>{`
          .stfs-photo { overflow: hidden; border-radius: var(--radius-md); }
          .stfs-photo img { transition: transform 600ms cubic-bezier(0.22,1,0.36,1); }
          .stfs-photo:hover img { transform: scale(1.05); }
        `}</style>
      </div>
    </MotionConfig>
  );
}
