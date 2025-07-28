/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['ctynpdfxwgnbhacspgsh.supabase.co', 'thumbnail.komiku.org'],
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
    ],
  },
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons'],
  },
  // Optimize for Vercel deployment
  output: 'standalone',
}

export default nextConfig
