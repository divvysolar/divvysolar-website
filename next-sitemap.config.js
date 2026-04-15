/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://divvysolar.in',
    generateRobotsTxt: true,
    changefreq: 'weekly',
    priority: 0.7,
    sitemapSize: 5000,
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
            { loc: '/blogs', changefreq: 'weekly', priority: 0.8 },
            { loc: '/contact', changefreq: 'monthly', priority: 0.8 },
        ]
    },
}
