/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/:path*`,
      },
    ];
  },
  // Configuración para permitir imágenes externas
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'source.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
    ],
  },
  // Configuración para manejar correctamente las rutas dinámicas
  experimental: {
    scrollRestoration: true
  }
};

module.exports = nextConfig;
