"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { menu, formatPrice, type MenuItem, type MenuCategory } from "@/data/menu";
import { sectionIds } from "@/lib/config";
import { EASE_OUT_EXPO } from "./Reveal";

/**
 * Menü — bütün bölümün yıldızı.
 *
 * Düzen:
 *  - Üstte yatay kategori tab nav (sticky değil, scrollable mobile'da)
 *  - Seçili kategori altında foto kartlar grid (responsive 2/3/4 kolon)
 *  - "Ekstralar" gibi layout: "list" olan kategoriler kartsız, sade liste
 *  - Kategori değişiminde fade + slight slide ile transition
 *
 * Foto kartları:
 *  - Kare/dikdörtgen görsel + alttan ad/fiyat
 *  - Hover'da hafif lift + üstte altın çerçeve
 *  - Görsel yüklenirken yumuşak blur placeholder
 */
export function Menu() {
  const [activeId, setActiveId] = useState<string>(menu[0].id);
  const activeCategory = menu.find((c) => c.id === activeId) ?? menu[0];

  return (
    <section
      id={sectionIds.menu}
      aria-labelledby="menu-title"
      className="relative py-24 sm:py-32 bg-cream text-ink overflow-hidden"
    >
      {/* Üst hafif bezeme — koyu marquee ile cream geçişinin yumuşaması */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink/[0.04] to-transparent" />

      <div className="container relative">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm tracking-[0.5em] uppercase text-gold mb-4">
            Menü
          </p>
          <h2
            id="menu-title"
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight"
          >
            Bardakta ne var?
          </h2>
          <p className="mt-5 text-ink/60 max-w-xl mx-auto font-sans">
            Klasiklerden imza tariflere; her bardak özenle, sabırla.
          </p>
        </div>

        {/* --- Kategori tab nav --- */}
        <nav
          aria-label="Menü kategorileri"
          className="flex justify-start sm:justify-center -mx-4 px-4 sm:mx-0 sm:px-0 mb-10 sm:mb-14 overflow-x-auto scrollbar-hide"
        >
          <ul className="flex items-center gap-1 sm:gap-2 mx-auto">
            {menu.map((cat) => {
              const active = cat.id === activeId;
              return (
                <li key={cat.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveId(cat.id)}
                    className={`relative px-4 sm:px-5 py-2 text-sm sm:text-[15px] rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${
                      active
                        ? "text-cream"
                        : "text-ink/60 hover:text-ink"
                    }`}
                  >
                    {/* Aktif tab arkaplanı, layoutId ile yumuşak kayar.
                        NOT: Negatif z-index kullanma — transparan button içinde
                        pill arkaya düşer ve cream zemin gözükür (pill yok gibi olur).
                        DOM sırası zaten pill'i text'in arkasına paint eder. */}
                    {active && (
                      <motion.span
                        layoutId="active-cat-pill"
                        className="absolute inset-0 bg-ink rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{cat.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* --- Aktif kategori içeriği --- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
          >
            {activeCategory.layout === "list" ? (
              <ListLayout category={activeCategory} />
            ) : (
              <CardLayout category={activeCategory} />
            )}
          </motion.div>
        </AnimatePresence>

        <p className="text-center text-ink/40 text-xs mt-14 font-sans">
          Fiyatlarımız ve menümüz mevsime göre güncellenebilir.
        </p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
//  Kart layout — foto + ad + fiyat (varsayılan)
// ---------------------------------------------------------------------------
function CardLayout({ category }: { category: MenuCategory }) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {category.items.map((item, i) => (
        <MenuCard key={item.name} item={item} index={i} />
      ))}
    </ul>
  );
}

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: EASE_OUT_EXPO,
      }}
      whileHover={{ y: -4 }}
      className="group relative"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-ink/5 ring-1 ring-ink/5 group-hover:ring-gold/60 transition-all duration-500">
        {item.image ? (
          <Image
            src={item.image}
            alt={`${item.name} — OZ Coffee Shelter`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ink to-[#3a2c1f]">
            <span className="text-gold/40 font-serif text-3xl">OZ</span>
          </div>
        )}

        {/* Alt gradient — fiyatın okunabilmesi için */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/60 to-transparent" />

        {/* Fiyat rozeti — sağ üstte */}
        <div className="absolute top-3 right-3 bg-cream/95 text-ink text-xs sm:text-sm font-medium px-2.5 py-1 rounded-full tabular-nums shadow-sm">
          {formatPrice(item.price)}
        </div>

        {/* Ad + opsiyonel not — altta */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-cream">
          <h3 className="font-serif text-lg sm:text-xl leading-tight">
            {item.name}
          </h3>
          {item.note && (
            <p className="text-cream/75 text-xs sm:text-sm mt-1.5 leading-snug font-sans line-clamp-2">
              {item.note}
            </p>
          )}
        </div>
      </div>
    </motion.li>
  );
}

// ---------------------------------------------------------------------------
//  Liste layout — Ekstralar gibi sade kategoriler için
// ---------------------------------------------------------------------------
function ListLayout({ category }: { category: MenuCategory }) {
  return (
    <ul className="max-w-xl mx-auto space-y-3">
      {category.items.map((item, i) => (
        <motion.li
          key={item.name}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          className="flex items-baseline gap-3 border-b border-ink/10 pb-3"
        >
          <span className="text-ink text-base sm:text-lg">{item.name}</span>
          <span className="dot-leader flex-1 self-end mb-[6px] h-px text-ink" />
          <span className="text-gold font-medium tabular-nums">
            {formatPrice(item.price)}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}
