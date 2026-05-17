"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Forside" },
  { href: "/om-os", label: "Om os" },
  { href: "/omraade", label: "Område" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const isHome = pathname === "/";
  const solid = scrolled || !isHome;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: solid ? "rgba(245,240,232,0.95)" : "transparent",
        backdropFilter: solid ? "blur(12px)" : "none",
        borderBottom: solid ? "1px solid rgba(61,107,53,0.12)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-2">
          <LeafIcon solid={solid} />
          <span
            className="font-display text-xl font-700 tracking-tight transition-colors duration-500"
            style={{
              fontFamily: "var(--font-display), 'Bricolage Grotesque', sans-serif",
              fontWeight: 700,
              color: solid ? "var(--color-green-dark)" : "white",
            }}
          >
            Silke<span style={{ color: solid ? "var(--color-green)" : "rgba(255,255,255,0.75)" }}>have</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-500 transition-colors duration-200"
              style={{
                fontWeight: 500,
                color:
                  pathname === l.href
                    ? "var(--color-green)"
                    : solid
                    ? "var(--color-text)"
                    : "rgba(255,255,255,0.85)",
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            className="rounded-full px-5 py-2 text-sm font-600 text-white transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{
              fontWeight: 600,
              background: "var(--color-green)",
            }}
          >
            Få tilbud
          </Link>
        </nav>

        <button
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block h-0.5 w-6 rounded-full transition-all duration-300"
              style={{
                background: solid ? "var(--color-green-dark)" : "white",
                transform:
                  menuOpen && i === 0
                    ? "rotate(45deg) translate(5px, 5px)"
                    : menuOpen && i === 1
                    ? "scaleX(0)"
                    : menuOpen && i === 2
                    ? "rotate(-45deg) translate(5px, -5px)"
                    : "none",
              }}
            />
          ))}
        </button>
      </div>

      {menuOpen && (
        <div
          className="border-t px-6 pb-6 pt-4 md:hidden"
          style={{
            background: "rgba(245,240,232,0.98)",
            borderColor: "rgba(61,107,53,0.12)",
          }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-3 text-base font-500 transition-colors"
              style={{
                fontWeight: 500,
                color:
                  pathname === l.href
                    ? "var(--color-green)"
                    : "var(--color-text)",
                borderBottom: "1px solid rgba(61,107,53,0.08)",
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            className="mt-4 block rounded-full px-5 py-3 text-center text-sm font-600 text-white"
            style={{ fontWeight: 600, background: "var(--color-green)" }}
          >
            Få tilbud
          </Link>
        </div>
      )}
    </header>
  );
}

function LeafIcon({ solid }: { solid: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
      <path
        d="M50 6 C50 12 78 30 78 50 C78 72 65 92 50 92 C35 92 22 72 22 50 C22 30 50 12 50 6Z"
        fill={solid ? "var(--color-green)" : "white"}
        className="transition-all duration-500"
      />
      <line x1="50" y1="92" x2="50" y2="40" stroke={solid ? "var(--color-green-light)" : "rgba(255,255,255,0.4)"} strokeWidth="2" strokeLinecap="round" />
      <line x1="50" y1="70" x2="66" y2="55" stroke={solid ? "var(--color-green-light)" : "rgba(255,255,255,0.4)"} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="50" y1="60" x2="34" y2="47" stroke={solid ? "var(--color-green-light)" : "rgba(255,255,255,0.4)"} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
