"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { SunIcon, BoltIcon } from "@heroicons/react/24/outline";

const PROJECTS = [
    // --- PUNJAB REGION ---
    {
        id: "pun-amritsar",
        city: "Amritsar", state: "Punjab",
        x: "28.5%", y: "21.5%",
        capacity: "50.0 MW", type: "Mega Solar Power Station",
        builder: "Divvy Solar EPC Team", builderRole: "Lead EPC Partner",
        completedYear: "2024", panelsInstalled: "95,000+", status: "Live & Operational", pinColor: "#FECB00", region: "Punjab",
    },
    {
        id: "pun-ludhiana",
        city: "Ludhiana", state: "Punjab",
        x: "30.0%", y: "23.5%",
        capacity: "25.0 MW", type: "Mega Industrial Cluster",
        builder: "Divvy Solar EPC Team", builderRole: "Lead EPC Partner",
        completedYear: "2024", panelsInstalled: "48,000+", status: "Live & Operational", pinColor: "#FECB00", region: "Punjab",
    },
    {
        id: "pun-mohali",
        city: "Mohali", state: "Punjab",
        x: "31.8%", y: "24.2%",
        capacity: "8.2 MW", type: "Commercial Utility Grid",
        builder: "Divvy Solar EPC Team", builderRole: "Lead EPC Partner",
        completedYear: "2024", panelsInstalled: "16,000+", status: "Live & Operational", pinColor: "#FECB00", region: "Punjab",
    },
    {
        id: "pun-jalandhar",
        city: "Jalandhar", state: "Punjab",
        x: "29.2%", y: "22.3%",
        capacity: "9.8 MW", type: "Industrial Rooftop Cluster",
        builder: "Divvy Solar EPC Team", builderRole: "Lead EPC Partner",
        completedYear: "2024", panelsInstalled: "18,500+", status: "Live & Operational", pinColor: "#FECB00", region: "Punjab",
    },
    {
        id: "pun-patiala",
        city: "Patiala", state: "Punjab",
        x: "31.0%", y: "25.5%",
        capacity: "11.0 MW", type: "Agri-Solar Utility",
        builder: "Divvy Solar EPC Team", builderRole: "Lead EPC Partner",
        completedYear: "2024", panelsInstalled: "21,000+", status: "Live & Operational", pinColor: "#FECB00", region: "Punjab",
    },
    {
        id: "pun-bathinda",
        city: "Bathinda", state: "Punjab",
        x: "28.2%", y: "25.8%",
        capacity: "14.5 MW", type: "Industrial Solar Plant",
        builder: "Divvy Solar EPC Team", builderRole: "Lead EPC Partner",
        completedYear: "2024", panelsInstalled: "28,000+", status: "Live & Operational", pinColor: "#FECB00", region: "Punjab",
    },
    {
        id: "pun-ferozepur",
        city: "Ferozepur", state: "Punjab",
        x: "27.5%", y: "23.5%",
        capacity: "5.5 MW", type: "Border-Grid Utility",
        builder: "Divvy Solar EPC Team", builderRole: "Lead EPC Partner",
        completedYear: "2024", panelsInstalled: "10,500+", status: "Live & Operational", pinColor: "#FECB00", region: "Punjab",
    },
    {
        id: "pun-moga",
        city: "Moga", state: "Punjab",
        x: "28.8%", y: "24.0%",
        capacity: "4.2 MW", type: "Warehouse Solar Grid",
        builder: "Divvy Solar EPC Team", builderRole: "Lead EPC Partner",
        completedYear: "2024", panelsInstalled: "8,000+", status: "Live & Operational", pinColor: "#FECB00", region: "Punjab",
    },

    // --- HARYANA REGION ---
    {
        id: "har-panipat",
        city: "Panipat", state: "Haryana",
        x: "33.0%", y: "28.8%",
        capacity: "45.0 MW", type: "Utility Scale Solar Park",
        builder: "Divvy Solar EPC Team", builderRole: "Lead EPC Partner",
        completedYear: "2024", panelsInstalled: "82,000+", status: "Live & Operational", pinColor: "#00e5ff", region: "Haryana",
    },
    {
        id: "har-hisar",
        city: "Hisar", state: "Haryana",
        x: "29.3%", y: "29.6%",
        capacity: "12.5 MW", type: "Industrial Power Grid",
        builder: "Divvy Solar EPC Team", builderRole: "Lead EPC Partner",
        completedYear: "2024", panelsInstalled: "24,000+", status: "Live & Operational", pinColor: "#00e5ff", region: "Haryana",
    },
    {
        id: "har-gurgaon",
        city: "Gurgaon", state: "Haryana",
        x: "33.2%", y: "31.7%",
        capacity: "18.5 MW", type: "Corporate Energy Hub",
        builder: "Divvy Solar EPC Team", builderRole: "Lead EPC Partner",
        completedYear: "2024", panelsInstalled: "35,000+", status: "Live & Operational", pinColor: "#00e5ff", region: "Haryana",
    },
    {
        id: "har-bhiwani",
        city: "Bhiwani", state: "Haryana",
        x: "30.5%", y: "30.5%",
        capacity: "32.0 MW", type: "Regional Solar Park",
        builder: "Divvy Solar EPC Team", builderRole: "Lead EPC Partner",
        completedYear: "2024", panelsInstalled: "61,000+", status: "Live & Operational", pinColor: "#00e5ff", region: "Haryana",
    },
    {
        id: "har-sirsa",
        city: "Sirsa", state: "Haryana",
        x: "26.8%", y: "28.8%",
        capacity: "22.5 MW", type: "Border-Grid Integration",
        builder: "Divvy Solar EPC Team", builderRole: "Lead EPC Partner",
        completedYear: "2024", panelsInstalled: "43,000+", status: "Live & Operational", pinColor: "#00e5ff", region: "Haryana",
    },
    {
        id: "har-rohtak",
        city: "Rohtak", state: "Haryana",
        x: "32.0%", y: "30.4%",
        capacity: "14.2 MW", type: "State Grid Project",
        builder: "Divvy Solar EPC Team", builderRole: "Lead EPC Partner",
        completedYear: "2024", panelsInstalled: "27,000+", status: "Live & Operational", pinColor: "#00e5ff", region: "Haryana",
    },
    {
        id: "har-karnal",
        city: "Karnal", state: "Haryana",
        x: "33.1%", y: "27.5%",
        capacity: "15.5 MW", type: "Utility Solar Grid",
        builder: "Divvy Solar EPC Team", builderRole: "Lead EPC Partner",
        completedYear: "2024", panelsInstalled: "29,000+", status: "Live & Operational", pinColor: "#00e5ff", region: "Haryana",
    },
    {
        id: "har-sonipat",
        city: "Sonipat", state: "Haryana",
        x: "33.5%", y: "30.0%",
        capacity: "7.5 MW", type: "Commercial Solar Cluster",
        builder: "Divvy Solar EPC Team", builderRole: "Lead EPC Partner",
        completedYear: "2024", panelsInstalled: "14,000+", status: "Live & Operational", pinColor: "#00e5ff", region: "Haryana",
    },
    {
        id: "har-faridabad",
        city: "Faridabad", state: "Haryana",
        x: "34.2%", y: "32.5%",
        capacity: "12.0 MW", type: "Industrial Rooftop Grid",
        builder: "Divvy Solar EPC Team", builderRole: "Lead EPC Partner",
        completedYear: "2024", panelsInstalled: "23,000+", status: "Live & Operational", pinColor: "#00e5ff", region: "Haryana",
    },
    {
        id: "har-ambala",
        city: "Ambala", state: "Haryana",
        x: "33.5%", y: "24.5%",
        capacity: "14.0 MW", type: "Industrial Grid Hub",
        builder: "Divvy Solar EPC Team", builderRole: "Lead EPC Partner",
        completedYear: "2023", panelsInstalled: "26,000+", status: "Live & Operational", pinColor: "#00e5ff", region: "Haryana",
    },
    {
        id: "har-rewari",
        city: "Rewari", state: "Haryana",
        x: "31.5%", y: "32.5%",
        capacity: "3.5 MW", type: "MSME Solar Solution",
        builder: "Divvy Solar EPC Team", builderRole: "Lead EPC Partner",
        completedYear: "2024", panelsInstalled: "6,500+", status: "Live & Operational", pinColor: "#00e5ff", region: "Haryana",
    },
    {
        id: "har-jind",
        city: "Jind", state: "Haryana",
        x: "31.5%", y: "29.0%",
        capacity: "6.2 MW", type: "Agri-Utility Solar",
        builder: "Divvy Solar EPC Team", builderRole: "Lead EPC Partner",
        completedYear: "2024", panelsInstalled: "11,800+", status: "Live & Operational", pinColor: "#00e5ff", region: "Haryana",
    },

    // --- DELHI REGION ---
    {
        id: "del-central",
        city: "New Delhi", state: "Delhi",
        x: "33.8%", y: "31.2%",
        capacity: "2.5 MW", type: "Government Complex Solar",
        builder: "Divvy Solar EPC Team", builderRole: "Lead EPC Partner",
        completedYear: "2024", panelsInstalled: "4,800+", status: "Live & Operational", pinColor: "#ef4444", region: "Delhi",
    },
    {
        id: "del-dwarka",
        city: "Dwarka", state: "Delhi",
        x: "33.2%", y: "31.2%",
        capacity: "1.8 MW", type: "Residential Society Microgrid",
        builder: "Divvy Solar EPC Team", builderRole: "Lead EPC Partner",
        completedYear: "2024", panelsInstalled: "3,500+", status: "Live & Operational", pinColor: "#ef4444", region: "Delhi",
    },
    {
        id: "del-north",
        city: "North Delhi", state: "Delhi",
        x: "33.8%", y: "30.5%",
        capacity: "4.5 MW", type: "Industrial Institutional Solar",
        builder: "Divvy Solar EPC Team", builderRole: "Lead EPC Partner",
        completedYear: "2024", panelsInstalled: "8,500+", status: "Live & Operational", pinColor: "#ef4444", region: "Delhi",
    },
    {
        id: "del-south",
        city: "South Delhi", state: "Delhi",
        x: "34.2%", y: "31.8%",
        capacity: "3.2 MW", type: "Commercial Corporate Solar",
        builder: "Divvy Solar EPC Team", builderRole: "Lead EPC Partner",
        completedYear: "2024", panelsInstalled: "6,000+", status: "Live & Operational", pinColor: "#ef4444", region: "Delhi",
    }
];

