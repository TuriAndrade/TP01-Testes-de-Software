/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_URL: "http://localhost:3000",
    NEXT_PRIVATE_API_URL: "http://localhost:3030",
  },
};

module.exports = nextConfig;
