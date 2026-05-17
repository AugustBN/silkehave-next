"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface CompareSliderProps {
  before: { src: string; alt: string };
  after:  { src: string; alt: string };
}

export function CompareSlider({ before, after }: CompareSliderProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const rafRef   = useRef<number | null>(null);
  const inView   = useRef(false);
  const elapsed  = useRef(0);
  const startAt  = useRef(0);

  const clamp = (v: number) => Math.max(0, Math.min(100, v));

  const fromX = useCallback((clientX: number) => {
    if (!wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    setPos(clamp(((clientX - r.left) / r.width) * 100));
  }, []);

  useEffect(() => {
    if (interacted) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    function loop(now: number) {
      if (!inView.current) { rafRef.current = null; return; }
      const t = (elapsed.current + now - startAt.current) / 1000;
      setPos(clamp(50 + 42 * Math.sin((t / 7) * Math.PI * 2)));
      rafRef.current = requestAnimationFrame(loop);
    }

    const obs = new IntersectionObserver((entries) => {
      const visible = entries.some((e) => e.isIntersecting);
      inView.current = visible;
      if (visible && rafRef.current === null) {
        startAt.current = performance.now();
        rafRef.current = requestAnimationFrame(loop);
      } else if (!visible && rafRef.current !== null) {
        elapsed.current += performance.now() - startAt.current;
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    }, { threshold: 0.3 });

    if (wrapRef.current) obs.observe(wrapRef.current);
    return () => {
      obs.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [interacted]);

  const stopAuto = useCallback(() => {
    if (interacted) return;
    setInteracted(true);
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
  }, [interacted]);

  return (
    <div
      ref={wrapRef}
      role="slider"
      aria-label="Træk for at sammenligne før og efter"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16/10",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        userSelect: "none",
        touchAction: "none",
        cursor: "ew-resize",
        margin: "16px 0 48px",
        background: "var(--bark)",
        boxShadow: "0 30px 60px -20px rgba(31,58,44,0.35), 0 8px 16px rgba(0,0,0,0.08)",
      }}
      onPointerDown={(e) => {
        stopAuto();
        setDragging(true);
        wrapRef.current?.setPointerCapture(e.pointerId);
        fromX(e.clientX);
      }}
      onPointerMove={(e) => { if (dragging) fromX(e.clientX); }}
      onPointerUp={(e) => { setDragging(false); wrapRef.current?.releasePointerCapture(e.pointerId); }}
      onPointerCancel={() => setDragging(false)}
    >
      {/* After (bottom) */}
      <Image src={after.src} alt={after.alt} fill style={{ objectFit: "cover", pointerEvents: "none" }} draggable={false} sizes="100vw" />
      <span style={{ position: "absolute", top: 16, right: 16, background: "var(--forest)", color: "var(--cream)", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", padding: "6px 12px", borderRadius: 999, zIndex: 3 }}>Efter</span>

      {/* Before (clipped) */}
      <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before.src} alt={before.alt} fill style={{ objectFit: "cover", pointerEvents: "none" }} draggable={false} sizes="100vw" />
        <span style={{ position: "absolute", top: 16, left: 16, background: "rgba(245,241,232,0.95)", color: "var(--bark)", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", padding: "6px 12px", borderRadius: 999, backdropFilter: "blur(4px)", zIndex: 3 }}>Før</span>
      </div>

      {/* Handle */}
      <div style={{ position: "absolute", top: 0, bottom: 0, left: `${pos}%`, transform: "translateX(-50%)", pointerEvents: "none", zIndex: 4 }}>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 3, marginLeft: -1.5, background: "var(--cream)", boxShadow: "0 0 12px rgba(0,0,0,0.4)" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 48, height: 48, borderRadius: "50%", background: "var(--cream)", color: "var(--forest)", display: "grid", placeItems: "center", boxShadow: "0 4px 14px rgba(0,0,0,0.25), 0 0 0 4px rgba(245,241,232,0.25)" }}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l-6 6 6 6"/><path d="M15 6l6 6-6 6"/>
          </svg>
        </div>
      </div>

      {/* Hint */}
      {!interacted && (
        <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", background: "rgba(31,58,44,0.92)", color: "var(--cream)", fontSize: 13, fontWeight: 500, padding: "8px 14px", borderRadius: 999, pointerEvents: "none", zIndex: 5 }}>
          Træk for at se forskellen
        </div>
      )}
    </div>
  );
}
