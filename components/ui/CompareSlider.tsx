"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface CompareSliderProps {
  before: { src: string; alt: string };
  after:  { src: string; alt: string };
}

function ScissorsIcon({ open }: { open: boolean }) {
  const angle = open ? 20 : 6;
  return (
    <svg viewBox="0 0 52 52" width="44" height="44" fill="none" style={{ display: "block" }}>
      {/* Top blade + handle ring */}
      <g transform={`rotate(-${angle} 26 26)`} style={{ transition: "transform 80ms ease-out" }}>
        <ellipse cx="10" cy="16" rx="7" ry="7" stroke="white" strokeWidth="2.5" fill="rgba(0,0,0,0.5)" />
        <line x1="16" y1="19" x2="46" y2="26" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      </g>
      {/* Bottom blade + handle ring */}
      <g transform={`rotate(${angle} 26 26)`} style={{ transition: "transform 80ms ease-out" }}>
        <ellipse cx="10" cy="36" rx="7" ry="7" stroke="white" strokeWidth="2.5" fill="rgba(0,0,0,0.5)" />
        <line x1="16" y1="33" x2="46" y2="26" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      </g>
      {/* Pivot screw */}
      <circle cx="26" cy="26" r="3.5" fill="white" />
      <circle cx="26" cy="26" r="1.5" fill="rgba(0,0,0,0.4)" />
    </svg>
  );
}

export function CompareSlider({ before, after }: CompareSliderProps) {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const rafRef   = useRef<number | null>(null);
  const inView   = useRef(false);
  const elapsed  = useRef(0);
  const startAt  = useRef(0);
  const [pos, setPos]               = useState(50);
  const [dragging, setDragging]     = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [hovering, setHovering]     = useState(false);
  const [mouse, setMouse]           = useState({ x: 0, y: 0 });
  const [isCoarse, setIsCoarse]     = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsCoarse(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const clamp = (v: number) => Math.max(0, Math.min(100, v));

  const posFromX = useCallback((clientX: number) => {
    if (!wrapRef.current) return 50;
    const r = wrapRef.current.getBoundingClientRect();
    return clamp(((clientX - r.left) / r.width) * 100);
  }, []);

  // Auto-animate (sine wave) when not interacted
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

  const showScissors = hovering && !isCoarse;

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
        cursor: showScissors ? "none" : "ew-resize",
        margin: "16px 0 48px",
        background: "var(--bark)",
        boxShadow: "0 30px 60px -20px rgba(31,58,44,0.35), 0 8px 16px rgba(0,0,0,0.08)",
      }}
      onPointerEnter={(e) => {
        if (e.pointerType === "touch") return;
        setHovering(true);
        stopAuto();
      }}
      onPointerLeave={() => {
        setHovering(false);
        setDragging(false);
      }}
      onPointerMove={(e) => {
        if (e.pointerType === "touch") return;
        if (!wrapRef.current) return;
        const r = wrapRef.current.getBoundingClientRect();
        setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
        // Reveal follows mouse X on hover (no drag required)
        setPos(posFromX(e.clientX));
        if (dragging) wrapRef.current.setPointerCapture(e.pointerId);
      }}
      onPointerDown={(e) => {
        if (e.pointerType === "touch") {
          stopAuto();
          setDragging(true);
          wrapRef.current?.setPointerCapture(e.pointerId);
          setPos(posFromX(e.clientX));
          return;
        }
        setDragging(true);
      }}
      onPointerUp={(e) => {
        setDragging(false);
        try { wrapRef.current?.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
      }}
      onPointerCancel={() => setDragging(false)}
    >
      {/* After layer (bottom) */}
      <Image src={after.src} alt={after.alt} fill style={{ objectFit: "cover", pointerEvents: "none" }} draggable={false} sizes="100vw" />
      <span style={{ position: "absolute", top: 16, right: 16, background: "var(--forest)", color: "var(--cream)", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", padding: "6px 12px", borderRadius: 999, zIndex: 3, pointerEvents: "none" }}>Efter</span>

      {/* Before layer (clipped) */}
      <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)`, willChange: "clip-path" }}>
        <Image src={before.src} alt={before.alt} fill style={{ objectFit: "cover", pointerEvents: "none" }} draggable={false} sizes="100vw" />
        <span style={{ position: "absolute", top: 16, left: 16, background: "rgba(245,241,232,0.95)", color: "var(--bark)", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", padding: "6px 12px", borderRadius: 999, backdropFilter: "blur(4px)", zIndex: 3, pointerEvents: "none" }}>Før</span>
      </div>

      {/* Divider line + knob (hidden when scissors active) */}
      <div style={{ position: "absolute", top: 0, bottom: 0, left: `${pos}%`, transform: "translateX(-50%)", pointerEvents: "none", zIndex: 4, opacity: showScissors ? 0 : 1, transition: "opacity 200ms" }}>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 3, marginLeft: -1.5, background: "var(--cream)", boxShadow: "0 0 12px rgba(0,0,0,0.4)" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 48, height: 48, borderRadius: "50%", background: "var(--cream)", color: "var(--forest)", display: "grid", placeItems: "center", boxShadow: "0 4px 14px rgba(0,0,0,0.25), 0 0 0 4px rgba(245,241,232,0.25)" }}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l-6 6 6 6"/><path d="M15 6l6 6-6 6"/>
          </svg>
        </div>
      </div>

      {/* Cut line when scissors active */}
      {showScissors && (
        <div style={{ position: "absolute", top: 0, bottom: 0, left: `${pos}%`, transform: "translateX(-50%)", pointerEvents: "none", zIndex: 4 }}>
          <div style={{
            position: "absolute", top: 0, bottom: 0, left: "50%", width: 2, marginLeft: -1,
            background: "rgba(255,255,255,0.7)",
            boxShadow: "0 0 8px rgba(255,255,255,0.5)",
            maskImage: "repeating-linear-gradient(to bottom, black 0px, black 12px, transparent 12px, transparent 18px)",
            WebkitMaskImage: "repeating-linear-gradient(to bottom, black 0px, black 12px, transparent 12px, transparent 18px)",
          }} />
        </div>
      )}

      {/* Scissors cursor */}
      {showScissors && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: mouse.x,
            top: mouse.y,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 10,
            filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.6))",
          }}
        >
          <ScissorsIcon open={dragging} />
        </div>
      )}

      {/* Hint */}
      {!interacted && (
        <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", background: "rgba(31,58,44,0.92)", color: "var(--cream)", fontSize: 13, fontWeight: 500, padding: "8px 14px", borderRadius: 999, pointerEvents: "none", zIndex: 5, whiteSpace: "nowrap" }}>
          Træk for at se forskellen
        </div>
      )}
    </div>
  );
}
