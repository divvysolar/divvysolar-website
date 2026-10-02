"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import {
  LockClosedIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  SunIcon,
  ArrowLeftOnRectangleIcon,
  ArrowPathIcon,
  MapPinIcon,
  InboxStackIcon,
  HomeIcon,
  BuildingOffice2Icon,
  BoltIcon,
  ChatBubbleBottomCenterTextIcon,
  XMarkIcon,
  DocumentDuplicateIcon,
  DevicePhoneMobileIcon,
  UserIcon,
  CheckBadgeIcon,
  CalendarIcon,
  GlobeAltIcon,
  SparklesIcon,
  ChartBarIcon,
  ArrowUpRightIcon,
  CheckCircleIcon,
  EyeIcon,
  CurrencyRupeeIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

export default function LeadsPortal() {
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [leads, setLeads] = useState([]);
  const [chatLogs, setChatLogs] = useState([]);
  const [activeSection, setActiveSection] = useState("leads"); // "leads" | "conversations"
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All"); // "All" | "chatbot" | "form"

  // Selected Conversation in Conversation Hub (Split-view)
  const [selectedChatSession, setSelectedChatSession] = useState(null);
  const [copied, setCopied] = useState(false);

  // Standalone Chat Modal State (when clicking 'View Chat' from Leads Table)
  const [modalChatLead, setModalChatLead] = useState(null);
  const [modalChatLog, setModalChatLog] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Check sessionStorage & URL query params on load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab === "conversations" || tab === "chats") {
        setActiveSection("conversations");
      } else if (tab === "leads" || tab === "forms") {
        setActiveSection("leads");
      }
    }

    const savedPin = sessionStorage.getItem("leads_portal_pin");
    if (savedPin) {
      verifyStoredPin(savedPin);
    } else {
      setCheckingAuth(false);
    }
  }, []);

  const switchSection = (section) => {
    setActiveSection(section);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", section);
      window.history.replaceState(null, "", url.toString());
    }
  };

  const verifyStoredPin = async (savedPin) => {
    try {
      const res = await fetch("/api/leads-portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: savedPin })
      });
      if (res.ok) {
        setIsAuthenticated(true);
        fetchLeads(savedPin);
      } else {
        sessionStorage.removeItem("leads_portal_pin");
        setCheckingAuth(false);
      }
    } catch (err) {
      setCheckingAuth(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/leads-portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        sessionStorage.setItem("leads_portal_pin", pin);
        setIsAuthenticated(true);
        fetchLeads(pin);
      } else {
        setError("Invalid Security PIN. Please try again.");
      }
    } catch (err) {
      setError("Server connection failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchLeads = async (activePin) => {
    setLoading(true);
    try {
      const token = activePin || sessionStorage.getItem("leads_portal_pin");
      const res = await fetch("/api/leads-portal", {
        headers: { "X-Leads-PIN": token }
      });
      const data = await res.json();
      if (data.success) {
        const fetchedLeads = data.data || [];
        const fetchedChats = data.chatLogs || [];
        setLeads(fetchedLeads);
        setChatLogs(fetchedChats);
        if (fetchedChats.length > 0 && !selectedChatSession) {
          setSelectedChatSession(fetchedChats[0]);
        }
      }
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setLoading(false);
      setCheckingAuth(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("leads_portal_pin");
    setIsAuthenticated(false);
    setPin("");
  };

  // Open transcript modal from Leads Table
  const openModalTranscript = async (lead) => {
    setModalChatLead(lead);
    setModalLoading(true);
    setModalChatLog(null);
    setCopied(false);

    try {
      const token = pin || sessionStorage.getItem("leads_portal_pin");
      const res = await fetch(`/api/chat/logs?leadId=${lead._id}&phone=${encodeURIComponent(lead.whatsapp || '')}&portal=true`, {
        headers: { "X-Leads-PIN": token }
      });
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

  // Unique locations from leads
  const uniqueLocations = Array.from(
    new Set(
      (leads || [])
        .map(l => l.location ? l.location.trim() : "")
        .filter(loc => loc !== "")
    )
  ).sort((a, b) => a.localeCompare(b));

  // Count metrics for KPIs
  const totalLeadsCount = leads.length;
  const totalChatsCount = chatLogs.length;
  const aiChatLeadsCount = leads.filter(l => String(l.serviceType || "").includes("Chatbot") || String(l.serviceType || "").includes("3D")).length;
  const webFormLeadsCount = totalLeadsCount - aiChatLeadsCount;

  const filteredLeads = (leads || []).filter(lead => {
    const isChat = String(lead.serviceType || "").includes("Chatbot") || String(lead.serviceType || "").includes("3D");

    const matchesSearch =
      String(lead?.name || "").toLowerCase().includes(search.toLowerCase()) ||
      String(lead?.email || "").toLowerCase().includes(search.toLowerCase()) ||
      String(lead?.whatsapp || "").includes(search) ||
      String(lead?.location || "").toLowerCase().includes(search.toLowerCase());
    
    const matchesFilter = filter === "All" || 
      (filter === "residential" && String(lead.serviceType).toLowerCase().includes("residential")) ||
      (filter === "industrial" && (String(lead.serviceType).toLowerCase().includes("industrial") || String(lead.serviceType).toLowerCase().includes("commercial"))) ||
      (filter === "utility" && String(lead.serviceType).toLowerCase().includes("utility"));

    const matchesLocation = selectedLocation === "All" || 
      (lead.location && lead.location.trim() === selectedLocation);

    const matchesSource = sourceFilter === "All" ||
      (sourceFilter === "chatbot" && isChat) ||
      (sourceFilter === "form" && !isChat);

    return matchesSearch && matchesFilter && matchesLocation && matchesSource;
  });

  const filteredChatLogs = (chatLogs || []).filter(chat => {
    const userMsgs = (chat.messages || []).filter(m => m.sender === 'user').map(m => m.text).join(' ');
    const matchesSearch =
      String(chat?.visitorName || "").toLowerCase().includes(search.toLowerCase()) ||
      String(chat?.visitorPhone || "").includes(search) ||
      String(chat?.pageUrl || "").toLowerCase().includes(search.toLowerCase()) ||
      userMsgs.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const exportCSV = () => {
    if (leads.length === 0) return;
    const headers = ["Date & Time", "Name", "Lead Source", "Mobile / WhatsApp", "Email", "Sector / Service", "Location", "Monthly Bill"];
    const rows = filteredLeads.map(lead => {
      const isChatbotLead = String(lead.serviceType || "").includes("Chatbot") || String(lead.serviceType || "").includes("3D");
      const cleanPhone = String(lead.whatsapp || "").replace(/\D/g, "");
      return [
        lead.createdAt ? format(new Date(lead.createdAt), 'yyyy-MM-dd HH:mm') : 'Recently',
        `"${lead.name || ''}"`,
        isChatbotLead ? '"AI Chatbot"' : '"Website Form"',
        cleanPhone ? `"+91 ${cleanPhone}"` : '""',
        lead.email || '',
        `"${(lead.serviceType || 'General').replace('(Chatbot Quality Lead)', '').replace('(3D Solar Audit Lead)', '').trim()}"`,
        `"${lead.location || ''}"`,
        `"${lead.monthlyBill || ''}"`
      ];
    });
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `divvy-leads-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper for generating deterministic avatar colors
  const getAvatarGradient = (name = "") => {
    const gradients = [
      "from-amber-500 to-amber-700",
      "from-blue-500 to-indigo-700",
      "from-emerald-500 to-teal-700",
      "from-violet-500 to-purple-700",
      "from-rose-500 to-pink-700",
      "from-cyan-500 to-blue-700"
    ];
    let sum = 0;
    for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
    return gradients[sum % gradients.length];
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070b14]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 p-[1px] shadow-[0_0_30px_rgba(245,158,11,0.3)] animate-pulse">
            <div className="w-full h-full bg-[#070b14] rounded-2xl flex items-center justify-center">
              <SunIcon className="w-6 h-6 text-amber-400 animate-spin" />
            </div>
          </div>
          <span className="text-slate-400 text-xs font-semibold tracking-wider uppercase">Authenticating Portal Access...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#070b14] text-white p-4" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
        {/* Ambient Glows */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10">
          {/* Brand Header */}
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="relative h-14 w-52 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2 flex items-center justify-center border border-white/20 shadow-[0_12px_35px_rgba(0,0,0,0.6),0_0_25px_rgba(245,158,11,0.2)] mb-4">
              <Image
                src="/divvy_photo.png"
                alt="Divvy Solar"
                fill
                sizes="208px"
                className="object-contain p-1.5"
                priority
                quality={100}
              />
            </div>
            <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
              Enterprise <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">Leads Hub</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-medium">Internal EPC Leads & AI Conversation Console</p>
          </div>

          {/* Login Card */}
          <div className="rounded-3xl p-7 bg-[#0c1322]/90 border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"></div>

            <form className="space-y-4" onSubmit={handleLogin}>
              {error && (
                <div className="p-3 rounded-2xl text-xs font-semibold flex items-center gap-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0"></span>
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">
                  Security Passkey PIN
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <LockClosedIcon className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="pin"
                    type="password"
                    required
                    autoFocus
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3.5 bg-[#050811] border border-white/[0.12] rounded-2xl text-center tracking-[0.3em] font-black text-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                    placeholder="••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !pin}
                className="w-full py-3.5 px-4 rounded-2xl font-black text-xs tracking-wide text-slate-950 shadow-[0_8px_25px_rgba(245,158,11,0.35)] transition-all hover:scale-[1.01] hover:shadow-[0_10px_30px_rgba(245,158,11,0.45)] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 border border-amber-300/40"
                style={{ background: 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 50%, #D97706 100%)' }}
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin"></div>
                ) : (
                  <>
                    <LockClosedIcon className="w-4 h-4 stroke-[2.5]" />
                    <span>Unlock Portal Dashboard</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col selection:bg-amber-400/30 selection:text-amber-200 w-full overflow-x-hidden" style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}>
      
      {/* ========================================================================= */}
      {/* 1. TOP EXECUTIVE NAVIGATION (Silicon Valley SaaS Style - 100% Responsive)  */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 bg-[#0c1322]/90 backdrop-blur-2xl border-b border-white/[0.08]">
        {/* Subtle Ambient Top Rim Line */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          {/* Top Bar: Brand, Desktop Switcher, & Action Controls */}
          <div className="h-16 sm:h-18 flex items-center justify-between gap-3">
            
            {/* Brand Logo & Live Sync Beacon */}
            <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
              <Link href="/" className="flex items-center shrink-0">
                <div className="relative h-10 w-36 sm:h-11 sm:w-44 bg-white/95 backdrop-blur-md rounded-2xl px-2.5 py-1.5 flex items-center justify-center border border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-transform hover:scale-105">
                  <Image
                    src="/divvy_photo.png"
                    alt="Divvy Solar"
                    fill
                    sizes="(max-width: 640px) 144px, 176px"
                    className="object-contain p-1"
                    priority
                    quality={100}
                  />
                </div>
              </Link>

              <div className="min-w-0 hidden lg:flex flex-col justify-center border-l border-white/[0.08] pl-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    Live Atlas
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium truncate">MNRE Certified Solar EPC Lead & Chat Operations</p>
              </div>
            </div>

            {/* Apple/Linear Segmented Pill Switcher (Desktop & Tablets) */}
            <div className="hidden md:flex items-center bg-[#070b14]/90 p-1 rounded-2xl border border-white/[0.08] shadow-inner shrink-0">
              <button
                onClick={() => switchSection("leads")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeSection === "leads"
                    ? "bg-gradient-to-r from-[#142038] to-[#182848] text-amber-300 border border-amber-400/40 shadow-[0_4px_16px_rgba(0,0,0,0.5),0_0_15px_rgba(245,158,11,0.15)]"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                }`}
              >
                <InboxStackIcon className="w-4 h-4" />
                <span>Leads Database</span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                  activeSection === 'leads' ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' : 'bg-white/[0.06] text-slate-400'
                }`}>
                  {totalLeadsCount}
                </span>
              </button>

              <button
                onClick={() => switchSection("conversations")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeSection === "conversations"
                    ? "bg-gradient-to-r from-[#142038] to-[#182848] text-amber-300 border border-amber-400/40 shadow-[0_4px_16px_rgba(0,0,0,0.5),0_0_15px_rgba(245,158,11,0.15)]"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                }`}
              >
                <ChatBubbleBottomCenterTextIcon className="w-4 h-4" />
                <span>Customer Conversations</span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                  activeSection === 'conversations' ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' : 'bg-white/[0.06] text-slate-400'
                }`}>
                  {totalChatsCount}
                </span>
              </button>
            </div>

            {/* Quick Action Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => fetchLeads()}
                disabled={loading}
                className="p-2 sm:p-2.5 rounded-xl border border-white/[0.08] bg-[#0c1322] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-all cursor-pointer shadow-sm"
                title="Refresh MongoDB Records"
              >
                <ArrowPathIcon className={`w-4 h-4 ${loading ? 'animate-spin text-amber-300' : ''}`} />
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-bold transition-all cursor-pointer"
              >
                <ArrowLeftOnRectangleIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>

          {/* Mobile Segmented Switcher (Visible on <md) */}
          <div className="flex md:hidden items-center bg-[#070b14]/90 p-1 rounded-xl border border-white/[0.08] shadow-inner mb-2.5 w-full">
            <button
              onClick={() => switchSection("leads")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeSection === "leads"
                  ? "bg-gradient-to-r from-[#142038] to-[#182848] text-amber-300 border border-amber-400/40 shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <InboxStackIcon className="w-3.5 h-3.5" />
              <span>Leads Database</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                activeSection === 'leads' ? 'bg-amber-400/20 text-amber-300' : 'bg-white/[0.06] text-slate-400'
              }`}>
                {totalLeadsCount}
              </span>
            </button>

            <button
              onClick={() => switchSection("conversations")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeSection === "conversations"
                  ? "bg-gradient-to-r from-[#142038] to-[#182848] text-amber-300 border border-amber-400/40 shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <ChatBubbleBottomCenterTextIcon className="w-3.5 h-3.5" />
              <span>Conversations</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                activeSection === 'conversations' ? 'bg-amber-400/20 text-amber-300' : 'bg-white/[0.06] text-slate-400'
              }`}>
                {totalChatsCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN DASHBOARD CONTENT AREA                                            */}
      {/* ========================================================================= */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 flex-1 w-full space-y-4 sm:space-y-6">

        {/* ========================================================================= */}
        {/* SECTION 1: VERIFIED LEADS DATABASE VIEW                                   */}
        {/* ========================================================================= */}
        {activeSection === "leads" && (
          <div className="space-y-4 animate-in fade-in duration-300">
            
            {/* Sleek Toolbar: Search, Filters & Export Button (Fully Responsive Grid) */}
            <div className="p-3 sm:p-4 rounded-2xl bg-[#0c1322]/90 border border-white/[0.08] shadow-[0_8px_25px_rgba(0,0,0,0.4)] flex flex-col gap-3">
              
              {/* Search Box */}
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <MagnifyingGlassIcon className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-4 py-2.5 bg-[#070b14]/90 border border-white/[0.1] rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all"
                  placeholder="Search by client name, mobile number, location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              
              {/* Responsive Filter Grid & Export Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                
                {/* 1. Lead Source Filter */}
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <GlobeAltIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <select
                    className="block w-full pl-9 pr-8 py-2 sm:py-2.5 bg-[#070b14]/90 border border-white/[0.1] rounded-xl text-white text-xs font-semibold focus:outline-none focus:border-amber-400 cursor-pointer appearance-none shadow-sm transition-all"
                    value={sourceFilter}
                    onChange={(e) => setSourceFilter(e.target.value)}
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 8L1 3h10z' fill='%2394a3b8'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}
                  >
                    <option value="All" className="bg-[#0c1322]">All Sources</option>
                    <option value="chatbot" className="bg-[#0c1322]">🤖 AI Chatbot Leads</option>
                    <option value="form" className="bg-[#0c1322]">🌐 Website Form Leads</option>
                  </select>
                </div>

                {/* 2. Sector Filter */}
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <FunnelIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <select
                    className="block w-full pl-9 pr-8 py-2 sm:py-2.5 bg-[#070b14]/90 border border-white/[0.1] rounded-xl text-white text-xs font-semibold focus:outline-none focus:border-amber-400 cursor-pointer appearance-none shadow-sm transition-all"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 8L1 3h10z' fill='%2394a3b8'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}
                  >
                    <option value="All" className="bg-[#0c1322]">All Sectors</option>
                    <option value="residential" className="bg-[#0c1322]">Residential Solar</option>
                    <option value="industrial" className="bg-[#0c1322]">Industrial / Commercial</option>
                    <option value="utility" className="bg-[#0c1322]">Utility Projects</option>
                  </select>
                </div>

                {/* 3. Location Filter */}
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <MapPinIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <select
                    className="block w-full pl-9 pr-8 py-2 sm:py-2.5 bg-[#070b14]/90 border border-white/[0.1] rounded-xl text-white text-xs font-semibold focus:outline-none focus:border-amber-400 cursor-pointer appearance-none shadow-sm transition-all"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 8L1 3h10z' fill='%2394a3b8'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}
                  >
                    <option value="All" className="bg-[#0c1322]">All Locations</option>
                    {uniqueLocations.map(loc => (
                      <option key={loc} value={loc} className="bg-[#0c1322]">{loc}</option>
                    ))}
                  </select>
                </div>

                {/* 4. Export CSV Button */}
                <button
                  onClick={exportCSV}
                  disabled={leads.length === 0}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 sm:py-2.5 rounded-xl text-xs font-black text-slate-950 shadow-[0_4px_16px_rgba(245,158,11,0.3)] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer w-full border border-amber-300/40"
                  style={{ background: 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 50%, #D97706 100%)' }}
                >
                  <ArrowDownTrayIcon className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* ======================================================================= */}
            {/* MOBILE LEADS VIEW (<md): Native App-Like Clean Cards                    */}
            {/* ======================================================================= */}
            <div className="block md:hidden space-y-3">
              {loading ? (
                <div className="p-12 rounded-2xl bg-[#0c1322]/90 border border-white/[0.08] text-center flex flex-col items-center gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-amber-400/20 border-t-amber-400 animate-spin"></div>
                  <span className="text-slate-400 text-xs font-medium">Fetching verified database records...</span>
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="p-10 rounded-2xl bg-[#0c1322]/90 border border-white/[0.08] text-center text-slate-400 text-xs">
                  No matching prospect records found.
                </div>
              ) : (
                filteredLeads.map((lead) => {
                  const cleanPhone = String(lead.whatsapp || "").replace(/\D/g, "");
                  const whatsappUrl = `https://wa.me/${cleanPhone.startsWith("91") ? cleanPhone : "91" + cleanPhone}?text=Hello%20${encodeURIComponent(lead.name || "")},%20we%20received%20your%20Solar%20Audit%20inquiry%20at%20Divvy%20Solar.`;
                  const isChatbotLead = String(lead.serviceType || "").includes("Chatbot") || String(lead.serviceType || "").includes("3D");
                  const nameInitial = (lead.name || "P").trim().charAt(0).toUpperCase();

                  return (
                    <div
                      key={lead._id}
                      className="p-4 rounded-2xl bg-[#0c1322]/95 border border-white/[0.08] shadow-[0_8px_25px_rgba(0,0,0,0.4)] space-y-3 relative overflow-hidden group hover:border-amber-400/30 transition-all"
                    >
                      {/* Top Row: Avatar + Name + Source Badge + Date */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`w-9 h-9 rounded-2xl bg-gradient-to-br ${getAvatarGradient(lead.name || '')} flex items-center justify-center text-white font-black text-xs shadow-md shrink-0`}>
                            {nameInitial}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-extrabold text-white tracking-tight truncate">
                              {lead.name}
                            </h4>
                            <div className="mt-0.5">
                              {isChatbotLead ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black bg-amber-400/15 text-amber-300 border border-amber-400/30">
                                  <SparklesIcon className="w-2.5 h-2.5" /> 🤖 AI Chatbot Lead
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-sky-500/15 text-sky-300 border border-sky-500/30">
                                  <GlobeAltIcon className="w-2.5 h-2.5" /> 🌐 Website Form Lead
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <p className="text-[11px] font-bold text-white">
                            {lead.createdAt ? format(new Date(lead.createdAt), 'MMM dd') : 'Recent'}
                          </p>
                          <p className="text-[9px] text-slate-400 font-mono">
                            {lead.createdAt ? format(new Date(lead.createdAt), 'hh:mm a') : ''}
                          </p>
                        </div>
                      </div>

                      {/* Middle Row: Phone & WhatsApp Actions */}
                      <div className="flex items-center gap-2 pt-1 border-t border-white/[0.04]">
                        <a
                          href={`tel:${cleanPhone}`}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono font-bold text-slate-200"
                        >
                          📱 +91 {cleanPhone}
                        </a>
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 py-2 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-bold"
                        >
                          💬 WhatsApp ↗
                        </a>
                      </div>

                      {/* Bottom Row: Sector, Bill & Location + Transcript Proof */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/[0.04] text-[11px]">
                        <div className="flex flex-wrap items-center gap-2 text-slate-300">
                          <span className="px-2 py-0.5 rounded-md bg-white/[0.06] text-amber-300 font-extrabold text-[10px] uppercase">
                            {lead.serviceType?.replace('(Chatbot Quality Lead)', '').replace('(3D Solar Audit Lead)', '') || 'General'}
                          </span>
                          {lead.monthlyBill && (
                            <span className="text-slate-400">
                              Bill: <strong className="text-white font-mono">{lead.monthlyBill}</strong>
                            </span>
                          )}
                          {lead.location && (
                            <span className="flex items-center gap-1 text-slate-300">
                              <MapPinIcon className="w-3 h-3 text-amber-400" />
                              {lead.location}
                            </span>
                          )}
                        </div>

                        {isChatbotLead && (
                          <button
                            onClick={() => openModalTranscript(lead)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 text-[11px] font-bold cursor-pointer transition-all ml-auto"
                          >
                            <EyeIcon className="w-3 h-3" />
                            <span>Transcript</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* ======================================================================= */}
            {/* DESKTOP/TABLET VIEW (>=md): High-End Modern Data Table                  */}
            {/* ======================================================================= */}
            <div className="hidden md:block rounded-2xl overflow-hidden bg-[#0c1322]/90 border border-white/[0.08] shadow-[0_12px_35px_rgba(0,0,0,0.5)]">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/[0.06]">
                  <thead className="bg-[#080d1a]/80">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Date & Time</th>
                      <th scope="col" className="px-6 py-4 text-left text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Prospect Profile & Source</th>
                      <th scope="col" className="px-6 py-4 text-left text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Sector & Monthly Bill</th>
                      <th scope="col" className="px-6 py-4 text-left text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">City / Location</th>
                      <th scope="col" className="px-6 py-4 text-right text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {loading ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-20 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-8 h-8 rounded-full border-2 border-amber-400/20 border-t-amber-400 animate-spin"></div>
                            <span className="text-slate-400 text-xs font-medium">Fetching verified database records...</span>
                          </div>
                        </td>
                      </tr>
                    ) : filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-20 text-center text-slate-400 text-xs">
                          No matching prospect records found.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => {
                        const cleanPhone = String(lead.whatsapp || "").replace(/\D/g, "");
                        const whatsappUrl = `https://wa.me/${cleanPhone.startsWith("91") ? cleanPhone : "91" + cleanPhone}?text=Hello%20${encodeURIComponent(lead.name || "")},%20we%20received%20your%20Solar%20Audit%20inquiry%20at%20Divvy%20Solar.`;
                        const isChatbotLead = String(lead.serviceType || "").includes("Chatbot") || String(lead.serviceType || "").includes("3D");
                        const nameInitial = (lead.name || "P").trim().charAt(0).toUpperCase();

                        return (
                          <tr key={lead._id} className="hover:bg-white/[0.03] transition-colors group">
                            
                            {/* 1. Date & Time */}
                            <td className="px-6 py-4.5 whitespace-nowrap">
                              <p className="text-xs font-bold text-white tracking-tight">
                                {lead.createdAt ? format(new Date(lead.createdAt), 'MMM dd, yyyy') : 'Recently'}
                              </p>
                              <p className="text-[10px] text-slate-400 mt-0.5 font-mono flex items-center gap-1">
                                <ClockIcon className="w-3 h-3 text-slate-500" />
                                {lead.createdAt ? format(new Date(lead.createdAt), 'hh:mm a') : 'N/A'}
                              </p>
                            </td>

                            {/* 2. Prospect Profile & Lead Source */}
                            <td className="px-6 py-4.5 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                {/* Monogram Avatar */}
                                <div className={`w-9 h-9 rounded-2xl bg-gradient-to-br ${getAvatarGradient(lead.name || '')} flex items-center justify-center text-white font-black text-xs shadow-md shrink-0`}>
                                  {nameInitial}
                                </div>
                                
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-extrabold text-white tracking-tight">
                                      {lead.name}
                                    </span>
                                    
                                    {/* Explicit Source Badge */}
                                    {isChatbotLead ? (
                                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black bg-amber-400/15 text-amber-300 border border-amber-400/30 flex items-center gap-1 shadow-sm">
                                        <SparklesIcon className="w-2.5 h-2.5" /> 🤖 AI Chatbot Lead
                                      </span>
                                    ) : (
                                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-extrabold bg-sky-500/15 text-sky-300 border border-sky-500/30 flex items-center gap-1 shadow-sm">
                                        <GlobeAltIcon className="w-2.5 h-2.5" /> 🌐 Website Form Lead
                                      </span>
                                    )}
                                  </div>
                                  
                                  <div className="flex items-center gap-2.5 mt-1.5">
                                    <a
                                      href={`tel:${cleanPhone}`}
                                      className="text-xs text-slate-300 hover:text-amber-300 font-mono transition-colors font-medium flex items-center gap-1"
                                      title="Call customer"
                                    >
                                      📱 +91 {cleanPhone}
                                    </a>
                                    <span className="text-slate-600">•</span>
                                    <a
                                      href={whatsappUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 transition-all hover:bg-emerald-500/25 flex items-center gap-1"
                                      title="Open direct WhatsApp conversation with customer"
                                    >
                                      💬 Chat on WhatsApp ↗
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* 3. Sector & Monthly Bill */}
                            <td className="px-6 py-4.5 whitespace-nowrap">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-white/[0.06] text-amber-300 border border-white/[0.08]">
                                  {lead.serviceType?.replace('(Chatbot Quality Lead)', '').replace('(3D Solar Audit Lead)', '') || 'General'}
                                </span>
                              </div>
                              <p className="text-xs text-slate-300 font-medium">
                                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Bill: </span>
                                {lead.monthlyBill}
                              </p>
                            </td>

                            {/* 4. Location */}
                            <td className="px-6 py-4.5 whitespace-nowrap">
                              <p className="text-xs text-slate-200 font-medium flex items-center gap-1.5">
                                <MapPinIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                <span>{lead.location}</span>
                              </p>
                            </td>

                            {/* 5. Actions / View Transcript */}
                            <td className="px-6 py-4.5 whitespace-nowrap text-right">
                              {isChatbotLead ? (
                                <button
                                  onClick={() => openModalTranscript(lead)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold transition-all cursor-pointer shadow-sm hover:scale-105"
                                  title="Inspect full conversation proof"
                                >
                                  <EyeIcon className="w-3.5 h-3.5" />
                                  <span>Transcript</span>
                                </button>
                              ) : (
                                <a
                                  href={whatsappUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white text-xs font-medium transition-all"
                                >
                                  <span>Connect</span>
                                </a>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="px-6 py-3.5 flex items-center justify-between text-xs text-slate-400 border-t border-white/[0.06] bg-[#080d1a]/80">
                <span className="font-medium">Showing {filteredLeads.length} of {totalLeadsCount} records</span>
                <span className="text-[10px] font-mono text-slate-500">Live Atlas Sync • Encrypted Storage</span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 2: CUSTOMER CONVERSATIONS & AI TRANSCRIPTS HUB                    */}
        {/* ========================================================================= */}
        {activeSection === "conversations" && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* Split Screen Container (Left Directory + Right Transcript Viewer) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[500px] lg:min-h-[660px]">
              
              {/* Left Column: Sessions Directory (5 cols on Desktop, Full on mobile when no session selected) */}
              <div className={`lg:col-span-5 flex flex-col bg-[#0c1322]/90 border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.5)] ${
                selectedChatSession ? 'hidden lg:flex' : 'flex'
              }`}>
                {/* Directory Search */}
                <div className="p-3.5 border-b border-white/[0.08] bg-[#080d1a]/80">
                  <div className="relative">
                    <MagnifyingGlassIcon className="h-4 w-4 text-slate-400 absolute left-3.5 top-2.5" />
                    <input
                      type="text"
                      className="w-full bg-[#070b14]/90 border border-white/[0.1] rounded-xl pl-10 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30"
                      placeholder="Search conversation text, client name, phone..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                {/* Sessions List */}
                <div className="flex-1 overflow-y-auto max-h-[480px] lg:max-h-[580px] divide-y divide-white/[0.04] custom-scrollbar">
                  {filteredChatLogs.length === 0 ? (
                    <div className="p-10 text-center text-slate-500 text-xs">
                      No conversation sessions found.
                    </div>
                  ) : (
                    filteredChatLogs.map((chat) => {
                      const isSelected = selectedChatSession?._id === chat._id;
                      const firstUserMsg = (chat.messages || []).find(m => m.sender === 'user')?.text || 'Started conversation';
                      const hasPhone = Boolean(chat.visitorPhone && chat.visitorPhone.length >= 10);
                      const cleanPhone = String(chat.visitorPhone || "").replace(/\D/g, "");

                      return (
                        <div
                          key={chat._id}
                          onClick={() => setSelectedChatSession(chat)}
                          className={`p-3.5 sm:p-4 transition-all cursor-pointer relative ${
                            isSelected
                              ? "bg-gradient-to-r from-[#142038] to-[#182848] border-l-4 border-amber-400 shadow-inner"
                              : "hover:bg-white/[0.03]"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-xs text-white tracking-tight">
                                {chat.visitorName || (hasPhone ? `+91 ${cleanPhone}` : 'Website Visitor')}
                              </span>
                              {hasPhone && (
                                <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                  Lead
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {chat.updatedAt ? format(new Date(chat.updatedAt), 'hh:mm a') : ''}
                            </span>
                          </div>

                          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-normal">
                            &ldquo;{firstUserMsg.replace(/\*\*/g, '').slice(0, 95)}&rdquo;
                          </p>

                          <div className="flex items-center justify-between mt-2 pt-1.5 text-[10px] text-slate-400 border-t border-white/[0.04]">
                            <span className="truncate max-w-[170px] text-slate-500">{chat.pageUrl || '/'}</span>
                            <span className="font-mono bg-white/[0.06] px-2 py-0.5 rounded-full text-slate-300 font-semibold">
                              {chat.messages?.length || 0} msgs
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Right Column: Full Word-to-Word Conversation Transcript Viewer (7 cols on Desktop, Full on mobile when selected) */}
              <div className={`lg:col-span-7 flex flex-col bg-[#090e1b] border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.5)] ${
                selectedChatSession ? 'flex' : 'hidden lg:flex'
              }`}>
                {selectedChatSession ? (
                  <>
                    {/* Transcript Top Bar / Prospect Summary */}
                    <div className="p-3.5 sm:p-4 bg-[#0c1322] border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-2.5 shrink-0">
                      
                      {/* Mobile Back Button */}
                      <div className="flex items-center gap-2.5 w-full sm:w-auto">
                        <button
                          onClick={() => setSelectedChatSession(null)}
                          className="lg:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-amber-300 text-xs font-bold transition-all cursor-pointer shrink-0"
                        >
                          <span>← Back</span>
                        </button>
                        
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-black text-xs sm:text-base text-white tracking-tight truncate">
                              {selectedChatSession.visitorName || (selectedChatSession.visitorPhone ? `Prospect (+91 ${selectedChatSession.visitorPhone})` : 'Website Chat Visitor')}
                            </h3>
                            {selectedChatSession.visitorPhone && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                Verified
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 flex items-center gap-2 truncate">
                            <span>Session: <code className="text-amber-300 font-mono font-bold">{selectedChatSession.sessionId}</code></span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <button
                          onClick={() => copyTranscriptText(selectedChatSession)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-xs text-white font-bold transition-all cursor-pointer"
                        >
                          <DocumentDuplicateIcon className="w-3.5 h-3.5 text-amber-300" />
                          <span>{copied ? "Copied!" : "Copy"}</span>
                        </button>
                        
                        {selectedChatSession.visitorPhone && (
                          <a
                            href={`https://wa.me/91${selectedChatSession.visitorPhone.replace(/\D/g, '')}?text=Hello,%20we%20received%20your%20inquiry%20via%20Divvy%20Solar.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 text-xs font-bold transition-all"
                          >
                            <ChatBubbleLeftRightIcon className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 space-y-3.5 bg-[#070b14] max-h-[440px] sm:max-h-[520px] custom-scrollbar text-xs sm:text-sm">
                      {(selectedChatSession.messages || []).map((m, mIdx) => {
                        const isUser = m.sender === 'user';
                        return (
                          <div key={mIdx} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                            <div className="flex items-center gap-2 mb-1 px-1">
                              <span className={`text-[10px] font-extrabold uppercase tracking-wider ${isUser ? 'text-amber-300' : 'text-blue-400'}`}>
                                {isUser ? `👤 ${selectedChatSession.visitorName || 'Prospect'}` : '☀️ Divvy Solar Advisory'}
                              </span>
                              <span className="text-[9px] text-slate-500 font-mono">
                                {format(new Date(m.timestamp), 'hh:mm:ss a')}
                              </span>
                            </div>
                            <div
                              className={`max-w-[90%] sm:max-w-[85%] rounded-2xl p-3 sm:p-3.5 leading-relaxed whitespace-pre-wrap ${
                                isUser
                                  ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 font-semibold rounded-br-sm shadow-[0_4px_15px_rgba(245,158,11,0.2)]'
                                  : 'bg-[#0f172a] border border-white/[0.08] text-slate-200 rounded-bl-sm shadow-md'
                              }`}
                            >
                              {m.text}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Transcript Footer */}
                    <div className="px-4 py-2.5 sm:py-3 bg-[#0c1322] border-t border-white/[0.08] flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-medium">
                      <span>Verified MongoDB Atlas Audit Trail</span>
                      <span className="font-mono text-slate-300">{selectedChatSession.messages?.length || 0} Msgs</span>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-slate-500 space-y-3">
                    <ChatBubbleBottomCenterTextIcon className="w-12 h-12 opacity-30 text-amber-300" />
                    <p className="text-sm font-medium">Select a conversation thread on the left to inspect the word-to-word transcript.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* 4. MODAL TRANSCRIPT DRAWER (When opening from Leads Table)                */}
      {/* ========================================================================= */}
      {modalChatLead && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#0c1322] border border-white/[0.1] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.85)] flex flex-col max-h-[92vh] sm:max-h-[90vh]">
            <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-[#080d1a] border-b border-white/[0.08] flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-white text-sm sm:text-base tracking-tight truncate">Conversation Proof</h3>
                  <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black bg-amber-400/15 text-amber-300 border border-amber-400/30 shrink-0">
                    Audit Log
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 font-medium truncate">
                  Client: <strong className="text-white">{modalChatLead.name}</strong> • Phone: <strong className="text-amber-300 font-mono">+91 {modalChatLead.whatsapp}</strong>
                </p>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {modalChatLog && modalChatLog.messages && (
                  <button
                    onClick={() => copyTranscriptText(modalChatLog)}
                    className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-xs text-white font-bold transition-all cursor-pointer"
                  >
                    <DocumentDuplicateIcon className="w-3.5 h-3.5 text-amber-300" />
                    <span className="hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
                  </button>
                )}
                <button
                  onClick={() => setModalChatLead(null)}
                  className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 sm:space-y-4 bg-[#070b14] custom-scrollbar text-xs sm:text-sm">
              {modalLoading ? (
                <div className="py-20 flex flex-col items-center justify-center gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-amber-400/20 border-t-amber-400 animate-spin"></div>
                  <span className="text-slate-400 text-xs font-medium">Retrieving conversation logs from MongoDB...</span>
                </div>
              ) : !modalChatLog || !modalChatLog.messages || modalChatLog.messages.length === 0 ? (
                <div className="py-16 text-center text-slate-400 text-sm">
                  <p>No interactive AI chat logs found for this lead.</p>
                  <p className="text-xs text-slate-500 mt-1">This inquiry was submitted directly via the website contact form.</p>
                </div>
              ) : (
                <div className="space-y-3.5 sm:space-y-4">
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-[11px] sm:text-xs text-slate-400 flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-1">
                    <span><strong>Session ID:</strong> <span className="font-mono text-amber-300">{modalChatLog.sessionId}</span></span>
                    <span><strong>Landing Page:</strong> {modalChatLog.pageUrl || '/'}</span>
                  </div>

                  {modalChatLog.messages.map((m, mIdx) => {
                    const isUser = m.sender === 'user';
                    return (
                      <div key={mIdx} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                        <div className="flex items-center gap-2 mb-1 px-1">
                          <span className={`text-[10px] font-extrabold uppercase tracking-wider ${isUser ? 'text-amber-300' : 'text-blue-400'}`}>
                            {isUser ? `👤 ${modalChatLead.name || 'Client'}` : '☀️ Divvy Solar Advisory'}
                          </span>
                          <span className="text-[9px] text-slate-500 font-mono">
                            {format(new Date(m.timestamp), 'hh:mm:ss a')}
                          </span>
                        </div>
                        <div
                          className={`max-w-[90%] sm:max-w-[85%] rounded-2xl p-3 sm:p-3.5 leading-relaxed whitespace-pre-wrap ${
                            isUser
                              ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 font-semibold rounded-br-sm shadow-[0_4px_15px_rgba(245,158,11,0.2)]'
                              : 'bg-[#0f172a] border border-white/[0.08] text-slate-200 rounded-bl-sm shadow-md'
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

            <div className="px-4 sm:px-6 py-3 sm:py-3.5 bg-[#080d1a] border-t border-white/[0.08] flex items-center justify-between text-[11px] sm:text-xs text-slate-400">
              <span className="truncate">MongoDB Verified Record</span>
              <button
                onClick={() => setModalChatLead(null)}
                className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-white font-bold transition-colors cursor-pointer shrink-0"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
