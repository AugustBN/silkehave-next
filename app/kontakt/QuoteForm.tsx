"use client";

import Image from "next/image";
import { useState } from "react";

const SERVICES = [
  { value: "Hækklipning", icon: "/assets/icon-haekklipning.svg" },
  { value: "Andet",       icon: "/assets/icon-mappin.svg" },
  { value: "Fliserens",   icon: "/assets/icon-fliserens.svg"    },
  { value: "Vinduesrens", icon: "/assets/icon-vinduesrens.svg"  },
  { value: "Snerydning",  icon: "/assets/icon-snerydning.svg"   },
  { value: "Haveordning", icon: "/assets/icon-haveordning.svg"  },
];

export function QuoteForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle"|"loading"|"done"|"error">("idle");

  const toggle = (v: string) =>
    setSelected((p) => p.includes(v) ? p.filter((x) => x !== v) : [...p, v]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;
    const fd = new FormData(e.currentTarget);
    setStatus("loading");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:     fd.get("name"),
          phone:    fd.get("phone"),
          email:    fd.get("email"),
          address:  fd.get("address"),
          services: selected.join(", "),
          message:  fd.get("message"),
        }),
      });
      if (!res.ok) throw new Error("server");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="stqf stqf-done">
        <Image src="/assets/icon-check.svg" alt="" width={48} height={48} style={{ margin: "0 auto 16px", display: "block" }} />
        <h3>Tak — vi har modtaget din forespørgsel.</h3>
        <p>Vi vender tilbage indenfor 1–2 hverdage. Hvis det haster, så ring direkte.</p>
      </div>
    );
  }

  return (
    <form className="stqf" onSubmit={handleSubmit} noValidate>
      <h3>Beskriv din opgave</h3>
      <p>Det tager 1 minut. Du forpligter dig ikke til noget.</p>

      <label>Hvad har du brug for? <span>(vælg én eller flere)</span></label>
      <div className="stqf-services">
        {SERVICES.map((s) => (
          <span
            key={s.value}
            className={`stqf-pill${selected.includes(s.value) ? " is-on" : ""}`}
            onClick={() => toggle(s.value)}
            role="checkbox"
            aria-checked={selected.includes(s.value)}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") toggle(s.value); }}
          >
            <Image src={s.icon} alt="" width={16} height={16} />
            {s.value}
          </span>
        ))}
      </div>

      <div className="stqf-row">
        <label>Navn<input type="text" name="name" required /></label>
        <label>Telefon <span>(valgfrit)</span><input type="tel" name="phone" /></label>
      </div>

      <label>E-mail<input type="email" name="email" required /></label>
      <label>Adresse / by<input type="text" name="address" placeholder="F.eks. Silkeborg" required /></label>
      <label>
        Kort om opgaven
        <textarea name="message" placeholder="F.eks.: 30 m bøgehæk, ca. 2 m høj, ligger ud mod villavej." required />
      </label>

      <p className="stqf-help">Vi bruger kun dine oplysninger til at vende tilbage med et tilbud.</p>

      <div className="stqf-actions">
        <button className="stb stb-primary" type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sender…" : "Send forespørgsel"}
          <span className="stb-icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </span>
        </button>
      </div>

      {status === "error" && <p style={{ color: "var(--rust)", fontSize: 14, marginTop: 8 }}>Noget gik galt — prøv igen eller skriv til os på Facebook.</p>}
    </form>
  );
}
