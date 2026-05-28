/**
 * Site sabitleri — bütün metinleri, iletişim bilgilerini ve SEO
 * alanlarını TEK YERDEN değiştirebilmek için burada topluyoruz.
 *
 * Yeni telefon, yeni adres, yeni sosyal medya linki vs. eklerken
 * sadece bu dosyayı düzenle.
 */

export const siteConfig = {
  // --- Temel kimlik ---
  name: "OZ Coffee Shelter",
  shortName: "OZ Coffee",
  tagline: "Butik kahve, sıcak sığınak.",
  description:
    "OZ Coffee Shelter — özenle seçilmiş çekirdeklerden butik kahveler, matchalar ve mevsim özel içecekleri. Sıcak, koyu, kendine has bir kahve sığınağı.",

  // --- Yayın URL'i ---
  // Henüz özel alan adı yok; Vercel deploy sonrası verilen URL ile değiştir.
  // (Örn: https://ozcoffeeshelter-web.vercel.app)
  // Bu değer canonical link, OG/Twitter görsel URL'leri ve JSON-LD'de kullanılır.
  url: "https://ozcoffeeshelter-web.vercel.app",

  // --- İletişim ---
  // TODO: Gerçek bilgiler hazır olunca güncelle. Boş bırakırsan UI'da gözükmez
  // (Footer ve Location bileşenleri null kontrolüyle render eder).
  phone: "", // örn: "+90 555 000 00 00"
  phoneDisplay: "", // örn: "0555 000 00 00"
  email: "", // örn: "info@ozcoffeeshelter.com"

  // --- Adres ---
  // İzmir Karabağlar, İnönü Caddesi (Google Maps üzerinden tespit edildi).
  // Tam bina/no eklemek istersen `street` alanına ekle.
  address: {
    street: "İnönü Caddesi, Esenyalı Mahallesi",
    district: "Karabağlar",
    city: "İzmir",
    postalCode: "35290",
    country: "TR",
    // Google Maps'teki gerçek konum noktası
    latitude: 38.3929931,
    longitude: 27.0880146,
  },

  // --- Çalışma saatleri ---
  // Her gün 10:00 - 00:00 (gece yarısı). schema.org için 24:00 = ertesi gün 00:00.
  openingHours: [
    { days: "Her gün", hours: "10:00 – 00:00" },
  ],
  // schema.org openingHoursSpecification için yapılandırılmış format
  openingHoursStructured: [
    {
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "24:00",
    },
  ],

  // --- Sosyal medya ---
  // Boş bırakılan link otomatik olarak Footer ve Location'da gözükmez.
  social: {
    instagram: "", // TODO: örn "https://instagram.com/ozcoffeeshelter"
    facebook: "",
    twitter: "",
  },

  // --- SEO anahtar kelimeler ---
  keywords: [
    "OZ Coffee Shelter",
    "butik kahve",
    "third wave coffee",
    "specialty coffee",
    "matcha",
    "espresso",
    "İzmir kahveci",
    "Karabağlar kahve",
    "kahve dükkanı",
    "spanish latte",
    "flat white",
  ],
  // `as const` KULLANMA: phone/email/social gibi şu an boş string olan alanları
  // literal "" tipine daraltıp `if (...)` kontrollerini bozar. Normal string'e bırak.
};

// Bölüm anchor id'leri — Hero CTA'ları ve nav buradan referans alır.
export const sectionIds = {
  hero: "hero",
  about: "hakkimizda",
  menu: "menu",
  gallery: "galeri",
  location: "konum",
} as const;
