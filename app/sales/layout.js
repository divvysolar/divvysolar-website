"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
    CurrencyRupeeIcon,
    ArrowLeftOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
    SunIcon,
    ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";
import { CurrencyRupeeIcon as CurrencySolid } from "@heroicons/react/24/solid";

export default function SalesLayout({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        // If not logged in and not on the sales login page, redirect to login
        if (status === "unauthenticated" && pathname !== "/sales") {
            router.push("/sales");
        }
        // If logged in
        if (status === "authenticated") {
            const role = session?.user?.role;
            if (role === "admin") {
                router.push("/admin/dashboard");
            } else if (role === "salesperson") {
                if (pathname === "/sales") {
                    router.push("/sales/pricing");
                }
            } else if (role) {
                // If they have a role but it's neither admin nor salesperson, sign them out
                signOut({ callbackUrl: "/sales" });
            }
            // If role is undefined, we just wait (NextAuth might be hydrating)
        }
    }, [status, pathname, router, session]);

    // Sales login page — render without the sidebar shell
    if (pathname === "/sales") {
        return <div className="min-h-screen">{children}</div>;
    }

    // Not authenticated and not on login page — render nothing while redirecting
    if (status === "unauthenticated" && pathname !== "/sales") {
        return null;
    }

    // Not salesperson — render nothing while redirecting
    if (status === "authenticated" && session?.user?.role !== "salesperson") {
        return null;
    }

    // Loading spinner
    if (status === "loading") {
        return (
            <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative w-14 h-14" style={{ width: "56px", height: "56px" }}>
                        <div className="absolute inset-0 rounded-full border-4 border-[#FECB00]/20" />
                        <div className="absolute inset-0 rounded-full border-4 border-t-[#FECB00] animate-spin" />
                    </div>
                    <p className="text-white/50 text-sm font-medium tracking-wider uppercase">
                        Loading
                    </p>
                </div>
            </div>
        );
    }

    const navigation = [
        { name: "Pricing Calculator", href: "/sales/pricing", icon: CurrencyRupeeIcon, solidIcon: CurrencySolid },
    ];

    const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);

    return (
        <div className="min-h-screen bg-[#0f172a] flex print:bg-white" style={{ fontFamily: "Inter" }}>
            {/* ─── Desktop Sidebar ─── */}
            <aside className="hidden md:flex w-64 flex-shrink-0 flex-col h-screen sticky top-0 bg-[#0f172a] border-r border-white/10 print:hidden">
                {/* Logo */}
                <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
                    <div
                        className="w-9 h-9 flex-shrink-0 rounded-xl flex items-center justify-center"
                        style={{
                            background: "linear-gradient(135deg, #FECB00, #FAD02C)",
                            width: "36px",
                            height: "36px",
                        }}
                    >
                        <SunIcon className="w-5 h-5 text-white" style={{ width: "20px", height: "20px" }} />
                    </div>
                    <div className="min-w-0">
                        <p className="text-white font-bold text-sm leading-none">DIVVY SOLAR</p>
                        <p className="text-[#FECB00] text-xs font-medium tracking-wider mt-0.5">SALES PORTAL</p>
                    </div>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 px-3 py-4 space-y-1">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-white/50 hover:text-[#FECB00] hover:bg-white/5 mb-4 border border-transparent"
                    >
                        <ArrowUturnLeftIcon className="w-5 h-5 flex-shrink-0" />
                        <span>Back to Website</span>
                    </Link>
                    {navigation.map((item) => {
                        const active = isActive(item.href);
                        const Icon = active ? item.solidIcon : item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                                    active ? "text-[#FECB00]" : "text-white/50 hover:text-[#FECB00]"
                                }`}
                                style={{
                                    background: active ? "rgba(254,203,0,0.1)" : "transparent",
                                    border: active ? "1px solid rgba(254,203,0,0.2)" : "1px solid transparent",
                                }}
                            >
                                <Icon className="w-5 h-5 flex-shrink-0" />
                                <span>{item.name}</span>
                                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FECB00]" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Footer */}
                <div className="p-3 border-t border-white/10">
                    <div className="flex items-center gap-3 px-3 py-2 mb-2 rounded-xl bg-white/5">
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white uppercase flex-shrink-0"
                            style={{ background: "linear-gradient(135deg, #FECB00, #FAD02C)" }}
                        >
                            {session?.user?.name?.[0] || "S"}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-semibold truncate leading-none">
                                {session?.user?.name || "Sales User"}
                            </p>
                            <p className="text-white/50 text-xs truncate mt-0.5">{session?.user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => signOut({ callbackUrl: "/sales" })}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-white/50 hover:bg-red-500/10 hover:text-red-500"
                    >
                        <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>
 
            {/* ─── Mobile Overlay Sidebar ─── */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 md:hidden flex print:hidden">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
                    <aside className="relative w-72 h-full flex flex-col z-10 bg-[#0f172a] border-r border-white/10">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                                    style={{ background: "linear-gradient(135deg, #FECB00, #FAD02C)" }}
                                >
                                    <SunIcon className="w-4 h-4 text-white" />
                                </div>
                                <p className="text-white font-bold text-sm">SALES PORTAL</p>
                            </div>
                            <button
                                onClick={() => setMobileOpen(false)}
                                className="text-white/50 hover:text-white p-1 rounded-lg transition-colors"
                            >
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>
                        <nav className="flex-1 px-3 py-4 space-y-1">
                            <Link
                                href="/"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-150 text-white/50 hover:text-[#FECB00] hover:bg-white/5 mb-4 border border-transparent"
                            >
                                <ArrowUturnLeftIcon className="w-5 h-5 flex-shrink-0" />
                                <span>Back to Website</span>
                            </Link>
                            {navigation.map((item) => {
                                const active = isActive(item.href);
                                const Icon = active ? item.solidIcon : item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                                            active ? "text-[#FECB00]" : "text-white/50"
                                        }`}
                                        style={{
                                            background: active ? "rgba(254,203,0,0.1)" : "transparent",
                                            border: active ? "1px solid rgba(254,203,0,0.2)" : "1px solid transparent",
                                        }}
                                    >
                                        <Icon className="w-5 h-5 flex-shrink-0" />
                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                        <div className="p-3 border-t border-white/10">
                            <div className="flex items-center gap-3 px-3 py-2 mb-2 rounded-xl bg-white/5">
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white uppercase flex-shrink-0"
                                    style={{ background: "linear-gradient(135deg, #FECB00, #FAD02C)" }}
                                >
                                    {session?.user?.name?.[0] || "S"}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white text-sm font-semibold truncate leading-none">
                                        {session?.user?.name || "Sales User"}
                                    </p>
                                    <p className="text-white/50 text-xs truncate mt-0.5">{session?.user?.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setMobileOpen(false);
                                    signOut({ callbackUrl: "/sales" });
                                }}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-white/50 hover:bg-red-500/10 hover:text-red-500"
                            >
                                <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </aside>
                </div>
            )}

            {/* ─── Main Content Area ─── */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden print:overflow-visible print:h-auto print:bg-white">
                {/* Top Header */}
                <header className="flex items-center justify-between px-4 md:px-8 py-4 sticky top-0 z-40 bg-[#0f172a] border-b border-white/10 backdrop-blur-md print:hidden">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setMobileOpen(true)}
                            className="md:hidden text-white/50 hover:text-white p-1.5 rounded-lg bg-white/5 transition-colors border border-white/10"
                        >
                            <Bars3Icon className="w-5 h-5" />
                        </button>
                        <h1 className="text-white font-bold text-sm md:text-base">
                            Divvy Solar — Sales Portal
                        </h1>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-[#0f172a] selection:bg-[#FECB00]/30 print:!bg-white print:overflow-visible">
                    <div className="max-w-7xl mx-auto p-4 md:p-8">{children}</div>
                </main>
            </div>
        </div>
    );
}
