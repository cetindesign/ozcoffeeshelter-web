# OZ Coffee Shelter — Website

Butik kahveci OZ Coffee Shelter için tek sayfalık, SEO-optimize tanıtım sitesi.
Next.js 14 (App Router) + TypeScript + Tailwind CSS. Statik export'a uygun,
Vercel'e tek tıkla deploy edilir.

---

## 🛠 Teknoloji

- **Next.js 14** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS** (özel paleti `tailwind.config.ts` içinde: ink/gold/cream)
- **next/font/google** ile Playfair Display + Inter (latin-ext / Türkçe destekli)
- Backend yok — tüm veri `data/menu.ts` içinde tip güvenli.

---

## 📁 Proje Yapısı

```
ozcoffeeshelter-web/
├── app/
│   ├── layout.tsx          # Root layout, SEO metadata, fontlar, JSON-LD
│   ├── page.tsx            # Tek sayfa — bölümleri sırayla compose eder
│   ├── globals.css         # Tailwind + tema değişkenleri
│   ├── sitemap.ts          # /sitemap.xml otomatik üretir
│   └── robots.ts           # /robots.txt otomatik üretir
├── components/
│   ├── Header.tsx          # Sticky üst gezinme
│   ├── Hero.tsx            # Tam ekran giriş + CTA'lar
│   ├── About.tsx           # Hakkımızda — placeholder metin
│   ├── Menu.tsx            # Kategorili menü — data/menu.ts'den
│   ├── Gallery.tsx         # Görsel grid — placeholder
│   ├── Location.tsx        # Maps embed + iletişim
│   ├── Footer.tsx          # Telif + sosyal
│   ├── SectionHeading.tsx  # Ortak bölüm başlığı
│   └── LocalBusinessJsonLd.tsx  # schema.org structured data
├── data/
│   └── menu.ts             # MENÜYÜ BURADAN DÜZENLE
├── lib/
│   └── config.ts           # SİTE BİLGİLERİNİ BURADAN DÜZENLE
└── public/                 # Görselleri buraya koy (hero.jpg, gallery/*.jpg, og-image.jpg)
```

---

## 🚀 Lokalde Çalıştırma

```bash
# 1) Bağımlılıkları yükle
npm install

# 2) Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcıdan `http://localhost:3000` adresini aç.

Production build'i lokalde test etmek için:

```bash
npm run build
npm start
```

---

## ✏️ İçeriği Düzenleme

### Menüyü güncellemek
`data/menu.ts` dosyasını aç. Ürün eklemek için ilgili kategorinin
`items` dizisine bir satır ekle:

```ts
{ name: "Yeni Ürün", price: 150 }
// veya aralık için:
{ name: "Türk Kahvesi", price: "90 – 110" }
```

### İletişim bilgileri, adres, çalışma saatleri
`lib/config.ts` — tüm sabitler burada. Telefon, e-posta, adres, koordinat,
çalışma saatleri, sosyal medya linkleri tek yerden değiştirilir.

> ⚠️ `lib/config.ts` içindeki **TODO** ile işaretli alanları doldurmayı unutma:
> telefon, e-posta, adres, koordinatlar.

### Hakkımızda metni
`components/About.tsx` içindeki `<p>` bloklarını düzenle.

### Google Maps embed
`components/Location.tsx` içindeki `GOOGLE_MAPS_EMBED_URL` sabiti.
Google Maps'te işletmeni bul → **Paylaş** → **Haritayı yerleştir**
→ iframe'in `src="..."` URL'sini kopyalayıp oraya yapıştır.

### Görseller
- **Hero arka planı:** `public/hero.jpg` (önerilen 1920×1080, koyu/atmosferik)
- **Galeri:** `public/gallery/01.jpg` … `06.jpg` (önerilen 1200×900)
- **Open Graph (paylaşım önizlemesi):** `public/og-image.jpg` (1200×630)
- **Favicon:** `public/favicon.ico`
- **Apple touch icon:** `public/apple-touch-icon.png` (180×180)

Görsel yokken sayfa kırılmaz — placeholder'lar gözükür.

---

## 🔍 SEO Kontrol Listesi

✅ Sayfa başında kapsamlı `metadata` (title, description, OG, Twitter card)
✅ `app/sitemap.ts` ve `app/robots.ts` ile otomatik sitemap & robots
✅ `LocalBusiness` (`CafeOrCoffeeShop`) JSON-LD — `components/LocalBusinessJsonLd.tsx`
✅ Semantik HTML (`header`, `main`, `section`, `footer`, `address`, `nav`)
✅ `<html lang="tr">`
✅ Tüm görsellerde anlamlı `alt` metni

**Deploy sonrası mutlaka:**
1. `https://search.google.com/test/rich-results` — URL'yi gir, `LocalBusiness` çıkmalı.
2. [Google Search Console](https://search.google.com/search-console)'a siteyi ekle, sitemap'i gönder.
3. [Google Business Profile](https://business.google.com)'da işletmeyi oluştur/talep et — site burayla eşleşince yerel SEO çok güçlenir.

---

## ☁️ Vercel'e Deploy

### Yöntem 1: Git üzerinden (önerilen)
1. Bu klasörü bir GitHub reposuna pushla:
   ```bash
   git init
   git add .
   git commit -m "İlk commit: OZ Coffee Shelter sitesi"
   git branch -M main
   git remote add origin git@github.com:<KULLANICI>/ozcoffeeshelter-web.git
   git push -u origin main
   ```
2. [vercel.com](https://vercel.com) → **Add New → Project** → GitHub repon'u seç.
3. Framework otomatik **Next.js** algılanır. Hiçbir ayar değiştirmeden **Deploy**.
4. ~30 sn sonra `https://<proje>.vercel.app` adresinde yayında.

### Yöntem 2: CLI ile
```bash
npm i -g vercel
vercel        # ilk seferde kurulum soruları
vercel --prod # production deploy
```

### Özel alan adı (ozcoffeeshelter.com)
1. Vercel projesinde **Settings → Domains → Add**
2. Alan adını gir, Vercel sana DNS kayıtlarını söyler
3. Alan adı sağlayıcında (GoDaddy / Nic.tr / Namecheap) bu kayıtları ekle
4. SSL otomatik gelir, ~10 dk içinde aktif
5. `lib/config.ts` içindeki `url` alanını gerçek alan adına güncelle, tekrar deploy et

---

## 🧪 İçerik tamamlandığında yapılacaklar listesi

- [ ] `lib/config.ts`'deki TODO'lar (telefon, e-posta, adres, koordinatlar)
- [ ] `components/About.tsx` — gerçek hakkımızda metni
- [ ] `components/Location.tsx` — `GOOGLE_MAPS_EMBED_URL` (gerçek embed)
- [ ] `public/hero.jpg` — hero arka plan görseli
- [ ] `public/gallery/01–06.jpg` — galeri görselleri
- [ ] `public/og-image.jpg` — sosyal medya paylaşım görseli
- [ ] `public/favicon.ico` + `public/apple-touch-icon.png`
- [ ] Deploy sonrası: Google Search Console + Google Business Profile

---

İyi kahveler ☕
