import type { NextConfig } from 'next';
const path = require('path');

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [],
  },
  env: {
    POSTHOG_KEY: process.env.POSTHOG_KEY,
    POSTHOG_HOST: process.env.POSTHOG_HOST,
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

export default nextConfig;
