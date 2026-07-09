import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co", // Spotify cover art CDN
      },
      {
        protocol: "https",
        hostname: "*.supabase.co", // Supabase Storage cover uploads
      },
      {
        protocol: "https",
        hostname: "placehold.co", // fallback placeholder covers
      },
    ],
  },
};

export default nextConfig;
