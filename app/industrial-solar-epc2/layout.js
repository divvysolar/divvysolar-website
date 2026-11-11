export const metadata = {
    title: 'Industrial Rooftop Solar EPC | Cut Factory Power Cost to ₹3.50/Unit | Divvy Solar',
    description: 'Turnkey industrial rooftop solar EPC for factories with 40% accelerated depreciation, non-penetrating roof mounting, and DG-PV synchronisation across North India.',
    robots: {
        index: false,
        follow: false,
        nocache: true,
        noarchive: true,
    },
};

export default function IndustrialSolarEpc2Layout({ children }) {
    return (
        <div
            className="antialiased"
            style={{
                '--font-space-grotesk': "'Space Grotesk', sans-serif",
                '--font-inter': "'Inter', sans-serif",
            }}
        >
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap');`}</style>
            {children}
        </div>
    );
}

