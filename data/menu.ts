/**
 * Menü verisi — tip güvenli, tek dosyada yönetilir.
 *
 * Yeni ürün eklerken: ilgili kategorinin `items` dizisine bir satır ekle.
 * Fiyat aralığı için string ("90 – 110") da kullanabilirsin.
 * Yeni kategori için: `menu` dizisine yeni bir MenuCategory objesi ekle.
 *
 * --- Görseller hakkında ---
 * Şu an her ürün için TEMSİLİ Unsplash fotoğrafları kullanıyoruz.
 * Kendi ürün çekimlerini hazırlayınca:
 *   1) public/menu/ klasörüne <id>.jpg olarak koy (örn. public/menu/oz-special.jpg)
 *   2) Burada item'ın `image` alanını "/menu/oz-special.jpg" yap
 * Unsplash URL'leri olduğu gibi de kullanılabilir — next.config.mjs allowlist'te.
 */

export type MenuItem = {
  /** Ürün adı (UI'da gözükecek metin) */
  name: string;
  /** Fiyat — sayı ya da aralık ("90 – 110") */
  price: number | string;
  /** Ürün fotoğrafı URL'si (Unsplash CDN ya da /menu/... yerel) */
  image?: string;
  /** Opsiyonel kısa açıklama (kartın altında küçük punto) */
  note?: string;
};

export type MenuCategory = {
  /** Kategori başlığı (UI'da gözükür) */
  title: string;
  /** Anchor / key için kısa kimlik */
  id: string;
  /** "extras" → Menu UI bunu fotoğrafsız compact liste olarak render eder */
  layout?: "cards" | "list";
  items: MenuItem[];
};

/**
 * Fiyat sembolünü tek yerde tut — ileride para birimi değişirse buradan.
 */
export const CURRENCY_SYMBOL = "₺";

/**
 * Bir fiyatı UI için biçimlendiren yardımcı.
 *  - Sayıysa: "120 ₺"
 *  - String'se (aralık): "90 – 110 ₺"
 */
export function formatPrice(price: number | string): string {
  return `${price} ${CURRENCY_SYMBOL}`;
}

