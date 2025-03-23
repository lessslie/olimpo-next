/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3001/api',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL || 'http://localhost:3001/api'}/:path*`,
      },
    ];
  },
  // Configuración para evitar problemas con dependencias específicas de Windows
  webpack: (config, { isServer }) => {
    // Evitar incluir dependencias específicas de plataforma
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
      };
    }
    return config;
  },
  // Configuración para manejar correctamente las rutas en Vercel
  trailingSlash: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          }
        ],
      },
    ];
  },
};

module.exports = nextConfig;
