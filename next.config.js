/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['assist-software.net','i.imgur.com'],
  },
};

module.exports = nextConfig;
