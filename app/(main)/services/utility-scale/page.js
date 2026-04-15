import Image from 'next/image';
import PageHero from '@/components/common/PageHero';
import ServiceTabs from '@/components/services/ServiceTabs';
import Testimonials from '@/components/home/Testimonials';
import ContactForm from '@/components/contact/ContactForm';
import { BoltIcon, ShieldCheckIcon, ChartBarIcon, MapPinIcon, Cog6ToothIcon, ClockIcon } from '@heroicons/react/24/outline';

export const metadata = {
    title: 'Utility-Scale Solar Projects | Divvy Solar',
    description: 'Utility-Scale Solar EPC by Divvy Solar. MW-scale solar projects with bankable assets, MNRE compliance, and PVsyst-modeled designs across India.',
    keywords: ['utility scale solar', 'MW solar plant India', 'solar EPC projects', 'MNRE compliant solar', 'large scale solar', 'Divvy Solar utility'],
    openGraph: {
        title: 'Utility-Scale Solar Projects | Divvy Solar',
        description: 'India\'s premier utility-scale solar EPC partner. 100+ MW installed capacity with full compliance and bankable design.',
        url: 'https://divvysolar.in/services/utility-scale',
        images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Utility Scale Solar by Divvy Solar' }],
    },
    twitter: { card: 'summary_large_image', title: 'Utility-Scale Solar | Divvy Solar', description: 'MW-scale solar projects with MNRE compliance across India.' },
    alternates: { canonical: 'https://divvysolar.in/services/utility-scale' },
};

