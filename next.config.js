/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: 'http://127.0.0.1:8000/api/v1',
    ENV: 'development',
    ACCESS_TOKEN_EXPIRATION_TIME: '86400000',
    TIME_BUFFER: '300000',
  },
};

module.exports = nextConfig;
