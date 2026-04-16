"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { MagnifyingGlassIcon, FunnelIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

export default function AdminLeads() {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/leads?limit=200");
            const data = await res.json();
            if (data.success) {
                setLeads(data.data || []);
            }
        } catch (error) {
            console.error("Error fetching leads:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredLeads = (leads || []).filter(lead => {
        const matchesSearch =
            String(lead?.name || '').toLowerCase().includes(search.toLowerCase()) ||
            String(lead?.email || '').toLowerCase().includes(search.toLowerCase()) ||
            String(lead?.whatsapp || '').includes(search) ||
            String(lead?.location || '').toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "All" || lead.status === filter;
        return matchesSearch && matchesFilter;
    });

    const getStatusStyle = (status) => {
        switch (status) {
            case 'new': return { bg: 'rgba(59,130,246,0.15)', text: '#3b82f6', dot: '#3b82f6' };
            case 'contacted': return { bg: 'rgba(254,203,0,0.15)', text: '#FECB00', dot: '#FECB00' };
            case 'converted': return { bg: 'rgba(16,185,129,0.15)', text: '#10b981', dot: '#10b981' };
            case 'rejected': return { bg: 'rgba(239,68,68,0.15)', text: '#ef4444', dot: '#ef4444' };
            default: return { bg: 'rgba(107,114,128,0.15)', text: '#6b7280', dot: '#4b5563' };
        }
    };

    const exportCSV = () => {
        if (leads.length === 0) return;
        const headers = ["Date", "Name", "Email", "WhatsApp", "Service Type", "Location", "Monthly Bill", "Status"];
        const rows = filteredLeads.map(lead => [
            format(new Date(lead.createdAt), 'yyyy-MM-dd HH:mm'),
            `"${lead.name || ''}"`,
            lead.email || '',
            `'${lead.whatsapp || ''}'`,
            lead.serviceType || '',
            `"${lead.location || ''}"`,
            `"${lead.monthlyBill || ''}"`,
            lead.status || 'New'
        ]);
        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `divvy-leads-${format(new Date(), 'yyyy-MM-dd')}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Lead Management</h1>
                    <p className="text-white/50 mt-1 text-sm">Review, track, and export consultation requests.</p>
                </div>
                <button onClick={exportCSV} disabled={leads.length === 0}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 4px 14px rgba(16,185,129,0.25)' }}>
                    <ArrowDownTrayIcon className="w-4 h-4" /> Export CSV
                </button>
            </div>

            {/* Filters */}
            <div className="rounded-2xl p-4 flex flex-col sm:flex-row gap-4 bg-white/5 border border-white/10 shadow-xl">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-4 w-4 text-white/50 opacity-50" aria-hidden="true" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#FECB00] focus:border-[#FECB00] sm:text-sm transition-all"
                        placeholder="Search name, phone, location..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="relative w-full sm:w-48">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FunnelIcon className="h-4 w-4 text-white/50 opacity-50" aria-hidden="true" />
                    </div>
                    <select
                        className="block w-full pl-9 pr-10 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-[#FECB00] focus:border-[#FECB00] sm:text-sm appearance-none cursor-pointer transition-all"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="All">All Statuses</option>
                        <option value="New">New Only</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Converted">Converted</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>

            {/* Table wrapper */}
            <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-xl">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-white/10">
                        <thead className="hover:bg-white/5">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-white/50 uppercase tracking-wider">Date</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-white/50 uppercase tracking-wider">Contact Details</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-white/50 uppercase tracking-wider">Property Info</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-white/50 uppercase tracking-wider text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-8 h-8 rounded-full border-2 border-[#FECB00]/20 border-t-[#FECB00] animate-spin"></div>
                                            <span className="text-white/50 text-sm">Loading leads...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredLeads.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-16 text-center text-white/50 text-sm border-t border-white/10">
                                        No leads found matching your search criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredLeads.map((lead) => {
                                    const sc = getStatusStyle(lead.status);
                                    return (
                                        <tr key={lead._id} className="hover:bg-white/5 transition-colors group border-t border-white/10">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <p className="text-sm font-medium text-white">
                                                    {lead.createdAt ? format(new Date(lead.createdAt), 'MMM dd, yyyy') : 'Recently'}
                                                </p>
                                                <p className="text-xs text-white/50 mt-1">
                                                    {lead.createdAt ? format(new Date(lead.createdAt), 'hh:mm a') : 'N/A'}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <p className="text-sm font-bold text-white group-hover:text-[#FECB00] transition-colors">{lead.name}</p>
                                                <p className="text-sm text-white/50 mt-1">{lead.email}</p>
                                                <p className="text-xs text-white/50 mt-1 font-mono">📱 {lead.whatsapp}</p>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#FECB00]/10 text-[#FECB00] border border-[#FECB00]/20">
                                                        {lead.serviceType}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-white/50 truncate max-w-[200px]"><span className="opacity-50 text-xs uppercase tracking-wider">Loc:</span> {lead.location}</p>
                                                <p className="text-sm text-white/50 mt-0.5"><span className="opacity-50 text-xs uppercase tracking-wider">Bill:</span> {lead.monthlyBill}</p>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                                                    style={{ background: sc.bg, color: sc.text }}>
                                                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: sc.dot }}></span>
                                                    {lead.status || 'New'}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 flex items-center justify-between text-xs text-white/50 border-t border-white/10 bg-black/5 dark:bg-white/5">
                    <span>Showing {filteredLeads.length} leads</span>
                </div>
            </div>
        </div>
    );
}
