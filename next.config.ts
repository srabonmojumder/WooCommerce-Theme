import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'your-woocommerce-domain.com'],
    unoptimized: true, // For static export compatibility
  },
  // Enable static export for easier deployment
  output: 'export',
  trailingSlash: true,
  // Turbopack configuration
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
