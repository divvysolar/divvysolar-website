"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import * as fp from "@/lib/fpixel";

export default function UtilityPopup() {
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);
    const router = useRouter();

    // Track that a high-intent user saw the Utility Scale investment popup
    useEffect(() => {
        fp.event('ViewContent', {
            content_name: 'Utility Scale Investment Popup',
            content_category: 'utility-scale',
        });
    }, []);

    const handleExplore = () => {
        setIsExiting(true);
        setTimeout(() => {
            router.push("/services/utility-scale/projects");
        }, 350);
    };

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => setIsVisible(false), 350);
    };

    if (!isVisible) return null;

    return (
        <div className={`fixed inset-0 z-[100000] flex items-center justify-center px-4 py-6 transition-opacity duration-300 ${isExiting ? "opacity-0" : "opacity-100"}`}>
            {/* Blurred Backdrop — shows the page behind */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-md"
                onClick={handleClose}
            />

            {/* Popup Card */}
            <div className={`relative w-full max-w-[540px] bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${isExiting ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}>

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-gray-500 hover:text-[#0a1122] transition-all duration-200 shadow-sm"
                    aria-label="Close"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Image Section */}
                <div className="relative w-full h-52 md:h-60">
                    <Image
                        src="/mega8.webp"
                        alt="Divvy Solar Utility Scale Project"
                        fill
                        className="object-cover"
                        priority
                        sizes="540px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1122]/80 via-[#0a1122]/30 to-transparent" />

                    {/* Badge on image */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full">
                        <span className="w-1.5 h-1.5 bg-[#FECB00] rounded-full" />
                        <span className="text-white text-[10px] font-semibold uppercase tracking-widest">Divvy Solar</span>
                    </div>

                    {/* Stats on image bottom */}
                    <div className="absolute bottom-4 left-4 right-4 flex gap-6">
                        <div>
                            <div className="text-white font-bold text-lg" style={{ fontFamily: "Georgia, serif" }}>100+ MW</div>
                            <div className="text-white/60 text-[10px] uppercase tracking-wider">Installed</div>
                        </div>
                        <div>
                            <div className="text-white font-bold text-lg" style={{ fontFamily: "Georgia, serif" }}>50+</div>
                            <div className="text-white/60 text-[10px] uppercase tracking-wider">Projects</div>
                        </div>
                        <div>
                            <div className="text-white font-bold text-lg" style={{ fontFamily: "Georgia, serif" }}>98%</div>
                            <div className="text-white/60 text-[10px] uppercase tracking-wider">On-Time</div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="px-7 py-7">
                    <h2
                        className="text-2xl md:text-[28px] font-bold text-[#0a1122] mb-2 tracking-tight leading-tight"
                        style={{ fontFamily: "Georgia, serif" }}
                    >
                        Invest With Divvy Solar
                    </h2>

                    <p className="text-gray-500 text-[15px] leading-relaxed mb-6">
                        Partner with Divvy Solar to develop and own MW-scale solar projects. We provide end-to-end support from land acquisition and permits to EPC, grid connection, and long-term revenue optimization.
                    </p>

                    {/* CTA Button */}
                    <button
                        onClick={handleExplore}
                        className="group w-full flex items-center justify-center gap-2 bg-[#0a1122] hover:bg-[#162240] text-white font-semibold py-3.5 rounded-xl transition-all duration-300 text-[15px] tracking-wide shadow-lg hover:shadow-xl"
                    >
                        Explore Our Projects
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
