"use client";

import { useEffect, useRef } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

const testimonials = [
    {
        id: 1,
        name: "Vikas Gupta",
        location: "Hisar, Haryana",
        text: "Divvy Solar ki technical expertise ek dum top-class hai. Installation bahut hi smooth rahi aur team ne har cheez dhang se samjhayi.",
        stars: 5
    },
    {
        id: 2,
        name: "Sandeep Malik",
        location: "Rohtak, Haryana",
        text: "Pure subsidy process mein Divvy Solar ne hamari bahut madad ki. Residential solar project ke liye ye Hisar mein best option hain.",
        stars: 5
    },
    {
        id: 3,
        name: "Anjali Sharma",
        location: "Gurgaon, Haryana",
        text: "Professional team and premium components. Our energy bills have dropped significantly after the 5KW solar installation.",
        stars: 5
    },
    {
        id: 4,
        name: "Rajesh Kumar",
        location: "Ludhiana, Punjab",
        text: "Best solar EPC company in North India. Timely execution and great after-sales support. Very happy with the performance.",
        stars: 5
    },
    {
        id: 5,
        name: "Priyanka Sethi",
        location: "Chandigarh",
        text: "The site assessment was very detailed. They customized the solution perfectly for our roof layout and energy needs.",
        stars: 5
    },
    {
        id: 6,
        name: "Amit Bansal",
        location: "Mohali, Punjab",
        text: "Very happy with the overall experience. Professional approach with a homely touch. Highly recommended solar partners.",
        stars: 5
    },
    {
        id: 7,
        name: "Suresh Jangra",
        location: "Hansi, Haryana",
        text: "Transparent pricing and quality work. Helped us get the DISCOM approvals without any hassle. True professionals.",
        stars: 5
    },
    {
        id: 8,
        name: "Manish Verma",
        location: "Sirsa, Haryana",
        text: "Outstanding service support. The team is very knowledgeable about the latest solar tech and subsidies. Great job!",
        stars: 5
    },
    {
        id: 9,
        name: "Sunil Dutt",
        location: "Amritsar, Punjab",
        text: "Divvy Solar installation was very professional. The team was punctual and the quality of work is excellent. Highly recommended!",
        stars: 5
    },
    {
        id: 10,
        name: "Rekha Rani",
        location: "Panchkula, Haryana",
        text: "We are very satisfied with our solar plant. The savings are real and the after-sales service is very prompt.",
        stars: 5
    },
    {
        id: 11,
        name: "Harpreet Singh",
        location: "Jalandhar, Punjab",
        text: "Great experience from start to finish. They handled all the documentation and the installation was very neat. Best in the business!",
        stars: 5
    }
];

const Testimonials = () => {
    return (
        <section className="py-24 overflow-hidden" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)' }}>
            <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#0a0f1e] mb-5 tracking-tight" style={{ fontFamily: '"Georgia", serif' }}>
                    What Our Customers Say
                </h2>
                {/* Divider */}
                <div className="flex items-center justify-center gap-3">
                    <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to right, transparent, #94a3b8)' }} />
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#0a192f', boxShadow: '0 0 0 2px #f8fafc, 0 0 0 3.5px #FECB00' }} />
                    <div style={{ width: '32px', height: '2px', background: 'linear-gradient(to right, #0a192f, #FECB00)', borderRadius: '2px' }} />
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#0a192f', boxShadow: '0 0 0 2px #f8fafc, 0 0 0 3.5px #FECB00' }} />
                    <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to left, transparent, #94a3b8)' }} />
                </div>
            </div>

            {/* Scrolling Container */}
            <div className="relative">
                <div className="flex animate-marquee whitespace-nowrap gap-8 w-max">
                    {/* First set of testimonials */}
                    <div className="flex gap-8 py-6 flex-shrink-0">
                        {testimonials.map((review) => (
                            <div key={review.id} className="w-[85vw] sm:w-[380px] h-[350px] sm:h-[380px] flex-shrink-0 bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl sm:rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(10,25,47,0.08)] hover:border-[#0a192f]/20 transition-all duration-500 group relative overflow-hidden flex flex-col justify-between">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-[#FECB00]/5 rounded-bl-full pointer-events-none transition-all duration-500 group-hover:bg-[#FECB00]/10"></div>

                                <div className="flex gap-1 mb-6">
                                    {[...Array(review.stars)].map((_, i) => (
                                        <StarIcon key={i} className="w-5 h-5 text-[#FECB00]" />
                                    ))}
                                </div>
                                <p className="text-[#0a192f]/80 whitespace-normal text-[0.95rem] leading-[1.8] font-medium italic mb-8 relative z-10">
                                    "{review.text}"
                                </p>
                                <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
                                    <div className="w-12 h-12 rounded-2xl bg-[#0a192f] flex items-center justify-center text-[#FECB00] font-bold shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
                                        {review.name[0]}
                                    </div>
                                    <div>
                                        <h4 className="text-[#0a192f] font-bold text-base" style={{ fontFamily: 'var(--font-heading)' }}>{review.name}</h4>
                                        <p className="text-slate-500 text-xs font-semibold tracking-wider uppercase">{review.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Duplicate set for seamless loop */}
                    <div className="flex gap-8 py-6 flex-shrink-0">
                        {testimonials.map((review) => (
                            <div key={`dup-${review.id}`} className="w-[85vw] sm:w-[380px] h-[350px] sm:h-[380px] flex-shrink-0 bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl sm:rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(10,25,47,0.08)] hover:border-[#0a192f]/20 transition-all duration-500 group relative overflow-hidden flex flex-col justify-between">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-[#FECB00]/5 rounded-bl-full pointer-events-none transition-all duration-500 group-hover:bg-[#FECB00]/10"></div>

                                <div className="flex gap-1 mb-6">
                                    {[...Array(review.stars)].map((_, i) => (
                                        <StarIcon key={i} className="w-5 h-5 text-[#FECB00]" />
                                    ))}
                                </div>
                                <p className="text-[#0a192f]/80 whitespace-normal text-[0.95rem] leading-[1.8] font-medium italic mb-8 relative z-10">
                                    "{review.text}"
                                </p>
                                <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
                                    <div className="w-12 h-12 rounded-2xl bg-[#0a192f] flex items-center justify-center text-[#FECB00] font-bold shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
                                        {review.name[0]}
                                    </div>
                                    <div>
                                        <h4 className="text-[#0a192f] font-bold text-base" style={{ fontFamily: 'var(--font-heading)' }}>{review.name}</h4>
                                        <p className="text-slate-500 text-xs font-semibold tracking-wider uppercase">{review.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Gradient Fades for Smooth Scroll Edge */}
                <div className="absolute inset-y-0 left-0 w-8 md:w-40 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-8 md:w-40 bg-gradient-to-l from-[#f1f5f9] to-transparent z-10 pointer-events-none" />
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-50% - 1rem)); }
                }
                .animate-marquee {
                    animation: marquee 35s linear infinite;
                    will-change: transform;
                }
                @media (hover: hover) {
                    .animate-marquee:hover {
                        animation-play-state: paused;
                    }
                }
            `}</style>
        </section>
    );
};

export default Testimonials;
