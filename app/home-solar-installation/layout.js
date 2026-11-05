export const metadata = {
    title: 'Home Rooftop Solar Installation & PM Surya Ghar Subsidy | Divvy Solar',
    description: "Get turnkey home rooftop solar installation with PM Surya Ghar subsidy up to ₹78,000, 25-yr warranty, and DISCOM net-metering across Haryana, Punjab & Delhi NCR. Free physical site survey.",
    keywords: [
        'Home Rooftop Solar Installation',
        'PM Surya Ghar Muft Bijli Yojana',
        'residential rooftop solar subsidy Haryana Punjab Delhi NCR',
        'home solar panels installation cost',
        'rooftop solar subsidy eligibility 2026',
        'net metering solar home',
        'Divvy Solar residential EPC'
    ],
    openGraph: {
        title: 'Home Rooftop Solar Installation & PM Surya Ghar Subsidy | Divvy Solar',
        description: "Zero electricity bill + direct government subsidy up to ₹78,000 credited to bank. 25-year warranty, Tier-1 ALMM panels.",
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
    return <>{children}</>;
}
