import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Separate build directories for dev/prod (faster dev rebuilds)
  distDir: process.env.NODE_ENV === "production" ? ".next" : ".next-dev",

  // Performance optimizations
  compress: true,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    minimumCacheTTL: 60,
  },

  // Module optimization
  modularizeImports: {
    "lucide-react": {
      transform: "lucide-react/dist/esm/icons/{{kebabCase member}}",
    },
  },
};

export default nextConfig;
