import type { Metadata } from "next";
import { QuoteForm } from "./QuoteForm";

export const metadata: Metadata = {
  title: "Kontakt — Silkehave",
  description: "Få et gratis tilbud på have- og ejendomsservice i Silkeborg og omegn. Vi vender tilbage samme dag.",
};

export default function KontaktPage() {
  return (
    <div className="pt-24">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <p
              className="mb-3 text-xs font-600 uppercase tracking-widest"
              style={{ color: "var(--color-green)", fontWeight: 600 }}
            >
              Kontakt os
            </p>
            <h1
              className="mb-6 text-4xl font-700 leading-tight md:text-5xl"
              style={{ fontFamily: "var(--font-display), 'Bricolage Grotesque', sans-serif", fontWeight: 700 }}
            >
              Få et gratis tilbud
            </h1>
            <p className="mb-10 text-lg leading-relaxed" style={{ color: "var(--color-muted)" }}>
              Fortæl os om opgaven — så giver vi dig en fast pris, inden vi starter. Ingen skjulte gebyrer.
            </p>

            <div className="flex flex-col gap-6">
              <ContactItem
                icon={<PhoneIcon />}
                label="Telefon"
                value="+45 91 25 10 21"
                href="tel:+4591251021"
              />
              <ContactItem
                icon={<MailIcon />}
                label="E-mail"
                value="KontaktSilkehave@gmail.com"
                href="mailto:KontaktSilkehave@gmail.com"
              />
              <ContactItem
                icon={<PinIcon />}
                label="Område"
                value="Silkeborg og omegn"
              />
            </div>
          </div>

          <div
            className="rounded-2xl p-8"
            style={{ background: "white", border: "1px solid rgba(61,107,53,0.1)" }}
          >
            <QuoteForm />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-4">
      <div
        className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
        style={{ background: "var(--color-green-light)", color: "var(--color-green)" }}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs font-500 uppercase tracking-wide" style={{ color: "var(--color-muted)", fontWeight: 500 }}>
          {label}
        </p>
        <p className="mt-0.5 font-500" style={{ fontWeight: 500 }}>{value}</p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="transition-opacity hover:opacity-75">
      {inner}
    </a>
  ) : (
    <div>{inner}</div>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 15z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
