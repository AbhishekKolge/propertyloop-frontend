/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: 'https://propertyloop-server.onrender.com/api/v1',
    ENV: 'production',
    ACCESS_TOKEN_EXPIRATION_TIME: '3600000',
    TIME_BUFFER: '300000',
    TENANT_EMAIL: 'test-tenant@gmail.com',
    LANDLORD_EMAIL: 'test-landlord@gmail.com',
    TENANT_PASSWORD: 'Test@123',
    LANDLORD_PASSWORD: 'Test@123',
  },
};

module.exports = nextConfig;
