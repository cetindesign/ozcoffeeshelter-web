import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

/**
 * Sitemap — tek sayfa olduğu için yalnızca anasayfa.
 * /sitemap.xml otomatik üretilir.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
