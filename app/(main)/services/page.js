import PageHero from '@/components/common/PageHero';
import ServiceCard from '@/components/services/ServiceCard';
import { HomeIcon, BuildingLibraryIcon, BuildingOffice2Icon, ShieldCheckIcon, DocumentCheckIcon, CurrencyRupeeIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

export const metadata = {
    title: 'Solar EPC Services in India | Divvy Solar',
    description: 'Divvy Solar is India\'s premier turnkey solar EPC company. Explore our high-efficiency residential, industrial, and utility-scale solar solutions built since 2018.',
    keywords: ['solar epc services india', 'industrial solar rooftop', 'residential solar installation', 'commercial solar system', 'utility scale solar projects', 'Divvy Solar services'],
    alternates: { canonical: 'https://divvysolar.in/services' },
    openGraph: {
        title: 'Solar EPC Services in India | Divvy Solar',
        description: 'Complete turnkey solar EPC solutions for homes, factories, and utility projects. Sourcing Tier-1 components for maximum performance since 2018.',
        url: 'https://divvysolar.in/services',
    }
};

export default function ServicesPage() {
    const services = [
        {
            title: "Residential Solar Solutions",
            description: "Switching to solar with Divvy Solar is simple, seamless, and tailored to your home's energy footprint. Enjoy hassle-free rooftop solar installation, tier-1 premium panels, smart monitoring, and long-term utility savings.",
            icon: <HomeIcon className="w-8 h-8" />,
            href: "/services/residential",
            delay: 0
        },
        {
            title: "Industrial Solar Solutions",
            description: "Turn your biggest operating cost into a profit centre. We deliver end-to-end industrial solar EPC, handling site surveys, custom engineering, statutory approvals (CEIG/NOC), and grid-tied commissioning for warehouses and factories.",
            icon: <BuildingOffice2Icon className="w-8 h-8" />,
            href: "/services/industrial",
            delay: 150
        },
        {
            title: "Utility Scale Solar Projects",
            description: "Scaling up solar is a structured and highly strategic process. We specialize in compliance-ready, bankable utility solar assets. We cover power evacuation design, grid sync, and land-to-grid execution with precision.",
            icon: <BuildingLibraryIcon className="w-8 h-8" />,
            href: "/services/utility-scale",
            delay: 300
        }
    ];

    const stats = [
        { value: "1,000+", label: "Completed Projects", desc: "Successfully delivered across North India." },
        { value: "8+", label: "Years of Excellence", desc: "Powering solar innovations since 2018." },
        { value: "100%", label: "Approvals Handled", desc: "DISCOM NOCs, CEIG clearances, & Net Metering." }
    ];

    const processes = [
        {
            step: "01",
            title: "Load & Site Analysis",
            desc: "Our engineers run detailed load assessments, time-of-day tariff analyses, and shadow mapping to design a right-sized solar system optimized for your exact load profile."
        },
        {
            step: "02",
            title: "Tier-1 Sourcing & Engineering",
            desc: "We build systems using global Tier-1 components (such as Sungrow and Vikram Solar) for maximum output, structural reliability, and comprehensive warranty coverage."
        },
        {
            step: "03",
            title: "NOC & CEIG Clearances",
            desc: "We manage the entire paperwork chain, including DISCOM NOCs, safety certifications, CEIG clearances, and net-meter commissioning, so your system is legally compliant from day one."
        }
    ];

    const faqs = [
        {
            q: "How long does a typical industrial or commercial solar installation take?",
            a: "An industrial or commercial rooftop installation generally takes between 4 to 8 weeks. This timeline includes structural safety verification, physical installation, cabling, net-metering configuration, and getting the final DISCOM NOC / CEIG approvals."
        },
        {
            q: "What is the 40% Accelerated Depreciation tax benefit for businesses?",
            a: "Under Section 32 of the Indian Income Tax Act, commercial and industrial enterprises can claim up to 40% accelerated depreciation on solar assets in the very first year. This directly offsets taxable business income, reducing the net system cost by 20% to 25%."
        },
        {
            q: "How does net metering save money on holidays or Sundays?",
            a: "When your facility is closed or power consumption is low (like on Sundays), the solar energy generated is automatically exported to the grid. Your state DISCOM records these units and credits them back against your monthly electricity consumption bill."
        },
        {
            q: "What are the lifespans and warranties of the solar system components?",
            a: "Divvy Solar systems are engineered for 25+ years of service. Premium solar panels come with a 25-year performance warranty, while inverters typically include 5 to 10-year warranties with standard extensions. All installations include remote monitoring for proactive maintenance."
        }
    ];

    return (
        <main className="bg-white overflow-hidden">
            {/* Page Hero */}
            <PageHero title="Solar EPC Services in India" subtitle="Turnkey solar engineering, procurement, and construction solutions built to perform for homes, factories, and utility-scale projects." />

            {/* Statistics Banner */}
            <section className="bg-primary py-12 md:py-16 text-white relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-white/10">
                        {stats.map((stat, i) => (
                            <div key={i} className="md:px-8 pt-6 md:pt-0">
                                <div className="text-4xl md:text-5xl font-black text-[#fecb00] mb-2">{stat.value}</div>
                                <div className="text-lg font-bold mb-1">{stat.label}</div>
                                <p className="text-sm text-gray-300 font-light">{stat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Services Section */}
            <section className="py-20 md:py-24 bg-gray-50/50 scroll-mt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <span className="inline-block py-1 px-3 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold tracking-widest uppercase mb-3">
                            Core Solutions
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-primary mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                            Turnkey Solar EPC Solutions
                        </h2>
                        <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 leading-relaxed font-normal">
                            We deliver end-to-end solar solutions designed to lower energy costs, ensure environmental compliance, and maximize return on investment. Our promise is a smooth execution with transparent tracking.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <ServiceCard key={index} {...service} />
                        ))}
                    </div>
                </div>
            </section>

            {/* The Divvy EPC Advantage Section (Rich Content) */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-5">
                            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-3">
                                The Divvy Edge
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black text-primary mb-6 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                                Engineering-First Solar Delivery
                            </h2>
                            <p className="text-gray-600 text-base leading-relaxed mb-8 font-normal">
                                We believe a solar plant is a 25-year financial asset. That is why our team handles the entire lifecycle in-house—from load profiling and CEIG licensing to remote monitoring and scheduled maintenance. We ensure zero production shutdowns during transition.
                            </p>
                            <div className="flex flex-col gap-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                                        <ShieldCheckIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary text-lg mb-1">CEIG & NOC Compliance</h4>
                                        <p className="text-gray-600 text-sm">We handle all bureaucracy, approvals, Net Metering configuration, and safety certificates on your behalf.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                                        <WrenchScrewdriverIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary text-lg mb-1"> Bi-Annual Operations & Maintenance</h4>
                                        <p className="text-gray-600 text-sm">Consistent panel cleanings, structure integrity checks, and inverter diagnostics to maximize daily generation yields.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {processes.map((proc, i) => (
                                <div key={i} className="bg-gray-50 border border-gray-100 rounded-3xl p-6 hover:shadow-lg transition-shadow duration-300">
                                    <div className="text-3xl font-black text-accent mb-4">{proc.step}</div>
                                    <h4 className="font-bold text-primary text-lg mb-2" style={{ fontFamily: 'Georgia, serif' }}>{proc.title}</h4>
                                    <p className="text-gray-600 text-xs leading-relaxed font-normal">{proc.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Financial & Tax Incentives Summary */}
            <section className="py-20 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-primary rounded-[3rem] text-white p-8 md:p-16 relative overflow-hidden shadow-xl">
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="inline-block py-1 px-3 rounded-full bg-accent/20 border border-accent/30 text-[#fecb00] text-xs font-bold tracking-widest uppercase mb-4">
                                    Tax & ROI Incentives
                                </span>
                                <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                                    Financial Benefits of Solar EPC
                                </h2>
                                <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 font-light">
                                    For industrial and commercial entities, going solar is not just about saving on power bills—it is an investment that provides direct tax credits and improves cash flows from day one.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent mb-4">
                                        <CurrencyRupeeIcon className="w-6 h-6" />
                                    </div>
                                    <h4 className="font-bold text-white text-lg mb-2">40% Accelerated Depreciation</h4>
                                    <p className="text-gray-300 text-xs leading-relaxed">Claim accelerated depreciation under Section 32 to directly reduce your corporate income tax burden in Year 1.</p>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent mb-4">
                                        <DocumentCheckIcon className="w-6 h-6" />
                                    </div>
                                    <h4 className="font-bold text-white text-lg mb-2">GST Input Tax Credit</h4>
                                    <p className="text-gray-300 text-xs leading-relaxed">Offset the input tax paid on solar hardware and components against your outward corporate GST liability seamlessly.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEO Rich FAQs Section */}
            <section className="py-20 md:py-24 bg-white scroll-mt-32">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block py-1 px-3 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold tracking-widest uppercase mb-3">
                            Got Questions?
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="space-y-6 divide-y divide-gray-100">
                        {faqs.map((faq, i) => (
                            <div key={i} className="pt-6 first:pt-0 group">
                                <h3 className="font-bold text-primary text-lg md:text-xl mb-3 flex items-start gap-3 group-hover:text-accent transition-colors duration-200">
                                    <span className="text-accent font-black">Q.</span>
                                    <span>{faq.q}</span>
                                </h3>
                                <p className="text-gray-600 text-sm md:text-base leading-relaxed pl-6 font-normal">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

