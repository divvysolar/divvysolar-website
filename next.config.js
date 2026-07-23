/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false, // ✅ ADD KARO - /about/ → /about
  compress: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
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
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/favicon.ico',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, immutable' }],
      },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }],
      },
      {
        source: '/sales/pricing',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // ✅ ADD KARO - Trailing slash redirects
      { source: '/about/', destination: '/about', permanent: true },
      { source: '/contact/', destination: '/contact', permanent: true },
      { source: '/services/', destination: '/services', permanent: true },
      { source: '/services/residential/', destination: '/services/residential', permanent: true },
      { source: '/services/industrial/', destination: '/services/industrial', permanent: true },
      { source: '/services/utility-scale/', destination: '/services/utility-scale', permanent: true },
      { source: '/projects/', destination: '/projects', permanent: true },
      { source: '/blogs/', destination: '/blogs', permanent: true },

      // Tera existing redirects
      {
        source: '/haryana_industrial',
        destination: '/haryana-industrial',
        permanent: true,
      },
      {
        source: '/punjab_industrial',
        destination: '/punjab-industrial',
        permanent: true,
      },
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