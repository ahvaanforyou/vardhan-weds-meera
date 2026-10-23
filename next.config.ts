import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    localPatterns: [
      { pathname: "/images/bride.jpeg", search: "?v=30ebd56f1c04" },
      { pathname: "/images/groom.jpeg", search: "?v=040600e29711" },
      { pathname: "/images/**", search: "" },
    ],
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
