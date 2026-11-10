'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { gridTariff, solarTariff, projects, getProjectSavings } from '@/data/projects';

// ─────────────────────────────────────────────────────────────────────────────
// INDUSTRIAL SOLAR EPC — LANDING PAGE
// Colors: navy #071A3E (gradient to #040E24), yellow #FFC400, black #0A0A0F
// Fonts: Space Grotesk (headings), Inter (body) — loaded via layout.js CSS vars
// ─────────────────────────────────────────────────────────────────────────────

const GG = {
    heading: { fontFamily: "var(--font-space-grotesk, 'Space Grotesk', sans-serif)" },
    body:    { fontFamily: "var(--font-inter, 'Inter', sans-serif)" },
};

export default function IndustrialSolarLandingPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({ name: '', phone: '', monthlyBill: '', location: '' });
    const [honeypot, setHoneypot]   = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg]     = useState('');
    const [mousePos, setMousePos]   = useState({ x: 0.5, y: 0.5 });
    const heroRef = useRef(null);

    const whatsappNum = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919254986321';
    const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent('Hi Divvy Solar, I would like to inquire about industrial rooftop solar for our factory.')}`;

    // Parallax mouse tracking for hero 3D depth
    useEffect(() => {
        const onMove = (e) => {
            if (!heroRef.current) return;
            const r = heroRef.current.getBoundingClientRect();
            setMousePos({
                x: (e.clientX - r.left) / r.width,
                y: (e.clientY - r.top)  / r.height,
            });
        };
        const el = heroRef.current;
        if (el) el.addEventListener('mousemove', onMove);
        return () => { if (el) el.removeEventListener('mousemove', onMove); };
    }, []);

    const scrollToForm = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        document.getElementById('epc-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        if (honeypot) return;

        const cleanName  = formData.name.trim();
        const cleanPhone = formData.phone.replace(/\D/g, '');
        const cleanLoc   = formData.location.trim();

        if (!cleanName)                        return setErrorMsg('Please enter your full name');
        if (!/^[6-9]\d{9}$/.test(cleanPhone)) return setErrorMsg('Please enter a valid 10-digit mobile number');
        if (!formData.monthlyBill)             return setErrorMsg('Please select your monthly power bill range');
        if (!cleanLoc)                         return setErrorMsg('Please enter your plant / factory location');

        setSubmitting(true);
        try {
            const res  = await fetch('/api/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: cleanName, phone: cleanPhone, monthlyBill: formData.monthlyBill, location: cleanLoc, honeypot }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                router.push('/thank-you');
            } else {
                setErrorMsg(data.error || 'Unable to submit request. Please call our desk directly.');
            }
        } catch {
            setErrorMsg('Network error. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    // Parallax offsets for hero layers
    const px = (mousePos.x - 0.5) * 30;
    const py = (mousePos.y - 0.5) * 20;

    return (
        <div style={GG.body} className="min-h-screen bg-white text-slate-900 selection:bg-[#FFC400] selection:text-black overflow-x-hidden">

            {/* Hide solar chatbot on this page */}
            <style>{`[data-solar-chatbot], .solar-chatbot-widget, #solar-chatbot { display:none!important; }`}</style>

            {/* ═══════════════════════════════════════════════════════════════
                NAVBAR — official website component
            ═══════════════════════════════════════════════════════════════ */}
            <Navbar isLandingPage={true} />

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 1 — HERO (Dark Blue 3D)
            ═══════════════════════════════════════════════════════════════ */}
            <section
                ref={heroRef}
                className="relative overflow-hidden text-white min-h-[92vh] flex items-center"
                style={{ background: 'linear-gradient(135deg, #020814 0%, #040E24 30%, #061A44 55%, #030C1E 100%)' }}
            >
                {/* ── Layer 1: Industrial BG photo with dark overlay ─────── */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/industrial_4k.webp"
                        alt="Industrial solar plant"
                        fill
                        sizes="100vw"
                        className="object-cover object-center"
                        priority
                        style={{ opacity: 0.08 }}
                    />
                    {/* Deep gradient overlay on top of image */}
                    <div className="absolute inset-0" style={{
                        background: 'linear-gradient(135deg, rgba(2,8,20,0.98) 0%, rgba(4,14,36,0.95) 40%, rgba(6,24,56,0.88) 70%, rgba(3,10,24,0.97) 100%)'
                    }} />
                </div>

                {/* ── Layer 2: Animated grid mesh ───────────────────────── */}
                <div className="absolute inset-0 z-[1] pointer-events-none" style={{
                    backgroundImage: 'linear-gradient(rgba(255,196,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,196,0,0.025) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                    transform: `translate(${px * 0.3}px, ${py * 0.3}px)`,
                    transition: 'transform 0.1s ease-out',
                }} />

                {/* ── Layer 3: Radial glows (parallax) ─────────────────── */}
                <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
                    {/* Top-right cyan sphere */}
                    <div style={{
                        position: 'absolute', top: '-15%', right: '-5%',
                        width: 700, height: 700, borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(29,78,216,0.22) 0%, rgba(17,50,160,0.10) 50%, transparent 70%)',
                        filter: 'blur(60px)',
                        transform: `translate(${-px * 0.8}px, ${-py * 0.5}px)`,
                        transition: 'transform 0.15s ease-out',
                    }} />
                    {/* Centre-left gold glow */}
                    <div style={{
                        position: 'absolute', top: '30%', left: '-10%',
                        width: 600, height: 400, borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(255,196,0,0.07) 0%, rgba(255,196,0,0.02) 60%, transparent 80%)',
                        filter: 'blur(80px)',
                        transform: `translate(${px * 0.6}px, ${py * 0.4}px)`,
                        transition: 'transform 0.15s ease-out',
                    }} />
                    {/* Bottom deep indigo */}
                    <div style={{
                        position: 'absolute', bottom: '-20%', left: '30%',
                        width: 800, height: 350, borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(49,46,129,0.12) 0%, transparent 70%)',
                        filter: 'blur(90px)',
                    }} />
                </div>

                {/* ── Layer 4: Floating 3D accent rings (decorative) ────── */}
                <div className="absolute inset-0 z-[3] pointer-events-none" style={{
                    transform: `translate(${px * 0.4}px, ${py * 0.3}px)`,
                    transition: 'transform 0.2s ease-out',
                }}>
                    {/* Large outer ring */}
                    <div className="absolute" style={{
                        top: '5%', right: '8%', width: 320, height: 320, borderRadius: '50%',
                        border: '1px solid rgba(255,196,0,0.12)',
                        boxShadow: 'inset 0 0 60px rgba(255,196,0,0.04)',
                    }} />
                    {/* Medium inner ring */}
                    <div className="absolute" style={{
                        top: '12%', right: '12%', width: 200, height: 200, borderRadius: '50%',
                        border: '1px solid rgba(255,196,0,0.18)',
                    }} />
                    {/* Small dot ring */}
                    <div className="absolute" style={{
                        top: '19%', right: '17.5%', width: 86, height: 86, borderRadius: '50%',
                        border: '1px solid rgba(255,196,0,0.5)',
                        boxShadow: '0 0 20px rgba(255,196,0,0.2)',
                    }} />
                    {/* Centre sun pulse dot */}
                    <div className="absolute animate-pulse" style={{
                        top: '23.5%', right: '20.5%', width: 20, height: 20, borderRadius: '50%',
                        background: 'rgba(255,196,0,0.9)',
                        boxShadow: '0 0 30px rgba(255,196,0,0.6), 0 0 60px rgba(255,196,0,0.3)',
                    }} />
                </div>

                {/* ── Layer 5: Dot matrix top-left ─────────────────────── */}
                <div className="absolute inset-0 z-[3] pointer-events-none" style={{
                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                    opacity: 0.045,
                    maskImage: 'radial-gradient(ellipse 60% 80% at 10% 20%, black 40%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 60% 80% at 10% 20%, black 40%, transparent 100%)',
                }} />

                {/* ── CONTENT ───────────────────────────────────────────── */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

                        {/* LEFT COLUMN */}
                        <div className="lg:col-span-7 space-y-6">

                            {/* Pill badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold tracking-widest uppercase" style={{
                                background: 'rgba(255,196,0,0.08)',
                                borderColor: 'rgba(255,196,0,0.5)',
                                color: '#FFC400',
                                boxShadow: '0 0 24px rgba(255,196,0,0.15)',
                            }}>
                                <svg className="w-3.5 h-3.5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                Free Feasibility Report
                            </div>

                            {/* H1 */}
                            <h1 style={{ ...GG.heading, fontWeight: 800, fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
                                Cut Factory Power<br />
                                Cost to{' '}
                                <span style={{
                                    color: '#FFC400',
                                    textShadow: '0 0 40px rgba(255,196,0,0.5), 0 4px 20px rgba(255,196,0,0.3)',
                                }}>
                                    ₹{solarTariff.toFixed(2)}/Unit
                                </span>
                            </h1>

                            {/* Subheading */}
                            <p style={{ color: 'rgba(186,210,255,0.85)', fontSize: '1rem', lineHeight: 1.7, maxWidth: 520 }}>
                                Turnkey rooftop solar for factories with 40% accelerated depreciation,
                                non-penetrating roof mounting and DG-PV synchronisation across North India.
                            </p>

                            {/* 3 Stat chips — 3D glassmorphic */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                                {[
                                    { val: `₹${solarTariff.toFixed(2)}`, label: `Solar cost per unit vs ₹${gridTariff.toFixed(2)} grid` },
                                    { val: '40%', label: 'Accelerated depreciation tax benefit' },
                                    { val: '35+ MWp', label: 'Installed across Haryana, Punjab & NCR' },
                                ].map((chip, i) => (
                                    <div key={i} style={{
                                        padding: '14px 16px',
                                        borderRadius: 16,
                                        background: 'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)',
                                        border: '1px solid rgba(255,255,255,0.12)',
                                        backdropFilter: 'blur(12px)',
                                        WebkitBackdropFilter: 'blur(12px)',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                                        transform: `perspective(600px) rotateX(${-py * 2}deg) rotateY(${px * 1.5}deg)`,
                                        transition: 'transform 0.2s ease-out',
                                        cursor: 'default',
                                    }}>
                                        <div style={{ ...GG.heading, fontSize: '1.65rem', fontWeight: 800, color: '#FFC400', letterSpacing: '-0.03em', textShadow: '0 2px 12px rgba(255,196,0,0.4)' }}>
                                            {chip.val}
                                        </div>
                                        <div style={{ fontSize: '0.68rem', color: 'rgba(186,210,255,0.85)', marginTop: 4, lineHeight: 1.4, fontWeight: 500 }}>
                                            {chip.label}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* 3 check bullets */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {[
                                    'Non-penetrating clamps designed to avoid roof drilling',
                                    'DG-PV synchronisation to reduce diesel usage',
                                    'Turnkey CEIG and DISCOM approval support',
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <div style={{
                                            width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                                            background: '#FFC400', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            boxShadow: '0 0 14px rgba(255,196,0,0.5)',
                                        }}>
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                <path d="M2 6l3 3 5-5" stroke="#0A0A0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                        <span style={{ fontSize: '0.875rem', color: 'rgba(226,232,255,0.9)', fontWeight: 500 }}>{item}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Footnote */}
                            <p style={{ fontSize: '0.68rem', color: 'rgba(148,163,200,0.65)', lineHeight: 1.6, maxWidth: 480, paddingTop: 4 }}>
                                ₹3.50/unit is the estimated 25-year levelised cost. Assumptions: [VERIFY]. Grid tariff source: [VERIFY]. Depreciation subject to eligibility; consult your CA.
                            </p>
                        </div>

                        {/* RIGHT COLUMN — Lead Form Card */}
                        <div id="epc-form" className="lg:col-span-5 scroll-mt-24">
                            <div style={{
                                background: '#ffffff',
                                borderRadius: 24,
                                padding: '32px',
                                boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.3), 0 0 60px rgba(37,99,235,0.2)',
                                position: 'relative',
                                overflow: 'hidden',
                                transform: `perspective(900px) rotateY(${-px * 2}deg) rotateX(${py * 1}deg)`,
                                transition: 'transform 0.2s ease-out',
                            }}>
                                {/* Yellow top bar */}
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #FFC400, #FFD740, #FFC400)' }} />

                                {/* Subtle inner glow */}
                                <div style={{
                                    position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%',
                                    background: 'radial-gradient(circle, rgba(255,196,0,0.07) 0%, transparent 70%)',
                                    pointerEvents: 'none',
                                }} />

                                <div style={{ marginBottom: 20, paddingTop: 8 }}>
                                    <span style={{
                                        ...GG.heading, fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.12em',
                                        textTransform: 'uppercase', color: '#1d4ed8',
                                        background: '#eff6ff', padding: '4px 10px', borderRadius: 20, display: 'inline-block', marginBottom: 10
                                    }}>
                                        Fast Feasibility Assessment
                                    </span>
                                    <h2 style={{ ...GG.heading, fontWeight: 800, fontSize: '1.3rem', color: '#0f172a', lineHeight: 1.3, letterSpacing: '-0.02em' }}>
                                        Get your factory&apos;s solar payback report
                                    </h2>
                                    <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 4 }}>
                                        Custom generation simulation &amp; load analysis in 30 mins
                                    </p>
                                </div>

                                {/* Honeypot */}
                                <input type="text" name="website_url_hp" value={honeypot} onChange={e => setHoneypot(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" />

                                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

                                    {/* Full Name */}
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#374151', marginBottom: 6 }}>
                                            Full Name <span style={{ color: '#ef4444' }}>*</span>
                                        </label>
                                        <input
                                            type="text" required placeholder="e.g. Rajesh Singhal"
                                            value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 12, fontSize: '0.875rem', color: '#0f172a', background: '#f8fafc', outline: 'none', boxSizing: 'border-box' }}
                                            onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.12)'; }}
                                            onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc'; e.target.style.boxShadow = 'none'; }}
                                        />
                                    </div>

                                    {/* Mobile */}
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#374151', marginBottom: 6 }}>
                                            Mobile / WhatsApp <span style={{ color: '#ef4444' }}>*</span>
                                        </label>
                                        <div style={{ display: 'flex', border: '1.5px solid #e2e8f0', borderRadius: 12, overflow: 'hidden', background: '#f8fafc' }}>
                                            <span style={{ padding: '11px 12px', fontSize: '0.75rem', fontWeight: 700, color: '#374151', background: '#f1f5f9', borderRight: '1.5px solid #e2e8f0', flexShrink: 0 }}>🇮🇳 +91</span>
                                            <input
                                                type="tel" required maxLength={10} pattern="[6-9][0-9]{9}" placeholder="10-digit number"
                                                value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                                                style={{ flex: 1, padding: '11px 14px', fontSize: '0.875rem', color: '#0f172a', background: 'transparent', outline: 'none', border: 'none' }}
                                            />
                                        </div>
                                    </div>

                                    {/* Monthly Bill */}
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#374151', marginBottom: 6 }}>
                                            Monthly Power Bill <span style={{ color: '#ef4444' }}>*</span>
                                        </label>
                                        <select
                                            required value={formData.monthlyBill} onChange={e => setFormData({ ...formData, monthlyBill: e.target.value })}
                                            style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 12, fontSize: '0.875rem', color: formData.monthlyBill ? '#0f172a' : '#94a3b8', background: '#f8fafc', outline: 'none', boxSizing: 'border-box', cursor: 'pointer' }}
                                        >
                                            <option value="">Select Monthly Bill Range</option>
                                            <option value="₹1L - ₹3L / mo">₹1 Lakh – ₹3 Lakh / month</option>
                                            <option value="₹3L - ₹5L / mo">₹3 Lakh – ₹5 Lakh / month</option>
                                            <option value="₹5L - ₹10L / mo">₹5 Lakh – ₹10 Lakh / month</option>
                                            <option value="₹10L - ₹25L / mo">₹10 Lakh – ₹25 Lakh / month</option>
                                            <option value="₹25L+ / mo">₹25 Lakh+ / month</option>
                                        </select>
                                    </div>

                                    {/* Location */}
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#374151', marginBottom: 6 }}>
                                            Plant / Factory Location <span style={{ color: '#ef4444' }}>*</span>
                                        </label>
                                        <input
                                            type="text" required placeholder="e.g. Panipat, Ludhiana, Hisar"
                                            value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })}
                                            style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 12, fontSize: '0.875rem', color: '#0f172a', background: '#f8fafc', outline: 'none', boxSizing: 'border-box' }}
                                            onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.12)'; }}
                                            onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc'; e.target.style.boxShadow = 'none'; }}
                                        />
                                    </div>

                                    {errorMsg && (
                                        <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#dc2626', background: '#fef2f2', padding: '10px 14px', borderRadius: 10, border: '1px solid #fecaca' }}>
                                            {errorMsg}
                                        </p>
                                    )}

                                    <button
                                        type="submit" disabled={submitting}
                                        style={{
                                            width: '100%', padding: '14px 24px', borderRadius: 14,
                                            background: submitting ? '#1e293b' : '#0A0A0F',
                                            color: '#FFC400', fontWeight: 800, fontSize: '0.9rem',
                                            border: '1.5px solid rgba(255,196,0,0.3)',
                                            cursor: submitting ? 'not-allowed' : 'pointer', outline: 'none',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                            boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
                                            transition: 'transform 0.15s, box-shadow 0.15s',
                                            ...GG.heading,
                                        }}
                                        onMouseOver={e => { if (!submitting) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.35)'; }}}
                                        onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.25)'; }}
                                    >
                                        {submitting ? 'Submitting...' : (
                                            <>
                                                Get Free Solar Assessment
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="#FFC400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </>
                                        )}
                                    </button>

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: '0.68rem', color: '#94a3b8', fontWeight: 500 }}>
                                        <span>🔒 100% Confidential</span>
                                        <span>·</span>
                                        <span>Zero Obligation</span>
                                        <span>·</span>
                                        <span>No Sales Spam</span>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Bottom fade into white */}
                <div className="absolute bottom-0 left-0 right-0 h-20 z-10 pointer-events-none" style={{
                    background: 'linear-gradient(to bottom, transparent, rgba(4,14,36,0.5))',
                }} />
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 2 — COMMISSIONED PLANTS
            ═══════════════════════════════════════════════════════════════ */}
            <section id="commissioned-plants" className="py-14 sm:py-20 bg-white border-t border-slate-100 scroll-mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Section header — no filter pills */}
                    <div className="mb-10">
                        <span style={{
                            fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.12em',
                            textTransform: 'uppercase', color: '#1d4ed8',
                            background: '#eff6ff', padding: '5px 12px', borderRadius: 20,
                            border: '1px solid #bfdbfe', display: 'inline-block', marginBottom: 12,
                        }}>
                            Commissioned Plants
                        </span>
                        <h2 style={{ ...GG.heading, fontWeight: 800, fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                            Factories already running on our solar
                        </h2>
                        <p style={{ fontSize: '0.9rem', color: '#475569', marginTop: 6, maxWidth: 540 }}>
                            HT grid-synchronized rooftop and ground-mount installations across Haryana, Punjab &amp; NCR.
                        </p>
                    </div>

                    {/* Compact project cards — 3 columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {projects.map(p => (
                            <div key={p.id} style={{
                                background: '#071A3E', borderRadius: 16, overflow: 'hidden',
                                border: '1px solid rgba(255,255,255,0.07)',
                                boxShadow: '0 12px 40px rgba(0,0,0,0.22)',
                                display: 'flex', flexDirection: 'column',
                                transition: 'transform 0.25s, box-shadow 0.25s',
                            }}
                                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 20px 55px rgba(0,0,0,0.3)'; }}
                                onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.22)'; }}
                            >
                                {/* Image — compact height */}
                                <div style={{ position: 'relative', height: 155, background: '#040e24', flexShrink: 0 }}>
                                    <Image src={p.image} alt={p.companyName} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" style={{ opacity: 0.82 }} />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,26,62,0.97) 0%, rgba(7,26,62,0.3) 55%, transparent 100%)' }} />
                                    {/* kWp badge */}
                                    <div style={{ position: 'absolute', top: 10, right: 10, background: '#FFC400', color: '#0A0A0F', fontSize: '0.72rem', fontWeight: 800, padding: '4px 10px', borderRadius: 20, ...GG.heading }}>
                                        {p.kWp.toLocaleString()} kWp
                                    </div>
                                    {/* Name overlay */}
                                    <div style={{ position: 'absolute', bottom: 10, left: 12, right: 12 }}>
                                        <h3 style={{ ...GG.heading, fontWeight: 700, fontSize: '0.95rem', color: '#fff', lineHeight: 1.2 }}>{p.companyName}</h3>
                                        <p style={{ fontSize: '0.68rem', color: 'rgba(186,210,255,0.8)', marginTop: 2 }}>📍 {p.location}</p>
                                    </div>
                                </div>

                                {/* Card body */}
                                <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                                    {/* Roof type chip */}
                                    <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#FFC400', background: 'rgba(255,196,0,0.1)', border: '1px solid rgba(255,196,0,0.2)', padding: '3px 10px', borderRadius: 20, display: 'inline-block', width: 'fit-content' }}>
                                        {p.roofType}
                                    </span>

                                    {/* Highlights */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                                        {p.highlights.map((h, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, fontSize: '0.7rem', color: 'rgba(186,210,255,0.85)' }}>
                                                <span style={{ color: '#FFC400', fontWeight: 700, flexShrink: 0, fontSize: '0.65rem' }}>✓</span>
                                                <span>{h}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer CTA */}
                                <div style={{ padding: '10px 16px 14px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'flex-end' }}>
                                    <button type="button" onClick={scrollToForm} style={{ fontSize: '0.7rem', fontWeight: 700, color: '#FFC400', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}>
                                        Get Feasibility →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 3 — CLIENT REVIEWS (6 Distinct Clients & Testimonials)
            ═══════════════════════════════════════════════════════════════ */}
            <section id="client-reviews" className="py-14 sm:py-20 border-t border-slate-100 scroll-mt-16" style={{ background: '#f8faff' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header */}
                    <div className="mb-10 text-center">
                        <span style={{
                            fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase',
                            color: '#1d4ed8', background: '#dbeafe', padding: '5px 14px', borderRadius: 20,
                            border: '1px solid #bfdbfe', display: 'inline-block', marginBottom: 12,
                        }}>
                            Client Testimonials
                        </span>
                        <h2 style={{ ...GG.heading, fontWeight: 800, fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                            What our clients say
                        </h2>
                        <p style={{ fontSize: '0.9rem', color: '#475569', marginTop: 6, maxWidth: 500, margin: '8px auto 0' }}>
                            Verbatim feedback from factory owners and plant managers who commissioned Divvy Solar.
                        </p>
                    </div>

                    {/* Review cards — 6 completely distinct clients from commissioned projects */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {projects.slice(0, 6).map((p, i) => {
                            const colors = ['#1d4ed8', '#7c3aed', '#0284c7', '#059669', '#d97706', '#0d9488'];
                            const cardColor = colors[i % colors.length];
                            return (
                                <div key={p.id} style={{
                                    background: '#fff',
                                    borderRadius: 16,
                                    padding: '20px',
                                    border: '1px solid #e2e8f0',
                                    boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                                    display: 'flex', flexDirection: 'column', gap: 14,
                                    transition: 'transform 0.25s, box-shadow 0.25s, border-color 0.25s',
                                    position: 'relative',
                                }}
                                    onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.1)'; e.currentTarget.style.borderColor = `${cardColor}40`; }}
                                    onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
                                >
                                    {/* Top accent line */}
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, borderRadius: '16px 16px 0 0', background: cardColor }} />

                                    {/* Quote mark + highlight chip */}
                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, paddingTop: 4 }}>
                                        <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
                                            <path d="M0 18V11.1C0 7.5 1.05 4.65 3.15 2.55 5.25 0.85 7.9 0 11.1 0v3.3C9.1 3.3 7.5 3.9 6.3 5.1 5.1 6.3 4.5 7.95 4.5 10.05H9V18H0zm13.5 0V11.1c0-3.6 1.05-6.45 3.15-8.55C18.75 0.85 21.4 0 24.6 0v3.3c-2 0-3.6.6-4.8 1.8-1.2 1.2-1.8 2.85-1.8 4.95H22.5V18H13.5z" fill={cardColor} opacity="0.3"/>
                                        </svg>
                                        <span style={{
                                            fontSize: '0.58rem', fontWeight: 800, color: cardColor,
                                            background: `${cardColor}12`, padding: '3px 8px', borderRadius: 20,
                                            border: `1px solid ${cardColor}25`, letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap',
                                        }}>
                                            {p.testimonialHighlight}
                                        </span>
                                    </div>

                                    {/* Quote text */}
                                    <p style={{ fontSize: '0.8rem', color: '#334155', lineHeight: 1.7, flex: 1, fontStyle: 'italic' }}>
                                        &ldquo;{p.testimonialQuote}&rdquo;
                                    </p>

                                    {/* Client info */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderTop: '1px solid #f1f5f9', paddingTop: 12 }}>
                                        <div style={{
                                            width: 36, height: 36, borderRadius: '50%', background: cardColor,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: '#fff', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0,
                                            ...GG.heading,
                                        }}>
                                            {p.ownerName.charAt(0)}
                                        </div>
                                        <div>
                                            <p style={{ ...GG.heading, fontWeight: 700, fontSize: '0.8rem', color: '#0f172a', lineHeight: 1.2 }}>{p.ownerName}</p>
                                            <p style={{ fontSize: '0.68rem', color: '#64748b', marginTop: 1 }}>{p.companyName}</p>
                                            <p style={{ fontSize: '0.62rem', color: '#94a3b8', marginTop: 1 }}>📍 {p.location} · {p.kWp.toLocaleString()} kWp</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                OFFICIAL FOOTER (Landing Page Mode: Privacy Policy active, on-page anchors)
            ═══════════════════════════════════════════════════════════════ */}
            <Footer isLandingPage={true} />

            {/* ═══════════════════════════════════════════════════════════════
                MOBILE STICKY BAR
            ═══════════════════════════════════════════════════════════════ */}
            <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex gap-2 p-2.5" style={{
                background: 'rgba(7,26,62,0.97)', backdropFilter: 'blur(12px)',
                borderTop: '1px solid rgba(255,196,0,0.2)',
                boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
            }}>
                <a href="tel:+919254986321" style={{
                    flex: 1, background: '#0f172a', color: '#fff', fontWeight: 700,
                    padding: '12px', borderRadius: 12, textAlign: 'center', fontSize: '0.75rem',
                    border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}>
                    <svg width="14" height="14" fill="#FFC400" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.57 1 1 0 01-.25 1.01l-2.2 2.21z"/></svg>
                    Call
                </a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{
                    flex: 1, background: '#16a34a', color: '#fff', fontWeight: 700,
                    padding: '12px', borderRadius: 12, textAlign: 'center', fontSize: '0.75rem',
                    textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}>
                    <svg width="14" height="14" fill="#fff" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                    WhatsApp
                </a>
                <button type="button" onClick={scrollToForm} style={{
                    flex: 1, background: '#FFC400', color: '#0A0A0F', fontWeight: 800,
                    padding: '12px', borderRadius: 12, fontSize: '0.75rem', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                }}>
                    Get Report →
                </button>
            </div>

        </div>
    );
}
