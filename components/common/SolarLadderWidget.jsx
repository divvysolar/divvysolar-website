"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const SolarLadderWidget = () => {
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith('/admin');

    if (isAdminPage) return null;

    const config = {
        chatButtonText: "Ask an Expert",
        color: "#0e1b3d",
    };

    return (
        <Link
            href="/contact"
            id="slChatButton"
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[99998] flex items-center gap-2 px-4 py-2.5 rounded-full text-white font-bold shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group"
            style={{ backgroundColor: config.color }}
            aria-label="Contact an Expert"
        >
            <ChatBubbleLeftRightIcon className="w-4 h-4 transition-transform group-hover:rotate-12" />
            <span className="text-xs font-bold whitespace-nowrap">{config.chatButtonText}</span>
        </Link>
    );
};

export default SolarLadderWidget;
