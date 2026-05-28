import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- Marka paleti (espresso roast tonları) ---
        // Saf siyah/beyaz yerine kahve dünyasının kendi renkleri:
        //   ink   → derin espresso (hafif kahverengi alt ton, premium his)
        //   gold  → şampanya altını (sıcak, mat, lüks aksanlık)
        //   cream → kemik/kağıt rengi (sıcak, organik)
        //   rich  → koyu kakao (hover/accent için derin vurgu)
        ink: "#13100c",
        gold: "#cba36a",
        cream: "#efe7d5",
        rich: "#5a3a25",
      },
      fontFamily: {
        // CSS değişkenleri layout.tsx içinde next/font ile bağlanıyor.
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
        },
      },
    },
  },
  plugins: [],
};

export default config;
