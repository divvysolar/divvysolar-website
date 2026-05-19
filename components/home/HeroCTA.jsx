"use client";

import Link from 'next/link';
import * as fp from '@/lib/fpixel';

const HeroCTA = () => {
    const handleClick = () => {
        fp.event('Contact', { content_name: 'Hero Consultation Button' });
    };

    return (
        <Link
            href="/contact"
            onClick={handleClick}
            aria-label="Schedule a free solar consultation with Divvy Solar"
            className="inline-flex items-center gap-2.5 font-bold text-sm px-7 py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            style={{
                background: 'linear-gradient(135deg, #FECB00 0%, #f5b800 100%)',
                color: '#0a0f1e',
                boxShadow: '0 4px 20px rgba(254,203,0,0.35)',
            }}
        >
            Schedule a Free Consultation
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
        </Link>
    );
};

export default HeroCTA;