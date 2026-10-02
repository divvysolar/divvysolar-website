"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import {
    SunIcon,
    XMarkIcon,
    PaperAirplaneIcon,
    ArrowPathIcon,
    SparklesIcon,
    ClipboardDocumentCheckIcon,
    ChatBubbleLeftRightIcon,
    CheckCircleIcon,
    ShieldCheckIcon,
    BoltIcon,
    BuildingOffice2Icon,
    HomeIcon,
    PhoneIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';

const CATEGORIES = [
    {
        id: "subsidy",
        name: "💰 Subsidy & Govt",
        queries: [
            { label: "₹78,000 PM Surya Ghar Subsidy", query: "How much government subsidy do I get under PM Surya Ghar Muft Bijli Yojana for 1kW, 2kW, 3kW and 5kW?" },
            { label: "Net Metering in DHBVN / PSPCL", query: "How does net metering work in DHBVN, UHBVN, PSPCL and BSES, and what is the approval process?" },
            { label: "Subsidy Application Steps", query: "What documents and rooftop conditions are required to claim the direct DBT central solar subsidy?" }
        ]
    },
    {
        id: "commercial",
        name: "🏭 CAPEX vs OPEX",
        queries: [
            { label: "CAPEX vs OPEX / RESCO Models", query: "What is the difference between CAPEX self-owned and OPEX / RESCO zero-investment model for industrial factories?" },
            { label: "40% Tax Depreciation", query: "How does 40% Accelerated Depreciation under Section 32 of Income Tax Act benefit commercial solar clients?" },
            { label: "Payback Period & ROI", query: "What is the typical financial payback period and lifetime savings of a 50kW to 500kW commercial solar plant?" }
        ]
    },
    {
        id: "sizing",
        name: "⚡ kW & Sizing",
        queries: [
            { label: "1 kW Generation & Roof Space", query: "How many units of electricity does 1 kW solar generate per day in North India and how much shade-free roof space is required?" },
            { label: "Size for ₹5,000/mo Bill", query: "What is the ideal solar system kW size and monthly savings for a house with a monthly power bill of ₹5,000?" },
            { label: "Size for ₹20,000+ Factory Bill", query: "How much solar kW capacity is required for an industrial plant with monthly electricity expenses above ₹25,000?" }
        ]
    },
    {
        id: "tech",
        name: "🛡️ Panel Tech",
        queries: [
            { label: "TopCon vs Mono PERC", query: "Why are N-Type TopCon solar panels better than traditional Mono PERC panels in North Indian summer heat?" },
            { label: "Bifacial Dual-Glass Panels", query: "How much extra generation yield do Bifacial double-glass modules produce from ground and rooftop albedo reflection?" },
            { label: "25-30 Year Warranties", query: "What warranties and guarantees are provided on Tier-1 panels, smart inverters and galvanized mounting structures?" }
        ]
    }
];

const BILL_RANGES = [
    "Under ₹3,000 / month",
    "₹3,000 - ₹8,000 / month",
    "₹8,000 - ₹25,000 / month",
    "₹25,000 - ₹1,00,000 / month",
    "₹1,00,000+ (Factory / Industrial)"
];

// Lead Property Types: Residential, Commercial, Industrial
const PROPERTY_TYPES = [
    { label: "Residential", icon: HomeIcon },
    { label: "Commercial", icon: BuildingOffice2Icon },
    { label: "Industrial", icon: BoltIcon }
];

