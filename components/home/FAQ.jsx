"use client";

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const faqs = [
    {
        question: "What does EPC mean in solar projects?",
        answer: "EPC stands for Engineering, Procurement, and Construction. It is a turnkey solution where we handle everything from site survey and design to sourcing components and final installation, ensuring a hassle-free experience for the customer."
    },
    {
        question: "How long does it take to install a solar system?",
        answer: "A typical residential installation takes 3–7 days, while larger industrial projects can take 2–4 weeks. The timeline also depends on government approvals and net-metering synchronization."
    },
    {
        question: "What types of solar systems do you install?",
        answer: "We specialize in On-Grid and Hybrid solar systems for homes, businesses, and industrial plants across India."
    },

    {
        question: "Do you help with government approvals and paperwork?",
        answer: "Absolutely. We manage the entire process including DISCOM permissions, subsidy applications, and net-metering documentation so you don't have to worry about the red tape."
    },
    {
        question: "What happens on cloudy or rainy days?",
        answer: "Solar panels still generate electricity on cloudy or rainy days using diffused sunlight, although at a lower efficiency. Your system remains connected to the grid to ensure uninterrupted power supply."
    },
    {
        question: "Do solar panels require a lot of maintenance?",
        answer: "Solar panels are very low maintenance. Regular cleaning once or twice a month to remove dust is usually all that's required to keep them performing at their best."
    },
    {
        question: "What is the average lifespan of a solar panel system?",
        answer: "Modern solar panels are built to last for 25–30 years. At Divvy Solar, we provide panels with a 25-year performance warranty, ensuring they continue to produce at least 80-85% of their initial power capacity even after two and a half decades."
    },
    {
        question: "Why choose Divvy Solar?",
        answer: "Divvy Solar is a trusted brand since 2018. We provide premium quality components, expert installation, and dedicated after-sales support to ensure your long-term energy savings."
    }
];

const FAQItem = ({ faq, index, openIndex, toggle }) => {
    const isOpen = openIndex === index;
    return (
        <div
            className="rounded-2xl overflow-hidden"
            style={{
                background: isOpen ? 'rgba(30, 45, 74, 0.7)' : 'rgba(255,255,255,0.04)',
                border: isOpen ? '1px solid rgba(254,203,0,0.5)' : '1px solid rgba(255,255,255,0.08)',
                marginBottom: '12px',
            }}
        >
            <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                aria-expanded={isOpen}
            >
                <span
                    className="font-semibold pr-4"
                    style={{
                        fontSize: '0.95rem',
                        color: isOpen ? '#FECB00' : 'rgba(255,255,255,0.85)',
                        lineHeight: '1.5',
                        fontFamily: 'var(--font-heading)',
                    }}
                >
                    {faq.question}
                </span>

                <span
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                        background: isOpen ? '#FECB00' : 'rgba(255,255,255,0.08)',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        border: '1px solid rgba(255,255,255,0.1)',
                    }}
                >
                    <ChevronDownIcon
                        className="w-4 h-4"
                        style={{ color: isOpen ? '#0a0f1e' : 'rgba(255,255,255,0.5)', strokeWidth: 2.5 }}
                    />
                </span>
            </button>

            {isOpen && (
                <p className="px-6 pb-5" style={{
                    fontSize: '0.875rem',
                    lineHeight: '1.8',
                    color: 'rgba(255,255,255,0.6)',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    paddingTop: '16px',
                }}>
                    {faq.answer}
                </p>
            )}
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const leftFaqs = faqs.filter((_, i) => i % 2 === 0);
    const rightFaqs = faqs.filter((_, i) => i % 2 !== 0);

    return (
        <section
            aria-labelledby="faq-heading"
            style={{
                position: 'relative',
                overflow: 'hidden',
                padding: '80px 0',
                background: 'linear-gradient(135deg, #1e2d4a 0%, #1a2540 100%)',
            }}
        >
            {/* Dot pattern */}
            <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
            }} />

            {/* Gold glow top left */}
            <div className="absolute top-0 left-0 pointer-events-none" style={{
                width: '600px', height: '600px',
                background: 'radial-gradient(circle, rgba(254,203,0,0.07) 0%, transparent 65%)',
                transform: 'translate(-30%, -30%)',
            }} />

            {/* Blue glow bottom right */}
            <div className="absolute bottom-0 right-0 pointer-events-none" style={{
                width: '500px', height: '500px',
                background: 'radial-gradient(circle, rgba(96,165,250,0.05) 0%, transparent 65%)',
                transform: 'translate(30%, 30%)',
            }} />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* HEADER */}
                <div className="text-center mb-12">
                    <h2
                        id="faq-heading"
                        className="font-black text-white mb-4"
                        style={{
                            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                            letterSpacing: '-0.5px',
                            lineHeight: '1.1',
                            fontFamily: '"Georgia", serif',
                        }}
                    >
                        Frequently Asked Questions
                    </h2>

                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2))' }} />
                        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#FECB00', boxShadow: '0 0 10px rgba(254,203,0,0.5)' }} />
                        <div style={{ width: '32px', height: '2px', background: 'linear-gradient(to right, #FECB00, rgba(254,203,0,0.4))', borderRadius: '2px' }} />
                        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#FECB00', boxShadow: '0 0 10px rgba(254,203,0,0.5)' }} />
                        <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.2))' }} />
                    </div>

                    <p style={{ maxWidth: '480px', margin: '0 auto', fontSize: '0.95rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.45)' }}>
                        Everything you need to know about going solar with Divvy Solar.
                    </p>
                </div>

                {/* FAQ — 2 separate columns */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-x-6">

                    {/* Left column */}
                    <div>
                        {leftFaqs.map((faq, i) => {
                            const actualIndex = i * 2;
                            return (
                                <FAQItem
                                    key={actualIndex}
                                    faq={faq}
                                    index={actualIndex}
                                    openIndex={openIndex}
                                    toggle={toggle}
                                />
                            );
                        })}
                    </div>

                    {/* Right column */}
                    <div>
                        {rightFaqs.map((faq, i) => {
                            const actualIndex = i * 2 + 1;
                            return (
                                <FAQItem
                                    key={actualIndex}
                                    faq={faq}
                                    index={actualIndex}
                                    openIndex={openIndex}
                                    toggle={toggle}
                                />
                            );
                        })}
                    </div>

                </div>

            </div>
        </section>
    );
};

export default FAQ;