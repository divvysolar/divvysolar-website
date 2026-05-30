import { Inter } from 'next/font/google';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import WhatsAppButton from '@/components/common/WhatsAppButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    metadataBase: new URL('https://divvysolar.in'),
    title: {
        template: '%s | Divvy Solar',
        default: 'Divvy Solar | Trusted Solar Panel Installation Company',
    },
    description: 'Divvy Solar provides reliable solar panel installation for homes, industries, and large-scale projects across India. Premium EPC solutions since 2018.',
    keywords: [
        'solar panels',
        'solar installation',
        'EPC solar',
        'residential solar',
        'industrial solar',
        'India renewable energy',
        'Divvy Solar',
        'solar EPC India',
        'Haryana solar',
        'Punjab solar',
    ],
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true },
    },
    openGraph: {
        title: 'Divvy Solar | Premium EPC Solutions',
        description: 'Trusted solar panel installation for homes and industries across India.',
        url: 'https://divvysolar.in',
        siteName: 'Divvy Solar',
        images: [
            {
                url: '/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Divvy Solar Energy Solutions',
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Divvy Solar | Solar EPC Solutions India',
        description: 'Premium Solar EPC Solutions for homes and industries across India.',
        images: ['/images/og-image.jpg'],
    },
};

// ✅ JSON-LD Schema — Google ko structured data milega ab
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Divvy Solar Power & Solutions Pvt. Ltd.',
    url: 'https://divvysolar.in',
    logo: 'https://divvysolar.in/divvy_photo.png',
    image: 'https://divvysolar.in/images/og-image.jpg',
    description: "India's trusted solar EPC company providing residential, industrial, and utility-scale solar solutions since 2018.",
    telephone: '+919254986321',
    email: 'info@divvysolar.in',
    foundingDate: '2018',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'Lower Ground, SJ Tower, Sector-13, Dabra Road',
        addressLocality: 'Hisar',
        addressRegion: 'Haryana',
        postalCode: '125001',
        addressCountry: 'IN',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: 29.1492,
        longitude: 75.7217,
    },
    openingHours: 'Mo-Sa 10:00-17:00',
    priceRange: '₹₹',
    sameAs: [
        'https://www.facebook.com/divvysolar',
        'https://www.instagram.com/divvysolar',
        'https://www.linkedin.com/company/divvy-solar-power-solutions-pvt-ltd/',
    ],
    areaServed: [
        'Haryana',
        'Punjab',
        'Chandigarh',
        'Delhi',
        'Rajasthan',
        'Uttar Pradesh',
    ],
    serviceType: [
        'Residential Solar Installation',
        'Industrial Solar EPC',
        'Utility-Scale Solar Projects',
    ],
};

export default function MainLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            {/* ✅ JSON-LD inject — Google structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />
            <main className="flex-grow overflow-x-clip w-full max-w-[100vw]">
                {children}
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    );
}