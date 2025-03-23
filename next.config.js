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
            value: 'public, max-age=31536000, immutable',
          }
        ],
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
  // Asegurarse de que la aplicación funcione correctamente en Vercel
  output: 'standalone',
  // Habilitar compresión estática para mejorar rendimiento
  compress: true,
  // Configuración para manejar correctamente las rutas dinámicas
  experimental: {
    scrollRestoration: true
  },
  // Configuración para servir correctamente archivos estáticos
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : undefined,
  basePath: '',
  distDir: '.next'
};

module.exports = nextConfig;
