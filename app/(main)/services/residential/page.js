import Image from 'next/image';
import PageHero from '@/components/common/PageHero';
import ServiceTabs from '@/components/services/ServiceTabs';
import Testimonials from '@/components/home/Testimonials';
import ContactForm from '@/components/contact/ContactForm';
import { BoltIcon, ShieldCheckIcon, CurrencyRupeeIcon, Cog6ToothIcon, ClockIcon, PhoneIcon } from '@heroicons/react/24/outline';

export const metadata = {
    title: 'Residential Solar Solutions | Divvy Solar',
    description: 'Affordable Residential Solar Solutions by Divvy Solar. Custom-tailored design, tier-1 panels, and fast installation across India.',
    keywords: ['residential solar', 'home solar panels', 'solar installation India', 'rooftop solar', 'Divvy Solar residential'],
    openGraph: {
        title: 'Residential Solar Solutions | Divvy Solar',
        description: 'Custom solar systems for homes. Zero disruption installation, tier-1 panels, and long-term savings.',
        url: 'https://divvysolar.in/services/residential',
        images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Residential Solar by Divvy Solar' }],
    },
    twitter: { card: 'summary_large_image', title: 'Residential Solar | Divvy Solar', description: 'Custom solar for homes across India.' },
    alternates: { canonical: 'https://divvysolar.in/services/residential' },
};

export default function ResidentialPage() {
    const features = [
        { title: "Customized Design", desc: "Site survey-based solar PV design optimized for your energy usage and maximum generation.", icon: <Cog6ToothIcon className="w-8 h-8" /> },
        { title: "Superior Performance", desc: "High-quality components and expert engineering to improve yield, efficiency, and ROI.", icon: <BoltIcon className="w-8 h-8" /> },
        { title: "Fast Installation", desc: "Trained teams deliver on-time solar panel installation with clean, safe workmanship.", icon: <ClockIcon className="w-8 h-8" /> },
        { title: "Quality Assurance", desc: "Strict testing, safety checks, and commissioning for dependable grid-connected operation.", icon: <ShieldCheckIcon className="w-8 h-8" /> },
        { title: "Smart Monitoring", desc: "24/7 remote monitoring to track generation, system health, and performance trends.", icon: <CurrencyRupeeIcon className="w-8 h-8" /> },
        { title: "Ongoing Support", desc: "Preventive maintenance and service support to keep your solar plant running at peak output.", icon: <PhoneIcon className="w-8 h-8" /> },
    ];

    return (
        <>
            <PageHero
                title="Residential Solar Solutions"
                breadcrumb="Residential"
                backgroundImage="/resi2main.jpeg"
            />
            <ServiceTabs />

            {/* Intro Section */}
            <section className="pt-20 pb-10 bg-white scroll-mt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="animate-slide-up lg:pr-10">
                            <div className="inline-flex items-center bg-[#0a0f1c] text-white px-4 py-1.5 rounded-full mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
                                <h3 className="font-medium uppercase tracking-[0.2em] text-[10px]">Why Choose Divvy Solar</h3>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-medium text-[#0a1122] mb-8 leading-tight tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                                <span className="block">Residential Solar Solutions</span>
                                <span className="block text-[#0e1b3d]">for Maximum Savings</span>
                            </h2>

                            <div className="space-y-10 text-[#0a1122] text-lg leading-relaxed">
                                <p className="text-xl font-normal leading-relaxed opacity-90 text-gray-700">
                                    Turnkey residential solar EPC solutions for homes and independent villas across Haryana, Punjab, and Delhi NCR. From site survey and engineering to net-metering and commissioning, we build high-performance rooftop solar systems that eliminate high electricity bills and deliver long-term energy independence.
                                </p>

                                <div className="grid grid-cols-1 gap-8 py-4">
                                    <div className="flex items-start group/item">
                                        <div className="flex-shrink-0 w-1.5 h-16 bg-[#0a1122] rounded-full mr-6 group-hover/item:scale-y-110 transition-transform"></div>
                                        <div>
                                            <h4 className="font-medium text-[#0a1122] text-xl mb-1" style={{ fontFamily: 'Georgia, serif' }}>Complete EPC Solutions</h4>
                                            <p className="text-gray-600 text-base leading-relaxed font-normal">End-to-end residential execution, from design and procurement to final testing and net-metering, managed by one expert team.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start group/item">
                                        <div className="flex-shrink-0 w-1.5 h-16 bg-[#0a1122] rounded-full mr-6 group-hover/item:scale-y-110 transition-transform"></div>
                                        <div>
                                            <h4 className="font-medium text-[#0a1122] text-xl mb-1" style={{ fontFamily: 'Georgia, serif' }}>High-Efficiency Systems</h4>
                                            <p className="text-gray-600 text-base leading-relaxed font-normal">Optimized residential sizing with Tier-1 components to maximize generation and ensure the fastest return on your investment.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start group/item">
                                        <div className="flex-shrink-0 w-1.5 h-16 bg-[#0a1122] rounded-full mr-6 group-hover/item:scale-y-110 transition-transform"></div>
                                        <div>
                                            <h4 className="font-medium text-[#0a1122] text-xl mb-1" style={{ fontFamily: 'Georgia, serif' }}>Precision Engineering</h4>
                                            <p className="text-gray-600 text-base leading-relaxed font-normal">Weatherproof structural design, safe electrical wiring, and compliance-focused installation for reliable, lifelong home energy.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-[480px] lg:h-[520px] rounded-[3rem] overflow-hidden shadow-sm animate-fade-in group border border-gray-100">
                            <Image
                                src="/resi1m.jpeg"
                                alt="Residential Solar"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                priority
                                quality={100}
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
                                Divvy Solar delivers turnkey solar EPC solutions, engineering, approvals, installation, and maintenance
                            </p>
                            <p className="text-lg md:text-xl text-[#1f1f1f] font-light tracking-tight opacity-80">
                                built for safe, high-performance solar systems and long-term electricity savings.
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
                                <h3 className="text-xl font-medium text-[#0a1122] mb-4" style={{ fontFamily: 'Georgia, serif' }}>{feature.title}</h3>
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
                            <ContactForm defaultService="RESIDENTIAL/HOME SOLAR" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Reused Testimonials for Social Proof */}
            <Testimonials />
        </>
    );
}
