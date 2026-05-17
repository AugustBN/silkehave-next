import Link from "next/link";

export function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{ background: "var(--color-green-dark)" }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 20%, var(--color-green) 0%, transparent 50%),
                            radial-gradient(circle at 70% 80%, #1a3d12 0%, transparent 50%)`,
        }}
      />

      {/* Decorative circles */}
      <div
        className="absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-10"
        style={{ background: "var(--color-green)" }}
      />
      <div
        className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full opacity-10"
        style={{ background: "var(--color-green-light)" }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 pb-16 text-center">
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm"
          style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", backdropFilter: "blur(8px)" }}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: "var(--color-green-light)", boxShadow: "0 0 8px var(--color-green-light)" }}
          />
          Silkeborg og omegn
        </div>

        <h1
          className="mb-6 text-5xl font-700 leading-none tracking-tight text-white md:text-7xl"
          style={{ fontFamily: "var(--font-display), 'Bricolage Grotesque', sans-serif", fontWeight: 700 }}
        >
          Din have,{" "}
          <span style={{ color: "var(--color-green-light)" }}>vores ansvar</span>
        </h1>

        <p
          className="mx-auto mb-10 max-w-xl text-xl leading-relaxed"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          Professionel hækklipning, græsslåning og haveordning. Fast pris før vi starter — ingen overraskelser.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/kontakt"
            className="rounded-full px-8 py-4 text-base font-600 text-white shadow-lg transition-all duration-200 hover:opacity-90 hover:shadow-xl active:scale-95"
            style={{
              fontWeight: 600,
              background: "var(--color-green)",
              boxShadow: "0 4px 24px rgba(61,107,53,0.4)",
            }}
          >
            Få et gratis tilbud
          </Link>
          <Link
            href="/om-os"
            className="rounded-full border px-8 py-4 text-base font-500 transition-all duration-200 hover:bg-white/10 active:scale-95"
            style={{
              fontWeight: 500,
              color: "rgba(255,255,255,0.85)",
              borderColor: "rgba(255,255,255,0.25)",
            }}
          >
            Lær os at kende
          </Link>
        </div>

        <div
          className="mt-16 flex flex-wrap items-center justify-center gap-8 border-t pt-10"
          style={{ borderColor: "rgba(255,255,255,0.12)" }}
        >
          {[
            { value: "47+", label: "Tilfredse kunder" },
            { value: "3 år", label: "Erfaring" },
            { value: "Fast pris", label: "Ingen overraskelser" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-700 text-white" style={{ fontFamily: "var(--font-display), 'Bricolage Grotesque', sans-serif", fontWeight: 700 }}>
                {s.value}
              </p>
              <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
