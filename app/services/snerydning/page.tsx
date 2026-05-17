import type { Metadata } from "next";
import Link from "next/link";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { CTABand } from "@/components/sections/CTABand";

export const metadata: Metadata = {
  title: "Snerydning — Silkehave",
  description: "Hurtig og pålidelig snerydning af indkørsel og fortov. Vi er klar — også ved akut snefald.",
};

export default function ServicePage() {
  return (
    <div className="pt-24">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <AnimateIn>
          <p className="mb-3 text-xs font-600 uppercase tracking-widest" style={{ color: "var(--color-green)", fontWeight: 600 }}>
            Ydelse
          </p>
          <h1 className="mb-6 text-4xl font-700 leading-tight md:text-5xl" style={{ fontFamily: "var(--font-display), 'Bricolage Grotesque', sans-serif", fontWeight: 700 }}>
            Snerydning
          </h1>
          <p className="text-xl leading-relaxed" style={{ color: "var(--color-muted)" }}>
            Hurtig og pålidelig snerydning af indkørsel og fortov. Vi er klar — også ved akut snefald.
          </p>
        </AnimateIn>
        <AnimateIn delay={0.15} className="mt-10 flex gap-4">
          <Link href="/kontakt" className="rounded-full px-7 py-3.5 font-600 text-white transition-opacity hover:opacity-90" style={{ fontWeight: 600, background: "var(--color-green)" }}>
            Få et tilbud
          </Link>
          <a href="tel:+4591251021" className="rounded-full border px-7 py-3.5 font-500 transition-all" style={{ fontWeight: 500, borderColor: "rgba(61,107,53,0.25)", color: "var(--color-green-dark)" }}>
            Ring til os
          </a>
        </AnimateIn>
      </div>
      <CTABand />
    </div>
  );
}
