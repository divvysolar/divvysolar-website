import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircleIcon, PhoneIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';

export const metadata = {
    title: 'Thank You | Divvy Solar',
    description: 'Thank you for requesting an industrial solar feasibility assessment with Divvy Solar.'
};

export default function ThankYouPage({ searchParams }) {
    const fromSlug = (searchParams?.from === 'industrial-solar-epc2' || searchParams?.from === 'industrial-solar-epc3' || searchParams?.from === 'industrial-solar-epc3new') ? searchParams.from : 'industrial-solar-epc';
    const backRoute = `/${fromSlug}`;
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919254986321';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi Divvy Solar, I just submitted an industrial solar feasibility request. Please connect with me.')}`;

    return (
        <div className="min-h-screen bg-[#f8faff] text-slate-900 font-sans flex flex-col justify-between">
            {/* ── MINIMAL HEADER ── */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
                    <Link href={backRoute} className="relative w-40 sm:w-48 h-12 block">
                        <Image
                            src="/divvy_photo.png"
                            alt="Divvy Solar"
                            fill
                            priority
                            className="object-contain object-left"
                            sizes="192px"
                        />
                    </Link>
                    <a
                        href="tel:+919254986321"
                        className="flex items-center gap-2 px-4 py-2 sm:px-4 sm:py-2.5 rounded-full border border-blue-200 bg-blue-50/70 hover:bg-blue-100/70 text-blue-800 text-xs sm:text-sm font-bold transition shadow-xs"
                    >
                        <PhoneIcon className="w-3.5 h-3.5 text-blue-600" />
                        <span>+91 92549-86321</span>
                    </a>
                </div>
            </header>

            {/* ── MAIN CONTENT ── */}
            <main className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
                <div className="max-w-xl w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl text-center space-y-6">
                    <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center mx-auto border-2 border-blue-200">
                        <CheckCircleIcon className="w-10 h-10 text-yellow-500" />
                    </div>

                    <div className="space-y-2">
                        <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                            Request Confirmed
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
                            Feasibility Request Received!
                        </h1>
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal pt-1">
                            Thank you for reaching out. Our expert will contact you shortly [VERIFY: exact time] with your factory load and payback assessment.
                        </p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-2">
                        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">What happens next:</h3>
                        <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 font-normal">
                            <li>Our senior commercial engineer will call to review your plant requirements.</li>
                            <li>We prepare a custom generation simulation and tariff payback report.</li>
                            <li>A complimentary on-site roof inspection can be scheduled at your convenience.</li>
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition shadow-md flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                            </svg>
                            <span>Chat on WhatsApp</span>
                        </a>

                        <a
                            href="tel:+919254986321"
                            className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition shadow-md flex items-center justify-center gap-2"
                        >
                            <PhoneIcon className="w-4 h-4 text-yellow-400" />
                            <span>Call Commercial Desk</span>
                        </a>
                    </div>

                    <div className="pt-2">
                        <Link
                            href={backRoute}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-700 transition"
                        >
                            <ArrowLeftIcon className="w-3.5 h-3.5" />
                            <span>Return to Industrial Solar Overview</span>
                        </Link>
                    </div>
                </div>
            </main>

            {/* ── MINIMAL FOOTER ── */}
            <footer className="bg-[#0a1628] text-slate-400 text-xs py-8 border-t border-blue-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <div className="space-y-1">
                        <div className="font-bold text-white text-sm">Divvy Solar Power &amp; Solutions Pvt. Ltd.</div>
                        <p className="text-[11px] text-slate-400">
                            Commercial &amp; Industrial Rooftop Solar EPC across Haryana, Punjab &amp; Delhi NCR.
                        </p>
                        <p className="text-[11px] text-slate-500">
                            Head Office: Lower Ground, SJ Tower, Sec-13, Dabra Road, Hisar (Warehouse) 125001
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-xs">
                        <a href="tel:+919254986321" className="hover:text-yellow-400 transition text-slate-300 font-semibold">
                            +91 92549-86321
                        </a>
                        <span className="hidden sm:inline text-slate-700">•</span>
                        <a href="mailto:info@divvysolar.in" className="hover:text-yellow-400 transition text-slate-300">
                            info@divvysolar.in
                        </a>
                        <span className="hidden sm:inline text-slate-700">•</span>
                        <Link href={`/privacy-policy?from=${fromSlug}`} className="hover:text-yellow-400 transition text-slate-400">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

