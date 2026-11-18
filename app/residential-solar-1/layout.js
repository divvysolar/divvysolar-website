export const metadata = {
    title: 'Home Rooftop Solar & PM Surya Ghar Subsidy | Divvy Solar',
    description: 'Get up to ₹78,000 PM Surya Ghar DBT subsidy on home rooftop solar installation. 6.5ft elevated structure, 25-yr warranty, and turnkey net-metering across Haryana, Punjab & Delhi NCR.',
    robots: {
        index: false,
        follow: false,
        nocache: true,
        noarchive: true,
    },
};

export default function ResidentialSolar1Layout({ children }) {
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
