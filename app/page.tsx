import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { BeforeAfterCarousel } from "@/components/sections/BeforeAfterCarousel";
import { CTABand } from "@/components/sections/CTABand";

export const metadata: Metadata = {
  title: "Silkehave — Have- og ejendomsservice i Midtjylland",
  description:
    "Professionel hækklipning, græsslåning, haveordning og ejendomsservice i Silkeborg og omegn. Fast pris før vi starter.",
};

// Placeholder pairs — erstat src med rigtige billeder når de er klar
const beforeAfterPairs = [
  {
    before: { src: "/images/placeholder-before.png", alt: "Hæk før klipning" },
    after: { src: "/images/placeholder-after.png", alt: "Hæk efter klipning" },
    label: "Hækklipning — Silkeborg",
  },
  {
    before: { src: "/images/placeholder-before.png", alt: "Have før ordning" },
    after: { src: "/images/placeholder-after.png", alt: "Have efter ordning" },
    label: "Haveordning — Them",
  },
  {
    before: { src: "/images/placeholder-before.png", alt: "Græsplæne før slåning" },
    after: { src: "/images/placeholder-after.png", alt: "Græsplæne efter slåning" },
    label: "Græsslåning — Gjern",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <BeforeAfterCarousel pairs={beforeAfterPairs} />
      <CTABand />
    </>
  );
}
