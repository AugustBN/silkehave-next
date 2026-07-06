import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://silkehave.dk";
  return [
    { url: base,                                   lastModified: "2026-07-05", changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/services/haekklipning`,        lastModified: "2026-07-05", changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/fliserens`,           lastModified: "2026-07-05", changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/haveordning`,         lastModified: "2026-07-05", changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/snerydning`,          lastModified: "2026-07-05", changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/vinduesrens`,         lastModified: "2026-07-05", changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/om-os`,                        lastModified: "2026-07-05", changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/omraade`,                      lastModified: "2026-07-05", changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/kontakt`,                      lastModified: "2026-07-05", changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privatlivspolitik`,            lastModified: "2026-07-05", changeFrequency: "yearly",  priority: 0.3 },
  ];
}
