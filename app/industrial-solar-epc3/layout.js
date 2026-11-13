export const metadata = {
    title: 'Discover Clean Industrial Solar Solutions | Divvy Solar EPC',
    description: 'Turnkey industrial rooftop solar EPC for factories and warehouses with 40% accelerated depreciation, non-penetrating PEB clamping, and DG-PV synchronisation.',
    robots: {
        index: false,
        follow: false,
        nocache: true,
        noarchive: true,
    },
};

export default function IndustrialSolarEpc3Layout({ children }) {
    return (
        <div
            className="antialiased"
            style={{
                '--font-space-grotesk': "'Space Grotesk', sans-serif",
                '--font-inter': "'Inter', sans-serif",
            }}
        >
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');`}</style>
            {children}
        </div>
    );
}

