import { Space_Grotesk, Inter } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['500', '600', '700'],
    variable: '--font-space-grotesk',
    display: 'swap',
});

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-inter',
    display: 'swap',
});

export const metadata = {
    title: 'Cut Factory Power Cost to ₹3.50/Unit | Divvy Solar Industrial EPC',
    description: 'Turnkey rooftop solar for factories with 40% accelerated depreciation, non-penetrating roof mounting and DG-PV synchronisation.',
    robots: {
        index: false,
        follow: false,
        nocache: true,
        noarchive: true
    }
};

export default function IndustrialSolarLayout({ children }) {
    return (
        <div className={`${spaceGrotesk.variable} ${inter.variable} font-inter antialiased`}>
            {children}
        </div>
    );
}
