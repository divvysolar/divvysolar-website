export const metadata = {
    title: 'Architectural Home Solar & PM Surya Ghar Subsidy | Divvy Solar',
    description: 'Transform your home terrace into an elevated solar lounge with PM Surya Ghar subsidy up to ₹78,000, 25-yr warranty, and net-metering across Haryana, Punjab & Delhi NCR.',
    robots: {
        index: false,
        follow: false,
        nocache: true,
        noarchive: true,
    },
};

export default function ResidentialSolar2Layout({ children }) {
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