/**
 * Force-spread: repel overlapping dots, cap max displacement
 * so dots never leave their original city region.
 *
 * Key change from v1: NO spring (which was pulling dots back to cluster).
 * Instead: hard MAX_DISPLACEMENT cap — dots can wander up to 4 % from
 * their original anchor, but no further. This keeps Hisar dots inside
 * Hisar while allowing much stronger outward spread.
 */
function computeSpreadPositions(data) {
    const MIN_DIST = 1.15;
    const ITERATIONS = 220;
    const REPULSE_STRENGTH = 0.55;
    const CITY_PADDING = 0.9;
    const MAP_MIN = 0.5;
    const MAP_MAX = 99.5;

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const getCityKey = (item) => {
        const raw = item.city || "";
        return raw.split("–")[0].trim().toLowerCase();
    };

    const cityGroups = {};
    data.forEach((item) => {
        const city = getCityKey(item);
        if (!cityGroups[city]) cityGroups[city] = [];
        cityGroups[city].push(item);
    });

    const cityBounds = {};
    Object.entries(cityGroups).forEach(([city, items]) => {
        const xs = items.map((p) => parseFloat(p.x));
        const ys = items.map((p) => parseFloat(p.y));

        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);

        const spanX = Math.max(maxX - minX, 1.8);
        const spanY = Math.max(maxY - minY, 1.8);

        cityBounds[city] = {
            minX: clamp(minX - CITY_PADDING, MAP_MIN, MAP_MAX),
            maxX: clamp(maxX + CITY_PADDING, MAP_MIN, MAP_MAX),
            minY: clamp(minY - CITY_PADDING, MAP_MIN, MAP_MAX),
            maxY: clamp(maxY + CITY_PADDING, MAP_MIN, MAP_MAX),
            centerX: (minX + maxX) / 2,
            centerY: (minY + maxY) / 2,
            maxRadiusX: Math.max(spanX / 2 + CITY_PADDING, 1.4),
            maxRadiusY: Math.max(spanY / 2 + CITY_PADDING, 1.4),
        };
    });

    const pos = data.map((p) => ({
        id: p.id,
        city: getCityKey(p),
        x: parseFloat(p.x),
        y: parseFloat(p.y),
        ox: parseFloat(p.x),
        oy: parseFloat(p.y),
    }));

    for (let iter = 0; iter < ITERATIONS; iter++) {

        for (let i = 0; i < pos.length; i++) {
            for (let j = i + 1; j < pos.length; j++) {
                if (pos[i].city !== pos[j].city) continue;

                const dx = pos[j].x - pos[i].x;
                const dy = pos[j].y - pos[i].y;
                const distSq = dx * dx + dy * dy;

                if (distSq < MIN_DIST * MIN_DIST) {
                    const safeDistSq = distSq < 1e-8 ? 1e-8 : distSq;
                    const dist = Math.sqrt(safeDistSq);

                    let nx = dx / dist;
                    let ny = dy / dist;

                    if (distSq < 1e-8) {
                        const angle = ((i + 1) * (j + 3) * 37) % 360;
                        const rad = (angle * Math.PI) / 180;
                        nx = Math.cos(rad);
                        ny = Math.sin(rad);
                    }

                    const push = ((MIN_DIST - dist) / Math.max(dist, 0.1)) * REPULSE_STRENGTH;

                    pos[i].x -= nx * push;
                    pos[i].y -= ny * push;
                    pos[j].x += nx * push;
                    pos[j].y += ny * push;
                }
            }
        }

        for (const p of pos) {
            const bounds = cityBounds[p.city];

            p.x = clamp(p.x, bounds.minX, bounds.maxX);
            p.y = clamp(p.y, bounds.minY, bounds.maxY);

            const dx = p.x - bounds.centerX;
            const dy = p.y - bounds.centerY;

            const normalized =
                (dx * dx) / (bounds.maxRadiusX * bounds.maxRadiusX) +
                (dy * dy) / (bounds.maxRadiusY * bounds.maxRadiusY);

            if (normalized > 1) {
                const scale = 1 / Math.sqrt(normalized);
                p.x = bounds.centerX + dx * scale;
                p.y = bounds.centerY + dy * scale;
            }

            p.x = clamp(p.x, MAP_MIN, MAP_MAX);
            p.y = clamp(p.y, MAP_MIN, MAP_MAX);
        }
    }

    const lookup = {};
    for (const p of pos) {
        lookup[p.id] = {
            x: `${p.x.toFixed(2)}%`,
            y: `${p.y.toFixed(2)}%`,
        };
    }

    return lookup;
}

