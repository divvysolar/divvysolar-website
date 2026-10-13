"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    MagnifyingGlassIcon,
    ArrowDownTrayIcon,
    PencilSquareIcon,
    DocumentTextIcon,
    PlusIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    BoltIcon,
    CurrencyRupeeIcon,
    ClipboardDocumentCheckIcon,
    PhoneIcon,
    MapPinIcon,
    ClockIcon,
} from "@heroicons/react/24/outline";

function formatINR(val) {
    if (!val && val !== 0) return "₹0";
    return "₹" + Number(val).toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

function formatDate(dateStr) {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }) + " " + d.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default function SalesQuotationsPage() {
    const { data: session } = useSession();
    const router = useRouter();

    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalLogs, setTotalLogs] = useState(0);
    const [downloadingId, setDownloadingId] = useState(null);

    const fetchLogs = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: String(page),
                limit: "20",
            });
            if (search.trim()) params.append("q", search.trim());

            const res = await fetch(`/api/quotation-logs?${params.toString()}`);
            const data = await res.json();

            if (data.success) {
                setLogs(data.data || []);
                setTotalPages(data.totalPages || 1);
                setTotalLogs(data.total || 0);
            }
        } catch (err) {
            console.error("Failed to fetch quotation logs:", err);
        } finally {
            setLoading(false);
        }
    }, [page, search]);

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        fetchLogs();
    };

    const handleDownload = async (id, quoteRef, clientName) => {
        setDownloadingId(id);
        try {
            const res = await fetch(`/api/quotation-logs/${id}`);
            if (!res.ok) {
                alert("PDF not available for this record");
                return;
            }
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `Divvy_Solar_Quote_${(clientName || quoteRef || "Proposal").replace(/\s+/g, "_")}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Download failed:", err);
            alert("Failed to download PDF");
        } finally {
            setDownloadingId(null);
        }
    };

    // Filter by Category in local view
    const filteredLogs = logs.filter((log) => {
        if (categoryFilter === "all") return true;
        return log.projectCategory === categoryFilter;
    });

    // Compute metrics
    const totalKWQuoted = logs.reduce((sum, l) => sum + (Number(l.systemKW) || 0), 0);
    const totalPipelineValue = logs.reduce((sum, l) => sum + (Number(l.grandTotal) || 0), 0);

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-12" style={{ fontFamily: "Inter" }}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-3">
                        <span>My Quotation History</span>
                        <span className="text-xs px-2.5 py-1 rounded-full bg-[#FECB00]/15 text-[#FECB00] border border-[#FECB00]/30 font-bold">
                            {totalLogs} {totalLogs === 1 ? "Proposal" : "Proposals"}
                        </span>
                    </h1>
                    <p className="text-white/50 text-sm mt-1">
                        Review past quotations, download PDFs, or edit any proposal in seconds without starting from scratch.
                    </p>
                </div>
                <Link
                    href="/sales/pricing"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-[#FECB00]/20 flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #FECB00, #EBB800)", color: "#0a1122" }}
                >
                    <PlusIcon className="w-5 h-5 stroke-[2.5]" />
                    <span>Create New Quotation</span>
                </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FECB00]/10 border border-[#FECB00]/20 flex items-center justify-center text-[#FECB00]">
                        <ClipboardDocumentCheckIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-white/40">Total Quotes</p>
                        <p className="text-2xl font-black text-white mt-0.5">{totalLogs}</p>
                    </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                        <BoltIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-white/40">Total Capacity</p>
                        <p className="text-2xl font-black text-blue-400 mt-0.5">{totalKWQuoted.toFixed(1)} <span className="text-sm font-normal text-white/60">kWp</span></p>
                    </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <CurrencyRupeeIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-white/40">Quoted Value</p>
                        <p className="text-2xl font-black text-emerald-400 mt-0.5">{formatINR(totalPipelineValue)}</p>
                    </div>
                </div>
            </div>

            {/* Search & Filter Strip */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-white/5 border border-white/10 rounded-2xl">
                <form onSubmit={handleSearchSubmit} className="relative flex-1">
                    <MagnifyingGlassIcon className="w-5 h-5 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by client name, phone number, or quote ref..."
                        className="w-full pl-11 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FECB00]/50 placeholder-white/30"
                    />
                </form>

                <div className="flex items-center gap-2 flex-wrap">
                    <button
                        type="button"
                        onClick={() => setCategoryFilter("all")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${categoryFilter === "all" ? "bg-[#FECB00] text-[#0a1122]" : "bg-white/5 text-white/60 hover:text-white"}`}
                    >
                        All
                    </button>
                    <button
                        type="button"
                        onClick={() => setCategoryFilter("residential")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${categoryFilter === "residential" ? "bg-emerald-500 text-white" : "bg-white/5 text-white/60 hover:text-white"}`}
                    >
                        Residential
                    </button>
                    <button
                        type="button"
                        onClick={() => setCategoryFilter("industrial")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${categoryFilter === "industrial" ? "bg-blue-500 text-white" : "bg-white/5 text-white/60 hover:text-white"}`}
                    >
                        Industrial / C&I
                    </button>
                </div>
            </div>

            {/* Quotations List */}
            <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden shadow-xl">
                {loading ? (
                    <div className="py-24 flex flex-col items-center justify-center gap-3">
                        <div className="w-10 h-10 rounded-full border-4 border-[#FECB00]/20 border-t-[#FECB00] animate-spin" />
                        <p className="text-white/40 text-xs font-medium">Loading quotations...</p>
                    </div>
                ) : filteredLogs.length === 0 ? (
                    <div className="py-20 px-4 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-white/30">
                            <DocumentTextIcon className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-white">No Quotations Found</h3>
                        <p className="text-white/40 text-xs max-w-sm mx-auto mt-1">
                            {search ? "No quotations matched your search criteria. Try a different query." : "You have not generated any quotations yet. Create your first proposal in the calculator!"}
                        </p>
                        <Link
                            href="/sales/pricing"
                            className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-xl text-xs font-bold text-[#0a1122] bg-[#FECB00] hover:bg-[#EBB800] transition-colors"
                        >
                            <PlusIcon className="w-4 h-4 stroke-[2.5]" />
                            Create New Quotation
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-bold text-white/40 uppercase tracking-wider">
                                    <th className="py-3 px-4">Quote Ref &amp; Date</th>
                                    <th className="py-3 px-4">Client Details</th>
                                    <th className="py-3 px-4">System Size</th>
                                    <th className="py-3 px-4 text-right">Quotation Amount</th>
                                    <th className="py-3 px-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm">
                                {filteredLogs.map((log) => {
                                    const isIndustrial = log.projectCategory === "industrial";
                                    return (
                                        <tr key={log._id} className="hover:bg-white/[0.03] transition-colors group">
                                            {/* Quote Ref & Date */}
                                            <td className="py-3.5 px-4">
                                                <div className="font-mono font-bold text-white group-hover:text-[#FECB00] transition-colors">
                                                    {log.quoteRef || "DS/QP/—"}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-white/40 mt-1">
                                                    <ClockIcon className="w-3.5 h-3.5" />
                                                    <span>{formatDate(log.createdAt)}</span>
                                                </div>
                                            </td>

                                            {/* Client Details */}
                                            <td className="py-3.5 px-4">
                                                <div className="font-bold text-white leading-snug">
                                                    {log.clientName || "Unnamed Client"}
                                                </div>
                                                <div className="flex items-center gap-3 mt-1 text-xs text-white/50 flex-wrap">
                                                    {log.clientPhone && (
                                                        <span className="flex items-center gap-1">
                                                            <PhoneIcon className="w-3.5 h-3.5 text-white/30" />
                                                            {log.clientPhone}
                                                        </span>
                                                    )}
                                                    {log.clientLocation && (
                                                        <span className="flex items-center gap-1">
                                                            <MapPinIcon className="w-3.5 h-3.5 text-white/30" />
                                                            {log.clientLocation}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* System Size & Category */}
                                            <td className="py-3.5 px-4">
                                                <div className="font-bold text-white flex items-center gap-2">
                                                    <span>{log.systemKW || 0} kWp</span>
                                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${isIndustrial ? "bg-blue-500/15 text-blue-400 border border-blue-500/30" : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"}`}>
                                                        {isIndustrial ? "Industrial" : "Residential"}
                                                    </span>
                                                </div>
                                                <div className="text-xs text-white/40 mt-0.5 capitalize">
                                                    Branch: {log.issuingBranch || "Gurgaon"}
                                                </div>
                                            </td>

                                            {/* Total Amount */}
                                            <td className="py-3.5 px-4 text-right">
                                                <div className="font-black text-base text-[#FECB00]">
                                                    {formatINR(log.grandTotal)}
                                                </div>
                                                <div className="text-[10px] text-white/40 uppercase">
                                                    All-inclusive (GST)
                                                </div>
                                            </td>

                                            {/* Actions */}
                                            <td className="py-3.5 px-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    {/* Edit & Revise Button */}
                                                    <button
                                                        type="button"
                                                        onClick={() => router.push(`/sales/pricing?edit=${log._id}`)}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#FECB00]/10 text-[#FECB00] border border-[#FECB00]/30 hover:bg-[#FECB00] hover:text-[#0a1122] transition-all shadow-sm"
                                                        title="Load into calculator to edit"
                                                    >
                                                        <PencilSquareIcon className="w-4 h-4" />
                                                        <span>Edit</span>
                                                    </button>

                                                    {/* Download PDF Button */}
                                                    <button
                                                        type="button"
                                                        disabled={downloadingId === log._id}
                                                        onClick={() => handleDownload(log._id, log.quoteRef, log.clientName)}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white transition-all disabled:opacity-50"
                                                        title="Download generated PDF"
                                                    >
                                                        <ArrowDownTrayIcon className={`w-4 h-4 ${downloadingId === log._id ? "animate-bounce" : ""}`} />
                                                        <span>{downloadingId === log._id ? "Saving..." : "PDF"}</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between p-4 border-t border-white/10 bg-white/[0.02]">
                        <p className="text-xs text-white/40">
                            Page <strong className="text-white">{page}</strong> of <strong className="text-white">{totalPages}</strong>
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                disabled={page <= 1}
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                className="p-2 rounded-xl bg-white/5 border border-white/10 text-white disabled:opacity-30 hover:bg-white/10 transition-colors"
                            >
                                <ChevronLeftIcon className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                disabled={page >= totalPages}
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                className="p-2 rounded-xl bg-white/5 border border-white/10 text-white disabled:opacity-30 hover:bg-white/10 transition-colors"
                            >
                                <ChevronRightIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
