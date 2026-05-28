import { siteConfig } from "@/lib/config";

/**
 * LocalBusiness structured data (JSON-LD, schema.org).
 *
 * Google'ın işletmeyi Map'te, Knowledge Panel'de ve yerel aramalarda
 * doğru tanıması için KRİTİK. Layout'un başında render edilir.
 *
 * Doğrulamak için: https://search.google.com/test/rich-results
 * (Deploy sonrası URL'yi girip "LocalBusiness" çıktığını gör.)
 */
export function LocalBusinessJsonLd() {
  // Bilgi yoksa schema.org'a boş alan göndermemek için
  // dolu olanları koşullu olarak ekliyoruz.
  const sameAs = [
    siteConfig.social.instagram,
    siteConfig.social.facebook,
    siteConfig.social.twitter,
  ].filter(Boolean);

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: siteConfig.name,
    image: `${siteConfig.url}/og-image.jpg`,
    "@id": siteConfig.url,
    url: siteConfig.url,
    priceRange: "₺₺",
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.district,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.address.latitude,
      longitude: siteConfig.address.longitude,
    },
    openingHoursSpecification: siteConfig.openingHoursStructured.map(
      (spec) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: spec.dayOfWeek,
        opens: spec.opens,
        closes: spec.closes,
      })
    ),
    servesCuisine: ["Coffee", "Beverages"],
  };

  if (siteConfig.phone) jsonLd.telephone = siteConfig.phone;
  if (siteConfig.email) jsonLd.email = siteConfig.email;
  if (sameAs.length > 0) jsonLd.sameAs = sameAs;

  return (
    <script
      type="application/ld+json"
      // dangerouslySetInnerHTML, Next.js önerisi: JSON-LD'yi olduğu gibi gömer.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
