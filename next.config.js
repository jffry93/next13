/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.tmdb.org'],
  },
  env: {
    LOCAL: process.env.LOCAL,
  },
};

module.exports = nextConfig;
