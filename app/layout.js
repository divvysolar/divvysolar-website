import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/components/common/AuthProvider';
import SolarLadderWidget from '@/components/common/SolarLadderWidget';
import StructuredData from '@/components/common/StructuredData';
import FacebookPixel from '@/components/common/FacebookPixel';
import { Suspense } from 'react';
import PropTypes from 'prop-types';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
});

export const metadata = {
    metadataBase: new URL('https://divvysolar.in'),
    title: {
        template: '%s',
        default: 'Divvy Solar | Solar Solutions for Haryana, Punjab & Delhi NCR',
    },
    description: 'Top-rated solar EPC company in Punjab, Haryana & Delhi NCR. Rooftop, industrial & commercial solar installations. 1000+ projects completed. Get a free site survey.',
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="scroll-smooth" suppressHydrationWarning>
            <head>
                <link
                    rel="preload"
                    href="/hero-main-page.webp"
                    as="image"
                    type="image/webp"
                />
            </head>
            <body className={`${inter.className} min-h-screen flex flex-col overflow-x-hidden`}>
                <StructuredData />
                <AuthProvider>
                    <Suspense fallback={null}>
                        <FacebookPixel />
                    </Suspense>
                    {children}
                </AuthProvider>
                <SolarLadderWidget />
            </body>
        </html>
    );
}

RootLayout.propTypes = {
    children: PropTypes.node.isRequired,
};