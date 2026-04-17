"use client";

import Image from 'next/image';

const Hero = () => {
    const handleConsultationClick = () => {
        window.dispatchEvent(new CustomEvent('solarChat:open'));
    };

    return (
        <section
            aria-label="Divvy Solar — India's trusted solar EPC company"
            className="relative min-h-[calc(100vh-56px)] flex items-center overflow-hidden"
        >
            {/* ── Background Image ── */}
            <Image
                src="/hero-main-page.jpeg"
                alt="Solar panel installation by Divvy Solar - India's trusted solar energy company"
                fill
                priority
                fetchPriority="high"
                sizes="100vw"
                className="object-cover object-center"
                quality={100}
            />

            {/* ── Gradient overlay: heavy left, fades right so image is visible ── */}
            <div
                aria-hidden="true"
                className="absolute inset-0 z-10"
                style={{
                    background: `linear-gradient(
                        105deg,
                        rgba(5,10,20,0.97) 0%,
                        rgba(5,10,20,0.90) 38%,
                        rgba(5,10,20,0.45) 65%,
                        rgba(5,10,20,0.10) 100%
                    )`,
                }}
            />

            {/* ── Gold ambient glow top-left ── */}
            <div
                aria-hidden="true"
                className="absolute top-0 left-0 z-10 pointer-events-none"
                style={{
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(ellipse at top left, rgba(254,203,0,0.07) 0%, transparent 65%)',
                }}
            />

            {/* ── Gold top border ── */}
            <div
                aria-hidden="true"
                className="absolute top-0 left-0 z-20 h-[3px]"
                style={{
                    width: '45%',
                    background: 'linear-gradient(to right, #FECB00, transparent)',
                }}
            />

            {/* ── Gold left border ── */}
            <div
                aria-hidden="true"
                className="absolute top-0 left-0 z-20 w-[3px]"
                style={{
                    height: '28%',
                    background: 'linear-gradient(to bottom, #FECB00, transparent)',
                }}
            />

            {/* ── Main Content ── */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-20">
                <div className="max-w-2xl">

                    {/* Badge */}
                    <div
                        role="note"
                        className="inline-flex items-center gap-2.5 mb-6"
                        style={{
                            background: 'rgba(254,203,0,0.08)',
                            border: '1px solid rgba(254,203,0,0.25)',
                            borderRadius: '100px',
                            padding: '5px 14px',
                        }}
                    >
                        <span
                            aria-hidden="true"
                            className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"
                            style={{ boxShadow: '0 0 6px rgba(254,203,0,0.8)' }}
                        />
                        <span className="text-yellow-300/90 text-[11px] font-semibold tracking-[0.2em] uppercase">
                            Trusted Since 2018
                        </span>
                    </div>

                    {/* H1 — original content */}
                    <h1
                        className="font-extrabold text-white mb-5"
                        style={{
                            fontSize: 'clamp(2.4rem, 4.2vw, 3.6rem)',
                            lineHeight: '1.1',
                            letterSpacing: '-0.5px',
                            fontFamily: '"Georgia", serif',
                        }}
                    >
                        Effortless Solar Solutions for India's Future
                    </h1>

                    {/* Gold divider */}
                    <div
                        aria-hidden="true"
                        className="mb-5"
                        style={{
                            width: '40px',
                            height: '3px',
                            background: 'linear-gradient(to right, #FECB00, rgba(254,203,0,0.2))',
                            borderRadius: '2px',
                        }}
                    />

                    {/* Description — original text, wider max-width = 3 lines */}
                    <p
                        className="text-white/95 font-normal mb-8"
                        style={{
                            fontSize: '0.92rem',
                            lineHeight: '1.7',
                            maxWidth: '520px',
                            textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                        }}
                    >
                        Divvy Solar delivers comprehensive, turnkey EPC solar projects for homes, businesses, and industry.
                        From site survey to installation and 24/7 monitoring, we handle everything,
                        so you enjoy reliable, clean energy and lower electricity bills.
                    </p>

                    {/* CTAs */}
                    <div className="flex items-center gap-4 flex-wrap">
                        {/* Primary CTA */}
                        <button
                            onClick={handleConsultationClick}
                            aria-label="Schedule a free solar consultation with Divvy Solar"
                            className="inline-flex items-center gap-2.5 font-bold text-sm px-7 py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            style={{
                                background: 'linear-gradient(135deg, #FECB00 0%, #f5b800 100%)',
                                color: '#0a0f1e',
                                boxShadow: '0 4px 20px rgba(254,203,0,0.35)',
                            }}
                        >
                            Schedule a Free Consultation
                            <svg
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>


                    </div>

                    {/* Stats strip */}
                    <div
                        className="grid grid-cols-3 gap-0 mt-10 rounded-xl overflow-hidden divide-x divide-white/10 shadow-lg"
                        style={{
                            border: '1px solid rgba(255,255,255,0.15)',
                            width: 'fit-content',
                            backdropFilter: 'blur(8px)',
                            boxShadow: '0 10px 30px -5px rgba(0,0,0,0.3)',
                        }}
                    >
                        {[
                            { value: '1000+', label: 'Installations' },
                            { value: '8+', label: 'Years Experience' },
                            { value: '24/7', label: 'Monitoring' },
                        ].map((stat, i) => (
                            <div
                                key={stat.label}
                                className="flex flex-col px-5 py-3.5"
                                style={{
                                    background: i % 2 === 0
                                        ? 'rgba(255,255,255,0.04)'
                                        : 'rgba(255,255,255,0.07)',
                                }}
                            >
                                <span
                                    className="font-extrabold text-xl leading-none"
                                    style={{ color: '#FECB00' }}
                                >
                                    {stat.value}
                                </span>
                                <span className="text-white/75 text-[10px] mt-1 font-medium tracking-wider uppercase">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* ── Bottom fade ── */}
            <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 right-0 z-10"
                style={{
                    height: '70px',
                    background: 'linear-gradient(to top, rgba(5,10,20,0.55) 0%, transparent 100%)',
                }}
            />
        </section>
    );
};

export default Hero;