import Link from "next/link";
import { AnimateIn } from "@/components/ui/AnimateIn";

const services = [
  {
    href: "/services/haekklipning",
    title: "Hækklipning",
    description: "Præcis klipning af alle hæktyper. Vi rydder op efter os og efterlader haven i perfekt stand.",
    icon: "🌿",
  },
  {
    href: "/services/graesslaaning",
    title: "Græsslåning",
    description: "Regelmæssig slåning, kantklipning og opsamling. Tilpasset din græsplænes behov.",
    icon: "🌱",
  },
  {
    href: "/services/haveordning",
    title: "Haveordning",
    description: "Ukrudtsbekæmpelse, beskæring og generel pleje. Din have ser altid velholdt ud.",
    icon: "🌺",
  },
  {
    href: "/services/snerydning",
    title: "Snerydning",
    description: "Hurtig og pålidelig snerydning af indkørsel og fortov. Også ved akut snefald.",
    icon: "❄️",
  },
  {
    href: "/services/vinduesrens",
    title: "Vinduesrens",
    description: "Rene vinduer indvendigt og udvendigt. Ingen striber, ingen spor.",
    icon: "🪟",
  },
  {
    href: "/services/fliserens",
    title: "Fliserens",
    description: "Højtryksrens af fliser, indkørsler og terrasser. Fjerner mos, alger og snavs.",
    icon: "🧹",
  },
];

export function ServicesGrid() {
  return (
    <section className="py-24" style={{ background: "var(--color-cream-dark)" }}>
      <div className="mx-auto max-w-6xl px-6">
        <AnimateIn className="mb-12 text-center">
          <p
            className="mb-3 text-xs font-600 uppercase tracking-widest"
            style={{ color: "var(--color-green)", fontWeight: 600 }}
          >
            Hvad vi tilbyder
          </p>
          <h2
            className="text-4xl font-700 md:text-5xl"
            style={{ fontFamily: "var(--font-display), 'Bricolage Grotesque', sans-serif", fontWeight: 700 }}
          >
            Vores ydelser
          </h2>
        </AnimateIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <AnimateIn key={s.href} delay={i * 0.07}>
              <Link
                href={s.href}
                className="group flex flex-col gap-4 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                style={{
                  background: "var(--color-cream)",
                  border: "1px solid rgba(61,107,53,0.1)",
                }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                  style={{ background: "var(--color-green-light)" }}
                >
                  {s.icon}
                </div>
                <div>
                  <h3
                    className="mb-2 text-lg font-600 transition-colors group-hover:text-green"
                    style={{ fontFamily: "var(--font-display), 'Bricolage Grotesque', sans-serif", fontWeight: 600, color: "var(--color-text)" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                    {s.description}
                  </p>
                </div>
                <div
                  className="mt-auto flex items-center gap-1 text-sm font-500 transition-all group-hover:gap-2"
                  style={{ color: "var(--color-green)", fontWeight: 500 }}
                >
                  Læs mere
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