export default function SolarChatbot() {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin') || pathname?.startsWith('/sales') || pathname?.startsWith('/leads-portal');

    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("chat"); // "chat" | "form"
    const [selectedCategory, setSelectedCategory] = useState("subsidy");
    const [sessionId, setSessionId] = useState("");
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [hasUnread, setHasUnread] = useState(false);
    const [hasFetchedLogs, setHasFetchedLogs] = useState(false);
    const chatBodyRef = useRef(null);

    // Lead Form State
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        location: "",
        monthlyBill: "₹3,000 - ₹8,000 / month",
        propertyType: "Residential"
    });
    const [formSubmitting, setFormSubmitting] = useState(false);
    const [formSuccess, setFormSuccess] = useState(false);
    const [formError, setFormError] = useState("");

    // Initialize sessionId from localStorage
    useEffect(() => {
        if (typeof window === 'undefined') return;
        try {
            let storedId = localStorage.getItem('divvy_solar_chat_sid');
            if (!storedId) {
                storedId = 'sid_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
                localStorage.setItem('divvy_solar_chat_sid', storedId);
            }
            setSessionId(storedId);
        } catch (e) {
            setSessionId('sid_' + Date.now().toString(36));
        }
    }, []);

    // Lazy load existing conversation ONLY when user opens chat
    const loadConversationHistory = useCallback(async (sid) => {
        if (!sid || hasFetchedLogs) return;
        setHasFetchedLogs(true);
        try {
            const res = await fetch(`/api/chat/logs?sessionId=${sid}`);
            if (res.ok) {
                const data = await res.json();
                if (data.success && Array.isArray(data.data) && data.data.length > 0) {
                    setMessages(data.data);
                    // Check if lead was already captured
                    const hasLead = data.data.some(m => m.text?.includes('[Submitted Free 3D Solar Audit Form]') || m.text?.includes('Got your number'));
                    if (hasLead) setFormSuccess(true);
                }
            }
        } catch (err) { }
    }, [hasFetchedLogs]);

    const toggleOpen = () => {
        const nextState = !isOpen;
        setIsOpen(nextState);
        if (nextState) {
            setHasUnread(false);
            if (sessionId && !hasFetchedLogs) {
                loadConversationHistory(sessionId);
            }
        }
    };

    // Auto-scroll ONLY inside the chatbot container without moving the background page
    useEffect(() => {
        if (isOpen && chatBodyRef.current) {
            chatBodyRef.current.scrollTo({
                top: chatBodyRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, isOpen, isTyping]);

    const handleSend = async (textToSend) => {
        const text = textToSend || input.trim();
        if (!text || isTyping) return;

        setInput("");
        const userMsg = { sender: 'user', text, timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        const rawPhone = String(formData.phone || "").replace(/\D/g, "");
        const cleanPhone = rawPhone.length >= 10 ? rawPhone.slice(-10) : rawPhone;

        try {
            const res = await fetch('/api/chat/message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId: sessionId || 'sid_' + Date.now().toString(36),
                    message: text,
                    pageUrl: pathname || '/',
                    visitorInfo: {
                        name: formData.name || '',
                        phone: cleanPhone || '',
                        location: formData.location || '',
                        monthlyBill: formData.monthlyBill || '',
                        propertyType: formData.propertyType || ''
                    },
                    formData: {
                        ...formData,
                        phone: cleanPhone
                    }
                })
            });

            const data = await res.json();
            if (data.success && data.reply) {
                setMessages(prev => [...prev, {
                    sender: 'bot',
                    text: data.reply,
                    timestamp: new Date()
                }]);
                if (data.leadCaptured) {
                    setFormSuccess(true);
                }
                if (!isOpen) setHasUnread(true);
            } else {
                setMessages(prev => [...prev, {
                    sender: 'bot',
                    text: data.reply || "Got your inquiry! Please share your 10-digit Phone Number and our Solar Engineer will connect with you.",
                    timestamp: new Date()
                }]);
            }
        } catch (err) {
            setMessages(prev => [...prev, {
                sender: 'bot',
                text: "Network temporarily slow. Please share your phone number or try again!",
                timestamp: new Date()
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFormError("");

        const rawPhone = String(formData.phone || "").replace(/\D/g, "");
        const cleanPhone = rawPhone.length >= 10 ? rawPhone.slice(-10) : rawPhone;

        if (!formData.name.trim()) {
            setFormError("Please enter your name.");
            return;
        }
        if (!cleanPhone || cleanPhone.length < 10) {
            setFormError("Please enter a valid 10-digit mobile number.");
            return;
        }
        if (!formData.location.trim()) {
            setFormError("Please enter your City / Location.");
            return;
        }

        setFormSubmitting(true);
        try {
            const res = await fetch('/api/chat/message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId: sessionId || 'sid_' + Date.now().toString(36),
                    isLeadForm: true,
                    formData: {
                        ...formData,
                        phone: cleanPhone
                    },
                    pageUrl: pathname || '/'
                })
            });

            const data = await res.json();
            if (data.success) {
                setFormSuccess(true);
                // Append confirmation to chat
                setMessages(prev => [
                    ...prev,
                    {
                        sender: 'user',
                        text: `📋 **[Submitted Free 3D Solar Audit Form]**\n• Name: ${formData.name}\n• Phone: +91 ${cleanPhone}\n• City: ${formData.location}\n• Monthly Bill: ${formData.monthlyBill}\n• Property Type: ${formData.propertyType}`,
                        timestamp: new Date()
                    },
                    {
                        sender: 'bot',
                        text: data.reply || `🎉 **Thank you ${formData.name}! Your Solar Audit is Confirmed.**\n\nOur Senior Solar EPC Engineer is reviewing your roof feasibility and will connect with you on WhatsApp / Call shortly with your **3D Solar Layout, PM Surya Ghar Subsidy calculation & detailed quotation**.`,
                        timestamp: new Date()
                    }
                ]);
            } else {
                setFormError(data.error || "Submission failed. Please try again or chat with us.");
            }
        } catch (err) {
            setFormError("Network error. Please try again or type your number in the chat.");
        } finally {
            setFormSubmitting(false);
        }
    };

    const handleResetChat = () => {
        const newId = 'sid_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
        try {
            localStorage.setItem('divvy_solar_chat_sid', newId);
        } catch (e) { }
        setSessionId(newId);
        setHasFetchedLogs(true);
        setMessages([]);
        setFormSuccess(false);
        setFormData({
            name: "",
            phone: "",
            location: "",
            monthlyBill: "₹3,000 - ₹8,000 / month",
            propertyType: "Residential Home"
        });
    };

    if (isAdmin) return null;

    const currentCategoryObj = CATEGORIES.find(c => c.id === selectedCategory) || CATEGORIES[0];

    return (
        <>
            {/* Collapsed Floating Trigger Button */}
            {!isOpen && (
                <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[99998] flex items-center gap-3">
                    <button
                        onClick={toggleOpen}
                        id="solarChatFloatingBtn"
                        className="relative flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-full text-[#070b15] font-black text-xs md:text-sm tracking-tight shadow-[0_6px_25px_rgba(254,203,0,0.4)] transition-transform duration-200 hover:scale-105 active:scale-95 group cursor-pointer"
                        style={{ background: 'linear-gradient(135deg, #FECB00, #EBB800)' }}
                        aria-label="Open Solar Chatbot"
                    >
                        <SunIcon className="w-5 h-5 text-[#070b15] transition-transform duration-300 group-hover:rotate-45" />
                        <span className="whitespace-nowrap font-black">Ask Solar Expert</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#070b15] text-[#FECB00] hidden sm:inline-block">
                            Free 3D Quote
                        </span>

                        {hasUnread && (
                            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white"></span>
                        )}
                    </button>
                </div>
            )}

            {/* Expanded Chat Window */}
            {isOpen && (
                <div
                    className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[99999] w-[95vw] sm:w-[420px] md:w-[450px] h-[640px] max-h-[90vh] rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col bg-[#0b1329] border-2 border-slate-700/90 text-white animate-in fade-in slide-in-from-bottom-3 duration-200 overscroll-contain"
                    style={{ fontFamily: 'Inter, sans-serif', overscrollBehavior: 'contain' }}
                    onWheel={(e) => e.stopPropagation()}
                >
                    {/* Top Header */}
                    <div className="px-4 py-3 bg-[#0e1b3d] border-b border-slate-700/80 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-2.5">
                            <div className="relative">
                                <div className="w-9 h-9 rounded-xl bg-[#FECB00] flex items-center justify-center text-[#070b15] font-black shadow-sm">
                                    <SunIcon className="w-5 h-5 text-[#070b15]" />
                                </div>
                                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0e1b3d]"></span>
                            </div>
                            <div>
                                <div className="flex items-center gap-1.5">
                                    <h3 className="font-extrabold text-sm text-white tracking-tight">Divvy Solar Assistant</h3>
                                    <SparklesIcon className="w-3.5 h-3.5 text-[#FECB00]" />
                                </div>
                                <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                                    ● Online
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={handleResetChat}
                                className="p-1.5 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                                title="Restart Conversation"
                            >
                                <ArrowPathIcon className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                                title="Close Chat"
                            >
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Messages & Embedded Interactive Form Body */}
                    <div
                        ref={chatBodyRef}
                        className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm custom-scrollbar bg-[#080e1e] overscroll-contain"
                        style={{ overscrollBehavior: 'contain' }}
                        onWheel={(e) => e.stopPropagation()}
                    >

                        {/* 1. Welcome Greeting Card */}
                        <div className="flex flex-col items-start">
                            <div className="max-w-[94%] rounded-2xl p-3.5 leading-relaxed bg-[#18233c] text-white rounded-bl-none border border-slate-600/60 shadow-md">
                                <div className="text-[13px] sm:text-[14px] text-[#f8fafc] space-y-1.5">
                                    <p>Hello! 👋 Welcome to <strong className="text-[#FECB00]">Divvy Solar</strong>.</p>
                                    <p className="text-xs text-slate-300">
                                        I am your 24/7 AI Solar Engineer. Get your <strong>Free 3D Solar Layout, PM Surya Ghar Subsidy (up to ₹78,000) & Quotation</strong> below, or ask any question! ☀️
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 2. DIRECT INLINE QUALITY LEAD FORM CARD (Always visible inside Chatbot) */}
                        <div className="rounded-2xl p-4 bg-[#0e1b3d] border-2 border-[#FECB00]/40 shadow-xl space-y-3 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-28 h-28 bg-[#FECB00]/10 rounded-full blur-2xl pointer-events-none"></div>

                            {formSuccess ? (
                                <div className="py-3 text-center space-y-2 animate-in fade-in zoom-in duration-200">
                                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                                        <CheckCircleIcon className="w-7 h-7" />
                                    </div>
                                    <h4 className="text-sm font-black text-white">✅ Solar Audit Request Received!</h4>
                                    <p className="text-[11px] text-slate-300 max-w-xs mx-auto">
                                        Thank you, <strong className="text-white">{formData.name || 'Client'}</strong>! Our Senior Engineer will call you on <strong className="text-[#FECB00]">+91 {formData.phone}</strong> with your customized 3D design.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleFormSubmit} className="space-y-2.5">
                                    <div className="flex items-center justify-between border-b border-slate-700/80 pb-2">
                                        <div className="flex items-center gap-1.5">
                                            <span className="p-1 rounded-lg bg-[#FECB00] text-[#070b15] font-black text-[10px]">3D</span>
                                            <span className="font-extrabold text-xs text-white">Request Free 3D Solar Design & Quotation</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-emerald-400">● 100% Free</span>
                                    </div>

                                    {formError && (
                                        <div className="p-2 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 text-[11px] font-medium">
                                            ⚠️ {formError}
                                        </div>
                                    )}

                                    {/* Name & Phone in 2-column on mobile */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        <div>
                                            <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                placeholder="e.g. Ramesh Kumar"
                                                className="w-full bg-[#080e1e] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#FECB00]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                                                WhatsApp / Mobile *
                                            </label>
                                            <div className="relative">
                                                <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-xs font-bold text-slate-400">
                                                    +91
                                                </span>
                                                <input
                                                    type="tel"
                                                    required
                                                    maxLength={10}
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, '') }))}
                                                    placeholder="9876501234"
                                                    className="w-full bg-[#080e1e] border border-slate-700 rounded-xl pl-10 pr-3 py-2 text-xs text-white font-mono placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#FECB00]"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* City & Monthly Bill in 2-column */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        <div>
                                            <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                                                City / Location *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.location}
                                                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                                placeholder="e.g. Hisar, Ludhiana..."
                                                className="w-full bg-[#080e1e] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#FECB00]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                                                Monthly Bill
                                            </label>
                                            <select
                                                value={formData.monthlyBill}
                                                onChange={(e) => setFormData(prev => ({ ...prev, monthlyBill: e.target.value }))}
                                                className="w-full bg-[#080e1e] border border-slate-700 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#FECB00] cursor-pointer"
                                            >
                                                {BILL_RANGES.map((b, bIdx) => (
                                                    <option key={bIdx} value={b} className="bg-[#0b1329] text-white">{b}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Property Type Selector */}
                                    <div>
                                        <div className="grid grid-cols-3 gap-1 pt-0.5">
                                            {PROPERTY_TYPES.map((pt, ptIdx) => {
                                                const isSel = formData.propertyType === pt.label;
                                                return (
                                                    <button
                                                        type="button"
                                                        key={ptIdx}
                                                        onClick={() => setFormData(prev => ({ ...prev, propertyType: pt.label }))}
                                                        className={`py-1.5 px-2 rounded-lg border text-[10px] font-bold flex items-center justify-center gap-1 transition-all ${isSel
                                                                ? "bg-[#FECB00]/20 border-[#FECB00] text-[#FECB00]"
                                                                : "bg-[#080e1e] border-slate-700/80 text-slate-400 hover:text-white"
                                                            }`}
                                                    >
                                                        <pt.icon className="w-3 h-3" />
                                                        <span>{pt.label}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={formSubmitting}
                                        className="w-full py-2.5 px-4 rounded-xl text-[#070b15] font-black text-xs tracking-tight shadow-[0_4px_15px_rgba(254,203,0,0.3)] transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5 mt-1"
                                        style={{ background: 'linear-gradient(135deg, #FECB00, #EBB800)' }}
                                    >
                                        {formSubmitting ? (
                                            <div className="w-3.5 h-3.5 border-2 border-[#070b15]/30 border-t-[#070b15] rounded-full animate-spin"></div>
                                        ) : (
                                            <span>🚀 Submit for Free 3D Design & Price</span>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* 3. Conversation Messages Stream */}
                        {messages.map((m, idx) => {
                            const isUser = m.sender === 'user';
                            return (
                                <div
                                    key={idx}
                                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                                >
                                    <div
                                        className={`max-w-[88%] rounded-2xl p-3.5 leading-relaxed shadow-md ${isUser
                                                ? 'bg-[#FECB00] text-[#070b15] font-bold rounded-br-none'
                                                : 'bg-[#18233c] text-white rounded-bl-none border border-slate-600/60'
                                            }`}
                                    >
                                        <div className="whitespace-pre-wrap text-[13px] sm:text-[14px]">
                                            {m.text.split('\n').map((line, lIdx) => (
                                                <p
                                                    key={lIdx}
                                                    className={line.startsWith('•') || line.startsWith('✅') || line.startsWith('💰') || line.startsWith('⚡') ? 'my-1 pl-1 font-medium' : 'mb-1'}
                                                    style={{ color: isUser ? '#070b15' : '#f8fafc' }}
                                                >
                                                    {line.includes('**') ? (
                                                        <span>
                                                            {line.split('**').map((seg, sIdx) =>
                                                                sIdx % 2 === 1 ? (
                                                                    <strong
                                                                        key={sIdx}
                                                                        className={isUser ? "text-[#070b15] font-black" : "text-[#FECB00] font-bold"}
                                                                        style={{ color: isUser ? '#070b15' : '#FECB00' }}
                                                                    >
                                                                        {seg}
                                                                    </strong>
                                                                ) : seg
                                                            )}
                                                        </span>
                                                    ) : (
                                                        line
                                                    )}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                    <span className="text-[9px] text-slate-400 mt-1 px-1">
                                        {m.timestamp ? new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                    </span>
                                </div>
                            );
                        })}

                        {/* Typing Animation Indicator */}
                        {isTyping && (
                            <div className="flex items-center gap-1.5 bg-[#18233c] border border-slate-600/60 w-16 px-3 py-2.5 rounded-2xl rounded-bl-none">
                                <span className="w-1.5 h-1.5 bg-[#FECB00] rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-[#FECB00] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                <span className="w-1.5 h-1.5 bg-[#FECB00] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                            </div>
                        )}

                        <div className="h-1" />
                    </div>

                    {/* Amazon / Flipkart Style "Categorized Frequent Queries Hub" */}
                    <div className="bg-[#091126] border-t border-slate-700/80 shrink-0">
                        {/* Category Selector Tabs */}
                        <div className="px-3 pt-2 pb-1.5 flex gap-1.5 overflow-x-auto no-scrollbar">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`whitespace-nowrap px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${selectedCategory === cat.id
                                            ? "bg-[#FECB00]/20 text-[#FECB00] border border-[#FECB00]/50"
                                            : "bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700/50"
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        {/* Queries for Selected Category */}
                        <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto no-scrollbar">
                            {currentCategoryObj.queries.map((qItem, qIdx) => (
                                <button
                                    key={qIdx}
                                    onClick={() => handleSend(qItem.query)}
                                    className="whitespace-nowrap px-3 py-1.5 rounded-xl text-[11px] font-bold bg-slate-800 hover:bg-[#FECB00] text-slate-200 hover:text-[#070b15] border border-slate-600 transition-colors cursor-pointer shrink-0"
                                >
                                    {qItem.label} →
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Input Field for Free-form Questions */}
                    <div className="p-3 bg-[#0e1b3d] border-t border-slate-700 shrink-0">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSend();
                            }}
                            className="flex items-center gap-2 relative"
                        >
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask any solar question (e.g. 5kW cost, subsidy)..."
                                className="flex-1 bg-[#080e1e] border border-slate-600 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FECB00] focus:border-[#FECB00] transition-all"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isTyping}
                                className="w-10 h-10 rounded-xl flex items-center justify-center text-[#070b15] font-bold transition-all disabled:opacity-30 disabled:scale-95 hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
                                style={{ background: 'linear-gradient(135deg, #FECB00, #EBB800)', boxShadow: '0 0 15px rgba(254,203,0,0.3)' }}
                                aria-label="Send Message"
                            >
                                <PaperAirplaneIcon className="w-4 h-4 text-[#070b15] -rotate-45" />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