export default function InteractiveMap({
    mapImage = "/ind img.jpg",
    customProjects,
    title = "Our Projects",
    subtitle = "Currently operational in <span class='font-semibold text-[#0f172a]'>North India</span>. Click a city pin to view details.",
    headerLabel = "Live Project Coverage"
}) {
    const data = customProjects || PROJECTS;

    const [selected, setSelected] = useState(data[0]);
    const [hovered, setHovered] = useState(null);

    /* Runs ONCE on mount — zero cost on hover / click */
    const spreadPos = useMemo(() => computeSpreadPositions(data), [data]);

    if (!data || data.length === 0) return null;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* HEADER */}
                <div className="mb-12">
                    <span className="inline-block text-xs font-bold uppercase tracking-[0.22em] text-[#FECB00] mb-3">
                        {headerLabel}
                    </span>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                        <h2 className="text-4xl lg:text-5xl font-black text-[#0f172a] leading-tight"
                            style={{ fontFamily: "Georgia, serif" }}>
                            {title}
                        </h2>
                        <p className="text-gray-500 text-sm max-w-xs leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: subtitle }} />
                    </div>
                </div>

                {/* MAP + PANEL */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-8 xl:gap-12 items-start">

                    {/* ── LEFT: MAP ─────────────────────────────────────────────── */}
                    <div>
                        <div
                            className="relative rounded-2xl overflow-hidden bg-white"
                            style={{
                                width: "100%",
                                maxWidth: (mapImage.includes('punjab') || mapImage.includes('ind')) ? "480px" : "none",
                                margin: (mapImage.includes('punjab') || mapImage.includes('ind')) ? "0 auto" : "0",
                                aspectRatio: mapImage.includes('punjab') ? "713 / 782" : "529 / 635",
                                border: "2px solid #e2e8f0",
                                boxShadow: "0 15px 35px -5px rgba(0,0,0,0.08)",
                            }}
                        >
                            <div className="absolute inset-x-0 top-0"
                                style={{ height: (mapImage.includes('haryana') || mapImage.includes('ind')) ? '110%' : '100%' }}>

                                <Image
                                    src={mapImage}
                                    alt="Interactive Map"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 60vw"
                                    className={`object-fill pointer-events-none select-none ${mapImage.includes('updated')
                                        ? 'opacity-[1]'
                                        : 'invert opacity-40 grayscale contrast-150'
                                        }`}
                                    priority quality={100} draggable={false}
                                    unoptimized={mapImage.endsWith('.gif') || mapImage.endsWith('.svg')}
                                />

                                {data.map((p) => {
                                    const isActive = selected?.id === p.id;
                                    const isHovered = hovered === p.id;
                                    const pos = spreadPos[p.id] ?? { x: p.x, y: p.y };

                                    return (
                                        <button
                                            key={p.id}
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setSelected(p);
                                            }}
                                            onMouseEnter={() => setHovered(p.id)}
                                            onMouseLeave={() => setHovered(null)}
                                            aria-label={`Select ${p.city}`}
                                            style={{
                                                position: "absolute",
                                                left: pos.x,
                                                top: pos.y,
                                                transform: "translate(-50%, -50%)",
                                                zIndex: 50,
                                                cursor: "pointer",
                                            }}
                                        >
                                            {/* Ping ring */}
                                            <span className="animate-ping" style={{
                                                position: "absolute",
                                                inset: isActive ? -8 : -5,
                                                borderRadius: "50%",
                                                background: `rgba(0,0,0,0.15)`,
                                                pointerEvents: "none",
                                                animationDuration: "1.2s",
                                            }} />

                                            {/* Dot — colour / shape / size unchanged */}
                                            <span style={{
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                width: isActive ? 12 : 6,
                                                height: isActive ? 12 : 6,
                                                borderRadius: "50%",
                                                background: "#000",
                                                boxShadow: isActive ? `0 0 15px rgba(0,0,0,0.4)` : "none",
                                                transition: "all 0.2s ease",
                                                transform: isActive || isHovered ? "scale(1.2)" : "scale(1)",
                                            }}>
                                                <span style={{
                                                    width: isActive ? 4 : 2, height: isActive ? 4 : 2,
                                                    borderRadius: "50%", background: "#0a0f1e", display: "block",
                                                    border: "1px solid rgba(255,255,255,0.8)"
                                                }} />
                                            </span>

                                            {/* Tooltip */}
                                            {(isHovered || isActive) && (
                                                <span style={{
                                                    position: "absolute", bottom: "calc(100% + 8px)",
                                                    left: "50%", transform: "translateX(-50%)",
                                                    whiteSpace: "nowrap", background: "#0f172a",
                                                    color: "#fff", fontSize: 10, fontWeight: 700,
                                                    padding: "4px 10px", borderRadius: 6,
                                                    pointerEvents: "none",
                                                    boxShadow: "0 4px 12px rgba(0,0,0,0.25)", zIndex: 100,
                                                }}>
                                                    {p.city}
                                                    <span style={{
                                                        position: "absolute", top: "100%",
                                                        left: "50%", transform: "translateX(-50%)",
                                                        borderLeft: "5px solid transparent",
                                                        borderRight: "5px solid transparent",
                                                        borderTop: "5px solid #0f172a",
                                                    }} />
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>




                    </div>

                    {/* ── RIGHT: INFO CARD ──────────────────────────────────────── */}
                    {selected && (
                        <div key={selected.id} className="rounded-3xl overflow-hidden sticky top-24"
                            style={{ border: "1.5px solid #e2e8f0", boxShadow: "0 8px 40px rgba(0,0,0,0.07)" }}>

                            <div className="relative p-8 overflow-hidden bg-[#0f172a] text-white">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.15),transparent_70%)]" />
                                <div className="absolute top-0 right-0 p-6 opacity-10">
                                    <SunIcon className="w-24 h-24 rotate-12" />
                                </div>
                                
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg bg-amber-400 text-[#0f172a]">
                                            {selected.region}
                                        </span>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 backdrop-blur-md flex items-center gap-2">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                            </span>
                                            LIVE PROJECT
                                        </span>
                                    </div>

                                    <h3 className="text-4xl font-black mb-2 leading-tight tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                                        {(selected.city.split('–')[1] || selected.city.split('-')[1] || selected.city).trim()}
                                    </h3>
                                    <div className="flex items-center gap-2 text-white/50 font-medium">
                                        <span className="text-amber-400">●</span>
                                        {(selected.city.split('–')[0] || selected.city.split('-')[0]).trim()} Project Site
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-white space-y-4">
                                <div className="flex items-center justify-between gap-4 mb-2">
                                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.18em]">{selected.type}</p>
                                    <div className="px-3 py-1 bg-amber-100 rounded-full flex items-center gap-1.5">
                                        <BoltIcon className="w-3 h-3 text-amber-600" />
                                        <span className="text-[11px] font-black text-amber-700">{selected.capacity}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { label: "Panels Installed", value: selected.panelsInstalled },
                                        { label: "Completed", value: selected.completedYear },
                                    ].map((s) => (
                                        <div key={s.label} className="rounded-xl px-4 py-3 bg-slate-50 border border-slate-100">
                                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1.5">{s.label}</p>
                                            <p className="text-xl font-black text-[#0f172a]">{s.value}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-100">
                                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />
                                    <span className="text-xs font-bold text-amber-700">{selected.status}</span>
                                    <span className="ml-auto text-[10px] text-gray-400">Real-time verified</span>
                                </div>

                                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black flex-shrink-0"
                                        style={{ background: `linear-gradient(135deg, ${selected.pinColor}, ${selected.pinColor}99)` }}>
                                        D
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#0f172a]">{selected.builder}</p>
                                        <p className="text-xs text-gray-400">{selected.builderRole}</p>
                                    </div>
                                </div>

                                <a href="/contact"
                                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-black text-white transition-all duration-200 hover:-translate-y-0.5"
                                    style={{ background: `linear-gradient(135deg, ${selected.pinColor}, ${selected.pinColor}cc)`, boxShadow: `0 6px 24px ${selected.pinColor}35` }}>
                                    Get a Free Solar Quote
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </section>
    );
}