"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { 
    MagnifyingGlassIcon, 
    FunnelIcon, 
    ArrowDownTrayIcon,
    ChatBubbleLeftRightIcon,
    XMarkIcon,
    DocumentDuplicateIcon,
    InboxStackIcon,
    MapPinIcon
} from "@heroicons/react/24/outline";

export default function AdminLeads() {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    // Standalone Modal State (for viewing chat transcript proof of a lead)
    const [modalChatLead, setModalChatLead] = useState(null);
    const [modalChatLog, setModalChatLog] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);
    const [copied, setCopied] = useState(false);

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

    const openModalTranscript = async (lead) => {
        setModalChatLead(lead);
        setModalLoading(true);
        setModalChatLog(null);
        setCopied(false);

        try {
            const res = await fetch(`/api/chat/logs?leadId=${lead._id}&phone=${encodeURIComponent(lead.whatsapp || '')}&portal=true`);
            const data = await res.json();
            if (data.success && data.data) {
                setModalChatLog(data.data);
            }
        } catch (err) {
            console.error("Failed to fetch chat transcript:", err);
        } finally {
            setModalLoading(false);
        }
    };

    const copyTranscriptText = (chatLog) => {
        if (!chatLog || !chatLog.messages) return;
        const text = chatLog.messages.map(m => `[${new Date(m.timestamp).toLocaleString()}] ${m.sender.toUpperCase()}: ${m.text}`).join('\n\n');
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
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
        <div className="space-y-4">
            {/* Top Clean Title */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
                        <InboxStackIcon className="w-6 h-6 text-[#FECB00]" />
                        <span>Leads Database</span>
                    </h1>
                    <p className="text-xs text-white/50 mt-1">
                        Live customer inquiries and solar consultation requests from the website.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/5 border border-white/10 text-white/80">
                        Total Leads: <strong className="text-[#FECB00] font-mono">{leads.length}</strong>
                    </span>
                </div>
            </div>

            {/* LEADS TABLE VIEW */}
            <div className="space-y-4 animate-in fade-in duration-200">
                {/* Filters & Export */}
                <div className="rounded-2xl p-3 flex flex-col sm:flex-row gap-3 bg-white/5 border border-white/10 shadow-xl items-center">
                    <div className="relative flex-1 w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-4 w-4 text-white/50 opacity-50" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#FECB00] text-xs sm:text-sm"
                            placeholder="Search by name, phone, location..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div className="relative w-full sm:w-44">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FunnelIcon className="h-4 w-4 text-white/50 opacity-50" />
                            </div>
                            <select
                                className="block w-full pl-9 pr-8 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-[#FECB00] text-xs appearance-none cursor-pointer"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="All" className="bg-[#0f172a]">All Statuses</option>
                                <option value="New" className="bg-[#0f172a]">New Only</option>
                                <option value="Contacted" className="bg-[#0f172a]">Contacted</option>
                                <option value="Converted" className="bg-[#0f172a]">Converted</option>
                                <option value="Rejected" className="bg-[#0f172a]">Rejected</option>
                            </select>
                        </div>
                        <button onClick={exportCSV} disabled={leads.length === 0}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white transition-all hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer shrink-0"
                            style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                            <ArrowDownTrayIcon className="w-3.5 h-3.5" /> <span>Export CSV</span>
                        </button>
                    </div>
                </div>

                {/* Table wrapper */}
                <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-white/10">
                            <thead className="bg-[#0f172a]/90">
                                <tr>
                                    <th scope="col" className="px-6 py-3.5 text-left text-xs font-bold text-white/50 uppercase tracking-wider">Date & Time</th>
                                    <th scope="col" className="px-6 py-3.5 text-left text-xs font-bold text-white/50 uppercase tracking-wider">Prospect Details</th>
                                    <th scope="col" className="px-6 py-3.5 text-left text-xs font-bold text-white/50 uppercase tracking-wider">Property & Bill</th>
                                    <th scope="col" className="px-6 py-3.5 text-left text-xs font-bold text-white/50 uppercase tracking-wider">Location & Status</th>
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
                                        <td colSpan="4" className="px-6 py-16 text-center text-white/50 text-sm">
                                            No leads found matching your search criteria.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredLeads.map((lead) => {
                                        const sc = getStatusStyle(lead.status);
                                        const cleanPhone = String(lead.whatsapp || "").replace(/\D/g, "");
                                        const whatsappUrl = `https://wa.me/${cleanPhone.startsWith("91") ? cleanPhone : "91" + cleanPhone}?text=Hello%20${encodeURIComponent(lead.name || "")},%20we%20received%20your%20Solar%20Audit%20inquiry%20at%20Divvy%20Solar.`;
                                        const isChatbotLead = String(lead.serviceType || "").includes("Chatbot");

                                        return (
                                            <tr key={lead._id} className="hover:bg-white/5 transition-colors group">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <p className="text-xs sm:text-sm font-semibold text-white">
                                                        {lead.createdAt ? format(new Date(lead.createdAt), 'MMM dd, yyyy') : 'Recently'}
                                                    </p>
                                                    <p className="text-[11px] text-white/40 mt-0.5 font-mono">
                                                        {lead.createdAt ? format(new Date(lead.createdAt), 'hh:mm a') : 'N/A'}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <span 
                                                            onClick={() => isChatbotLead && openModalTranscript(lead)}
                                                            className={`text-sm font-bold text-white transition-colors ${isChatbotLead ? 'cursor-pointer hover:text-[#FECB00]' : ''}`}
                                                        >
                                                            {lead.name}
                                                        </span>
                                                        {isChatbotLead && (
                                                            <button
                                                                onClick={() => openModalTranscript(lead)}
                                                                className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#FECB00]/15 hover:bg-[#FECB00]/25 text-[#FECB00] border border-[#FECB00]/30 transition-colors cursor-pointer"
                                                                title="Click to view AI Chat transcript"
                                                            >
                                                                ⭐ 3D Audit Chat
                                                            </button>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-white/40 mt-0.5">{lead.email || "No Email"}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <a 
                                                            href={`tel:${cleanPhone}`}
                                                            className="text-xs text-white/80 hover:text-[#FECB00] font-mono transition-colors"
                                                        >
                                                            📱 +91 {cleanPhone}
                                                        </a>
                                                        <a 
                                                            href={whatsappUrl} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="text-[10px] text-emerald-400 hover:text-emerald-300 font-semibold px-1.5 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/20"
                                                        >
                                                            WhatsApp ↗
                                                        </a>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#FECB00]/10 text-[#FECB00] border border-[#FECB00]/20">
                                                            {lead.serviceType?.replace('(Chatbot Quality Lead)', '') || 'General'}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-white/60"><strong className="text-white/40">Bill:</strong> {lead.monthlyBill}</p>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <p className="text-xs text-white/80 font-medium flex items-center gap-1.5 mb-1.5">
                                                        <MapPinIcon className="w-3.5 h-3.5 text-[#FECB00]/70" />
                                                        {lead.location}
                                                    </p>
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold"
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
                    <div className="px-6 py-3 flex items-center justify-between text-xs text-white/50 border-t border-white/10 bg-black/5">
                        <span>Total {filteredLeads.length} leads in database</span>
                    </div>
                </div>
            </div>

            {/* Standalone Chat Modal */}
            {modalChatLead && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
                    <div className="w-full max-w-2xl bg-[#0a1122] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                        <div className="px-6 py-4 bg-[#0f172a] border-b border-white/10 flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-extrabold text-white text-base">Conversation Transcript</h3>
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FECB00]/10 text-[#FECB00] border border-[#FECB00]/20">
                                        Proof Record
                                    </span>
                                </div>
                                <p className="text-xs text-white/50 mt-0.5">
                                    Client: <strong className="text-white">{modalChatLead.name}</strong> • Phone: <strong className="text-white">+91 {modalChatLead.whatsapp}</strong>
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                {modalChatLog && modalChatLog.messages && (
                                    <button
                                        onClick={() => copyTranscriptText(modalChatLog)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white font-semibold transition-all cursor-pointer"
                                    >
                                        <DocumentDuplicateIcon className="w-3.5 h-3.5 text-[#FECB00]" />
                                        {copied ? "Copied!" : "Copy Transcript"}
                                    </button>
                                )}
                                <button
                                    onClick={() => setModalChatLead(null)}
                                    className="p-1.5 rounded-xl hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
                                >
                                    <XMarkIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#070b15]/60 custom-scrollbar text-sm">
                            {modalLoading ? (
                                <div className="py-20 flex flex-col items-center justify-center gap-3">
                                    <div className="w-8 h-8 rounded-full border-2 border-[#FECB00]/20 border-t-[#FECB00] animate-spin"></div>
                                    <span className="text-white/40 text-xs font-medium">Retrieving conversation logs from database...</span>
                                </div>
                            ) : !modalChatLog || !modalChatLog.messages || modalChatLog.messages.length === 0 ? (
                                <div className="py-16 text-center text-white/40 text-sm">
                                    <p>No interactive AI chat logs found for this lead.</p>
                                    <p className="text-xs text-white/30 mt-1">This inquiry was submitted directly via the website contact form.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/60 flex flex-wrap gap-x-6 gap-y-1">
                                        <span><strong>Session ID:</strong> {modalChatLog.sessionId}</span>
                                        <span><strong>Landing Page:</strong> {modalChatLog.pageUrl || '/'}</span>
                                    </div>

                                    {modalChatLog.messages.map((m, mIdx) => {
                                        const isUser = m.sender === 'user';
                                        return (
                                            <div key={mIdx} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                                                <div className="flex items-center gap-2 mb-1 px-1">
                                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isUser ? 'text-blue-400' : 'text-[#FECB00]'}`}>
                                                        {isUser ? `👤 ${modalChatLead.name || 'Client'}` : '🤖 Divvy Solar AI'}
                                                    </span>
                                                    <span className="text-[9px] text-white/30 font-mono">
                                                        {format(new Date(m.timestamp), 'hh:mm:ss a')}
                                                    </span>
                                                </div>
                                                <div
                                                    className={`max-w-[85%] rounded-2xl p-4 leading-relaxed whitespace-pre-wrap text-xs sm:text-sm ${
                                                        isUser
                                                            ? 'bg-blue-600/20 border border-blue-500/30 text-white rounded-tr-none'
                                                            : 'bg-white/5 border border-white/10 text-white/90 rounded-tl-none'
                                                    }`}
                                                >
                                                    {m.text}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="px-6 py-3 bg-[#0f172a] border-t border-white/10 flex items-center justify-between text-xs text-white/40">
                            <span>Verified MongoDB Permanent Record</span>
                            <button
                                onClick={() => setModalChatLead(null)}
                                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors cursor-pointer"
                            >
                                Close Proof
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
