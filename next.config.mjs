/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ctynpdfxwgnbhacspgsh.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'thumbnail.komiku.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.komiku.org',
        port: '',
        pathname: '/**',
      },
    ],
    // Optimize image formats and quality
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons'],
  },
  // Optimize for Vercel deployment
  output: 'standalone',
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
}

export default nextConfig