// Unsplash görsel URL'sini standart kalite/boyut parametreleriyle inşa eder.
// w=1200: retina ekranlar için yeterli kaynak çözünürlük. Next/Image bunu
// breakpoint'lere göre downscale ediyor, yani büyük kaynak ekstra maliyet değil.
// q=82: görsel ve dosya boyutu arasında dengeli tatlı nokta.
// auto=format: tarayıcıya AVIF/WebP servisi (Unsplash tarafında).
// fit=crop & crop=center: 4:5 karta sığarken merkezdeki içerik korunur.
const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1200&q=82&auto=format&fit=crop&crop=center`;

// --- Görsel atamaları hakkında ---
// Her ID, Unsplash arama sonuçlarından SLUG ile içerik doğrulanarak seçildi
// (örn. "white-ceramic-teacup-filled-of-matcha-tea" → Matcha Latte için).
// Yine de "OZ Special" / "Flat Gold" / "Hulk" gibi imza içecekler için
// stok kataloğunda birebir karşılık yok — yakın renk/atmosferdeki en uygun
// görsel kullanıldı. Kendi ürün çekimlerin geldiğinde:
//   public/menu/<slug>.jpg olarak ekle, item.image değerini "/menu/<slug>.jpg" yap.

export const menu: MenuCategory[] = [
  {
    id: "klasik",
    title: "Klasik Kahveler",
    layout: "cards",
    items: [
      // pour-over filtre, beyaz fincana su akıyor
      { name: "Filtre Kahve",  price: 120,         image: u("1582768772255-7fb8066357ce") },
      // espresso, küçük fincan + tabak
      { name: "Espresso",      price: "90 – 110",  image: u("1572286258217-40142c1c6a70") },
      // americano, beyaz fincan ahşap masa
      { name: "Americano",     price: 130,         image: u("1551030173-122aabc4489c") },
      // beyaz fincan + tabakta latte art (sade arka plan, dekoratif öğe yok)
      { name: "Latte",         price: 140,         image: u("1774529239747-125d7a0bf928") },
      // klasik beyaz fincanda cappuccino latte art
      { name: "Cappuccino",    price: 140,         image: u("1572442388796-11668a67e53d") },
      // karamel tonlu buzlu kahve (cam bardakta)
      { name: "Caramel Latte", price: 180,         image: u("1517701550927-30cf4ba1dba5") },
      // mocha — kalp şekilli kahverengi-beyaz latte art
      { name: "Mocha",         price: 170,         image: u("1593543294918-ca3634e04cdb") },
      // beyaz-kahverengi katmanlı içecek (white mocha karakteri)
      { name: "White Mocha",   price: 180,         image: u("1517701604599-bb29b565090c") },
      // findik tonlu kahverengi latte (cam kupa)
      { name: "Toffie Nut",    price: 180,         image: u("1598831745385-0c404c7034a9") },
      // chai — baharatlı sütlü çay tonunda
      { name: "Chai Tea Latte", price: 170,        image: u("1582746989278-c1eaac54b222") },
      // flat white, beyaz fincan, ince mikrofoam
      { name: "Flat White",    price: 160,         image: u("1616084776095-8cbe9787bc3a") },
      // köpüklü Türk kahvesi, fincan + tabakta (Şeyda Nur Yüce)
      { name: "Türk Kahvesi",  price: "90 – 110",  image: u("1670351230643-27f874d17025") },
      // ince belli Türk çay bardağı (klasik tulip glass)
      { name: "Çay",           price: 60,          image: u("1579005162638-11c872e1586e") },
    ],
  },
  {
    id: "specials",
    title: "Specials",
    layout: "cards",
    items: [
      // buzlu latte, cam bardakta (Spanish latte estetiği)
      { name: "Spanish Latte", price: 200, image: u("1620360289100-030b032e5a27"),
        note: "Yoğunlaştırılmış süt ile katmanlı imza tarifi." },
      // specialty coffee — koyu cinematic
      { name: "OZ Special",    price: 200, image: u("1593290665075-71c247095491"),
        note: "Evin imzası — şefin gizli tarifi." },
      // altın/karamel tonlu kahve
      { name: "Flat Gold",     price: 200, image: u("1502462041640-b3d7e50d0662"),
        note: "Karamelize altın tonlarında ipeksi bir flat white." },
      // yeşil buzlu içecek — Hulk
      { name: "Hulk",          price: 200, image: u("1717398804998-ad2d48822518"),
        note: "Matcha + espresso buluşması — yeşilin enerjisi." },
    ],
  },
  {
    id: "matchas",
    title: "Matchas",
    layout: "cards",
    items: [
      // chasen (matcha çırpıcısı) ile çanak içinde matcha
      { name: "Matcha Tea",          price: 180, image: u("1753009712810-3f72c3f72548") },
      // ombre/katmanlı matcha latte (vanilya için ideal)
      { name: "Vanilla Matcha Latte", price: 220, image: u("1749280447307-31a68eb38673") },
      // beyaz fincanda klasik matcha latte
      { name: "Matcha Latte",        price: 200, image: u("1515823064-d6e0c04616a7") },
    ],
  },
  {
    id: "summer",
    title: "Summer Edition",
    layout: "cards",
    items: [
      // kırmızı buzlu hibiskus
      { name: "Iced Hibiskus",         price: 200, image: u("1499638673689-79a0b5115d87") },
      // yeşil buzlu lime/mojito içecek
      { name: "Cool Lime",             price: 200, image: u("1720446838030-d914440e6a16") },
      // çilek-limon yüksek bardakta
      { name: "Limon Çilek Frozen",    price: 200, image: u("1573500883698-e3ef47a95feb") },
      // limonata — sıkma anı (el + limon + bardak)
      { name: "Limonata",              price: 180, image: u("1656936637945-571e3f0893f9") },
      // mor/koyu kırmızı orman meyveli smoothie
      { name: "Orman Meyveli Frozen",  price: 200, image: u("1643470758221-45463a3d210a") },
      // yeşil elma-nane buzlu içecek
      { name: "Elma Nane Frozen",      price: 200, image: u("1622597468666-27cb9cae0e45") },
    ],
  },
  {
    id: "soft",
    title: "Soft",
    layout: "cards",
    items: [
      // gazlı su / soda (bardakta)
      { name: "Soda",      price: 70,  image: u("1643114451704-8f44b1d1a681") },
      // sade su, berrak bardakta
      { name: "Su",        price: 35,  image: u("1534616042650-80f5c9b61f09") },
      // bardakta limon + nane + buz (Churchill için)
      { name: "Churchill", price: 100, image: u("1653542772393-71ffa417b1c4") },
    ],
  },
  {
    // "Ekstralar" — modifiye ürünleri, fotoğrafsız sade liste olarak gösterilir.
    id: "ekstralar",
    title: "Ekstralar",
    layout: "list",
    items: [
      { name: "Şurup",       price: 30 },
      { name: "Ekstra Shot", price: 30 },
      { name: "Bitkisel Süt", price: 30 },
    ],
  },
];
