export default function StructuredData() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Divvy Solar Power & Solutions Pvt. Ltd.',
        url: 'https://divvysolar.in',
        logo: 'https://divvysolar.in/images/divvy solar.png',
        image: 'https://divvysolar.in/images/og-image.jpg',
        description: 'India\'s trusted solar EPC company providing residential, industrial, and utility-scale solar solutions since 2018.',
        telephone: '+917983890840',
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
        geo: { '@type': 'GeoCoordinates', latitude: 29.1492, longitude: 75.7217 },
        openingHours: 'Mo-Sa 10:00-17:00',
        priceRange: '₹₹',
        sameAs: [
            'https://www.facebook.com/divvysolar', 
            'https://www.instagram.com/divvysolar'
        ],
        areaServed: ['Haryana', 'Punjab', 'Chandigarh', 'Delhi', 'Rajasthan', 'Uttar Pradesh'],
        serviceType: ['Residential Solar Installation', 'Industrial Solar EPC', 'Utility-Scale Solar Projects'],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
