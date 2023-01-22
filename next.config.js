/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['assist-software.net', 'i.imgur.com'],
  },
  env: {
    JWT_SECRET_TOKEN: process.env.JWT_SECRET_TOKEN,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET,
  },
};

module.exports = nextConfig;
