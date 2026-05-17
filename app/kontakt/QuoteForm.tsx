"use client";

import { useState, useRef } from "react";

const SERVICES = [
  "Hækklipning",
  "Græsslåning",
  "Haveordning",
  "Snerydning",
  "Vinduesrens",
  "Fliserens",
  "Andet",
];

const COUNTRY_CODES = [
  { code: "+45", flag: "🇩🇰", label: "DK" },
  { code: "+46", flag: "🇸🇪", label: "SE" },
  { code: "+47", flag: "🇳🇴", label: "NO" },
  { code: "+49", flag: "🇩🇪", label: "DE" },
];

function readAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function QuoteForm() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [countryCode, setCountryCode] = useState("+45");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleService = (s: string) =>
    setSelectedServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/heic"];
    const valid = Array.from(files).filter((f) => allowed.includes(f.type));
    const combined = [...selectedFiles, ...valid].slice(0, 3);
    setSelectedFiles(combined);
    setPreviews(combined.map((f) => URL.createObjectURL(f)));
  };

  const removeFile = (i: number) => {
    const next = selectedFiles.filter((_, idx) => idx !== i);
    setSelectedFiles(next);
    setPreviews(next.map((f) => URL.createObjectURL(f)));
  };

  const validate = (data: FormData) => {
    const errs: Record<string, string> = {};
    if (!selectedServices.length)
      errs.services = "Vælg mindst én ydelse.";
    const email = data.get("email") as string;
    if (!email) errs.email = "Skriv din e-mailadresse.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "E-mailen ser ikke rigtig ud — tjek @ og domæne.";
    const msg = data.get("message") as string;
    if (!msg) errs.message = "Skriv lidt om opgaven.";
    else if (msg.length < 10) errs.message = "Skriv lidt mere — vi skal vide nok til at give en pris.";
    if (!data.get("name")) errs.name = "Skriv dit navn.";
    if (!data.get("address")) errs.address = "Skriv adressen på opgaven.";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const errs = validate(fd);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("loading");

    let images: string[] = [];
    try {
      images = await Promise.all(selectedFiles.map(readAsBase64));
    } catch {
      // send without images
    }

    const phoneNum = fd.get("phone") as string;
    const payload = {
      name: fd.get("name") as string,
      phone: phoneNum ? `${countryCode} ${phoneNum}` : "",
      email: fd.get("email") as string,
      address: fd.get("address") as string,
      services: selectedServices.join(", "),
      message: fd.get("message") as string,
      images,
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("server");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div
        className="rounded-2xl p-12 text-center"
        style={{ background: "var(--color-green-light)" }}
      >
        <div className="mb-4 text-5xl">✓</div>
        <h3
          className="mb-2 text-2xl font-700"
          style={{ fontFamily: "var(--font-display), 'Bricolage Grotesque', sans-serif", fontWeight: 700, color: "var(--color-green-dark)" }}
        >
          Tak for din besked!
        </h3>
        <p style={{ color: "var(--color-muted)" }}>
          Vi vender tilbage hurtigst muligt med et tilbud.
        </p>
      </div>
    );
  }

  const inputStyle = {
    background: "var(--color-cream)",
    border: "1.5px solid rgba(61,107,53,0.2)",
    borderRadius: 10,
    padding: "12px 14px",
    fontSize: 15,
    width: "100%",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
    color: "var(--color-text)",
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {/* Services */}
      <div>
        <label className="mb-2 block text-sm font-600" style={{ fontWeight: 600 }}>
          Hvilke ydelser ønsker du?
        </label>
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggleService(s)}
              className="rounded-full px-4 py-2 text-sm font-500 transition-all duration-200"
              style={{
                fontWeight: 500,
                background: selectedServices.includes(s)
                  ? "var(--color-green)"
                  : "var(--color-cream-dark)",
                color: selectedServices.includes(s) ? "white" : "var(--color-text)",
                border: selectedServices.includes(s)
                  ? "1.5px solid var(--color-green)"
                  : "1.5px solid transparent",
              }}
            >
              {s}
            </button>
          ))}
        </div>
        {errors.services && (
          <p className="mt-1.5 text-sm" style={{ color: "#c0392b" }}>{errors.services}</p>
        )}
      </div>

      {/* Name + Address */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-600" style={{ fontWeight: 600 }}>Navn</label>
          <input name="name" type="text" placeholder="Dit navn" style={inputStyle} />
          {errors.name && <p className="mt-1 text-sm" style={{ color: "#c0392b" }}>{errors.name}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-600" style={{ fontWeight: 600 }}>Adresse på opgaven</label>
          <input name="address" type="text" placeholder="Vej 1, 8600 Silkeborg" style={inputStyle} />
          {errors.address && <p className="mt-1 text-sm" style={{ color: "#c0392b" }}>{errors.address}</p>}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="mb-1.5 block text-sm font-600" style={{ fontWeight: 600 }}>Telefon (valgfrit)</label>
        <div className="flex gap-2">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            style={{ ...inputStyle, width: "auto", paddingRight: 28 }}
          >
            {COUNTRY_CODES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code}
              </option>
            ))}
          </select>
          <input name="phone" type="tel" placeholder="12 34 56 78" style={inputStyle} />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="mb-1.5 block text-sm font-600" style={{ fontWeight: 600 }}>E-mail</label>
        <input name="email" type="email" placeholder="din@email.dk" style={inputStyle} />
        {errors.email && <p className="mt-1 text-sm" style={{ color: "#c0392b" }}>{errors.email}</p>}
      </div>

      {/* Message */}
      <div>
        <label className="mb-1.5 block text-sm font-600" style={{ fontWeight: 600 }}>Beskriv opgaven</label>
        <textarea
          name="message"
          rows={5}
          placeholder="Fortæl os hvad der skal laves, og hvornår det passer dig..."
          style={{ ...inputStyle, resize: "vertical" }}
        />
        {errors.message && <p className="mt-1 text-sm" style={{ color: "#c0392b" }}>{errors.message}</p>}
      </div>

      {/* Image upload */}
      <div>
        <label className="mb-1.5 block text-sm font-600" style={{ fontWeight: 600 }}>
          Billeder (valgfrit, max 3)
        </label>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={selectedFiles.length >= 3}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed py-4 text-sm transition-colors"
          style={{
            borderColor: "rgba(61,107,53,0.25)",
            color: "var(--color-muted)",
            background: "var(--color-cream)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          {selectedFiles.length >= 3 ? "Max 3 billeder valgt" : "Upload billeder"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
        {previews.length > 0 && (
          <div className="mt-3 flex gap-2">
            {previews.map((src, i) => (
              <div key={i} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-16 w-16 rounded-lg object-cover" />
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full text-white text-xs"
                  style={{ background: "#c0392b" }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full py-4 text-base font-600 text-white transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-60"
        style={{ fontWeight: 600, background: "var(--color-green)" }}
      >
        {status === "loading" ? "Sender…" : "Send forespørgsel"}
      </button>

      {status === "error" && (
        <p className="text-center text-sm" style={{ color: "#c0392b" }}>
          Noget gik galt — prøv igen eller ring til os.
        </p>
      )}
    </form>
  );
}
