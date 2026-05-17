"use client";

import { useEffect, useRef } from "react";

export function ScrollVideo({ src, poster }: { src: string; poster: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const loaderFillRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !videoRef.current) return;
    const section: HTMLElement = sectionRef.current;
    const video: HTMLVideoElement = videoRef.current;

    const loader = loaderRef.current;
    const loaderFill = loaderFillRef.current;
    const fallback = fallbackRef.current;

    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.userAgent.includes("Mac") && "ontouchend" in document);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const useFallback = isCoarsePointer || isIOS || prefersReduced;

    if (useFallback) {
      section.classList.add("is-fallback");
      video.setAttribute("autoplay", "");
      video.setAttribute("loop", "");
      video.muted = true;
      const tryPlay = () => video.play().catch(() => {});
      video.addEventListener("loadeddata", tryPlay, { once: true });
      tryPlay();
      video.addEventListener("loadeddata", () => {
        loader?.classList.add("is-hidden");
        fallback?.classList.add("is-hidden");
      }, { once: true });
      return;
    }

    let target = 0;
    let current = 0;
    let ready = false;
    let rafId: number | null = null;
    let inView = true;
    let stuckFrames = 0;
    let recovering = false;

    try { video.load(); } catch {}

    const updateLoader = () => {
      if (!video.duration || video.buffered.length === 0) return;
      const end = video.buffered.end(video.buffered.length - 1);
      const pct = Math.min(1, end / video.duration);
      if (loaderFill) loaderFill.style.width = (pct * 100).toFixed(1) + "%";
    };

    const checkReady = () => {
      if (ready) return;
      if (video.readyState >= 3) {
        ready = true;
        loader?.classList.add("is-hidden");
        fallback?.classList.add("is-hidden");
        if (inView) startTicking();
        updateScrollTarget();
      }
    };

    const recover = () => {
      if (recovering || !video.duration) return;
      recovering = true;
      ready = false;
      stuckFrames = 0;
      fallback?.classList.remove("is-hidden");
      try { video.load(); } catch {}
    };

    const clearRecovering = () => { recovering = false; };

    video.addEventListener("progress", updateLoader);
    video.addEventListener("canplay", checkReady);
    video.addEventListener("loadeddata", checkReady);
    video.addEventListener("error", recover);
    video.addEventListener("canplay", clearRecovering);
    video.addEventListener("loadeddata", clearRecovering);
    checkReady();

    function updateScrollTarget() {
      if (!ready || !video.duration) return;
      const rect = section.getBoundingClientRect();
      const trackLength = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(0.9999, scrolled / trackLength));
      target = progress * video.duration;
    }

    function tick() {
      if (video.readyState < 2) {
        if (Math.abs(target - current) > 0.05 && ++stuckFrames > 60) recover();
        rafId = requestAnimationFrame(tick);
        return;
      }
      stuckFrames = 0;
      current = current + (target - current) * 0.15;
      if (Math.abs(video.currentTime - current) > 0.01) {
        try { video.currentTime = current; } catch (_) {} // eslint-disable-line @typescript-eslint/no-unused-vars
      }
      rafId = requestAnimationFrame(tick);
    }

    function startTicking() {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(tick);
    }

    function stopTicking() {
      if (rafId === null) return;
      cancelAnimationFrame(rafId);
      rafId = null;
    }

    const onScroll = () => updateScrollTarget();
    window.addEventListener("scroll", onScroll, { passive: true });

    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver((entries) => {
        inView = entries[0].isIntersecting;
        if (inView && ready) startTicking();
        else stopTicking();
      }, { rootMargin: "200px 0px" });
      io.observe(section);
    }

    const onVisibility = () => {
      if (!document.hidden && inView) {
        if (video.readyState < 2) recover();
        else if (ready) startTicking();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stopTicking();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      io?.disconnect();
      video.removeEventListener("progress", updateLoader);
      video.removeEventListener("canplay", checkReady);
      video.removeEventListener("loadeddata", checkReady);
      video.removeEventListener("error", recover);
      video.removeEventListener("canplay", clearRecovering);
      video.removeEventListener("loadeddata", clearRecovering);
    };
  }, []);

  return (
    <section className="scrollvid" ref={sectionRef} aria-label="Hækklipning i bevægelse">
      <div className="scrollvid-pin">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={fallbackRef}
          className="scrollvid-fallback"
          src={poster}
          alt=""
          aria-hidden="true"
        />
        <video
          ref={videoRef}
          className="scrollvid-media"
          playsInline
          muted
          preload="auto"
          tabIndex={-1}
          disablePictureInPicture
          poster={poster}
        >
          <source src={src} type="video/mp4" />
        </video>
        <div ref={loaderRef} className="scrollvid-loader" aria-hidden="true">
          <div className="scrollvid-loader-bar">
            <div ref={loaderFillRef} className="scrollvid-loader-fill" />
          </div>
        </div>
        <div className="scrollvid-overlay">
          <span className="scrollvid-eyebrow">Scroll</span>
        </div>
      </div>
    </section>
  );
}
