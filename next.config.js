/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: 'https://propertyloop-backend-production.up.railway.app/api/v1',
    ENV: 'production',
    ACCESS_TOKEN_EXPIRATION_TIME: '86400000',
    TIME_BUFFER: '300000',
  },
};

module.exports = nextConfig;
