/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://divvysolar.in',
    generateRobotsTxt: true,
    changefreq: 'weekly',
    priority: 0.7,
    sitemapSize: 7000,
    generateIndexSitemap: false,
    exclude: ['/admin', '/admin/*', '/api/*'],
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/' },
            { userAgent: '*', disallow: ['/admin', '/api'] },
        ],
    },
    additionalPaths: async (config) => {
        return [
            { loc: '/', changefreq: 'daily', priority: 1.0 },
            { loc: '/about', changefreq: 'monthly', priority: 0.8 },
            { loc: '/services/residential', changefreq: 'weekly', priority: 0.9 },
            { loc: '/services/industrial', changefreq: 'weekly', priority: 0.9 },
            { loc: '/services/utility-scale', changefreq: 'weekly', priority: 0.9 },
            { loc: '/projects', changefreq: 'weekly', priority: 0.8 },
            { loc: '/projects/haryana', changefreq: 'weekly', priority: 0.8 },
            { loc: '/projects/punjab', changefreq: 'weekly', priority: 0.8 },
            { loc: '/blogs', changefreq: 'weekly', priority: 0.8 },
            { loc: '/blogs/solar-potential-in-india-2025-key-trends-insights', changefreq: 'weekly', priority: 0.7 },
            { loc: '/blogs/solar-power-is-the-future-2025', changefreq: 'weekly', priority: 0.7 },
            { loc: '/blogs/epc-solutions-in-solar-energy-2025', changefreq: 'weekly', priority: 0.7 },
            { loc: '/contact', changefreq: 'monthly', priority: 0.8 },
            { loc: '/careers', changefreq: 'weekly', priority: 0.7 },
            { loc: '/careers/people-stories', changefreq: 'weekly', priority: 0.7 },
            { loc: '/calculator', changefreq: 'weekly', priority: 0.7 },
            { loc: '/sustainability-calculator', changefreq: 'weekly', priority: 0.7 },
        ]
    },
}