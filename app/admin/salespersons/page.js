"use client";

import { useState, useEffect, useCallback } from "react";
import {
    UserPlusIcon,
    TrashIcon,
    PencilSquareIcon,
    XMarkIcon,
    CheckIcon,
    ExclamationTriangleIcon,
    MagnifyingGlassIcon,
    UserGroupIcon,
    BanknotesIcon,
    BoltIcon,
    ShieldCheckIcon,
    KeyIcon,
} from "@heroicons/react/24/outline";

function formatDate(dateStr) {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

function Modal({ show, title, onClose, children }) {
    if (!show) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} />
            <div className="relative w-full max-w-md bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl p-6 z-10">
                <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-4">
                    <h2 className="text-white font-bold text-lg">{title}</h2>
                    <button onClick={onClose} className="text-white/40 hover:text-white transition-colors p-1 rounded-lg">
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}

function Alert({ type, message, onClose }) {
    if (!message) return null;
    const colors = type === "success"
        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
        : "bg-red-500/10 border-red-500/30 text-red-400";
    return (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border mb-6 text-sm ${colors}`}>
            {type === "success" ? <CheckIcon className="w-4 h-4 shrink-0" /> : <ExclamationTriangleIcon className="w-4 h-4 shrink-0" />}
            <span className="flex-1 font-medium">{message}</span>
            <button onClick={onClose} className="opacity-60 hover:opacity-100 transition-opacity"><XMarkIcon className="w-4 h-4" /></button>
        </div>
    );
}

export default function SalespersonsPage() {
    const [salespersons, setSalespersons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({ type: "", message: "" });
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all"); // 'all' | 'salesperson' | 'finance'

    // Add modal state
    const [showAdd, setShowAdd] = useState(false);
    const [addForm, setAddForm] = useState({ name: "", email: "", password: "", role: "salesperson" });
    const [addLoading, setAddLoading] = useState(false);
    const [addError, setAddError] = useState("");

    // Edit modal state
    const [showEdit, setShowEdit] = useState(false);
    const [editTarget, setEditTarget] = useState(null);
    const [editForm, setEditForm] = useState({ name: "", password: "", role: "salesperson" });
    const [editLoading, setEditLoading] = useState(false);
    const [editError, setEditError] = useState("");

    // Delete confirm state
    const [showDelete, setShowDelete] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const showAlert = (type, message) => {
        setAlert({ type, message });
        setTimeout(() => setAlert({ type: "", message: "" }), 5000);
    };

    const fetchSalespersons = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/salespersons");
            const data = await res.json();
            if (data.success) setSalespersons(data.data || []);
        } catch {
            showAlert("error", "Failed to load team members.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchSalespersons(); }, [fetchSalespersons]);

    // ── Add Team Member ─────────────────────────────────────────────────────
    const handleAdd = async (e) => {
        e.preventDefault();
        setAddError("");
        setAddLoading(true);
        try {
            const res = await fetch("/api/salespersons", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(addForm),
            });
            const data = await res.json();
            if (data.success) {
                setShowAdd(false);
                setAddForm({ name: "", email: "", password: "", role: "salesperson" });
                await fetchSalespersons();
                showAlert("success", `Account for "${addForm.name}" created successfully.`);
            } else {
                setAddError(data.message || "Failed to create account.");
            }
        } catch {
            setAddError("Server error. Please try again.");
        } finally {
            setAddLoading(false);
        }
    };

    // ── Edit Team Member ────────────────────────────────────────────────────
    const openEdit = (person) => {
        setEditTarget(person);
        setEditForm({ name: person.name, password: "", role: person.role || "salesperson" });
        setEditError("");
        setShowEdit(true);
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        setEditError("");
        setEditLoading(true);
        const body = {};
        if (editForm.name.trim()) body.name = editForm.name.trim();
        if (editForm.password) body.password = editForm.password;
        if (editForm.role) body.role = editForm.role;

        try {
            const res = await fetch(`/api/salespersons/${editTarget._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = await res.json();
            if (data.success) {
                setShowEdit(false);
                setEditTarget(null);
                await fetchSalespersons();
                showAlert("success", "Team member details updated successfully.");
            } else {
                setEditError(data.message || "Failed to update.");
            }
        } catch {
            setEditError("Server error. Please try again.");
        } finally {
            setEditLoading(false);
        }
    };

    // ── Delete Team Member ──────────────────────────────────────────────────
    const openDelete = (person) => {
        setDeleteTarget(person);
        setShowDelete(true);
    };

    const handleDelete = async () => {
        setDeleteLoading(true);
        try {
            const res = await fetch(`/api/salespersons/${deleteTarget._id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                setShowDelete(false);
                setDeleteTarget(null);
                await fetchSalespersons();
                showAlert("success", "Team member account removed.");
            } else {
                showAlert("error", data.message || "Failed to delete.");
                setShowDelete(false);
            }
        } catch {
            showAlert("error", "Server error.");
            setShowDelete(false);
        } finally {
            setDeleteLoading(false);
        }
    };

    // Counts for stat cards
    const totalCount = salespersons.length;
    const salesCount = salespersons.filter(p => (p.role || "salesperson") === "salesperson").length;
    const financeCount = salespersons.filter(p => p.role === "finance").length;

    const filtered = salespersons.filter(person => {
        const matchesSearch =
            (person.name || "").toLowerCase().includes(search.toLowerCase()) ||
            (person.email || "").toLowerCase().includes(search.toLowerCase());
        const matchesRole =
            roleFilter === "all" ||
            (roleFilter === "finance" && person.role === "finance") ||
            (roleFilter === "salesperson" && (person.role || "salesperson") === "salesperson");
        return matchesSearch && matchesRole;
    });

    const inputCls = "w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FECB00]/50 focus:border-[#FECB00] transition-all placeholder:text-white/30";
    const labelCls = "block text-xs font-bold text-white/60 uppercase tracking-wider mb-1.5";
    const btnPrimary = "flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-150 bg-[#FECB00] text-[#0a1122] hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#FECB00]/20";
    const btnSecondary = "flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-white/60 hover:text-white hover:bg-white/5 border border-white/10";

    return (
        <div className="space-y-6 pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#FECB00] mb-1">
                        <UserGroupIcon className="w-4 h-4" />
                        <span>Admin Access &amp; Organization</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Team &amp; Salespersons</h1>
                    <p className="text-white/50 text-xs sm:text-sm mt-1">Manage Sales Executives and Finance Team portal login credentials</p>
                </div>
                <button
                    onClick={() => { setShowAdd(true); setAddError(""); setAddForm({ name: "", email: "", password: "", role: "salesperson" }); }}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-[#FECB00] text-[#0a1122] hover:bg-yellow-300 transition-all cursor-pointer shadow-lg shadow-[#FECB00]/20 shrink-0"
                >
                    <UserPlusIcon className="w-5 h-5" />
                    <span>Add Team Member</span>
                </button>
            </div>

            {/* Global Alert */}
            <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ type: "", message: "" })} />

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div 
                    onClick={() => setRoleFilter("all")}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${roleFilter === 'all' ? 'bg-[#FECB00]/10 border-[#FECB00]/50 shadow-lg shadow-[#FECB00]/10' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Total Team</span>
                        <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70">
                            <UserGroupIcon className="w-4 h-4" />
                        </div>
                    </div>
                    <p className="text-2xl font-black text-white mt-2">{totalCount}</p>
                    <span className="text-[11px] text-white/40">Active portal users</span>
                </div>

                <div 
                    onClick={() => setRoleFilter("salesperson")}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${roleFilter === 'salesperson' ? 'bg-[#FECB00]/10 border-[#FECB00]/50 shadow-lg shadow-[#FECB00]/10' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-300/70 uppercase tracking-wider">Sales Executives</span>
                        <div className="w-8 h-8 rounded-xl bg-[#FECB00]/10 border border-[#FECB00]/20 flex items-center justify-center text-[#FECB00]">
                            <BoltIcon className="w-4 h-4" />
                        </div>
                    </div>
                    <p className="text-2xl font-black text-[#FECB00] mt-2">{salesCount}</p>
                    <span className="text-[11px] text-white/40">Proposals &amp; Quotations</span>
                </div>

                <div 
                    onClick={() => setRoleFilter("finance")}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${roleFilter === 'finance' ? 'bg-emerald-500/15 border-emerald-500/50 shadow-lg shadow-emerald-500/10' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-400/70 uppercase tracking-wider">Finance Controllers</span>
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <BanknotesIcon className="w-4 h-4" />
                        </div>
                    </div>
                    <p className="text-2xl font-black text-emerald-400 mt-2">{financeCount}</p>
                    <span className="text-[11px] text-white/40">Pricing &amp; Margins Control</span>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white/5 border border-white/10 p-3 rounded-2xl">
                {/* Search */}
                <div className="relative flex-1">
                    <MagnifyingGlassIcon className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#FECB00]/50 focus:border-[#FECB00] transition-all placeholder:text-white/30"
                    />
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 shrink-0">
                    <button
                        onClick={() => setRoleFilter("all")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${roleFilter === 'all' ? 'bg-white/15 text-white shadow-sm' : 'text-white/50 hover:text-white'}`}
                    >
                        All ({totalCount})
                    </button>
                    <button
                        onClick={() => setRoleFilter("salesperson")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${roleFilter === 'salesperson' ? 'bg-[#FECB00] text-[#0a1122] shadow-sm' : 'text-white/50 hover:text-white'}`}
                    >
                        <span>⚡ Sales</span>
                        <span>({salesCount})</span>
                    </button>
                    <button
                        onClick={() => setRoleFilter("finance")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${roleFilter === 'finance' ? 'bg-emerald-500 text-white shadow-sm' : 'text-white/50 hover:text-white'}`}
                    >
                        <span>💰 Finance</span>
                        <span>({financeCount})</span>
                    </button>
                </div>
            </div>

            {/* Semantic Responsive Table Card */}
            <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-white/10 text-left border-collapse">
                        <thead className="bg-[#0f172a]">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider">
                                    Team Member
                                </th>
                                <th scope="col" className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider">
                                    Role &amp; Permissions
                                </th>
                                <th scope="col" className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider">
                                    Email / Login ID
                                </th>
                                <th scope="col" className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider">
                                    Created Date
                                </th>
                                <th scope="col" className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-wider text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-white/5 bg-[#0b1324]/40">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <div className="w-8 h-8 rounded-full border-3 border-white/10 border-t-[#FECB00] animate-spin" />
                                            <span className="text-white/40 text-xs font-medium">Loading team accounts...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-16 text-center">
                                        <UserGroupIcon className="w-12 h-12 text-white/10 mx-auto mb-3" />
                                        <p className="text-white/50 text-sm font-semibold">No team members found.</p>
                                        <p className="text-white/30 text-xs mt-1">
                                            {search ? "Try adjusting your search query or filter." : 'Click "Add Team Member" above to create an account.'}
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((person) => {
                                    const isFinance = person.role === "finance";
                                    return (
                                        <tr key={person._id} className="hover:bg-white/[0.04] transition-colors group">
                                            {/* Name & Avatar */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black shrink-0 border ${
                                                            isFinance
                                                                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                                                                : "bg-[#FECB00]/15 border-[#FECB00]/30 text-[#FECB00]"
                                                        }`}
                                                    >
                                                        {person.name?.[0]?.toUpperCase() || (isFinance ? "F" : "S")}
                                                    </div>
                                                    <div>
                                                        <span className="text-white text-sm font-bold block group-hover:text-[#FECB00] transition-colors">
                                                            {person.name}
                                                        </span>
                                                        <span className="text-[11px] text-white/30 font-mono">
                                                            ID: {person._id.slice(-6)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Role & Access Badge */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {isFinance ? (
                                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                                        <span>💰</span>
                                                        <span>Finance Controller</span>
                                                    </div>
                                                ) : (
                                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FECB00]/15 text-[#FECB00] border border-[#FECB00]/30">
                                                        <span>⚡</span>
                                                        <span>Sales Executive</span>
                                                    </div>
                                                )}
                                                <span className="block text-[10px] text-white/40 mt-1">
                                                    {isFinance ? "Full Markup & Margin Admin" : "Quotation & Proposal Maker"}
                                                </span>
                                            </td>

                                            {/* Email */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-white/80 text-xs sm:text-sm font-mono">{person.email}</span>
                                                </div>
                                            </td>

                                            {/* Created Date */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-white/60 text-xs font-medium block">
                                                    {formatDate(person.createdAt)}
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <button
                                                        onClick={() => openEdit(person)}
                                                        className="p-2 rounded-xl text-white/40 hover:text-[#FECB00] hover:bg-[#FECB00]/10 border border-transparent hover:border-[#FECB00]/20 transition-all cursor-pointer"
                                                        title="Edit details / Reset password"
                                                    >
                                                        <PencilSquareIcon className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => openDelete(person)}
                                                        className="p-2 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all cursor-pointer"
                                                        title="Delete account"
                                                    >
                                                        <TrashIcon className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── Add Team Member Modal ── */}
            <Modal show={showAdd} title="Add New Team Member" onClose={() => setShowAdd(false)}>
                <form onSubmit={handleAdd} className="space-y-4">
                    {addError && (
                        <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">{addError}</div>
                    )}
                    
                    {/* Visual Role Selector */}
                    <div>
                        <label className={labelCls}>Select Account Role *</label>
                        <div className="grid grid-cols-2 gap-2">
                            <div
                                onClick={() => setAddForm(f => ({ ...f, role: "salesperson" }))}
                                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                                    addForm.role === "salesperson"
                                        ? "bg-[#FECB00]/10 border-[#FECB00] text-white"
                                        : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
                                }`}
                            >
                                <div className="flex items-center gap-1.5 text-xs font-bold text-[#FECB00]">
                                    <BoltIcon className="w-4 h-4" />
                                    <span>Salesperson</span>
                                </div>
                                <p className="text-[10px] text-white/40 mt-1">Access to create customer quotes &amp; proposals</p>
                            </div>

                            <div
                                onClick={() => setAddForm(f => ({ ...f, role: "finance" }))}
                                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                                    addForm.role === "finance"
                                        ? "bg-emerald-500/15 border-emerald-500 text-white"
                                        : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
                                }`}
                            >
                                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                                    <BanknotesIcon className="w-4 h-4" />
                                    <span>Finance Team</span>
                                </div>
                                <p className="text-[10px] text-white/40 mt-1">Control financial percentages, margins &amp; discount caps</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className={labelCls}>Full Name *</label>
                        <input
                            type="text"
                            className={inputCls}
                            placeholder="e.g. Rahul Sharma"
                            value={addForm.name}
                            onChange={e => setAddForm(f => ({ ...f, name: e.target.value }))}
                            required
                        />
                    </div>
                    <div>
                        <label className={labelCls}>Email Address (Login ID) *</label>
                        <input
                            type="email"
                            className={inputCls}
                            placeholder="e.g. rahul@divvysolar.in"
                            value={addForm.email}
                            onChange={e => setAddForm(f => ({ ...f, email: e.target.value }))}
                            required
                        />
                    </div>
                    <div>
                        <label className={labelCls}>Password *</label>
                        <input
                            type="password"
                            className={inputCls}
                            placeholder="Min. 6 characters"
                            value={addForm.password}
                            onChange={e => setAddForm(f => ({ ...f, password: e.target.value }))}
                            required
                            minLength={6}
                        />
                    </div>
                    <div className="flex gap-3 pt-3 border-t border-white/10">
                        <button type="button" onClick={() => setShowAdd(false)} className={btnSecondary}>Cancel</button>
                        <button type="submit" disabled={addLoading} className={btnPrimary}>
                            {addLoading ? "Creating..." : "Create Account"}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* ── Edit / Reset Password Modal ── */}
            <Modal show={showEdit} title={`Edit Member — ${editTarget?.name}`} onClose={() => setShowEdit(false)}>
                <form onSubmit={handleEdit} className="space-y-4">
                    {editError && (
                        <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">{editError}</div>
                    )}

                    {/* Role Selector */}
                    <div>
                        <label className={labelCls}>Account Role</label>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                onClick={() => setEditForm(f => ({ ...f, role: "salesperson" }))}
                                className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                                    editForm.role === "salesperson"
                                        ? "bg-[#FECB00] text-[#0a1122] border-[#FECB00]"
                                        : "bg-white/5 text-white/60 border-white/10"
                                }`}
                            >
                                <span>⚡ Salesperson</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditForm(f => ({ ...f, role: "finance" }))}
                                className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                                    editForm.role === "finance"
                                        ? "bg-emerald-500 text-white border-emerald-500"
                                        : "bg-white/5 text-white/60 border-white/10"
                                }`}
                            >
                                <span>💰 Finance Team</span>
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className={labelCls}>Name</label>
                        <input
                            type="text"
                            className={inputCls}
                            value={editForm.name}
                            onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label className={labelCls}>New Password <span className="normal-case font-normal text-white/40">(leave blank to keep current)</span></label>
                        <input
                            type="password"
                            className={inputCls}
                            placeholder="Enter new password to reset..."
                            value={editForm.password}
                            onChange={e => setEditForm(f => ({ ...f, password: e.target.value }))}
                        />
                    </div>
                    <div className="flex gap-3 pt-3 border-t border-white/10">
                        <button type="button" onClick={() => setShowEdit(false)} className={btnSecondary}>Cancel</button>
                        <button type="submit" disabled={editLoading} className={btnPrimary}>
                            {editLoading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* ── Delete Confirm Modal ── */}
            <Modal show={showDelete} title="Delete Team Member" onClose={() => setShowDelete(false)}>
                <div className="text-center py-2">
                    <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                        <TrashIcon className="w-7 h-7 text-red-400" />
                    </div>
                    <p className="text-white text-base font-bold mb-1">Remove <span className="text-[#FECB00]">{deleteTarget?.name}</span>?</p>
                    <p className="text-white/50 text-xs mb-6 max-w-xs mx-auto">This action is permanent. The team member will immediately lose access to the portal.</p>
                    <div className="flex gap-3">
                        <button onClick={() => setShowDelete(false)} className={btnSecondary}>Cancel</button>
                        <button
                            onClick={handleDelete}
                            disabled={deleteLoading}
                            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-bold bg-red-500 text-white hover:bg-red-400 disabled:opacity-50 transition-all cursor-pointer shadow-lg shadow-red-500/20"
                        >
                            {deleteLoading ? "Deleting..." : "Yes, Delete Account"}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
