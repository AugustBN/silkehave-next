"use client";

import Image from "next/image";
import { useState, useRef } from "react";

const SERVICES = [
  { value: "Hækklipning", icon: "/assets/icon-haekklipning.svg" },
  { value: "Fliserens",   icon: "/assets/icon-fliserens.svg"    },
  { value: "Vinduesrens", icon: "/assets/icon-vinduesrens.svg"  },
  { value: "Snerydning",  icon: "/assets/icon-snerydning.svg"   },
  { value: "Haveordning", icon: "/assets/icon-haveordning.svg"  },
  { value: "Andet",       icon: "/assets/icon-mappin.svg"       },
];

const MAX_IMAGES = 15;

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const MAX = 1200;
      const scale = Math.min(1, MAX / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", 0.82).split(",")[1]);
    };
    img.onerror = reject;
    img.src = url;
  });
}

export function QuoteForm() {
  const [selected, setSelected]   = useState<string[]>([]);
  const [images, setImages]       = useState<File[]>([]);
  const [previews, setPreviews]   = useState<string[]>([]);
  const [status, setStatus]       = useState<"idle"|"loading"|"done"|"error">("idle");
  const [dragging, setDragging]   = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const toggle = (v: string) =>
    setSelected((p) => p.includes(v) ? p.filter((x) => x !== v) : [...p, v]);

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const allowed = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, MAX_IMAGES - images.length);
    if (!allowed.length) return;
    const newPreviews = allowed.map((f) => URL.createObjectURL(f));
    setImages((p) => [...p, ...allowed]);
    setPreviews((p) => [...p, ...newPreviews]);
  };

  const removeImage = (i: number) => {
    URL.revokeObjectURL(previews[i]);
    setImages((p) => p.filter((_, idx) => idx !== i));
    setPreviews((p) => p.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;
    const fd = new FormData(e.currentTarget);
    setStatus("loading");
    try {
      const b64Images = await Promise.all(images.map(compressImage));
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
          images:   b64Images,
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

      {/* Image upload */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: "var(--bark)", marginBottom: 6 }}>
          Billeder af opgaven <span style={{ fontWeight: 400, color: "var(--stone)" }}>(valgfrit — op til {MAX_IMAGES})</span>
        </div>
        <p style={{ fontSize: 13, color: "var(--stone)", margin: "0 0 10px", lineHeight: 1.5 }}>
          Et billede siger mere end tusind ord. Snap et foto af hækken, fliserne eller haven — så kan vi give dig et præcist tilbud med det samme.
        </p>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={(e) => addFiles(e.target.files)}
        />

        {images.length < MAX_IMAGES && (
          <div
            className={`stqf-dropzone${dragging ? " is-over" : ""}`}
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--hedge)", marginBottom: 6 }}>
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>
            </svg>
            <span>Klik for at vælge billeder</span>
            <span style={{ fontSize: 12, color: "var(--stone)", marginTop: 2 }}>eller træk og slip dem her</span>
          </div>
        )}

        {previews.length > 0 && (
          <div className="stqf-thumbs">
            {previews.map((src, i) => (
              <div key={i} className="stqf-thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" />
                <button type="button" className="stqf-thumb-rm" onClick={() => removeImage(i)} aria-label="Fjern billede">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

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
