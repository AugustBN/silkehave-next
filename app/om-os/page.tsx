import type { Metadata } from "next";
import Link from "next/link";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { CTABand } from "@/components/sections/CTABand";

export const metadata: Metadata = {
  title: "Om os — Silkehave",
  description: "Lær os at kende. Silkehave er en lokal have- og ejendomsservice i Silkeborg og omegn.",
};

export default function OmOsPage() {
  return (
    <div className="pt-24">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <AnimateIn>
          <p
            className="mb-3 text-xs font-600 uppercase tracking-widest"
            style={{ color: "var(--color-green)", fontWeight: 600 }}
          >
            Om os
          </p>
          <h1
            className="mb-6 text-4xl font-700 leading-tight md:text-5xl"
            style={{ fontFamily: "var(--font-display), 'Bricolage Grotesque', sans-serif", fontWeight: 700 }}
          >
            Lokal service,<br />personlig kontakt
          </h1>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="prose prose-lg max-w-none" style={{ color: "var(--color-muted)" }}>
            <p className="text-xl leading-relaxed">
              Silkehave er en lokal have- og ejendomsservice i Silkeborg og omegn. Vi hjælper private og erhverv med alt fra hækklipning og græsslåning til haveordning og snerydning.
            </p>
            <p className="mt-6 leading-relaxed">
              Hos os er det enkelt: du beskriver opgaven, vi giver dig en fast pris — og så sørger vi for resten. Ingen overraskelser på fakturaen, ingen rod bagefter.
            </p>
            <p className="mt-6 leading-relaxed">
              Vi er stolte af det arbejde, vi lægger i, og det kan du se i vores resultater. Tjek vores før- og efter-billeder på forsiden.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.2} className="mt-16">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { value: "47+", label: "Tilfredse kunder" },
              { value: "3 år", label: "Erfaring" },
              { value: "Fast pris", label: "Altid" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl p-6 text-center"
                style={{ background: "var(--color-green-light)" }}
              >
                <p
                  className="text-3xl font-700"
                  style={{ fontFamily: "var(--font-display), 'Bricolage Grotesque', sans-serif", fontWeight: 700, color: "var(--color-green-dark)" }}
                >
                  {s.value}
                </p>
                <p className="mt-1 text-sm" style={{ color: "var(--color-green)" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </AnimateIn>

        <AnimateIn delay={0.3} className="mt-12">
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-600 text-white transition-opacity hover:opacity-90"
            style={{ fontWeight: 600, background: "var(--color-green)" }}
          >
            Kontakt os
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </AnimateIn>
      </div>

      <CTABand />
    </div>
  );
}
