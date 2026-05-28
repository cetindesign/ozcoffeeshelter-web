import { sectionIds } from "@/lib/config";
import { Reveal } from "./Reveal";

/**
 * Galeri — bento-style asimetrik grid + henüz fotoğraf yokken zarif boş durum.
 *
 * --- Grid mantığı ---
 * Desktop (lg, 4 kolon × 3 satır = 12 hücre) — span'ler tam 12 hücre doldurur:
 *   Item 0: col 1, rows 1–2    (lg:row-span-2)   → 2 hücre
 *   Item 1: col 2, row 1                          → 1 hücre
 *   Item 2: cols 3–4, row 1   (lg:col-span-2)    → 2 hücre
 *   Item 3: col 2, row 2                          → 1 hücre
 *   Item 4: cols 3–4, rows 2–3 (lg:row-span-2 col-span-2) → 4 hücre
 *   Item 5: cols 1–2, row 3   (lg:col-span-2)    → 2 hücre
 * Mobile (2 kolon) — span'ler `lg:` prefix'iyle devre dışı, tüm hücreler 1×1.
 *
 * --- Fotoğraflar nereye gelir ---
 * Bu dosyanın altındaki `galleryImages` dizisinde her item için `src` null.
 * Fotoğraf hazır olunca:
 *   1) public/gallery/ klasörü oluştur
 *   2) Dosyaları 01.jpg, 02.jpg ... 06.jpg adıyla koy
 *   3) Aşağıdaki dizide `src: null` → `src: "/gallery/01.jpg"` yap
 * `src` dolu olan item'lar otomatik <img> render eder, boş kalanlar "yakında"
 * placeholder'ı gösterir — yarı dolu duruma da hazır.
 */
type GalleryItem = {
  src: string | null;
  alt: string;
  span: string;
};

const galleryImages: GalleryItem[] = [
  { src: null, alt: "OZ Coffee Shelter mekan içi — sıcak ışıklı oturma alanı", span: "lg:row-span-2" },
  { src: null, alt: "Barista espresso hazırlarken yakın çekim", span: "" },
  { src: null, alt: "Latte art ile servis edilen kahve", span: "lg:col-span-2" },
  { src: null, alt: "Matcha latte ve yanında tatlı sunumu", span: "" },
  { src: null, alt: "Mekanın atmosferik dış cephesi", span: "lg:row-span-2 lg:col-span-2" },
  { src: null, alt: "Summer Edition soğuk içecek servisi", span: "lg:col-span-2" },
];

export function Gallery() {
  // Fotoğraf eklenmemişse "yakında" durumunu otomatik tespit edip altta küçük
  // bir bilgi notu göster — ileride bir kısmı dolduğunda not kaybolur.
  const allEmpty = galleryImages.every((g) => !g.src);

  return (
    <section
      id={sectionIds.gallery}
      aria-labelledby="gallery-title"
      className="py-24 sm:py-32 bg-cream"
    >
      <div className="container">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <Reveal>
            <p className="text-xs sm:text-sm tracking-[0.5em] uppercase text-gold mb-4">
              Galeri
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              id="gallery-title"
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight text-ink"
            >
              Mekandan kareler
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-ink/60 text-base sm:text-lg max-w-xl">
              {allEmpty
                ? "Mekanımızdan kareler çok yakında — bekleyişte misiniz?"
                : "Burası kahveden çok daha fazlası. Bir köşe, bir ışık, bir kupa."}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] lg:auto-rows-[240px] gap-3 sm:gap-4 max-w-6xl mx-auto">
          {galleryImages.map((img, i) => (
            <Reveal
              key={i}
              delay={i * 0.06}
              as="article"
              className={`relative overflow-hidden rounded-lg group ${img.span}`}
            >
              <PlaceholderTile index={i} />
              {img.src && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="relative w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              {/* Hover overlay'i sadece foto varken anlamlı */}
              {img.src && (
                <>
                  <div className="absolute inset-0 ring-0 group-hover:ring-1 group-hover:ring-gold/70 transition-all duration-500 rounded-lg" />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Foto yokken gösterilen yer tutucu — koyu zemin + ince altın motif.
 * Index'e göre küçük varyasyonlar (gradient açısı, OZ konumu) ile
 * "boş ama tasarlanmış" bir his verir.
 */
function PlaceholderTile({ index }: { index: number }) {
  // 6 cell için altı farklı gradient yönü — tekrarı kırar.
  const gradients = [
    "from-ink to-[#3a2c1f]",
    "from-[#2a1f15] to-[#1a130d]",
    "from-[#1a130d] via-[#2a1f15] to-[#3a2c1f]",
    "from-[#3a2c1f] to-ink",
    "from-ink via-[#241a13] to-[#3b2a1c]",
    "from-[#241a13] to-[#13100c]",
  ];
  const gradient = gradients[index % gradients.length];

  return (
    <div
      className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center`}
      aria-hidden="true"
    >
      <span className="font-serif text-gold/25 text-2xl sm:text-3xl tracking-[0.4em]">
        OZ
      </span>
    </div>
  );
}
