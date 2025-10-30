import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Separate build directories for dev/prod (faster dev rebuilds)
  distDir: process.env.NODE_ENV === "production" ? ".next" : ".next-dev",

  // Performance optimizations
  compress: true,

  // Redirects for old React course routes
  async redirects() {
    return [
      {
        source: "/react-course",
        destination: "/courses/react",
        permanent: true,
      },
      {
        source: "/react-course/lesson",
        destination: "/courses/react",
        permanent: true,
      },
    ];
  },

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

  // ESLint configuration
  eslint: {
    // Ignore ESLint during builds (we rely on TypeScript for type safety)
    ignoreDuringBuilds: true,
  },

  typescript: {
    // Show TypeScript errors during build
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
