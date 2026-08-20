"use client";

export default function PrintButton() {
    return (
        <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-[#FECB00] text-slate-900 text-xs font-bold hover:bg-[#FECB00]/90 transition-all shadow-lg hover:scale-105"
        >
            Print / Save PDF
        </button>
    );
}
