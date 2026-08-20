"use client";

import { useState, useEffect, useCallback } from "react";
import {
    FunnelIcon,
    ClipboardDocumentListIcon,
    ArrowDownTrayIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
    EyeIcon,
} from "@heroicons/react/24/outline";

function formatDateTime(dateStr) {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
    });
}

function formatINR(n) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(n || 0);
}

const categoryLabels = {
    residential: "Residential",
    industrial: "Industrial",
    utility: "Utility",
};

const categoryColors = {
    residential: "text-sky-400 bg-sky-400/10 border-sky-400/20",
    industrial: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    utility: "text-violet-400 bg-violet-400/10 border-violet-400/20",
};

export default function QuotationLogsPage() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);

    // Salesperson list for filter dropdown
    const [salespersons, setSalespersons] = useState([]);

    // Filters
    const [filterSP, setFilterSP] = useState("");
    const [filterFrom, setFilterFrom] = useState("");
    const [filterTo, setFilterTo] = useState("");
    const [searchClient, setSearchClient] = useState("");

    const LIMIT = 50;

    const fetchLogs = useCallback(async (pageNum = 1) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: pageNum,
                limit: LIMIT,
            });
            if (filterSP) params.set("salespersonId", filterSP);
            if (filterFrom) params.set("from", filterFrom);
            if (filterTo) params.set("to", filterTo);

            const res = await fetch(`/api/quotation-logs?${params.toString()}`);
            const data = await res.json();
            if (data.success) {
                setLogs(data.data || []);
                setTotal(data.total || 0);
                setTotalPages(data.totalPages || 1);
                setPage(pageNum);
            }
        } catch {
            // silent
        } finally {
            setLoading(false);
        }
    }, [filterSP, filterFrom, filterTo]);

    const fetchSalespersons = useCallback(async () => {
        try {
            const res = await fetch("/api/salespersons");
            const data = await res.json();
            if (data.success) setSalespersons(data.data || []);
        } catch { /* silent */ }
    }, []);

    useEffect(() => {
        fetchSalespersons();
    }, [fetchSalespersons]);

    useEffect(() => {
        fetchLogs(1);
    }, [fetchLogs]);

    const resetFilters = () => {
        setFilterSP("");
        setFilterFrom("");
        setFilterTo("");
        setSearchClient("");
    };

    // Client-side search on top of fetched results
    const filteredLogs = searchClient.trim()
        ? logs.filter(l =>
            l.clientName?.toLowerCase().includes(searchClient.toLowerCase()) ||
            l.quoteRef?.toLowerCase().includes(searchClient.toLowerCase())
        )
        : logs;

    const inputCls = "px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FECB00]/50 focus:border-[#FECB00] transition-all placeholder:text-white/20";

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Quotation Logs</h1>
                    <p className="text-white/40 text-sm mt-1">
                        {total} total records — every quotation downloaded by salespersons
                    </p>
                </div>
                <ClipboardDocumentListIcon className="w-8 h-8 text-white/10" />
            </div>

            {/* Filters Bar */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5 flex flex-wrap items-end gap-3">
                <FunnelIcon className="w-4 h-4 text-white/30 mt-1 shrink-0" />

                {/* Salesperson filter */}
                <div className="flex flex-col gap-1 min-w-[180px]">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Salesperson</label>
                    <select
                        value={filterSP}
                        onChange={e => setFilterSP(e.target.value)}
                        className={inputCls + " appearance-none"}
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 8L1 3h10z' fill='%23ffffff30'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}
                    >
                        <option value="" className="bg-[#1e293b]">All</option>
                        {salespersons.map(sp => (
                            <option key={sp._id} value={sp._id} className="bg-[#1e293b]">{sp.name}</option>
                        ))}
                    </select>
                </div>

                {/* From date */}
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">From Date</label>
                    <input type="date" value={filterFrom} onChange={e => setFilterFrom(e.target.value)} className={inputCls} />
                </div>

                {/* To date */}
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">To Date</label>
                    <input type="date" value={filterTo} onChange={e => setFilterTo(e.target.value)} className={inputCls} />
                </div>

                {/* Client search */}
                <div className="flex flex-col gap-1 flex-1 min-w-[160px]">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Search Client / Ref</label>
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                        <input
                            type="text"
                            value={searchClient}
                            onChange={e => setSearchClient(e.target.value)}
                            placeholder="Client name or quote ref..."
                            className={inputCls + " pl-9 w-full"}
                        />
                    </div>
                </div>

                {/* Reset */}
                {(filterSP || filterFrom || filterTo || searchClient) && (
                    <button
                        onClick={resetFilters}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/5 border border-white/10 transition-all mt-auto"
                    >
                        <XMarkIcon className="w-4 h-4" />
                        Reset
                    </button>
                )}
            </div>

            {/* Table */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-x-auto">
                {/* Header */}
                <div className="min-w-[800px] grid grid-cols-[1.8fr_1.2fr_1.4fr_0.8fr_1fr_0.7fr] gap-4 px-5 py-3 border-b border-white/10 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                    <span>Date & Time (IST)</span>
                    <span>Salesperson</span>
                    <span>Client</span>
                    <span>System Size</span>
                    <span>Grand Total</span>
                    <span>Action</span>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <div className="w-8 h-8 rounded-full border-4 border-white/10 border-t-[#FECB00] animate-spin" />
                    </div>
                ) : filteredLogs.length === 0 ? (
                    <div className="text-center py-16">
                        <ClipboardDocumentListIcon className="w-12 h-12 text-white/10 mx-auto mb-3" />
                        <p className="text-white/30 text-sm">No quotation logs found.</p>
                        <p className="text-white/20 text-xs mt-1">Logs appear when salespersons download quotations.</p>
                    </div>
                ) : (
                    filteredLogs.map((log, idx) => (
                        <div
                            key={log._id}
                            className={`min-w-[800px] grid grid-cols-[1.8fr_1.2fr_1.4fr_0.8fr_1fr_0.7fr] gap-4 px-5 py-4 items-center hover:bg-white/[0.03] transition-colors ${idx !== filteredLogs.length - 1 ? "border-b border-white/5" : ""}`}
                        >
                            {/* Date Time */}
                            <div>
                                <p className="text-white text-sm font-medium">{formatDateTime(log.createdAt)}</p>
                            </div>

                            {/* Salesperson */}
                            <div className="flex items-center gap-2 min-w-0">
                                <div
                                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-[#0a1122] shrink-0"
                                    style={{ background: "linear-gradient(135deg, #FECB00, #FAD02C)" }}
                                >
                                    {log.salespersonName?.[0]?.toUpperCase() || "S"}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-white text-sm font-medium truncate">{log.salespersonName || "—"}</p>
                                    <p className="text-white/30 text-xs truncate">{log.salespersonEmail || ""}</p>
                                </div>
                            </div>

                            {/* Client */}
                            <div className="min-w-0">
                                <p className="text-white text-sm font-medium truncate">{log.clientName || <span className="text-white/20">No name</span>}</p>
                                <p className="text-white/30 text-xs truncate">
                                    {log.quoteRef && <span className="mr-2 text-[#FECB00]/70">{log.quoteRef}</span>}
                                    {log.clientLocation}
                                </p>
                            </div>

                            {/* System Size */}
                            <p className="text-white text-sm font-semibold">{log.systemKW ? `${log.systemKW} kW` : "—"}</p>

                            {/* Grand Total */}
                            <div>
                                <p className="text-white text-sm font-bold">{formatINR(log.grandTotal)}</p>
                                <span className={`inline-block mt-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${categoryColors[log.projectCategory] || "text-white/30 bg-white/5 border-white/10"}`}>
                                    {categoryLabels[log.projectCategory] || log.projectCategory}
                                </span>
                            </div>

                            {/* Action */}
                            <div>
                                {log.hasState || log.hasPDF ? (
                                    <a
                                        href={`/admin/quotation-logs/preview/${log._id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        translate="no"
                                        className="notranslate inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 hover:border-emerald-500/30 transition-all cursor-pointer"
                                    >
                                        <EyeIcon className="w-3.5 h-3.5" />
                                        View PDF
                                    </a>
                                ) : (
                                    <div className="flex items-center gap-1.5 text-white/30 text-xs font-medium">
                                        <ArrowDownTrayIcon className="w-3.5 h-3.5" />
                                        <span>Downloaded</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 text-sm text-white/40">
                    <span>Page {page} of {totalPages}</span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => fetchLogs(page - 1)}
                            disabled={page <= 1 || loading}
                            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#FECB00]/30 hover:text-white disabled:opacity-30 transition-all"
                        >
                            ← Prev
                        </button>
                        <button
                            onClick={() => fetchLogs(page + 1)}
                            disabled={page >= totalPages || loading}
                            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#FECB00]/30 hover:text-white disabled:opacity-30 transition-all"
                        >
                            Next →
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
