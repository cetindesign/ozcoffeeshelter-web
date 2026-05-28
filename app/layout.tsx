import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import { LocalBusinessJsonLd } from "@/components/LocalBusinessJsonLd";

// Türkçe karakter desteği için latin-ext subset.
// CSS değişkenleri Tailwind config'inde fontFamily.serif/sans'a bağlanıyor.
const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "600", "700"],
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

// --- SEO metadata ---
// metadataBase, OG/Twitter görsel URL'lerinin mutlak URL'e çevrilmesi için kritik.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        // public/og-image.jpg dosyasını sonra ekleyeceksin (1200x630 önerilir).
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — butik kahveci`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    // public/ altına favicon.ico ve apple-touch-icon.png koyduğunda otomatik kullanılır.
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  category: "food & drink",
};

export const viewport: Viewport = {
  // Palet ile aynı (ink): mobile browser chrome bar'ı bu renkle boyanır
  themeColor: "#13100c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {/*
         * Preconnect: video ve menü görselleri 3rd-party CDN'lerden geliyor.
         * Tarayıcı sayfayı parse ederken DNS + TCP + TLS handshake'i paralelde
         * tamamlar, böylece ilk byte gecikmesi azalır.
         */}
        <link rel="preconnect" href="https://assets.mixkit.co" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google.com" />
      </head>
      <body className="font-sans">
        {/* LocalBusiness structured data — Google'ın işletmeyi tanıması için kritik */}
        <LocalBusinessJsonLd />
        {/* Film grain overlay — bütün sayfanın üstünde ince noise (premium his) */}
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
