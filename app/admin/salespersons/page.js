"use client";

import { useState, useEffect, useCallback } from "react";
import {
    UserPlusIcon,
    TrashIcon,
    PencilSquareIcon,
    XMarkIcon,
    CheckIcon,
    ExclamationTriangleIcon,
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
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-md bg-[#1e293b] border border-white/10 rounded-2xl shadow-2xl p-6 z-10">
                <div className="flex items-center justify-between mb-5">
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
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border mb-4 text-sm ${colors}`}>
            {type === "success" ? <CheckIcon className="w-4 h-4 shrink-0" /> : <ExclamationTriangleIcon className="w-4 h-4 shrink-0" />}
            <span className="flex-1">{message}</span>
            <button onClick={onClose} className="opacity-60 hover:opacity-100 transition-opacity"><XMarkIcon className="w-4 h-4" /></button>
        </div>
    );
}

export default function SalespersonsPage() {
    const [salespersons, setSalespersons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({ type: "", message: "" });

    // Add modal state
    const [showAdd, setShowAdd] = useState(false);
    const [addForm, setAddForm] = useState({ name: "", email: "", password: "" });
    const [addLoading, setAddLoading] = useState(false);
    const [addError, setAddError] = useState("");

    // Edit modal state
    const [showEdit, setShowEdit] = useState(false);
    const [editTarget, setEditTarget] = useState(null);
    const [editForm, setEditForm] = useState({ name: "", password: "" });
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
            showAlert("error", "Failed to load salespersons.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchSalespersons(); }, [fetchSalespersons]);

    // ── Add Salesperson ─────────────────────────────────────────────────────
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
                setAddForm({ name: "", email: "", password: "" });
                await fetchSalespersons();
                showAlert("success", `Salesperson "${addForm.name}" created successfully.`);
            } else {
                setAddError(data.message || "Failed to create salesperson.");
            }
        } catch {
            setAddError("Server error. Please try again.");
        } finally {
            setAddLoading(false);
        }
    };

    // ── Edit Salesperson ────────────────────────────────────────────────────
    const openEdit = (person) => {
        setEditTarget(person);
        setEditForm({ name: person.name, password: "" });
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
                showAlert("success", "Salesperson updated successfully.");
            } else {
                setEditError(data.message || "Failed to update.");
            }
        } catch {
            setEditError("Server error. Please try again.");
        } finally {
            setEditLoading(false);
        }
    };

    // ── Delete Salesperson ──────────────────────────────────────────────────
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
                showAlert("success", "Salesperson deleted.");
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

    const inputCls = "w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FECB00]/50 focus:border-[#FECB00] transition-all placeholder:text-white/20";
    const labelCls = "block text-xs font-bold text-white/50 uppercase tracking-wider mb-1.5";
    const btnPrimary = "flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-150 bg-[#FECB00] text-[#0a1122] hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed";
    const btnSecondary = "flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-white/50 hover:text-white hover:bg-white/5 border border-white/10";

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Salespersons</h1>
                    <p className="text-white/40 text-sm mt-1">Manage sales portal login accounts</p>
                </div>
                <button
                    onClick={() => { setShowAdd(true); setAddError(""); setAddForm({ name: "", email: "", password: "" }); }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-[#FECB00] text-[#0a1122] hover:bg-yellow-300 transition-all"
                >
                    <UserPlusIcon className="w-4 h-4" />
                    Add Salesperson
                </button>
            </div>

            {/* Global Alert */}
            <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ type: "", message: "" })} />

            {/* Table */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-[1fr_1.5fr_1fr_auto] gap-4 px-6 py-3 border-b border-white/10 text-xs font-bold text-white/30 uppercase tracking-widest">
                    <span>Name</span>
                    <span>Email</span>
                    <span>Created</span>
                    <span>Actions</span>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <div className="w-8 h-8 rounded-full border-4 border-white/10 border-t-[#FECB00] animate-spin" />
                    </div>
                ) : salespersons.length === 0 ? (
                    <div className="text-center py-16">
                        <UserPlusIcon className="w-12 h-12 text-white/10 mx-auto mb-3" />
                        <p className="text-white/30 text-sm">No salespersons yet.</p>
                        <p className="text-white/20 text-xs mt-1">Click "Add Salesperson" to create the first account.</p>
                    </div>
                ) : (
                    salespersons.map((person, idx) => (
                        <div
                            key={person._id}
                            className={`grid grid-cols-[1fr_1.5fr_1fr_auto] gap-4 px-6 py-4 items-center transition-colors hover:bg-white/[0.03] ${idx !== salespersons.length - 1 ? "border-b border-white/5" : ""}`}
                        >
                            {/* Avatar + Name */}
                            <div className="flex items-center gap-3 min-w-0">
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-[#0a1122] shrink-0"
                                    style={{ background: "linear-gradient(135deg, #FECB00, #FAD02C)" }}
                                >
                                    {person.name?.[0]?.toUpperCase() || "S"}
                                </div>
                                <span className="text-white text-sm font-semibold truncate">{person.name}</span>
                            </div>

                            {/* Email */}
                            <span className="text-white/50 text-sm truncate">{person.email}</span>

                            {/* Created Date */}
                            <span className="text-white/30 text-sm">{formatDate(person.createdAt)}</span>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => openEdit(person)}
                                    className="p-2 rounded-lg text-white/30 hover:text-[#FECB00] hover:bg-[#FECB00]/10 transition-all"
                                    title="Edit / Reset Password"
                                >
                                    <PencilSquareIcon className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => openDelete(person)}
                                    className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all"
                                    title="Delete"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* ── Add Salesperson Modal ── */}
            <Modal show={showAdd} title="Add New Salesperson" onClose={() => setShowAdd(false)}>
                <form onSubmit={handleAdd} className="space-y-4">
                    {addError && (
                        <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{addError}</div>
                    )}
                    <div>
                        <label className={labelCls}>Full Name</label>
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
                        <label className={labelCls}>Email Address</label>
                        <input
                            type="email"
                            className={inputCls}
                            placeholder="e.g. rahul@divvysolar.com"
                            value={addForm.email}
                            onChange={e => setAddForm(f => ({ ...f, email: e.target.value }))}
                            required
                        />
                    </div>
                    <div>
                        <label className={labelCls}>Password</label>
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
                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={() => setShowAdd(false)} className={btnSecondary}>Cancel</button>
                        <button type="submit" disabled={addLoading} className={btnPrimary}>
                            {addLoading ? "Creating..." : "Create Account"}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* ── Edit / Reset Password Modal ── */}
            <Modal show={showEdit} title={`Edit — ${editTarget?.name}`} onClose={() => setShowEdit(false)}>
                <form onSubmit={handleEdit} className="space-y-4">
                    {editError && (
                        <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{editError}</div>
                    )}
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
                        <label className={labelCls}>New Password <span className="normal-case font-normal text-white/30">(leave blank to keep current)</span></label>
                        <input
                            type="password"
                            className={inputCls}
                            placeholder="Enter new password..."
                            value={editForm.password}
                            onChange={e => setEditForm(f => ({ ...f, password: e.target.value }))}
                        />
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={() => setShowEdit(false)} className={btnSecondary}>Cancel</button>
                        <button type="submit" disabled={editLoading} className={btnPrimary}>
                            {editLoading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* ── Delete Confirm Modal ── */}
            <Modal show={showDelete} title="Delete Salesperson" onClose={() => setShowDelete(false)}>
                <div className="text-center py-2">
                    <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                        <TrashIcon className="w-7 h-7 text-red-400" />
                    </div>
                    <p className="text-white text-sm font-semibold mb-1">Delete <span className="text-[#FECB00]">{deleteTarget?.name}</span>?</p>
                    <p className="text-white/40 text-xs mb-6">This action cannot be undone. The salesperson will immediately lose portal access.</p>
                    <div className="flex gap-3">
                        <button onClick={() => setShowDelete(false)} className={btnSecondary}>Cancel</button>
                        <button
                            onClick={handleDelete}
                            disabled={deleteLoading}
                            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-bold bg-red-500 text-white hover:bg-red-400 disabled:opacity-50 transition-all"
                        >
                            {deleteLoading ? "Deleting..." : "Yes, Delete"}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
