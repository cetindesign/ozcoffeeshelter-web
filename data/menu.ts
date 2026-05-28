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
// Tek yerde tutmak, bütün menü görsellerinin aynı oran/kalitede gelmesini sağlar.
const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&q=80&auto=format&fit=crop&crop=center`;

export const menu: MenuCategory[] = [
  {
    id: "klasik",
    title: "Klasik Kahveler",
    layout: "cards",
    items: [
      { name: "Filtre Kahve",  price: 120,         image: u("1495474472287-4d71bcdd2085") },
      { name: "Espresso",      price: "90 – 110",  image: u("1510707577719-ae7c14805e3a") },
      { name: "Americano",     price: 130,         image: u("1437418747212-8d9709afab22") },
      { name: "Latte",         price: 140,         image: u("1561882468-9110e03e0f78") },
      { name: "Cappuccino",    price: 140,         image: u("1572442388796-11668a67e53d") },
      { name: "Caramel Latte", price: 180,         image: u("1502462041640-b3d7e50d0662") },
      { name: "Mocha",         price: 170,         image: u("1559827260-dc66d52bef19") },
      { name: "White Mocha",   price: 180,         image: u("1517701604599-bb29b565090c") },
      { name: "Toffie Nut",    price: 180,         image: u("1454944338482-a69bb95894af") },
      { name: "Chai Tea Latte", price: 170,        image: u("1564890369478-c89ca6d9cde9") },
      { name: "Flat White",    price: 160,         image: u("1517959105821-eaf2591984ca") },
      { name: "Türk Kahvesi",  price: "90 – 110",  image: u("1499636136210-6f4ee915583e") },
      { name: "Çay",           price: 60,          image: u("1571934811356-5cc061b6821f") },
    ],
  },
  {
    id: "specials",
    title: "Specials",
    layout: "cards",
    items: [
      { name: "Spanish Latte", price: 200, image: u("1556679343-c7306c1976bc"),
        note: "Yoğunlaştırılmış süt ile katmanlı imza tarifi." },
      { name: "OZ Special",    price: 200, image: u("1610632380989-680fe40816c6"),
        note: "Evin imzası — şefin gizli tarifi." },
      { name: "Flat Gold",     price: 200, image: u("1538587888044-79f13ddd7e49"),
        note: "Karamelize altın tonlarında ipeksi bir flat white." },
      { name: "Hulk",          price: 200, image: u("1515442261605-65987783cb6a"),
        note: "Matcha + espresso buluşması — yeşilin enerjisi." },
    ],
  },
  {
    id: "matchas",
    title: "Matchas",
    layout: "cards",
    items: [
      { name: "Matcha Tea",          price: 180, image: u("1536256263959-770b48d82b0a") },
      { name: "Vanilla Matcha Latte", price: 220, image: u("1515823064-d6e0c04616a7") },
      { name: "Matcha Latte",        price: 200, image: u("1551782450-a2132b4ba21d") },
    ],
  },
  {
    id: "summer",
    title: "Summer Edition",
    layout: "cards",
    items: [
      { name: "Iced Hibiskus",         price: 200, image: u("1499638673689-79a0b5115d87") },
      { name: "Cool Lime",             price: 200, image: u("1559056199-641a0ac8b55e") },
      { name: "Limon Çilek Frozen",    price: 200, image: u("1502741126161-b048400d085d") },
      { name: "Limonata",              price: 180, image: u("1556881286-fc6915169721") },
      { name: "Orman Meyveli Frozen",  price: 200, image: u("1546173159-315724a31696") },
      { name: "Elma Nane Frozen",      price: 200, image: u("1568649929103-28ffbefaca1e") },
    ],
  },
  {
    id: "soft",
    title: "Soft",
    layout: "cards",
    items: [
      { name: "Soda",      price: 70,  image: u("1543253687-c931c8e01820") },
      { name: "Su",        price: 35,  image: u("1548839140-29a749e1cf4d") },
      { name: "Churchill", price: 100, image: u("1551030173-122aabc4489c") },
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
