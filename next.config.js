/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/blogs/solar-power-is-the-future-2026',
        destination: '/blogs/solar-power-is-the-future-2025',
        permanent: true,
      },
      {
        source: '/blogs/solar-potential-in-india-2026-key-trends-insights',
        destination: '/blogs/solar-potential-in-india-2025-key-trends-insights',
        permanent: true,
      },
      {
        source: '/blogs/epc-solutions-in-solar-energy-2026',
        destination: '/blogs/epc-solutions-in-solar-energy-2025',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig