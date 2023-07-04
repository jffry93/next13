/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.tmdb.org'],
  },
  env: {
    LOCAL: process.env.LOCAL,
    TINY_MCE_API_KEY: process.env.TINY_MCE_API_KEY,
  },
};

module.exports = nextConfig;
