/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Menü görselleri Unsplash CDN'inden geliyor — kendi fotoğraflarınla
    // değiştirince bu allowlist olduğu gibi kalabilir, sorun olmaz.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