export default function UtilityScalePage() {
    const features = [
        { title: "Customized Design", desc: "Site survey-based solar PV design optimized for your energy usage and maximum generation.", icon: <MapPinIcon className="w-8 h-8" /> },
        { title: "Superior Performance", desc: "High-quality components and expert engineering to improve yield, efficiency, and ROI.", icon: <BoltIcon className="w-8 h-8" /> },
        { title: "Fast Installation", desc: "Trained teams deliver on-time solar panel installation with clean, safe workmanship.", icon: <ClockIcon className="w-8 h-8" /> },
        { title: "Quality Assurance", desc: "Strict testing, safety checks, and commissioning for dependable grid-connected operation.", icon: <ShieldCheckIcon className="w-8 h-8" /> },
        { title: "Smart Monitoring", desc: "24/7 remote monitoring to track generation, system health, and performance trends.", icon: <ChartBarIcon className="w-8 h-8" /> },
        { title: "Ongoing Support", desc: "Preventive maintenance and service support to keep your solar plant running at peak output.", icon: <Cog6ToothIcon className="w-8 h-8" /> },
    ];

    return (
        <>
            <PageHero
                title="Utility Scale Solar Projects"
                breadcrumb="Utility-Scale"
                backgroundImage="/utility_hero_4k.png"
            />
            <ServiceTabs />

            {/* Intro Section */}
            <section className="pt-20 pb-10 bg-white scroll-mt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="animate-slide-up lg:pr-10">
                            <h3 className="text-[#0a1122] font-medium uppercase tracking-[0.2em] text-xs mb-4 opacity-70 pl-3 border-l-2 border-[#0a1122]">Why Choose Divvy Solar</h3>
                            <h2 className="text-3xl md:text-5xl font-medium text-[#0a1122] mb-8 leading-tight tracking-tight">
                                <span className="block whitespace-nowrap">Utility-Scale Solar EPC</span>
                                <span className="block whitespace-nowrap text-[#0a1122]">Partner in India</span>
                            </h2>

                            <div className="space-y-10 text-[#0a1122] text-lg leading-relaxed">
                                <p className="text-xl font-normal leading-relaxed opacity-90">
                                    Our utility-scale plants are built for <span className="font-bold">grid connectivity, compliance, and long-term performance</span>, using proven components and strict quality controls. The result is a bankable solar asset that meets project timelines, safety standards, and operational expectations.
                                </p>

                                <div className="grid grid-cols-1 gap-8 py-4">
                                    <div className="flex items-start group/item">
                                        <div className="flex-shrink-0 w-1.5 h-16 bg-[#0a1122] rounded-full mr-6 group-hover/item:scale-y-110 transition-transform"></div>
                                        <div>
                                            <h4 className="font-medium text-[#0a1122] text-xl mb-1">Bankable Tier-1 Components</h4>
                                            <p className="text-sm text-[#333333] uppercase tracking-wider font-normal">We source reliable modules, inverters, and BOS from trusted brands to ensure durability, efficiency, and consistent output.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start group/item">
                                        <div className="flex-shrink-0 w-1.5 h-16 bg-[#0a1122] rounded-full mr-6 group-hover/item:scale-y-110 transition-transform"></div>
                                        <div>
                                            <h4 className="font-medium text-[#0a1122] text-xl mb-1">Expert Grid Engineering</h4>
                                            <p className="text-sm text-[#333333] uppercase tracking-wider font-normal">End-to-end grid integration support, including evacuation planning, protection systems, and coordination for smooth connectivity.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start group/item">
                                        <div className="flex-shrink-0 w-1.5 h-16 bg-[#0a1122] rounded-full mr-6 group-hover/item:scale-y-110 transition-transform"></div>
                                        <div>
                                            <h4 className="font-medium text-[#0a1122] text-xl mb-1">Compliance-Ready Execution</h4>
                                            <p className="text-sm text-[#333333] uppercase tracking-wider font-normal">Strong project governance with safety-first construction, documentation, and quality checks to meet regulatory and project requirements.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-[480px] lg:h-[520px] rounded-[3rem] overflow-hidden shadow-sm animate-fade-in group border border-gray-100">
                            <Image
                                src="/utility_intro_4k.png"
                                alt="Utility Scale Solar"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                                quality={100}
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid - Enhanced Visibility & Reduced Spacing */}
            <section className="pt-10 pb-12 bg-white relative overflow-hidden scroll-mt-32">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="mb-12">
                        <h2 className="text-4xl md:text-7xl font-normal text-[#1f1f1f] mb-6 tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>
                            Our Features
                        </h2>
                        <div className="flex flex-col items-center space-y-2">
                            <p className="text-xl md:text-3xl text-[#1f1f1f] font-normal tracking-tight">
                                High-performance utility-scale solar assets
                            </p>
                            <p className="text-lg md:text-xl text-[#1f1f1f] font-light tracking-tight opacity-80">
                                built for grid connectivity, compliance, and long-term bankability.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, i) => (
                            <div
                                key={i}
                                className="group relative bg-[#f8f9fa] p-10 md:p-12 rounded-3xl border border-transparent hover:bg-white hover:border-[#e8eaed] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col items-center justify-center min-h-[260px]"
                            >
                                <div className="text-[#0a1122] mb-8 transition-colors">
                                    <div className="w-10 h-10 md:w-12 h-12">
                                        {feature.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-medium text-[#0a1122] mb-4">{feature.title}</h3>
                                <p className="text-[#333333] text-sm md:text-base leading-relaxed max-w-[280px] text-center font-normal">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works & Contact - Optimized Gaps */}
            <section className="pt-12 pb-20 bg-white scroll-mt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-center">
                            <h3 className="font-medium uppercase tracking-widest text-[#0a1122] text-[10px] mb-2 opacity-60">ENGINEERING, PROCUREMENT & CONSTRUCTION</h3>
                            <h2 className="text-3xl md:text-4xl font-medium text-[#0a1122] mb-4 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>Start Saving with EPC in 3 Steps</h2>
                            <p className="text-gray-700 mb-8 text-sm md:text-base leading-relaxed border-b border-gray-100 pb-6 max-w-md font-normal">
                                We deliver <span className="text-[#0a1122]">turnkey solar EPC solutions</span>, built for performance, safety, and long-term savings.
                            </p>

                            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">

                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-[#0a1122] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 font-medium text-base z-10 mx-5">1</div>
                                    <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2rem)] bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                        <h4 className="font-medium text-[#0a1122] text-lg mb-1">Engineering</h4>
                                        <p className="text-gray-600 text-xs leading-relaxed font-normal">Site survey + customized <span className="text-[#0a1122]">solar PV design</span> to maximize generation.</p>
                                    </div>
                                </div>

                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-[#0a1122] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 font-medium text-base z-10 mx-5">2</div>
                                    <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2rem)] bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                        <h4 className="font-medium text-[#0a1122] text-lg mb-1">Procurement</h4>
                                        <p className="text-gray-600 text-xs leading-relaxed font-normal">Quality <span className="text-[#0a1122]">solar components</span> sourced from trusted brands for reliable output.</p>
                                    </div>
                                </div>

                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-[#0a1122] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 font-medium text-base z-10 mx-5">3</div>
                                    <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2rem)] bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                        <h4 className="font-medium text-[#0a1122] text-lg mb-1">Construction</h4>
                                        <p className="text-gray-600 text-xs leading-relaxed font-normal">Expert <span className="text-[#0a1122]">installation, testing</span>, followed by <span className="text-[#0a1122]">24/7 monitoring</span>.</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="lg:col-span-7">
                            <ContactForm defaultService="UTILITY/PPA" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Reused Testimonials for Social Proof */}
            <Testimonials />
        </>
    );
}
