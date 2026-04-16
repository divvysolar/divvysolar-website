import PageHero from '@/components/common/PageHero';
import ContactForm from '@/components/contact/ContactForm';
import ConsultationInfo from '@/components/contact/ConsultationInfo';

export const metadata = {
    title: 'Contact Us | Divvy Solar - Consultation & Support',
    description: 'Connect with our solar experts for a professional consultation. We provide seamless EPC solutions including Residential, Industrial, and Utility scale solar across North India.',
    alternates: { canonical: 'https://divvysolar.in/contact' },
};

export default function ContactPage() {
    return (
        <div className="bg-white">
            <PageHero 
                title="Contact Us" 
                breadcrumb="Get in Touch" 
                backgroundImage="/contact us banner.jpeg"
            />
            
            <section className="py-12 md:py-20 relative overflow-hidden bg-white z-20">
                {/* Background Accents - Light & Dynamic */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gray-50/50 -skew-y-2 origin-top-left -z-10"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] -z-10"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
                        {/* Consultation Info - Left Side (More Compact) */}
                        <div className="lg:col-span-5 animate-in slide-in-from-left duration-700">
                            <ConsultationInfo />
                        </div>

                        {/* Form - Right Side (More Professional) */}
                        <div className="lg:col-span-7 animate-in slide-in-from-right duration-700">
                            <ContactForm defaultService="Residential" />
                        </div>

                    </div>
                </div>
            </section>

            {/* Structured Maps/CTA Section */}
            <section className="py-12 pb-32 bg-gray-50 border-y border-gray-100">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-xl md:text-2xl font-black text-primary mb-4 uppercase tracking-tighter">Visit Our HQ</h2>
                    <p className="text-gray-700 text-sm mb-6 max-w-xl mx-auto font-medium">Lower Ground, SJ Tower, Near Community Centre, Sector-13, Hisar, Haryana-125001</p>
                    <a
                        href="https://maps.app.goo.gl/YdQvZ4XaNH6iUFii6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/10 active:scale-95"
                    >
                        Open in Google Maps
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </a>
                </div>
            </section>
        </div>
    );
}
