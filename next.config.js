/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  runtimeCaching,
  skipWaiting: true,
  register: true,
});

const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  env: {
    SECRET_KEY: process.env.CRYPTO_SECRET_KEY,
    SPONSOR_NUAR: process.env.SPONSOR_NUAR,
    SPONSOR_LA: process.env.SPONSOR_LA
  },
};

module.exports = withPWA(nextConfig);
