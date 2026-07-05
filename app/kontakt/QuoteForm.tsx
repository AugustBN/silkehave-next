"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SERVICES = [
  { value: "Hækklipning", icon: "/assets/icon-haekklipning.svg" },
  { value: "Fliserens",   icon: "/assets/icon-fliserens.svg"    },
  { value: "Vinduesrens", icon: "/assets/icon-vinduesrens.svg"  },
  { value: "Snerydning",  icon: "/assets/icon-snerydning.svg"   },
  { value: "Haveordning", icon: "/assets/icon-haveordning.svg"  },
  { value: "Andet",       icon: "/assets/icon-mappin.svg"       },
];

const MAX_IMAGES = 20;
const MAX_PAYLOAD_B64 = 3_500_000;

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const MAX = 800;
      const scale = Math.min(1, MAX / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", 0.72).split(",")[1]);
    };
    img.onerror = reject;
    img.src = url;
  });
}

type StepId = "services" | "message" | "images" | "address" | "contact" | "consent";

const STEPS: { id: StepId; title: string; sub?: string }[] = [
  { id: "services", title: "Hvad skal vi hjælpe med?", sub: "Vælg en eller flere ydelser." },
  { id: "message",  title: "Fortæl kort om opgaven",   sub: "Et par linjer er rigeligt." },
  { id: "images",   title: "Har du et billede?",       sub: "Helt valgfrit. Et foto af hækken eller fliserne gør tilbuddet mere præcist." },
  { id: "address",  title: "Hvor er det henne?",       sub: "Adresse eller bare by." },
  { id: "contact",  title: "Hvem skal vi vende tilbage til?", sub: "Udfyld mindst telefon eller e-mail." },
  { id: "consent",  title: "Send din forespørgsel",    sub: "Tjek lige, at det ser rigtigt ud." },
];

