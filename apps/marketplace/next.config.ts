import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Marketplace subdomain configuration
  reactStrictMode: true,

  // Allow images from various sources
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.leverage.com',
      },
    ],
  },

  // Environment variables for marketplace
  env: {
    NEXT_PUBLIC_SITE_NAME: 'LEVERAGE Marketplace',
    NEXT_PUBLIC_SITE_URL: process.env.MARKETPLACE_URL || 'https://marketplace.leverage.com',
  },
};

export default nextConfig;
