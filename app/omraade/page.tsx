import type { Metadata } from "next";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { CTABand } from "@/components/sections/CTABand";

export const metadata: Metadata = {
  title: "Vores område — Silkehave",
  description: "Vi servicerer Silkeborg og en lang række byer i omegnen. Se om vi dækker din adresse.",
};

const areas = [
  "Silkeborg", "Resenbro", "Gjern", "Them", "Kjellerup",
  "Ikast", "Ans", "Brassø", "Virklund", "Gødvad",
  "Linå", "Skellerup", "Sejling", "Voel", "Funder",
];

export default function OmraadePage() {
  return (
    <div className="pt-24">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <AnimateIn>
          <p
            className="mb-3 text-xs font-600 uppercase tracking-widest"
            style={{ color: "var(--color-green)", fontWeight: 600 }}
          >
            Dækningsområde
          </p>
          <h1
            className="mb-6 text-4xl font-700 leading-tight md:text-5xl"
            style={{ fontFamily: "var(--font-display), 'Bricolage Grotesque', sans-serif", fontWeight: 700 }}
          >
            Silkeborg og omegn
          </h1>
          <p className="text-xl leading-relaxed" style={{ color: "var(--color-muted)" }}>
            Vi dækker Silkeborg Kommune og nærliggende byer. Er du i tvivl om vi kommer til dig — kontakt os, så finder vi ud af det.
          </p>
        </AnimateIn>

        <AnimateIn delay={0.1} className="mt-12">
          <div className="flex flex-wrap gap-3">
            {areas.map((a) => (
              <span
                key={a}
                className="rounded-full px-4 py-2 text-sm font-500"
                style={{
                  fontWeight: 500,
                  background: "var(--color-green-light)",
                  color: "var(--color-green-dark)",
                }}
              >
                {a}
              </span>
            ))}
          </div>
        </AnimateIn>

        <AnimateIn delay={0.2} className="mt-10">
          <p className="text-sm" style={{ color: "var(--color-muted)" }}>
            Er din by ikke på listen? Ring eller skriv til os — vi finder ud af det.
          </p>
        </AnimateIn>
      </div>

      <CTABand />
    </div>
  );
}
