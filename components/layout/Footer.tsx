import Link from "next/link";

const services = [
  { href: "/services/haekklipning", label: "Hækklipning" },
  { href: "/services/graesslaaning", label: "Græsslåning" },
  { href: "/services/haveordning", label: "Haveordning" },
  { href: "/services/snerydning", label: "Snerydning" },
  { href: "/services/vinduesrens", label: "Vinduesrens" },
  { href: "/services/fliserens", label: "Fliserens" },
];

export function Footer() {
  return (
    <footer
      className="mt-16"
      style={{ background: "var(--color-green-dark)", color: "rgba(255,255,255,0.85)" }}
    >
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p
              className="mb-2 text-2xl font-700 text-white"
              style={{ fontFamily: "var(--font-display), 'Bricolage Grotesque', sans-serif", fontWeight: 700 }}
            >
              Silkehave
            </p>
            <p className="mb-6 max-w-xs text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Have- og ejendomsservice i Silkeborg og omegn. Fast pris før vi starter — ingen overraskelser.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href="tel:+4591251021"
                className="flex items-center gap-2 transition-opacity hover:opacity-100"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                <PhoneIcon />
                +45 91 25 10 21
              </a>
              <a
                href="mailto:KontaktSilkehave@gmail.com"
                className="flex items-center gap-2 transition-opacity hover:opacity-100"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                <MailIcon />
                KontaktSilkehave@gmail.com
              </a>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-600 uppercase tracking-widest text-white/50">Ydelser</p>
            <ul className="flex flex-col gap-2">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm transition-opacity hover:opacity-100"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-600 uppercase tracking-widest text-white/50">Mere</p>
            <ul className="flex flex-col gap-2">
              {[
                { href: "/om-os", label: "Om os" },
                { href: "/omraade", label: "Vores område" },
                { href: "/kontakt", label: "Kontakt" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm transition-opacity hover:opacity-100"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61574788933190"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-opacity hover:opacity-100"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-8 text-xs"
          style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.4)" }}
        >
          <p>© {new Date().getFullYear()} Silkehave. Alle rettigheder forbeholdes.</p>
          <p>Silkeborg og omegn</p>
        </div>
      </div>
    </footer>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 15z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
