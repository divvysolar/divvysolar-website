"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { PlusIcon, GlobeAltIcon, LockClosedIcon, DocumentTextIcon, CalendarIcon, UserIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function AdminBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/blogs?limit=50&published=all");
            const data = await res.json();
            if (data.success) {
                setBlogs(data.data || []);
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this blog post? This cannot be undone.")) return;
        
        try {
            const res = await fetch(`/api/blogs?id=${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                fetchBlogs(); // Refresh the list
            } else {
                alert(data.error || "Failed to delete blog");
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
            alert("An error occurred while deleting");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Blog Articles</h1>
                    <p className="text-white/50 mt-1 text-sm">Manage news and insights for your audience.</p>
                </div>
                <Link
                    href="/admin/blogs/new"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-[#0a1122] transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(135deg, #FECB00, #EBB800)', boxShadow: '0 4px 14px rgba(254,203,0,0.25)' }}
                >
                    <PlusIcon className="w-5 h-5" /> Create Article
                </Link>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 rounded-full border-4 border-[#FECB00]/20 border-t-[#FECB00] animate-spin"></div>
                        <span className="text-white/50 text-sm">Loading articles...</span>
                    </div>
                </div>
            ) : blogs.length === 0 ? (
                <div className="text-center py-20 rounded-2xl bg-white/5 border border-dashed border-white/10">
                    <DocumentTextIcon className="w-12 h-12 text-white/50 opacity-50 mx-auto mb-4" />
                    <h3 className="text-white text-lg font-bold mb-1">No Articles Yet</h3>
                    <p className="text-white/50 text-sm mb-6">Create your first blog post to engage with visitors.</p>
                    <Link
                        href="/admin/blogs/new"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200"
                        style={{ background: 'linear-gradient(135deg, #FECB00, #EBB800)', boxShadow: '0 4px 14px rgba(254,203,0,0.25)' }}
                    >
                        <PlusIcon className="w-5 h-5" /> Start Writing
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {(blogs || []).map((blog) => (
                        <div key={blog._id} className="rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5 bg-white/5 border border-white/10 shadow-xl group flex flex-col">
                            
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-lg font-bold text-white group-hover:text-[#FECB00] transition-colors line-clamp-2 pr-4 leading-snug">
                                    {blog.title}
                                </h3>
                                {blog.published ? (
                                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-500/10 text-green-500 border border-green-500/20 flex-shrink-0">
                                        <GlobeAltIcon className="w-3 h-3" /> Live
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-500/10 text-gray-500 border border-gray-500/20 flex-shrink-0">
                                        <LockClosedIcon className="w-3 h-3" /> Draft
                                    </span>
                                )}
                            </div>

                            <p className="text-sm text-white/50 mb-6 line-clamp-2 flex-grow">
                                {blog.excerpt}
                            </p>

                            <div className="flex items-center justify-between pt-4 mt-auto border-t border-white/10">
                                <div className="flex items-center gap-4 text-xs font-medium text-white/50">
                                    <span className="flex items-center gap-1.5">
                                        <CalendarIcon className="w-4 h-4" /> 
                                        {blog.createdAt ? format(new Date(blog.createdAt), 'MMM dd, yy') : 'Unknown'}
                                    </span>
                                    <span className="flex items-center gap-1.5"><UserIcon className="w-4 h-4" /> {blog.author || 'Admin'}</span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleDelete(blog._id)}
                                        className="text-xs font-bold px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors border border-red-500/20 flex items-center gap-1"
                                    >
                                        <TrashIcon className="w-3.5 h-3.5" /> Delete
                                    </button>
                                    <Link
                                        href={`/admin/blogs/${blog._id}`}
                                        className="text-xs font-bold px-3 py-1.5 rounded-lg bg-[#FECB00]/10 text-[#FECB00] hover:bg-[#FECB00]/20 transition-colors border border-[#FECB00]/20 flex items-center gap-1"
                                    >
                                        Edit
                                    </Link>
                                    <a
                                        href={`/blogs/${blog.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-white/5 text-white/50 hover:text-[#FECB00] transition-colors border border-white/10"
                                    >
                                        View Page
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
