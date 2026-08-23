import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow images from any HTTP origin (media service URLs, Supabase storage)
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
