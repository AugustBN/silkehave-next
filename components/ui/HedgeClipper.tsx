"use client";

import { useEffect, useRef } from "react";

export function HedgeClipper() {
  const stageRef     = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const cursorRef    = useRef<HTMLDivElement>(null);
  const cursorImgRef = useRef<HTMLImageElement>(null);
  const hintRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stageRef.current || !canvasRef.current) return;
    const clipStage: HTMLDivElement     = stageRef.current;
    const canvas:    HTMLCanvasElement  = canvasRef.current;
    const cursor    = cursorRef.current;
    const cursorImg = cursorImgRef.current;
    const hint      = hintRef.current;

    const ctxRaw = canvas.getContext("2d");
    if (!ctxRaw) return;
    const ctx: CanvasRenderingContext2D = ctxRaw;

    const cleanImg = clipStage.querySelector<HTMLImageElement>(".stclip-clean");
    const BRUSH_W = 72;
    const BRUSH_H = 36;
    let hinted    = false;
    let growTimer: ReturnType<typeof setTimeout> | null = null;
    let growFrame = 0;
    let growing   = false;
    let rafId: number | null = null;

    const untrimmedImg = new window.Image();

    function coverDraw(img: HTMLImageElement) {
      const w = canvas.width, h = canvas.height;
      const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const sw = img.naturalWidth  * scale;
      const sh = img.naturalHeight * scale;
      ctx.drawImage(img, (w - sw) / 2, (h - sh) / 2, sw, sh);
    }

    function resize() {
      const r = clipStage.getBoundingClientRect();
      canvas.width  = Math.round(r.width);
      canvas.height = Math.round(r.height);
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      coverDraw(untrimmedImg);
    }

    function erase(x: number, y: number) {
      ctx.globalCompositeOperation = "destination-out";
      ctx.globalAlpha = 1;
      for (let i = 0; i < 10; i++) {
        const ox     = (Math.random() * 2 - 1) * BRUSH_W;
        const oy     = (Math.random() * 2 - 1) * BRUSH_H;
        const radius = 8 + Math.random() * 12;
        ctx.beginPath();
        ctx.arc(x + ox, y + oy, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const GROW_FRAMES = 140;
    function growTick() {
      growFrame++;
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 0.014;
      coverDraw(untrimmedImg);
      ctx.globalAlpha = 1;
      if (growFrame < GROW_FRAMES) {
        rafId = requestAnimationFrame(growTick);
      } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        coverDraw(untrimmedImg);
        growing   = false;
        growFrame = 0;
      }
    }

    function scheduleGrow() {
      if (growTimer) clearTimeout(growTimer);
      growTimer = setTimeout(() => {
        if (!growing) { growing = true; growFrame = 0; rafId = requestAnimationFrame(growTick); }
      }, 1400);
    }

    function stopGrow() {
      if (!growing) return;
      growing   = false;
      growFrame = 0;
      if (growTimer) clearTimeout(growTimer);
      if (rafId)     { cancelAnimationFrame(rafId); rafId = null; }
    }

    const SRC_OPEN   = "/assets/photos/hekasaks-aaben.png";
    const SRC_CLOSED = "/assets/photos/hekasaks-lukket.png";
    let snipInterval: ReturnType<typeof setInterval> | null = null;
    let moveTimer:    ReturnType<typeof setTimeout>  | null = null;
    let snipState = false;
    let mouseX    = 0;
    let mouseY    = 0;

    // ---- Particle canvas ----
    const particleCanvas = document.createElement("canvas");
    Object.assign(particleCanvas.style, {
      position: "fixed", top: "0", left: "0",
      width: "100%", height: "100%",
      pointerEvents: "none", zIndex: "199",
    });
    document.body.appendChild(particleCanvas);
    const pCtx = particleCanvas.getContext("2d")!;

    function resizeParticles() {
      particleCanvas.width  = window.innerWidth;
      particleCanvas.height = window.innerHeight;
    }
    resizeParticles();
    window.addEventListener("resize", resizeParticles, { passive: true });

    const leafImg = new window.Image();
    leafImg.src   = "/assets/photos/boege-blad.png";

    type Particle = { x: number; y: number; vx: number; vy: number; rot: number; rotSpeed: number; size: number; alpha: number; settled: boolean };
    const particles: Particle[] = [];

    function particleLoop() {
      pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
      const floorY = clipStage.getBoundingClientRect().bottom;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (p.settled) {
          p.vx  *= 0.85;
          p.x   += p.vx;
          p.alpha -= 0.004;
        } else {
          p.vy  += 0.35;
          p.vx  *= 0.98;
          p.x   += p.vx;
          p.y   += p.vy;
          p.rot += p.rotSpeed;
          if (p.y >= floorY - p.size * 0.4) {
            p.y       = floorY - p.size * 0.4;
            p.vy      = 0;
            p.rotSpeed *= 0.2;
            p.settled  = true;
          }
          p.alpha -= 0.008;
        }
        pCtx.save();
        pCtx.translate(p.x, p.y);
        pCtx.rotate(p.rot);
        pCtx.globalAlpha = Math.max(0, p.alpha);
        pCtx.drawImage(leafImg, -p.size / 2, -p.size / 2, p.size, p.size);
        pCtx.restore();
        if (p.alpha <= 0) particles.splice(i, 1);
      }
      requestAnimationFrame(particleLoop);
    }
    requestAnimationFrame(particleLoop);

    function spawnLeaves(x: number, y: number) {
      const count = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        particles.push({
          x:        x + (Math.random() * 30 - 15),
          y:        y + (Math.random() * 10 - 5),
          vx:       Math.random() * 6 - 3,
          vy:       Math.random() * 3 - 4,
          rot:      Math.random() * Math.PI * 2,
          rotSpeed: Math.random() * 0.16 - 0.08,
          size:     20 + Math.random() * 20,
          alpha:    1,
          settled:  false,
        });
      }
    }

    function startSnipping() {
      if (snipInterval) return;
      snipInterval = setInterval(() => {
        snipState = !snipState;
        if (cursorImg) cursorImg.src = snipState ? SRC_CLOSED : SRC_OPEN;
        if (snipState) {
          const rect = canvas.getBoundingClientRect();
          erase(mouseX - rect.left, mouseY - rect.top);
          spawnLeaves(mouseX, mouseY);
        }
      }, 120);
    }

    function stopSnipping() {
      if (snipInterval) { clearInterval(snipInterval); snipInterval = null; }
      snipState = false;
      if (cursorImg) cursorImg.src = SRC_OPEN;
    }

    // Parallax on the clean image underneath
    clipStage.addEventListener("mousemove", (e: MouseEvent) => {
      if (!cleanImg) return;
      const rect = clipStage.getBoundingClientRect();
      const nx = (e.clientX - rect.left  - rect.width  / 2) / rect.width;
      const ny = (e.clientY - rect.top   - rect.height / 2) / rect.height;
      cleanImg.style.transform = `translate(${nx * -6}px, ${ny * -4}px)`;
    });
    clipStage.addEventListener("mouseleave", () => {
      if (cleanImg) cleanImg.style.transform = "translate(0,0)";
    });

    function onMouseMove(clientX: number, clientY: number) {
      if (!hinted) {
        hinted = true;
        if (hint) {
          hint.style.opacity = "0";
          setTimeout(() => { hint.remove(); }, 320);
        }
      }
      mouseX = clientX;
      mouseY = clientY;
      stopGrow();
      scheduleGrow();
      const rect = canvas.getBoundingClientRect();
      erase(clientX - rect.left, clientY - rect.top);
    }

    canvas.addEventListener("mousemove", (e: MouseEvent) => {
      onMouseMove(e.clientX, e.clientY);
      if (cursor) cursor.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
      startSnipping();
      if (moveTimer) clearTimeout(moveTimer);
      moveTimer = setTimeout(stopSnipping, 300);
    });

    canvas.addEventListener("mouseenter", () => {
      if (cursor) cursor.classList.add("is-visible");
    });
    canvas.addEventListener("mouseleave", () => {
      if (cursor) cursor.classList.remove("is-visible");
      stopSnipping();
      if (moveTimer) clearTimeout(moveTimer);
    });

    canvas.addEventListener("touchmove", (e: TouchEvent) => {
      e.preventDefault();
      const t = e.touches[0];
      onMouseMove(t.clientX, t.clientY);
    }, { passive: false });

    untrimmedImg.onload = () => {
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(clipStage);
    };
    untrimmedImg.src = "/assets/photos/haek-ikke-klippet.png";

    return () => {
      stopSnipping();
      stopGrow();
      window.removeEventListener("resize", resizeParticles);
      particleCanvas.remove();
    };
  }, []);

  return (
    <>
      <section className="stclip">
        <div className="stclip-stage" ref={stageRef}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="stclip-clean"
            src="/assets/photos/haek-klippet.png"
            alt="Klippet hæk"
            draggable={false}
          />
          <canvas className="stclip-canvas" ref={canvasRef} aria-hidden="true" />
          <div className="stclip-hint" ref={hintRef}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
              <line x1="20" y1="4" x2="8.12" y2="15.88"/>
              <line x1="14.47" y1="14.48" x2="20" y2="20"/>
              <line x1="8.12" y1="8.12" x2="12" y2="12"/>
            </svg>
            Brug musen som hækkeklipper
          </div>
        </div>
      </section>

      <div className="stclip-cursor" ref={cursorRef} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={cursorImgRef}
          src="/assets/photos/hekasaks-aaben.png"
          alt=""
          width={160}
          height={160}
          draggable={false}
        />
      </div>
    </>
  );
}
