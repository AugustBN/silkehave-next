import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
  metadataBase: new URL("https://silkehave.dk"),
  title: {
    default: "Haveservice i Silkeborg & Midtjylland | SilkeHave",
    template: "%s | SilkeHave",
  },
  description: "Lokal have- og ejendomsservice i Midtjylland. Hækklipning, fliserens, græsslåning og snerydning i Silkeborg og omegn. Fast pris — ring 91 25 10 21.",
  verification: {
    google: "eZf24AKNow0tCiqIBtMPKpLI1T-TVp1tMWVjfEj8w7s",
  },
  openGraph: {
    type: "website",
    locale: "da_DK",
    siteName: "SilkeHave",
    url: "https://silkehave.dk",
    title: "Haveservice i Silkeborg & Midtjylland | SilkeHave",
    description: "Lokal have- og ejendomsservice i Midtjylland. Hækklipning, fliserens, græsslåning og snerydning i Silkeborg og omegn. Fast pris — ring 91 25 10 21.",
    images: [{ url: "/assets/photos/fliser-efter.jpg", width: 1200, height: 800 }],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SilkeHave",
  description: "Have- og ejendomsservice i Silkeborg og Midtjylland. Hækklipning, fliserens, græsslåning, vinduesrens og snerydning.",
  url: "https://silkehave.dk",
  telephone: "+4591251021",
  email: "KontaktSilkeHave@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Silkeborg",
    addressRegion: "Region Midtjylland",
    addressCountry: "DK",
  },
  areaServed: [
    "Silkeborg","Viborg","Skanderborg","Herning","Ikast","Brande",
    "Bjerringbro","Hammel","Ry","Them","Kjellerup","Karup","Galten","Engesvang",
  ].map((name) => ({ "@type": "City", name })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Haveservice",
    itemListElement: ["Hækklipning","Fliserens","Græsslåning","Vinduesrens","Snerydning","Haveordning"]
      .map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
  },
  sameAs: ["https://www.facebook.com/profile.php?id=61574788933190"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da" className={`${bricolage.variable} ${dmSans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {children}
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
