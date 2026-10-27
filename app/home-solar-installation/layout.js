export const metadata = {
    title: 'Home Rooftop Solar Installation & PM Surya Ghar Subsidy | Divvy Solar',
    description: "Find the right rooftop solar system for your home's electricity consumption, roof space and location. Get direct PM Surya Ghar subsidy up to ₹78,000, 25-yr warranty, and net-metering across Haryana, Punjab & Delhi NCR.",
    keywords: [
        'Home Rooftop Solar Installation',
        'PM Surya Ghar Muft Bijli Yojana',
        'residential solar rooftop Punjab Haryana Delhi NCR',
        'home solar panels quote',
        'rooftop solar subsidy eligibility',
        'net metering home solar installation',
        'Divvy Solar residential'
    ],
    openGraph: {
        title: 'Home Rooftop Solar Installation | Divvy Solar',
        description: "Find the right rooftop solar system for your home's electricity consumption, roof space and location. Get up to ₹78,000 subsidy & zero bill.",
        url: 'https://divvysolar.in/home-solar-installation',
        siteName: 'Divvy Solar',
        locale: 'en_IN',
        type: 'website',
        images: [
            {
                url: 'https://divvysolar.in/resi2main.webp',
                width: 1200,
                height: 630,
                alt: 'Divvy Solar Home Rooftop Solar Installation'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Home Rooftop Solar Installation | Divvy Solar',
        description: 'Zero electricity bill + PM Surya Ghar subsidy up to ₹78,000 in Haryana, Punjab & Delhi NCR.'
    },
    alternates: {
        canonical: 'https://divvysolar.in/home-solar-installation'
    }
};

export default function HomeSolarInstallationLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#fcfbfa] text-[#0f172a] antialiased selection:bg-[#fecb00] selection:text-[#0a1122]">
            {children}
        </div>
    );
}
