"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PhotoIcon, DocumentCheckIcon, ArrowLeftIcon, GlobeAltIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function NewBlog() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        author: "",
        image: "",
        published: true,
    });

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                setFormData(prev => ({ ...prev, image: data.url }));
            } else {
                alert(data.error || "Upload failed");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("An error occurred during upload");
        } finally {
            setUploading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const generateSlug = () => {
        if (!formData.title) return;
        const slug = formData.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
        setFormData((prev) => ({ ...prev, slug }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/blogs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success) {
                router.push("/admin/blogs");
                router.refresh();
            } else {
                alert(data.error || "Failed to create blog");
            }
        } catch (error) {
            console.error("Error creating blog:", error);
            alert("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8 pb-12">
            
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blogs" className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#FECB00] hover:text-[#EBB800] transition-colors">
                        <ArrowLeftIcon className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Write Article</h1>
                        <p className="text-white/50 mt-1 text-sm">Draft a new post for your solar blog.</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <button type="button" onClick={() => router.push('/admin/blogs')} className="px-5 py-2.5 rounded-xl text-sm font-bold text-white/50 hover:text-white bg-white/5 border border-white/10 transition-colors">
                        Cancel
                    </button>
                    <button type="submit" disabled={loading} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-[#FECB00] text-[#0a1122] transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50"
                        style={{ boxShadow: '0 4px 14px rgba(254,203,0,0.25)' }}>
                        {loading ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <DocumentCheckIcon className="w-5 h-5" />
                        )}
                        {loading ? 'Publishing...' : 'Publish Post'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="rounded-2xl p-6 bg-white/5 border border-white/10 shadow-xl">
                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Post Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    onBlur={generateSlug}
                                    placeholder="Enter an engaging title..."
                                    className="block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-lg font-bold placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FECB00]/50 focus:border-[#FECB00] transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">URL Slug</label>
                                <div className="flex rounded-xl overflow-hidden border border-white/10 focus-within:ring-2 focus-within:ring-[#FECB00]/50 focus-within:border-[#FECB00] transition-all">
                                    <span className="px-4 py-3 bg-white/5 text-white/50 border-r border-white/10 text-sm flex items-center">
                                        divvysolar.in/blogs/
                                    </span>
                                    <input
                                        type="text"
                                        name="slug"
                                        required
                                        value={formData.slug}
                                        onChange={handleChange}
                                        placeholder="post-url-slug"
                                        className="flex-1 px-4 py-3 bg-white/5 text-white text-sm focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Short Excerpt</label>
                                <textarea
                                    name="excerpt"
                                    required
                                    rows="2"
                                    value={formData.excerpt}
                                    onChange={handleChange}
                                    placeholder="A brief summary of what this post is about..."
                                    className="block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FECB00]/50 focus:border-[#FECB00] transition-all text-sm resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Full Content (HTML)</label>
                                <div className="rounded-xl border border-white/10 overflow-hidden">
                                    <div className="bg-white/5 border-b border-white/10 px-4 py-2 flex items-center gap-2">
                                        <span className="text-xs font-bold text-[#FECB00] bg-[#FECB00]/10 px-2 py-1 rounded">HTML</span>
                                        <span className="text-xs text-white/50">Supports raw HTML markup</span>
                                    </div>
                                    <textarea
                                        name="content"
                                        required
                                        rows="15"
                                        value={formData.content}
                                        onChange={handleChange}
                                        placeholder="<p>Write your amazing content here...</p>"
                                        className="block w-full px-4 py-4 bg-white/5 text-white font-mono text-sm placeholder:text-gray-400 focus:outline-none resize-y"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Sticky Area */}
                <div className="lg:col-span-1 border-t lg:border-t-0 border-white/10 pt-8 lg:pt-0">
                    <div className="sticky top-24 space-y-6">
                        
                        <div className="rounded-2xl p-6 bg-white/5 border border-white/10 shadow-xl">
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-5 border-b border-white/10 pb-3">Publish Settings</h3>
                            
                            <div className="space-y-5">
                                <div className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-black/5 dark:bg-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${formData.published ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'}`}>
                                            {formData.published ? <GlobeAltIcon className="w-4 h-4" /> : <LockClosedIcon className="w-4 h-4" />}
                                        </div>
                                        <div>
                                            <p className="text-white text-sm font-bold">{formData.published ? 'Public' : 'Draft'}</p>
                                            <p className="text-white/50 text-[10px] uppercase">Visibility</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="published"
                                            checked={formData.published}
                                            onChange={handleChange}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FECB00]"></div>
                                    </label>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Author Name</label>
                                    <input
                                        type="text"
                                        name="author"
                                        required
                                        value={formData.author}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="block w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#FECB00] focus:border-[#FECB00] transition-all text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl p-6 bg-white/5 border border-white/10 shadow-xl">
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-5 border-b border-white/10 pb-3">Featured Image</h3>
                            
                                <div className="space-y-4">
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <PhotoIcon className="h-5 w-5 text-white/50" />
                                        </div>
                                        <input
                                            type="text"
                                            name="image"
                                            required
                                            value={formData.image}
                                            onChange={handleChange}
                                            placeholder="https://example.com/image.jpg or /uploads/..."
                                            className="block w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#FECB00] focus:border-[#FECB00] transition-all text-sm"
                                        />
                                    </div>
                                    
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileUpload}
                                            className="hidden"
                                            id="image-upload"
                                        />
                                        <label
                                            htmlFor="image-upload"
                                            className="flex items-center justify-center gap-2 w-full py-2.5 border border-dashed border-white/20 rounded-xl text-xs font-bold text-white/70 hover:text-[#FECB00] hover:border-[#FECB00]/50 hover:bg-[#FECB00]/5 transition-all cursor-pointer"
                                        >
                                            {uploading ? (
                                                <div className="w-4 h-4 border-2 border-[#FECB00]/30 border-t-[#FECB00] rounded-full animate-spin"></div>
                                            ) : (
                                                <PhotoIcon className="w-4 h-4" />
                                            )}
                                            {uploading ? 'Uploading...' : 'Upload from Computer'}
                                        </label>
                                    </div>
                                </div>
                                {formData.image && (
                                    <div className="mt-4 rounded-xl overflow-hidden border border-white/10 relative aspect-video bg-black/20">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => {e.target.style.display='none'}} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
    );
}
