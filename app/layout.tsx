import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SilkeHave — Have‑ og ejendomsservice i Midtjylland",
  description: "Have- og ejendomsservice i Midtjylland. Hækklipning, fliserens, vinduesrens og snerydning. Fast pris før vi starter.",
  openGraph: {
    type: "website",
    locale: "da_DK",
    siteName: "SilkeHave",
    title: "SilkeHave — Have‑ og ejendomsservice i Midtjylland",
    description: "Lokal have‑ og ejendomsservice i Midtjylland. Fast pris, ingen overraskelser.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da" className={`${bricolage.variable} ${dmSans.variable}`}>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
