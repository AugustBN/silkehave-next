import Link from "next/link";
import { AnimateIn } from "@/components/ui/AnimateIn";

export function CTABand() {
  return (
    <section
      className="py-24"
      style={{ background: "var(--color-green)" }}
    >
      <div className="mx-auto max-w-4xl px-6 text-center">
        <AnimateIn>
          <h2
            className="mb-4 text-4xl font-700 text-white md:text-5xl"
            style={{ fontFamily: "var(--font-display), 'Bricolage Grotesque', sans-serif", fontWeight: 700 }}
          >
            Klar til en pæn have?
          </h2>
          <p
            className="mb-10 text-xl"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Kontakt os i dag — vi giver dig en fast pris, inden vi starter.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/kontakt"
              className="rounded-full px-8 py-4 text-base font-600 transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{
                fontWeight: 600,
                background: "white",
                color: "var(--color-green-dark)",
              }}
            >
              Få et gratis tilbud
            </Link>
            <a
              href="tel:+4591251021"
              className="rounded-full border px-8 py-4 text-base font-500 text-white transition-all duration-200 hover:bg-white/10 active:scale-95"
              style={{ fontWeight: 500, borderColor: "rgba(255,255,255,0.35)" }}
            >
              Ring: +45 91 25 10 21
            </a>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
