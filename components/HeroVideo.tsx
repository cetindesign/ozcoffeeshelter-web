"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * HeroVideo — Hero arka planı için akıcı, atmosferik video oynatıcı.
 *
 * Tasarım kararları:
 *  - autoplay + muted + loop + playsInline → iOS dahil her yerde autoplay
 *  - preload="metadata" → ilk paint hızlı, video arkada yüklenir
 *  - Tek source URL — `<source media>` HTML video'da deprecate, browser'lar
 *    yoksaydığı için bant genişliği seçimini JS'le viewport'a göre yapıyoruz
 *  - Video HER ZAMAN DOM'a girer (SSR dahil) → ilk paint'te zaten var
 *  - prefers-reduced-motion → useEffect ile pause + autoplay attribute kaldır
 *  - Save-Data → video pause edilir (data tasarrufu)
 *  - Decode/network hatası → video gizlenir, altta poster/gradient kalır
 *
 * ===== KENDİ VİDEONU EKLEMEK =====
 *   1) public/hero/ klasörüne hero.mp4 (1080p) ve hero-720.mp4 (720p) koy
 *   2) Aşağıdaki DEFAULT_SOURCES'i şununla değiştir:
 *        { src: "/hero/hero.mp4", mobileSrc: "/hero/hero-720.mp4" }
 *   3) Poster için: public/hero/poster.jpg (1920x1080 JPG, video'nun bir frame'i)
 *
 * Şu an varsayılan: Mixkit'ten ücretsiz "filling a white cup of coffee" videosu.
 */

type VideoSource = {
  /** Desktop kaynak (genellikle 1080p) */
  src: string;
  /** Mobile kaynak (genellikle 720p, ~3 MB) — yoksa src kullanılır */
  mobileSrc?: string;
  type?: string;
};

// Mixkit ID 41858 — "Close up view, serving a sparkling cappuccino"
// Barista kremalı cappuccino'yu fincana boşaltıyor, parlak yüzey, yakın çekim.
// CC0 lisanslı, atfı isteğe bağlı. https://mixkit.co/free-stock-video/close-up-view-serving-a-sparkling-cappuccino-41858/
//
// Diğer aday ID'ler (denemek istersen src/mobileSrc içindeki sayıları değiştir):
//   41865 — espresso makinesinden bardağa kahve doluyor
//   43941 — bir bardağa kahve dökme (sade)
//   4989  — kahve hazırlama süreci montajı (dinamik)
//   236   — beyaz fincana kahve doldurma
const DEFAULT_SOURCE: VideoSource = {
  src: "https://assets.mixkit.co/videos/41858/41858-1080.mp4",
  mobileSrc: "https://assets.mixkit.co/videos/41858/41858-720.mp4",
  type: "video/mp4",
};

type Props = {
  source?: VideoSource;
  /** Poster görseli (video yüklenirken / hata durumunda gözükür) */
  poster?: string;
  className?: string;
};

export function HeroVideo({
  source = DEFAULT_SOURCE,
  poster,
  className = "",
}: Props) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  // Viewport-bağlı kaynak seçimi sadece client'ta belirlenebileceği için
  // SSR'da daima `src` (1080p) ile render ediyoruz, mount sonrası gerekirse swap.
  const [resolvedSrc, setResolvedSrc] = useState(source.src);

  // Mount sonrası: viewport dar ise mobile kaynağa geç, motion azaltma/save-data
  // istekleri varsa video'yu duraklat.
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Mobile breakpoint: viewport < 768px → 720p source (varsa)
    if (source.mobileSrc && window.innerWidth < 768) {
      setResolvedSrc(source.mobileSrc);
    }

    const video = videoRef.current;
    if (!video) return;

    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    const shouldPause = !!reduce || !!conn?.saveData;

    if (shouldPause) {
      video.pause();
      video.removeAttribute("autoplay");
    }
  }, [reduce, source.mobileSrc]);

  if (hasError) {
    // Video tamamen başarısız: poster varsa onu, yoksa hiçbir şey gösterme
    return poster ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        className={`hero-video ${className}`}
      />
    ) : null;
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      onError={() => setHasError(true)}
      aria-hidden="true"
      className={`hero-video ${className}`}
      // key ile resolvedSrc değiştiğinde video element'i yeniden yükle
      key={resolvedSrc}
    >
      <source src={resolvedSrc} type={source.type ?? "video/mp4"} />
    </video>
  );
}