export function QuoteForm() {
  const [step, setStep]           = useState(0);
  const [dir, setDir]             = useState(1);
  const [selected, setSelected]   = useState<string[]>([]);
  const [message, setMessage]     = useState("");
  const [address, setAddress]     = useState("");
  const [name, setName]           = useState("");
  const [phone, setPhone]         = useState("");
  const [email, setEmail]         = useState("");
  const [consented, setConsented] = useState(false);
  const [gotcha, setGotcha]       = useState("");
  const [images, setImages]       = useState<File[]>([]);
  const [previews, setPreviews]   = useState<string[]>([]);
  const [error, setError]         = useState("");
  const [status, setStatus]       = useState<"idle"|"loading"|"done"|"error">("idle");
  const [dragging, setDragging]   = useState(false);
  const [dropped, setDropped]     = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const current = STEPS[step];

  // Fokus på første felt når et nyt trin vises
  useEffect(() => {
    const t = setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("input:not([type=checkbox]), textarea")?.focus();
    }, 380);
    return () => clearTimeout(t);
  }, [step]);

  const validate = useCallback((id: StepId): string => {
    switch (id) {
      case "services": return selected.length ? "" : "Vælg mindst én ydelse";
      case "message":  return message.trim() ? "" : "Skriv et par ord om opgaven";
      case "images":   return "";
      case "address":  return address.trim() ? "" : "Skriv din adresse eller by";
      case "contact": {
        if (!name.trim()) return "Skriv dit navn";
        if (!phone.trim() && !email.trim()) return "Udfyld mindst telefon eller e-mail";
        if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) return "E-mailadressen ser ikke rigtig ud";
        return "";
      }
      case "consent":  return consented ? "" : "Sæt kryds for at fortsætte";
    }
  }, [selected, message, address, name, phone, email, consented]);

  const goNext = () => {
    const err = validate(current.id);
    if (err) { setError(err); return; }
    setError("");
    setDir(1);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goBack = () => {
    setError("");
    setDir(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const toggle = (v: string) => {
    setSelected((p) => p.includes(v) ? p.filter((x) => x !== v) : [...p, v]);
    setError("");
  };

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

  const submit = async () => {
    const err = validate("consent");
    if (err) { setError(err); return; }
    if (gotcha) return;
    if (status === "loading") return;
    setError("");
    setStatus("loading");
    try {
      const compressed = await Promise.all(images.map(compressImage));
      let total = 0;
      const b64Images = compressed.filter((b64) => {
        total += b64.length;
        return total <= MAX_PAYLOAD_B64;
      });
      setDropped(compressed.length - b64Images.length);
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, phone, email, address,
          services: selected.join(", "),
          message,
          images: b64Images,
          consentTimestamp: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error("server");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;
    const tag = (e.target as HTMLElement).tagName;
    if (tag === "TEXTAREA" || tag === "BUTTON" || tag === "A") return;
    e.preventDefault();
    if (current.id === "consent") submit();
    else goNext();
  };

  if (status === "done") {
    return (
      <div className="stqf stqf-done">
        <Image src="/assets/icon-check.svg" alt="" width={48} height={48} style={{ margin: "0 auto 16px", display: "block" }} />
        <h3>Tak, vi har modtaget din forespørgsel.</h3>
        <p>Vi vender tilbage inden for 1-2 hverdage. Haster det, så ring direkte på 91 25 10 21.</p>
        {dropped > 0 && (
          <p style={{ fontSize: 13, color: "var(--stone)" }}>
            Vi modtog dine første {images.length - dropped} billeder. De sidste {dropped} fyldte for meget og kom ikke med. Send dem gerne på Facebook, hvis de er vigtige.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="stqf stqw" onKeyDown={onKeyDown}>
      {/* Progress */}
      <div className="stqw-progress" aria-label={`Trin ${step + 1} af ${STEPS.length}`}>
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={`stqw-dot${i === step ? " is-active" : ""}${i < step ? " is-done" : ""}`}
            aria-label={`Gå til trin ${i + 1}`}
            onClick={() => { if (i < step) { setDir(-1); setStep(i); setError(""); } }}
            tabIndex={i < step ? 0 : -1}
          />
        ))}
        <span className="stqw-count">{step + 1}/{STEPS.length}</span>
      </div>

      <div className="stqw-viewport">
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={current.id}
            ref={panelRef}
            custom={dir}
            initial={{ opacity: 0, x: dir * 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -32 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3>{current.title}</h3>
            {current.sub && <p className="stqw-sub">{current.sub}</p>}

            {current.id === "services" && (
              <div className="stqf-services" style={{ marginBottom: 8 }}>
                {SERVICES.map((s) => (
                  <span
                    key={s.value}
                    className={`stqf-pill${selected.includes(s.value) ? " is-on" : ""}`}
                    onClick={() => toggle(s.value)}
                    role="checkbox"
                    aria-checked={selected.includes(s.value)}
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === " ") { e.preventDefault(); toggle(s.value); } }}
                  >
                    <Image src={s.icon} alt="" width={16} height={16} />
                    {s.value}
                  </span>
                ))}
              </div>
            )}

            {current.id === "message" && (
              <textarea
                value={message}
                onChange={(e) => { setMessage(e.target.value); setError(""); }}
                placeholder="F.eks.: 30 m bøgehæk, ca. 2 m høj, ligger ud mod villavej."
                rows={4}
              />
            )}

            {current.id === "images" && (
              <>
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
                      <div key={src} className="stqf-thumb">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt="" />
                        <button type="button" className="stqf-thumb-rm" onClick={() => removeImage(i)} aria-label="Fjern billede">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {current.id === "address" && (
              <input
                type="text"
                value={address}
                onChange={(e) => { setAddress(e.target.value); setError(""); }}
                placeholder="F.eks. Silkeborg"
                autoComplete="street-address"
              />
            )}

            {current.id === "contact" && (
              <div className="stqw-fields">
                <label>
                  Navn
                  <input type="text" value={name} onChange={(e) => { setName(e.target.value); setError(""); }} autoComplete="name" />
                </label>
                <div className="stqf-row">
                  <label>
                    Telefon
                    <input type="tel" value={phone} onChange={(e) => { setPhone(e.target.value); setError(""); }} autoComplete="tel" />
                  </label>
                  <label>
                    E-mail
                    <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} autoComplete="email" />
                  </label>
                </div>
              </div>
            )}

            {current.id === "consent" && (
              <>
                <div className="stqw-summary">
                  <p><strong>Ydelser:</strong> {selected.join(", ")}</p>
                  <p><strong>Opgave:</strong> {message.length > 120 ? message.slice(0, 120) + "…" : message}</p>
                  <p><strong>Adresse:</strong> {address}</p>
                  <p><strong>Kontakt:</strong> {name}{phone ? `, ${phone}` : ""}{email ? `, ${email}` : ""}</p>
                  {images.length > 0 && <p><strong>Billeder:</strong> {images.length} stk.</p>}
                </div>
                <label className="stqf-consent">
                  <input
                    type="checkbox"
                    checked={consented}
                    onChange={(e) => { setConsented(e.target.checked); setError(""); }}
                  />
                  <span>
                    Jeg har læst SilkeHaves{" "}
                    <a href="/privatlivspolitik" target="_blank" style={{ color: "var(--forest)", textDecoration: "underline" }}>privatlivspolitik</a>.
                    {" "}Vi bruger kun dine oplysninger til at vende tilbage med et tilbud.
                  </span>
                </label>
              </>
            )}

            {error && <p className="stqf-error" role="alert">{error}</p>}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}>
        <label>Lad dette felt stå tomt<input type="text" value={gotcha} onChange={(e) => setGotcha(e.target.value)} tabIndex={-1} autoComplete="off" /></label>
      </div>

      {/* Navigation */}
      <div className="stqw-nav">
        {step > 0 ? (
          <button type="button" className="stqw-back" onClick={goBack}>Tilbage</button>
        ) : <span />}
        {current.id !== "consent" ? (
          <button type="button" className="stb stb-primary" onClick={goNext}>
            {current.id === "images" && images.length === 0 ? "Spring over" : "Videre"}
            <span className="stb-icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </span>
          </button>
        ) : (
          <button type="button" className="stb stb-primary" onClick={submit} disabled={status === "loading"}>
            {status === "loading" ? "Sender…" : "Send forespørgsel"}
            <span className="stb-icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </span>
          </button>
        )}
      </div>

      {status === "error" && (
        <p style={{ color: "var(--rust)", fontSize: 14, marginTop: 8 }}>
          Noget gik galt. Prøv igen, eller skriv til os på Facebook.
        </p>
      )}
    </div>
  );
}
