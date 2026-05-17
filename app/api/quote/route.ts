export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Ugyldig JSON" }, { status: 400 });
  }

  const { name, phone, email, address, services, message, images } = body as {
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
    services?: string;
    message?: string;
    images?: string[];
  };

  if (!name || !email || !address || !message) {
    return Response.json({ error: "Mangler påkrævede felter" }, { status: 400 });
  }

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

  const hasImages = Array.isArray(images) && images.length > 0;

  const lines = [
    "🌿 *Ny forespørgsel — Silkehave*",
    "",
    `*Navn:* ${name}`,
    phone ? `*Telefon:* ${phone}` : "*Telefon:* —",
    `*Email:* ${email}`,
    `*Adresse:* ${address}`,
    "",
    `*Ydelser:* ${services || "—"}`,
    "",
    `*Besked:*\n${message}`,
    hasImages ? `\n_${images!.length} billede${images!.length > 1 ? "r" : ""} vedhæftet_` : "",
    "",
    `_Sendt: ${now}_`,
  ].filter((l) => l !== undefined);

  const msgResp = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join("\n"),
        parse_mode: "Markdown",
      }),
    }
  );

  if (!msgResp.ok) {
    const err = await msgResp.text();
    console.error("Telegram sendMessage fejl:", err);
    return Response.json({ error: "Telegram fejl" }, { status: 502 });
  }

  if (hasImages) {
    for (const b64 of images!.slice(0, 3)) {
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
  }

  return Response.json({ ok: true });
}
