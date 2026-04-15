"use client";

import { useEffect, useState } from "react";
import {
    UsersIcon,
    DocumentTextIcon,
    ChartBarIcon,
    ArrowTrendingUpIcon,
    ArrowRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Dashboard() {
    const [stats, setStats] = useState({
        leads: { total: 0, new: 0 },
        blogs: { total: 0, published: 0 }
    });
    const [loading, setLoading] = useState(true);
    const [recentLeads, setRecentLeads] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const [leadsRes, blogsRes] = await Promise.all([
                    fetch('/api/leads?limit=100'),
                    fetch('/api/blogs?limit=50&published=all')
                ]);
                
                let leadsData = { success: false, data: [] };
                let blogsData = { success: false, data: [] };
                
                if (leadsRes.ok) leadsData = await leadsRes.json().catch(() => ({ success: false, data: [] }));
                if (blogsRes.ok) blogsData = await blogsRes.json().catch(() => ({ success: false, data: [] }));

                const leads = leadsData?.data || [];
                const blogs = blogsData?.data || [];
                
                setStats({
                    leads: { total: leads.length, new: leads.filter(l => l.status === 'new').length },
                    blogs: { total: blogs.length, published: blogs.filter(b => b.published).length }
                });
                setRecentLeads(leads.slice(0, 5));
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
                // Fallback to empty state on critical failure to prevent UI collapse
                setStats({
                    leads: { total: 0, new: 0 },
                    blogs: { total: 0, published: 0 }
                });
                setRecentLeads([]);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const statCards = [
        {
            name: 'Total Leads',
            value: stats.leads.total,
            icon: UsersIcon,
            gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            glow: 'rgba(59,130,246,0.25)',
            sub: 'All time submissions'
        },
        {
            name: 'New Leads',
            value: stats.leads.new,
            icon: ArrowTrendingUpIcon,
            gradient: 'linear-gradient(135deg, #10b981, #059669)',
            glow: 'rgba(16,185,129,0.25)',
            sub: 'Awaiting contact'
        },
        {
            name: 'Total Blogs',
            value: stats.blogs.total,
            icon: DocumentTextIcon,
            gradient: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
            glow: 'rgba(139,92,246,0.25)',
            sub: 'All articles'
        },
        {
            name: 'Published',
            value: stats.blogs.published,
            icon: ChartBarIcon,
            gradient: 'linear-gradient(135deg, #FECB00, #EBB800)',
            glow: 'rgba(254,203,0,0.25)',
            sub: 'Live on website'
        },
    ];

    const statusColors = {
        New: { bg: 'rgba(59,130,246,0.15)', text: '#3b82f6', dot: '#3b82f6' },
        Contacted: { bg: 'rgba(245,158,11,0.15)', text: '#f59e0b', dot: '#f59e0b' },
        Converted: { bg: 'rgba(16,185,129,0.15)', text: '#10b981', dot: '#10b981' },
    };

    if (loading) {
        return (
            <div className="space-y-8 animate-pulse">
                <div className="h-8 w-64 bg-white/5 rounded-lg" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-32 bg-white/5 rounded-2xl border border-white/10" />
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div className="lg:col-span-3 h-64 bg-white/5 rounded-2xl border border-white/10" />
                    <div className="lg:col-span-2 h-64 bg-white/5 rounded-2xl border border-white/10" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Dashboard Overview</h1>
                <p className="text-white/50 mt-1 text-sm">Welcome back. Here's what's happening today.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {statCards.map((item) => (
                    <div key={item.name} className="rounded-2xl p-4 md:p-5 transition-transform duration-200 hover:-translate-y-0.5 bg-white/5 border border-white/10 shadow-xl"
                        style={{ boxShadow: `0 0 30px ${item.glow}` }}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: item.gradient }}>
                                <item.icon className="w-5 h-5 text-white" />
                            </div>
                        </div>
                        <p className="text-3xl font-black text-white">{item.value}</p>
                        <p className="text-white/50 text-sm font-semibold mt-1">{item.name}</p>
                        <p className="text-white/50 opacity-60 text-xs mt-0.5">{item.sub}</p>
                    </div>
                ))}
            </div>

            {/* Recent Leads + Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Recent Leads */}
                <div className="lg:col-span-3 rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-xl">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                        <h2 className="text-white font-bold text-base">Recent Leads</h2>
                        <Link href="/admin/leads" className="text-[#FECB00] hover:text-[#EBB800] text-sm font-medium flex items-center gap-1 transition-colors">
                            View all <ArrowRightIcon className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                    <div className="divide-y divide-white/10">
                        {!recentLeads || recentLeads.length === 0 ? (
                            <p className="px-6 py-8 text-white/50 text-sm text-center border-t border-white/10">No leads yet.</p>
                        ) : (recentLeads || []).map((lead) => {
                            const sc = statusColors[lead.status] || statusColors.New;
                            return (
                                <div key={lead._id} className="flex items-center justify-between px-6 py-3.5 hover:bg-white/5 transition-colors border-t border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white uppercase flex-shrink-0"
                                            style={{ background: 'linear-gradient(135deg, #FECB00, #FAD02C)' }}>
                                            {lead.name?.[0] || '?'}
                                        </div>
                                        <div>
                                            <p className="text-white text-sm font-semibold leading-none">{lead.name}</p>
                                            <p className="text-white/50 text-xs mt-0.5">{lead.location || lead.email}</p>
                                        </div>
                                    </div>
                                    <span className="px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"
                                        style={{ background: sc.bg, color: sc.text }}>
                                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: sc.dot }}></span>
                                        {lead.status}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                    <div className="rounded-2xl p-5 flex-1 bg-white/5 border border-white/10 shadow-xl">
                        <h2 className="text-white font-bold text-base mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link href="/admin/leads"
                                className="flex items-center justify-between p-4 rounded-xl transition-all duration-150 group"
                                style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.18)' }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.14)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(59,130,246,0.08)'}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>
                                        <UsersIcon className="w-4.5 h-4.5 text-white w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-semibold leading-none">View Leads</p>
                                        <p className="text-white/50 text-xs mt-0.5">Manage inquiries</p>
                                    </div>
                                </div>
                                <ArrowRightIcon className="w-4 h-4 text-white/50 group-hover:text-blue-500 transition-colors" />
                            </Link>

                            <Link href="/admin/blogs/new"
                                className="flex items-center justify-between p-4 rounded-xl transition-all duration-150 group"
                                style={{ background: 'rgba(254,203,0,0.08)', border: '1px solid rgba(254,203,0,0.18)' }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(254,203,0,0.14)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(254,203,0,0.08)'}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FECB00, #EBB800)' }}>
                                        <DocumentTextIcon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-semibold leading-none">New Blog Post</p>
                                        <p className="text-white/50 text-xs mt-0.5">Write & publish</p>
                                    </div>
                                </div>
                                <ArrowRightIcon className="w-4 h-4 text-white/50 group-hover:text-[#FECB00] transition-colors" />
                            </Link>

                            <Link href="/admin/blogs"
                                className="flex items-center justify-between p-4 rounded-xl transition-all duration-150 group"
                                style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.18)' }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.14)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(139,92,246,0.08)'}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}>
                                        <DocumentTextIcon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-semibold leading-none">Manage Blogs</p>
                                        <p className="text-white/50 text-xs mt-0.5">Edit / delete articles</p>
                                    </div>
                                </div>
                                <ArrowRightIcon className="w-4 h-4 text-white/50 group-hover:text-purple-500 transition-colors" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
