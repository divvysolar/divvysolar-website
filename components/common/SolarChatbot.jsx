"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
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
                    const hasLead = data.data.some(m => m.text?.includes('[Submitted Solar Quotation Request]') || m.text?.includes('[Submitted Free 3D Solar Audit Form]') || m.text?.includes('Got your number'));
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
                        text: `📋 **[Submitted Solar Quotation Request]**\n• Name: ${formData.name}\n• Phone: +91 ${cleanPhone}\n• City: ${formData.location}\n• Monthly Bill: ${formData.monthlyBill}\n• Property Type: ${formData.propertyType}`,
                        timestamp: new Date()
                    },
                    {
                        sender: 'bot',
                        text: data.reply || `🎉 **Thank you ${formData.name}! Your request has been received.**\n\nOur Senior Solar EPC Engineer is reviewing your requirements and will connect with you on WhatsApp / Call shortly with your **System Sizing, PM Surya Ghar Subsidy calculation & detailed quotation**.`,
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

    return (
        <>
            {/* Collapsed Floating Trigger Button - High-Definition & Enhanced Size */}
            {!isOpen && (
                <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9998] flex flex-row-reverse items-center gap-3 group">
                    <button
                        onClick={toggleOpen}
                        id="solarChatFloatingBtn"
                        className="relative flex items-center justify-center w-[58px] h-[58px] md:w-[64px] md:h-[64px] rounded-full bg-white p-[2px] shadow-[0_8px_30px_rgba(254,203,0,0.5)] hover:shadow-[0_12px_40px_rgba(254,203,0,0.75)] border-2 border-[#FECB00] transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
                        aria-label="Chat with Solar AI Assistant"
                    >
                        {/* Subtle gold glow pulse */}
                        <span className="absolute inset-0 rounded-full bg-[#FECB00] animate-ping opacity-25 pointer-events-none"></span>

                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden p-0 relative z-10">
                            <Image
                                src="/da1ab346-9490-40fd-8f47-b0dbcdd245db.png"
                                alt="Solar AI Assistant"
                                width={64}
                                height={64}
                                quality={100}
                                priority
                                className="w-full h-full object-contain scale-110 drop-shadow-sm"
                            />
                        </div>

                        {/* Online Indicator Green Dot */}
                        <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-md z-20 flex items-center justify-center">
                            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                        </span>

                        {hasUnread && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse z-20"></span>
                        )}
                    </button>

                    {/* Smooth Tooltip Pill on Hover */}
                    <span className="hidden sm:inline-flex items-center gap-1.5 bg-[#0e1b3d] text-[#FECB00] text-xs font-bold py-1.5 px-3.5 rounded-full shadow-lg opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none border border-white/10 whitespace-nowrap">
                        <SparklesIcon className="w-3.5 h-3.5 text-[#FECB00]" />
                        <span>Ask Solar AI</span>
                    </span>
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
                                <div className="w-12 h-12 rounded-2xl bg-white p-0.5 flex items-center justify-center shadow-md overflow-hidden border border-white/30">
                                    <Image
                                        src="/da1ab346-9490-40fd-8f47-b0dbcdd245db.png"
                                        alt="Solar Expert Assistant"
                                        width={48}
                                        height={48}
                                        quality={100}
                                        className="w-full h-full object-contain scale-110"
                                    />
                                </div>
                                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0e1b3d]"></span>
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
                                        I am your 24/7 AI Solar Engineer. Get your <strong>Solar Sizing, PM Surya Ghar Subsidy (up to ₹78,000) & Instant Quotation</strong> below, or ask any question! ☀️
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
                                    <h4 className="text-sm font-black text-white">✅ Solar Quotation Request Received!</h4>
                                    <p className="text-[11px] text-slate-300 max-w-xs mx-auto">
                                        Thank you, <strong className="text-white">{formData.name || 'Client'}</strong>! Our Senior Solar Engineer will call you on <strong className="text-[#FECB00]">+91 {formData.phone}</strong> with your customized solar proposal & subsidy details.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleFormSubmit} className="space-y-2.5">
                                    <div className="flex items-center justify-between border-b border-slate-700/80 pb-2">
                                        <div className="flex items-center gap-1.5">
                                            <span className="px-1.5 py-0.5 rounded-lg bg-[#FECB00] text-[#070b15] font-black text-[10px]">QUOTE</span>
                                            <span className="font-extrabold text-xs text-white">Request Solar Sizing & Free Quotation</span>
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
                                            <span>🚀 Get Free Solar Quotation & Feasibility</span>
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

