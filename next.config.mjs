import { fileURLToPath } from 'node:url';

import withPWAInit from "@ducanh2912/next-pwa";
import createJiti from 'jiti';

const jiti = createJiti(fileURLToPath(import.meta.url));
jiti('./src/env.ts');

const withPWA = withPWAInit({
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  dest: '/public'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'top-right',
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
};

export default withPWA(nextConfig);
