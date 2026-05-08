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

            {/* Removed Visit Our HQ Section */}
        </div>
    );
}
