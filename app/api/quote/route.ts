import { after } from "next/server";

const MAX_BODY_BYTES = 4 * 1024 * 1024; // 4 MB — Vercel platform limit is 4.5 MB

// Simple in-memory rate limiter — 5 submissions per IP per 15 minutes
const rateMap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 15 * 60 * 1000;

function checkRate(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + RATE_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

// Escape Telegram MarkdownV2 special chars
function escMd(s: string): string {
  return s.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, "\\$&");
}

// Validate a single base64-encoded image string (max 300 KB decoded)
const MAX_IMAGE_BYTES = 300 * 1024;
function isValidImage(b64: string): boolean {
  if (typeof b64 !== "string") return false;
  const bytes = Math.floor(b64.length * 0.75);
  return bytes <= MAX_IMAGE_BYTES;
}

export async function POST(request: Request) {
  // Rate limit by IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  if (!checkRate(ip)) {
    return Response.json({ error: "For mange forsøg — prøv igen om lidt" }, { status: 429 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return Response.json({ error: "Payload for stor" }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Ugyldig JSON" }, { status: 400 });
  }

  const { name, phone, email, address, services, message, images, consentTimestamp } = body as {
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
    services?: string;
    message?: string;
    images?: string[];
    consentTimestamp?: string;
  };

  // Field validation
  if (!name || !email || !address || !message) {
    return Response.json({ error: "Mangler påkrævede felter" }, { status: 400 });
  }
  if (String(name).length > 200 || String(email).length > 200 ||
      String(address).length > 500 || String(message).length > 5000) {
    return Response.json({ error: "Felt er for langt" }, { status: 400 });
  }
  if (!consentTimestamp) {
    return Response.json({ error: "Samtykke mangler" }, { status: 400 });
  }

  // Validate images array
  const validImages = Array.isArray(images)
    ? images.filter(isValidImage).slice(0, 20)
    : [];
  const hasImages = validImages.length > 0;

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("Telegram env vars mangler");
    return Response.json({ error: "Server ikke konfigureret" }, { status: 500 });
  }

  const now = new Date().toLocaleString("da-DK", {
    timeZone: "Europe/Copenhagen",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const lines = [
    "🌿 *Ny forespørgsel — SilkeHave*",
    "",
    `*Navn:* ${escMd(String(name))}`,
    phone ? `*Telefon:* ${escMd(String(phone))}` : "*Telefon:* —",
    `*Email:* ${escMd(String(email))}`,
    `*Adresse:* ${escMd(String(address))}`,
    "",
    `*Ydelser:* ${services ? escMd(String(services)) : "—"}`,
    "",
    `*Besked:*\n${escMd(String(message))}`,
    hasImages ? `\n_${validImages.length} billede${validImages.length > 1 ? "r" : ""} vedhæftet_` : "",
    "",
    `_Sendt: ${escMd(now)}_`,
    `_Samtykke til privatlivspolitik: JA — ${escMd(consentTimestamp)}_`,
  ].filter(Boolean);

  const msgResp = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join("\n"),
        parse_mode: "MarkdownV2",
      }),
    }
  );

  if (!msgResp.ok) {
    const err = await msgResp.text();
    console.error("Telegram sendMessage fejl:", err);
    return Response.json({ error: "Telegram fejl" }, { status: 502 });
  }

  // Send photos in the background — user doesn't wait
  if (hasImages) {
    after(async () => {
      for (const b64 of validImages) {
        try {
          const buffer = Buffer.from(b64, "base64");
          const fd = new FormData();
          fd.append("chat_id", String(chatId));
          fd.append("photo", new Blob([buffer], { type: "image/jpeg" }), "foto.jpg");
          await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
            method: "POST",
            body: fd,
          });
        } catch (err) {
          console.error("Telegram sendPhoto fejl:", err);
        }
      }
    });
  }

  return Response.json({ ok: true });
}
