import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/components/common/AuthProvider';
import SolarLadderWidget from '@/components/common/SolarLadderWidget';

import StructuredData from '@/components/common/StructuredData';

const inter = Inter({ 
    subsets: ['latin'],
    display: 'swap',
});

import PropTypes from 'prop-types';

export const metadata = {
    metadataBase: new URL('https://divvysolar.in'),
    title: {
        template: '%s | Divvy Solar',
        default: 'Divvy Solar | Trusted Solar Panel Installation Company',
    },
    description: 'Divvy Solar provides reliable solar panel installation for homes, industries, and large-scale projects across India. Premium EPC solutions since 2018.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="scroll-smooth" suppressHydrationWarning>
            <body className={`${inter.className} min-h-screen flex flex-col`}>
                <StructuredData />
                <AuthProvider>
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
