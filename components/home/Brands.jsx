"use client";

import Image from 'next/image';
import { useEffect, useRef } from 'react';

const brands = [
    { name: 'Waaree', src: '/waaree.png' },
    { name: 'Vikram Solar', src: '/vikram.png' },
    { name: 'Jackson', src: '/jackson.png' },
    { name: 'Adani Solar', src: '/adani.png' },
    { name: 'Havells', src: '/havells.png' },
    { name: 'Eastman', src: '/images/eastman.png' },
    { name: 'Luminous', src: '/luminious.png' },
    { name: 'Invergy', src: '/invergy.png' },
];

const Brands = () => {
    const sectionRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const section = sectionRef.current;
        if (!canvas || !section) return;
        const ctx = canvas.getContext('2d');

        let width = canvas.offsetWidth;
        let height = canvas.offsetHeight;
        canvas.width = width;
        canvas.height = height;

        const DOTS = 150; // Optimized for performance
        const dots = Array.from({ length: DOTS }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 1.8 + 0.6,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
        }));

        let animId;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            dots.forEach(dot => {
                dot.x += dot.vx;
                dot.y += dot.vy;
                if (dot.x < 0) dot.x = width;
                if (dot.x > width) dot.x = 0;
                if (dot.y < 0) dot.y = height;
                if (dot.y > height) dot.y = 0;
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(71, 85, 105, 0.7)';
                ctx.fill();
            });
            for (let i = 0; i < dots.length; i++) {
                for (let j = i + 1; j < dots.length; j++) {
                    const dx = dots[i].x - dots[j].x;
                    const dy = dots[i].y - dots[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(dots[i].x, dots[i].y);
                        ctx.lineTo(dots[j].x, dots[j].y);
                        ctx.strokeStyle = `rgba(71,85,105,${0.25 * (1 - dist / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            animId = requestAnimationFrame(draw);
        };

        draw();

        // Use ResizeObserver for accurate tracking of height changes, especially on mobile
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                if (entry.target === section) {
                    const rect = section.getBoundingClientRect();
                    width = rect.width;
                    height = rect.height;
                    canvas.width = Math.floor(width);
                    canvas.height = Math.floor(height);
                }
            }
        });

        resizeObserver.observe(section);

        return () => {
            cancelAnimationFrame(animId);
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            aria-labelledby="brands-heading"
            style={{
                position: 'relative',
                overflow: 'hidden',
                padding: '80px 0',
                background: 'linear-gradient(160deg, #dde6f0 0%, #edf2f7 50%, #dde6f0 100%)',
            }}
        >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ display: 'block' }} />

            <div className="absolute top-0 right-0 pointer-events-none" style={{ width: '50vw', height: '50vw', minWidth: '400px', minHeight: '400px', background: 'radial-gradient(circle, rgba(254,203,0,0.08) 0%, transparent 65%)', transform: 'translate(30%, -30%)' }} />
            <div className="absolute bottom-0 left-0 pointer-events-none" style={{ width: '40vw', height: '40vw', minWidth: '350px', minHeight: '350px', background: 'radial-gradient(circle, rgba(10,15,30,0.06) 0%, transparent 65%)', transform: 'translate(-30%, 30%)' }} />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-14">
                    <h2
                        id="brands-heading"
                        style={{
                            fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                            color: '#060c1a',
                            letterSpacing: '-0.5px',
                            lineHeight: '1.1',
                            fontWeight: 900,
                            marginBottom: '16px',
                            WebkitFontSmoothing: 'antialiased',
                            MozOsxFontSmoothing: 'grayscale',
                            fontFamily: '"Georgia", serif',
                        }}
                    >
                        Top Brands We Trust
                    </h2>

                    <div className="flex items-center justify-center gap-3 mb-8">
                        <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to right, transparent, #94a3b8)' }} />
                        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#060c1a', boxShadow: '0 0 0 2px #edf2f7, 0 0 0 3.5px #060c1a' }} />
                        <div style={{ width: '32px', height: '2px', background: 'linear-gradient(to right, #060c1a, #64748b)', borderRadius: '2px' }} />
                        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#060c1a', boxShadow: '0 0 0 2px #edf2f7, 0 0 0 3.5px #060c1a' }} />
                        <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to left, transparent, #94a3b8)' }} />
                    </div>

                    <p style={{ maxWidth: '520px', margin: '0 auto', fontSize: '0.95rem', lineHeight: '1.8', color: '#1e293b', fontWeight: 500 }}>
                        We partner with industry leaders to ensure your solar installation
                        uses only the most reliable and efficient components.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    {brands.map((brand, index) => (
                        <div
                            key={index}
                            className="group relative flex items-center justify-center rounded-2xl transition-all duration-300 hover:-translate-y-1"
                            style={{
                                width: 'calc(25% - 24px)',
                                minWidth: '200px',
                                minHeight: '110px',
                                background: '#ffffff',
                                border: '1.5px solid #d1dce8',
                                boxShadow: '0 1px 4px rgba(0,0,0,0.06), 0 6px 20px rgba(0,0,0,0.08), inset 0 1px 0 #ffffff',
                                padding: '22px 28px',
                            }}
                        >
                            <div
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                    border: '1.5px solid rgba(254,203,0,0.7)',
                                    boxShadow: '0 8px 24px rgba(254,203,0,0.15)',
                                    pointerEvents: 'none',
                                }}
                            />
                            <div className="relative w-full h-[50px] sm:h-[60px] md:h-[70px] flex items-center justify-center">
                                <Image
                                    src={brand.src}
                                    alt={`${brand.name} - Solar brand partner`}
                                    fill
                                    sizes="(max-width: 640px) 120px, (max-width: 768px) 150px, 200px"
                                    className="object-contain transition-transform duration-300 group-hover:scale-105 p-1"
                                    style={{ opacity: 1 }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Government Approvals Section */}
                <div className="mt-24 text-center">
                    <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-slate-900/5 border border-slate-900/10">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="text-xs font-bold tracking-[0.15em] text-slate-600 uppercase">
                            Authorised By Government Authorities
                        </span>
                    </div>

                    <div className="relative overflow-hidden w-full max-w-7xl mx-auto py-2">
                        <div className="flex animate-marquee-fast whitespace-nowrap gap-6 w-max">
                            {/* Original Set */}
                            <div className="flex gap-6 flex-shrink-0">
                                {['DHBVN', 'PSPCL', 'UHBVN', 'CREST', 'AVVNL', 'HAREDA'].map((gov) => (
                                    <div
                                        key={gov}
                                        className="group flex items-center gap-4 px-8 py-3.5 bg-white/90 backdrop-blur-sm rounded-xl transition-all duration-300 hover:scale-105 hover:bg-white cursor-default"
                                        style={{
                                            border: '1px solid rgba(148, 163, 184, 0.4)',
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                                            minWidth: '200px',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <div className="relative flex items-center justify-center w-3 h-3">
                                            <div className="absolute w-full h-full bg-emerald-400 rounded-full opacity-40 animate-ping" />
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full z-10" />
                                        </div>
                                        <span className="font-extrabold text-[#060c1a] tracking-wider text-base group-hover:text-emerald-700 transition-colors">
                                            {gov}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            {/* Duplicate Set for Infinite Loop */}
                            <div className="flex gap-6 flex-shrink-0">
                                {['DHBVN', 'PSPCL', 'UHBVN', 'CREST', 'AVVNL', 'HAREDA'].map((gov) => (
                                    <div
                                        key={`dup-${gov}`}
                                        className="group flex items-center gap-4 px-8 py-3.5 bg-white/90 backdrop-blur-sm rounded-xl transition-all duration-300 hover:scale-105 hover:bg-white cursor-default"
                                        style={{
                                            border: '1px solid rgba(148, 163, 184, 0.4)',
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                                            minWidth: '200px',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <div className="relative flex items-center justify-center w-3 h-3">
                                            <div className="absolute w-full h-full bg-emerald-400 rounded-full opacity-40 animate-ping" />
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full z-10" />
                                        </div>
                                        <span className="font-extrabold text-[#060c1a] tracking-wider text-base group-hover:text-emerald-700 transition-colors">
                                            {gov}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Edge Fades for smooth entry/exit */}
                        <div className="absolute inset-y-0 left-0 w-8 md:w-24 bg-gradient-to-r from-[#edf2f7] to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-8 md:w-24 bg-gradient-to-l from-[#dde6f0] to-transparent z-10 pointer-events-none" />
                    </div>
                </div>

                <style jsx>{`
                    @keyframes marquee-fast {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(calc(-50% - 12px)); }
                    }
                    .animate-marquee-fast {
                        animation: marquee-fast 15s linear infinite;
                        will-change: transform;
                    }
                    @media (hover: hover) {
                        .animate-marquee-fast:hover {
                            animation-play-state: paused;
                        }
                    }
                `}</style>

            </div>
        </section>
    );
};

export default Brands;