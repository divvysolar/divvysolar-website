"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PEOPLE } from "./peopleData";

export default function PeopleStories() {
    const scrollContainerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            const index = Math.round(scrollLeft / clientWidth);
            setActiveIndex(index);
            setTotalPages(Math.ceil(scrollWidth / clientWidth));
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = scrollContainerRef.current.clientWidth > 768 ? 400 : scrollContainerRef.current.clientWidth;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
            setTimeout(checkScroll, 350);
        }
    };

    const scrollTo = (index) => {
        if (scrollContainerRef.current) {
            const clientWidth = scrollContainerRef.current.clientWidth;
            scrollContainerRef.current.scrollTo({
                left: index * clientWidth,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="bg-white py-20 pb-10 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div>
                        <span className="inline-block text-xs font-black uppercase tracking-[0.2em] text-[#FECB00] mb-3">
                            Life at Divvy Solar
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
                            People Stories
                        </h2>
                    </div>
                </div>

                <div className="relative group">
                    {/* Left Navigation Arrow */}
                    <button
                        onClick={() => scroll('left')}
                        className={`hidden md:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-slate-700/80 text-white rounded flex items-center justify-center transition-all shadow hover:bg-slate-900 ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                        aria-label="Scroll left"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>

                    {/* Right Navigation Arrow */}
                    <button
                        onClick={() => scroll('right')}
                        className={`hidden md:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-slate-700/80 text-white rounded flex items-center justify-center transition-all shadow hover:bg-slate-900 ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                        aria-label="Scroll right"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>

                    {/* Carousel Container */}
                    <div
                        ref={scrollContainerRef}
                        onScroll={checkScroll}
                        className="flex overflow-x-auto gap-6 sm:gap-8 pb-12 pt-4 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {/* hide-scrollbar style inline block */}
                        <style dangerouslySetInnerHTML={{
                            __html: `
                        .hide-scrollbar::-webkit-scrollbar {
                            display: none;
                        }
                    `}} />

                        {PEOPLE.map((person, idx) => (
                            <Link
                                href={`/careers/people-stories/${person.slug}`}
                                key={idx}
                                className="flex-none w-[85vw] sm:w-[280px] md:w-[300px] snap-start bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(254,203,0,0.15)] transition-all duration-300 group flex flex-col p-4 border border-gray-100 cursor-pointer"
                            >
                                <div className="relative w-full rounded-[1.5rem] overflow-hidden bg-gray-100 mb-6 aspect-[4/5]">
                                    <Image
                                        src={person.image}
                                        alt={person.name}
                                        fill
                                        className={`object-cover transition-transform duration-700 ${person.imageClass || 'object-center group-hover:scale-105'}`}
                                        sizes="(max-width: 768px) 85vw, 350px"
                                    />
                                </div>
                                <div className="px-2 pb-4 flex-1 flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 self-start px-3 py-1 rounded-full mb-4">
                                        {person.role}
                                    </span>
                                    <h3
                                        className="text-[21px] font-medium text-[#0f172a] mb-3 group-hover:text-[#FECB00] transition-colors duration-300 tracking-tight"
                                        style={{ fontFamily: "'Neue Haas Grotesk Display Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                    >
                                        Meet {person.name.split(' ')[0]}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                                        {person.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
                {/* Pagination Dots */}
                <div className="flex justify-center items-center gap-3 mt-2">
                    {Array.from({ length: totalPages || 1 }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => scrollTo(idx)}
                            className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-8 bg-[#0f172a]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
