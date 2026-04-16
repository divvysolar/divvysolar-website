import PageHero from '@/components/common/PageHero';
import ServiceCard from '@/components/services/ServiceCard';
import { HomeIcon, BuildingLibraryIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';

export const metadata = {
    title: 'Core Solutions',
    description: 'Explore Divvy Solar\'s comprehensive EPC solutions for Residential, Industrial, and Utility-Scale projects.',
};

export default function ServicesPage() {
    const services = [
        {
            title: "Residential Solar Solutions",
            description: "Switching to solar with Divvy Solar is simple, seamless, and tailored to your home's needs. Enjoy stress-free installation.",
            icon: <HomeIcon className="w-8 h-8" />,
            href: "/services/residential",
            delay: 0
        },
        {
            title: "Industrial Solar Solutions",
            description: "Seamless process designed for industrial-scale needs. From planning to execution, where India's Industry Turns for Solar Expertise.",
            icon: <BuildingOffice2Icon className="w-8 h-8" />,
            href: "/services/industrial",
            delay: 150
        },
        {
            title: "Utility Scale Solar Projects",
            description: "Scaling up solar with Divvy Solar is a structured and strategic process, built to deliver compliance-ready, bankable assets.",
            icon: <BuildingLibraryIcon className="w-8 h-8" />,
            href: "/services/utility-scale",
            delay: 300
        }
    ];

    return (
        <>
            <PageHero title="Core Solutions" />

            <section className="py-24 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-black text-primary mb-6">Expert Solar EPC Services</h2>
                        <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            We deliver end-to-end solar solutions to lower energy costs and carbon footprints. Our mission is to make clean energy simple, affordable, and accessible for all.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <ServiceCard key={index} {...service} />
                        ))}
                    </div>

                </div>
            </section>
        </>
    );
}
