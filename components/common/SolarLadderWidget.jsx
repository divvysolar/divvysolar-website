"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ChatBubbleLeftRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

const SolarLadderWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const isOpenRef = useRef(isOpen);
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith('/admin');
    const [iframeLoading, setIframeLoading] = useState(true);

    const toggleChat = useCallback((forceState) => {
        setIsOpen((prev) => {
            const nextState = typeof forceState === 'boolean' ? forceState : !prev;
            isOpenRef.current = nextState;
            // Lock/unlock body scroll when chat opens/closes
            if (typeof document !== 'undefined') {
                document.body.style.overflow = nextState ? 'hidden' : '';
            }
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('solarChat:status', { detail: nextState }));
            }
            return nextState;
        });
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined' || isAdminPage) return;

        const handleOpenEvent = () => toggleChat(true);
        window.addEventListener('solarChat:open', handleOpenEvent);

        window.solarChat = {
            open: () => toggleChat(true),
            close: () => toggleChat(false),
            toggle: () => toggleChat(),
            isOpen: () => isOpenRef.current
        };
        window.slToggleChatWidget = toggleChat;

        const timeout = setTimeout(() => setIframeLoading(false), 10000);

        return () => {
            window.removeEventListener('solarChat:open', handleOpenEvent);
            delete window.solarChat;
            delete window.slToggleChatWidget;
            clearTimeout(timeout);
            // Ensure body scroll is restored on unmount
            document.body.style.overflow = '';
        };
    }, [isAdminPage, toggleChat]);

    if (isAdminPage) return null;

    const config = {
        chatButtonText: "Ask an Expert",
        chatHeaderText: "Solar Assistant ☀️",
        landingPageURL: "https://solarladder.com/customleads/WGAHrIEFbJS8EHOsaKw3/poaOeyd6qDgDLAi9RKP9",
        color: "#0e1b3d",
    };

    return (
        <>
            {/* ── TRIGGER BUTTON (always visible, bottom-right) ── */}
            <button
                id="slChatButton"
                onClick={() => toggleChat()}
                className={`
                    fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[99998]
                    flex items-center gap-2 px-4 py-2.5 rounded-full text-white font-bold
                    shadow-xl transition-all duration-300 hover:scale-105 active:scale-95
                    ${isOpen ? 'bg-red-500 hover:bg-red-600' : ''}
                `}
                style={{ backgroundColor: isOpen ? undefined : config.color }}
                aria-label={isOpen ? "Close Chat" : "Open Chat"}
            >
                {isOpen ? (
                    <>
                        <XMarkIcon className="w-4 h-4" />
                        <span className="text-xs font-bold whitespace-nowrap">Close</span>
                    </>
                ) : (
                    <>
                        <ChatBubbleLeftRightIcon className="w-4 h-4" />
                        <span className="text-xs font-bold whitespace-nowrap">{config.chatButtonText}</span>
                    </>
                )}
            </button>

            {/* ── BACKDROP (mobile full-overlay, desktop transparent) ── */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[99999] md:pointer-events-none"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                    onClick={() => toggleChat(false)}
                />
            )}

            {/* ── CHAT PANEL ── */}
            <div
                className={`
                    fixed z-[999999]
                    bottom-0 left-0 right-0 h-[90svh]
                    md:bottom-20 md:left-auto md:right-4 md:h-[520px] md:w-[340px] md:rounded-xl
                    bg-white flex flex-col shadow-2xl
                    rounded-t-2xl border border-gray-100
                    transition-[transform,opacity] duration-400 ease-out
                    ${isOpen
                        ? 'translate-y-0 opacity-100 pointer-events-auto'
                        : 'translate-y-[150%] opacity-0 pointer-events-none'
                    }
                `}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div
                    className="flex items-center justify-between px-4 py-3 shrink-0"
                    style={{ backgroundColor: config.color }}
                >
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-white text-sm font-bold tracking-wide uppercase">
                            {config.chatHeaderText}
                        </span>
                    </div>
                    <button
                        onClick={() => toggleChat(false)}
                        className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1.5 transition-all"
                        aria-label="Close Chat"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Iframe Area - NO overflow:hidden - fixes Chrome DevTools iframe click bug */}
                <div className="flex-1 relative w-full bg-white" style={{ isolation: 'isolate' }}>
                    {iframeLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 pointer-events-none">
                            <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-700 rounded-full animate-spin mb-3" />
                            <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase animate-pulse">Connecting...</p>
                        </div>
                    )}
                    <iframe
                        src={config.landingPageURL}
                        title="Solar Assistant Chat"
                        className="absolute inset-0 w-full h-full border-none"
                        style={{
                            opacity: iframeLoading ? 0 : 1,
                            transition: 'opacity 0.4s ease',
                            pointerEvents: 'auto',
                        }}
                        onLoad={() => setIframeLoading(false)}
                        allow="microphone; camera"
                    />
                </div>
            </div>
        </>
    );
};

export default SolarLadderWidget;
