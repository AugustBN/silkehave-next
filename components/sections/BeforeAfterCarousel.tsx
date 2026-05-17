"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { AnimateIn } from "@/components/ui/AnimateIn";

interface Pair {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  label?: string;
}

interface BeforeAfterCarouselProps {
  pairs: Pair[];
}

export function BeforeAfterCarousel({ pairs }: BeforeAfterCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => {
      if (next === index) return;
      setDirection(next > index ? 1 : -1);
      setIndex(next);
    },
    [index]
  );

  const prev = useCallback(() => go((index - 1 + pairs.length) % pairs.length), [go, index, pairs.length]);
  const next = useCallback(() => go((index + 1) % pairs.length), [go, index, pairs.length]);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -60 }),
  };

  return (
    <section className="py-24" style={{ background: "var(--color-cream)" }}>
      <div className="mx-auto max-w-6xl px-6">
        <AnimateIn className="mb-12 text-center">
          <p
            className="mb-3 text-xs font-600 uppercase tracking-widest"
            style={{ color: "var(--color-green)", fontWeight: 600 }}
          >
            Vores arbejde
          </p>
          <h2
            className="text-4xl font-700 leading-tight md:text-5xl"
            style={{ fontFamily: "var(--font-display), 'Bricolage Grotesque', sans-serif", fontWeight: 700, color: "var(--color-text)" }}
          >
            Før og efter
          </h2>
          <p className="mt-4 text-lg" style={{ color: "var(--color-muted)" }}>
            Træk i skillelinjen — se forskellen selv.
          </p>
        </AnimateIn>

        <div className="relative">
          {/* Main slider */}
          <div
            className="overflow-hidden rounded-2xl"
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const diff = touchStartX.current - e.changedTouches[0].clientX;
              if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
              touchStartX.current = null;
            }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <BeforeAfterSlider
                  before={pairs[index].before}
                  after={pairs[index].after}
                  label={pairs[index].label}
                  autoAnimate
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrows */}
          {pairs.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-0 top-1/2 z-10 -translate-x-5 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
                style={{ background: "white" }}
                aria-label="Forrige billede"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={next}
                className="absolute right-0 top-1/2 z-10 translate-x-5 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
                style={{ background: "white" }}
                aria-label="Næste billede"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {pairs.length > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {pairs.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === index ? 24 : 8,
                  height: 8,
                  background: i === index ? "var(--color-green)" : "rgba(61,107,53,0.25)",
                }}
                aria-label={`Gå til billede ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Counter */}
        <p className="mt-4 text-center text-sm" style={{ color: "var(--color-muted)" }}>
          {index + 1} / {pairs.length}
        </p>
      </div>
    </section>
  );
}
