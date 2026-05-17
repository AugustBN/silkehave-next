"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  label?: string;
  autoAnimate?: boolean;
}

export function BeforeAfterSlider({
  before,
  after,
  label,
  autoAnimate = true,
}: BeforeAfterSliderProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const rafRef = useRef<number | null>(null);
  const inViewRef = useRef(false);
  const elapsedRef = useRef(0);
  const startAtRef = useRef(0);

  const setPosition = useCallback((v: number) => {
    setPos(Math.max(2, Math.min(98, v)));
  }, []);

  const fromClientX = useCallback(
    (clientX: number) => {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      setPosition(((clientX - rect.left) / rect.width) * 100);
    },
    [setPosition]
  );

  useEffect(() => {
    if (!autoAnimate || userInteracted) return;

    function loop(now: number) {
      if (!inViewRef.current) { rafRef.current = null; return; }
      const elapsed = (elapsedRef.current + now - startAtRef.current) / 1000;
      setPosition(50 + 42 * Math.sin((elapsed / 8) * Math.PI * 2));
      rafRef.current = requestAnimationFrame(loop);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting);
        inViewRef.current = visible;
        if (visible && rafRef.current === null && !userInteracted) {
          startAtRef.current = performance.now();
          rafRef.current = requestAnimationFrame(loop);
        } else if (!visible && rafRef.current !== null) {
          elapsedRef.current += performance.now() - startAtRef.current;
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      },
      { threshold: 0.3 }
    );

    if (wrapRef.current) observer.observe(wrapRef.current);
    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [autoAnimate, userInteracted, setPosition]);

  const stopAuto = useCallback(() => {
    if (!userInteracted) {
      setUserInteracted(true);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    }
  }, [userInteracted]);

  return (
    <div className="relative flex flex-col gap-3">
      <div
        ref={wrapRef}
        className="relative overflow-hidden rounded-xl select-none cursor-col-resize"
        style={{ aspectRatio: "4/3", touchAction: "none" }}
        onPointerDown={(e) => {
          stopAuto();
          setDragging(true);
          wrapRef.current?.setPointerCapture(e.pointerId);
          fromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (!dragging) return;
          fromClientX(e.clientX);
        }}
        onPointerUp={(e) => {
          setDragging(false);
          wrapRef.current?.releasePointerCapture(e.pointerId);
        }}
        onPointerCancel={() => setDragging(false)}
      >
        {/* After image (bottom layer) */}
        <div className="absolute inset-0">
          <Image
            src={after.src}
            alt={after.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            draggable={false}
          />
          <div
            className="absolute bottom-3 right-3 rounded-md px-2 py-1 text-xs font-600 text-white"
            style={{ background: "rgba(0,0,0,0.5)", fontWeight: 600, backdropFilter: "blur(4px)" }}
          >
            Efter
          </div>
        </div>

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={before.src}
            alt={before.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            draggable={false}
          />
          <div
            className="absolute bottom-3 left-3 rounded-md px-2 py-1 text-xs font-600 text-white"
            style={{ background: "rgba(0,0,0,0.5)", fontWeight: 600, backdropFilter: "blur(4px)" }}
          >
            Før
          </div>
        </div>

        {/* Divider line + handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 -translate-x-1/2"
          style={{ left: `${pos}%`, background: "white", boxShadow: "0 0 8px rgba(0,0,0,0.3)" }}
        >
          <div
            className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-lg"
            style={{ background: "white" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M8 5l-5 7 5 7M16 5l5 7-5 7" stroke="var(--color-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Hint */}
        {!userInteracted && (
          <div
            className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs text-white transition-opacity duration-300"
            style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
          >
            Træk for at sammenligne
          </div>
        )}
      </div>

      {label && (
        <p className="text-center text-sm" style={{ color: "var(--color-muted)" }}>
          {label}
        </p>
      )}
    </div>
  );
}
