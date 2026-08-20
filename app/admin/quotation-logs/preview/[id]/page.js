import connectToDatabase from '@/lib/mongodb';
import QuotationLog from '@/models/QuotationLog';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

function formatINR(n) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(n || 0);
}

const ROOF_TYPES = [
    { v: "concrete", l: "Flat Concrete Roof" },
    { v: "tin", l: "Tin Shade / Metal Roof" },
    { v: "tile", l: "Tile Roof" },
];

const ALL_STRUCTURE_TYPES = [
    { v: "ms_fabricated", l: "MS Fabricated" },
    { v: "gi", l: "GI Structure" },
    { v: "hot_dip_gi", l: "Hot-dip GI" },
    { v: "alu_monorail", l: "Aluminium Monorail" },
    { v: "alu_longrail", l: "Aluminium Long rail" },
    { v: "ground_gi", l: "GI Structure (Ground)" },
    { v: "ground_hot_dip", l: "Hot-dip GI (Ground)" },
    { v: "ground_galvalume", l: "Galvalume (Ground)" }
];

const EARTHING_OPTS = [
    { v: "cu_bonded", l: "Copper Bonded Electrode (with chemical compound)" },
    { v: "pure_cu", l: "Pure Copper Electrode (with chemical compound)" },
];

export default async function QuotationPreviewPage({ params }) {
    const { id } = params;

    await connectToDatabase();
    // Fetch log, explicitly selecting calcState and pdfData
    const log = await QuotationLog.findById(id).select('+calcState +pdfData');

    if (!log) {
        notFound();
    }

    // ── FALLBACK FOR LEGACY LOGS (Without calcState but has pdfData) ─────────
    if (!log.calcState && log.pdfData) {
        return (
            <div className="min-h-screen bg-[#0f172a] text-white flex flex-col">
                <header className="bg-[#1e293b] border-b border-white/10 p-4 flex items-center justify-between no-print">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/quotation-logs" className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold hover:bg-white/10 transition-colors">
                            ← Back to Logs
                        </Link>
                        <h1 className="text-sm font-bold">Quotation Legacy PDF Preview</h1>
                    </div>
                    <span className="text-xs text-white/40">Legacy PDF rendering</span>
                </header>
                <div className="flex-1 w-full bg-[#0f172a] flex items-center justify-center p-4">
                    <iframe 
                        src={log.pdfData} 
                        className="w-full max-w-5xl h-[85vh] rounded-xl border border-white/10 shadow-2xl bg-white"
                        title="Legacy Quotation PDF"
                    />
                </div>
            </div>
        );
    }

    if (!log.calcState) {
        return (
            <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center p-6 text-center">
                <div>
                    <h1 className="text-xl font-bold text-red-400">Preview Unavailable</h1>
                    <p className="text-white/50 text-sm mt-2 max-w-md">
                        This log entry was created before state logging was introduced and does not contain PDF document data.
                    </p>
                    <Link href="/admin/quotation-logs" className="inline-block mt-6 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold hover:bg-white/10 transition-colors">
                        Back to Logs
                    </Link>
                </div>
            </div>
        );
    }

    let state;
    try {
        state = JSON.parse(log.calcState);
    } catch (e) {
        return (
            <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center p-6 text-center">
                <div>
                    <h1 className="text-xl font-bold text-red-400">Parsing Error</h1>
                    <p className="text-white/50 text-sm mt-2">Could not parse quotation calculator state.</p>
                </div>
            </div>
        );
    }

    const {
        clientName,
        clientPhone,
        clientLocation,
        quoteRef,
        systemKW,
        projectCategory,
        connectedLoad,
        roofType,
        dgSync,
        customTerms,
        dcCableM,
        invToAcdbCableM,
        acdbToMainCableM,
        earthingType,
        laType,
        walkwayType,
        walkwayM,
        customSafety,
        discomType,
        discom,
        incBos,
        incEng,
        incMon,
        incTrans,
        calc,
        rates
    } = state;

    const projectTypeLabel = projectCategory === "residential" ? "RESIDENTIAL OFFER" : projectCategory === "industrial" ? "INDUSTRIAL PROPOSAL" : "UTILITY-SCALE PROPOSAL";
    const dateStr = new Date(log.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
    const quoteRefStr = quoteRef || `DS/QP/${new Date(log.createdAt).getFullYear()}/${log._id.toString().substring(18).toUpperCase()}`;
    const customTermRows = customTerms ? customTerms.split('\n').filter(t => t.trim()).map((t, idx) => `<li key="${idx}" style="padding:2px 0">${t}</li>`).join('') : '';

    // Rebuild Rows identical to client side
    let rows = [];
    let sno = 1;

    // 1. Modules
    rows.push({
        sno: sno++,
        particulars: `<strong>Solar Modules:</strong> ${calc?.selMod?.modelName || "N/A"}<br/><span style="font-size:10px;color:#64748b">Tier-1 High-efficiency PV modules</span>`,
        qty: systemKW * 1000,
        unit: 'Wp',
        rate: calc?.modRate || 0,
        cost: calc?.moduleCost || 0
    });

    // 2. Inverters
    calc?.selectedInverterDetails?.forEach(inv => {
        rows.push({
            sno: sno++,
            particulars: `<strong>Solar Grid-Tie Inverter:</strong> ${inv.modelName}<br/><span style="font-size:10px;color:#64748b">Multi-MPPT High-efficiency inverter system</span>`,
            qty: inv.qty,
            unit: 'Nos',
            rate: inv.cost / (inv.qty || 1),
            cost: inv.cost
        });
    });

    // 3. Panels (ACDB/DCDB)
    if (calc?.acdbCost > 0) {
        rows.push({
            sno: sno++,
            particulars: `<strong>ACDB Combiner / Panel</strong><br/><span style='font-size:10px;color:#64748b'>L&T / Elmex / Schneider / Reputed Make</span>`,
            qty: systemKW,
            unit: 'kW',
            rate: rates?.acdbRatePerKw || 0,
            cost: calc.acdbCost
        });
    }
    if (calc?.dcdbCost > 0) {
        rows.push({
            sno: sno++,
            particulars: `<strong>DCDB Combiner / Panel</strong><br/><span style='font-size:10px;color:#64748b'>Reputed Make</span>`,
            qty: systemKW,
            unit: 'kW',
            rate: rates?.dcdbRatePerKw || 0,
            cost: calc.dcdbCost
        });
    }

    // 4. Structures
    calc?.selectedStructures?.forEach(st => {
        const stLabel = ALL_STRUCTURE_TYPES.find(opt => opt.v === st.type)?.l || st.type || "N/A";
        rows.push({
            sno: sno++,
            particulars: `<strong>Mounting Structure:</strong> ${stLabel}<br/><span style="font-size:10px;color:#64748b">Wind load sustained structural rails & clamps</span>`,
            qty: st.kw,
            unit: 'kW',
            rate: st.rate,
            cost: st.cost
        });
    });

    // Structure Accessories
    rows.push({
        sno: sno++,
        particulars: `<strong>Structure Accessories:</strong> SS 304 Nut Bolts & Fasteners<br/><span style='font-size:10px;color:#64748b'>Anti-corrosion hardware for mechanical integrity</span>`,
        qty: systemKW,
        unit: 'kW',
        rate: 'Included',
        cost: 'Included'
    });

    // Cables
    if (dcCableM > 0) {
        rows.push({
            sno: sno++,
            particulars: `<strong>DC Solar Cable:</strong> ${calc?.selDcCable?.label || "N/A"}<br/><span style="font-size:10px;color:#64748b">Tinned copper flexible single-core solar wire</span>`,
            qty: dcCableM,
            unit: 'm',
            rate: calc?.dcRate || 0,
            cost: calc?.dcCost || 0
        });
    }
    if (invToAcdbCableM > 0) {
        rows.push({
            sno: sno++,
            particulars: `<strong>AC Cable (Inv to ACDB):</strong> ${calc?.selInvToAcdbCable?.label || "N/A"}<br/><span style="font-size:10px;color:#64748b">Multicore flexible AC cabling run</span>`,
            qty: invToAcdbCableM,
            unit: 'm',
            rate: calc?.selInvToAcdbCable?.ratePerMeter || 0,
            cost: calc?.invToAcdbCost || 0
        });
    }
    if (acdbToMainCableM > 0) {
        rows.push({
            sno: sno++,
            particulars: `<strong>AC Cable (ACDB to Main):</strong> ${calc?.selAcdbToMainCable?.label || "N/A"}<br/><span style="font-size:10px;color:#64748b">AC distribution armored/unarmored cable</span>`,
            qty: acdbToMainCableM,
            unit: 'm',
            rate: calc?.selAcdbToMainCable?.ratePerMeter || 0,
            cost: calc?.acdbToMainCost || 0
        });
    }

    // Protection / Earthing
    if (calc?.pitsCount > 0) {
        rows.push({
            sno: sno++,
            particulars: `<strong>Chemical Earthing Pits:</strong> ${EARTHING_OPTS.find(e => e.v === earthingType)?.l || "Chemical Earthing"}<br/><span style="font-size:10px;color:#64748b">Low-resistance maintenance-free earthing</span>`,
            qty: calc.pitsCount,
            unit: 'pits',
            rate: calc.earthingRate,
            cost: calc.earthingCost
        });
    }
    if (calc?.laCount > 0) {
        rows.push({
            sno: sno++,
            particulars: `<strong>Lightning Protection:</strong> ${laType === "ese" ? "ESE Active" : "Conventional"}<br/><span style="font-size:10px;color:#64748b">Safety shield against high-voltage lightning surges</span>`,
            qty: calc.laCount,
            unit: 'units',
            rate: laType === "conventional" ? (rates?.laConventionalRate || 0) : (rates?.laEseRate || 0),
            cost: calc.laCost
        });
    }
    if (walkwayM > 0) {
        rows.push({
            sno: sno++,
            particulars: `<strong>Roof Walkway:</strong> ${walkwayType === "gi" ? "GI Walkway" : "FRP Walkway"}<br/><span style="font-size:10px;color:#64748b">Safe pathway on roof for O&M visits</span>`,
            qty: walkwayM,
            unit: 'm',
            rate: walkwayType === "gi" ? (rates?.walkwayGiRate || 0) : (rates?.walkwayFrpRate || 0),
            cost: calc.walkCost
        });
    }
    if (customSafety > 0) {
        rows.push({
            sno: sno++,
            particulars: `<strong>Safety Lifeline</strong><br/><span style='font-size:10px;color:#64748b'>Anchor lifeline system for cleaning personnel</span>`,
            qty: customSafety,
            unit: 'm',
            rate: rates?.safetyLineRate || 0,
            cost: calc.safetyCost
        });
    }
    if (calc?.mc4Cost > 0) {
        rows.push({
            sno: sno++,
            particulars: `<strong>MC4 Connectors</strong><br/><span style='font-size:10px;color:#64748b'>Waterproof module string connector links</span>`,
            qty: calc.mc4Pairs,
            unit: 'pairs',
            rate: rates?.mc4ConnectorRate || 0,
            cost: calc.mc4Cost
        });
    }
    if (calc?.mc4BranchCost > 0) {
        rows.push({
            sno: sno++,
            particulars: `<strong>Branch (Y) Connectors</strong><br/><span style='font-size:10px;color:#64748b'>Parallel string configuration connectors</span>`,
            qty: calc.mc4BranchQty,
            unit: 'nos',
            rate: rates?.branchConnectorRate || 0,
            cost: calc.mc4BranchCost
        });
    }

    // Inclusions
    if (incBos) {
        rows.push({
            sno: sno++,
            particulars: `<strong>BOS & Accessories:</strong> Cable Lugs, Tape, Cable tie & Conduit Pipe`,
            qty: systemKW,
            unit: 'kWp',
            rate: 'Included',
            cost: 'Included'
        });
    }
    if (incEng) {
        rows.push({
            sno: sno++,
            particulars: `<strong>Engineering & Supervision</strong><br/><span style='font-size:10px;color:#64748b'>String designing, Shadow Analysis, electrical design</span>`,
            qty: systemKW,
            unit: 'kWp',
            rate: 'Included',
            cost: 'Included'
        });
    }
    if (incMon) {
        rows.push({
            sno: sno++,
            particulars: `<strong>Remote Monitoring Access</strong><br/><span style='font-size:10px;color:#64748b'>Continuous monitoring through data logger device</span>`,
            qty: 1,
            unit: 'Set',
            rate: 'Included',
            cost: 'Included'
        });
    }
    if (incTrans) {
        rows.push({
            sno: sno++,
            particulars: `<strong>Transportation & Freight</strong><br/><span style='font-size:10px;color:#64748b'>Till site loading and unloading</span>`,
            qty: 1,
            unit: 'Job',
            rate: 'Included',
            cost: 'Included'
        });
    }
    if (discom) {
        rows.push({
            sno: sno++,
            particulars: `<strong>DISCOM Liaising & Net Metering</strong><br/><span style='font-size:10px;color:#64748b'>Net-metering approval process with local electricity authority</span>`,
            qty: 1,
            unit: 'job',
            rate: discomType === 'single_phase' ? (rates?.discomSinglePhaseCost||0) : discomType === 'three_phase' ? (rates?.discomThreePhaseCost||0) : discomType === 'lt' ? (rates?.discomLtCost||0) : (rates?.discomHtCost||0),
            cost: calc.discomCost
        });
    }
    rows.push({
        sno: sno++,
        particulars: `<strong>Installation & Commissioning:</strong> On-site mechanics, engineering execution, panel staging and commissioning`,
        qty: systemKW,
        unit: 'kW',
        rate: rates?.installationRate || 0,
        cost: calc.installCost
    });

    return (
        <div className="min-h-screen bg-slate-900 text-slate-800 flex flex-col font-sans print:bg-white print:text-black">
            {/* Top Control Bar - Hidden on print */}
            <header className="bg-slate-800 border-b border-slate-700 p-4 flex items-center justify-between no-print shadow-md">
                <div className="flex items-center gap-4">
                    <Link 
                        href="/admin/quotation-logs" 
                        className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-semibold hover:bg-white/10 transition-all hover:scale-105"
                    >
                        ← Back to Logs
                    </Link>
                    <div>
                        <h1 className="text-sm font-bold text-white">Quotation Review</h1>
                        <p className="text-[10px] text-white/50">{clientName || 'N/A'} — {systemKW} kW ({projectCategory})</p>
                    </div>
                </div>
                <a
                    href="javascript:window.print()"
                    className="px-4 py-2 rounded-xl bg-[#FECB00] text-slate-900 text-xs font-bold hover:bg-[#FECB00]/90 transition-all shadow-lg hover:scale-105"
                >
                    Print / Save PDF
                </a>
            </header>

            {/* Print Area */}
            <div className="flex-grow flex justify-center p-8 bg-slate-950/20 print:p-0 print:bg-white">
                <div className="page bg-white shadow-2xl rounded-xl print:rounded-none print:shadow-none">
                    
                    {/* Header */}
                    <div className="hdr">
                        <div className="hdr-logo">
                            <img src="/divvy_photo.png" alt="Divvy Solar" />
                        </div>
                        <div className="hdr-mid">
                            <h1>DIVVY SOLAR Power &amp; SOLUTIONS Pvt. Ltd</h1>
                            <p className="addr1">Unit-859, Tower- B1, 8th Floor, Spaze I - Tech Park, Sec - 49, Gurgaon - 122018 (HARYANA)</p>
                            <p className="addr2">Head Office: Lower Ground, SJ Tower, Sec-13, Hisar 125001 (HARYANA) &nbsp;|&nbsp; Email: info@divvysolar.in &nbsp;|&nbsp; Web: www.divvysolar.in</p>
                        </div>
                        <div className="hdr-right">
                            <div className="type">{projectTypeLabel}</div>
                            <p><strong>Quote Ref:</strong> {quoteRefStr}</p>
                            <p><strong>Date:</strong> {dateStr}</p>
                        </div>
                    </div>

                    {/* Customer & Spec Grids */}
                    <div className="info-grid">
                        <div className="info-box">
                            <h3>Client Details</h3>
                            <p><strong>Client / Org:</strong> {clientName || "N/A"}</p>
                            <p><strong>Contact:</strong> {clientPhone || "N/A"}</p>
                            <p><strong>Site Location:</strong> {clientLocation || "N/A"}</p>
                            <p><strong>Connected Grid Load:</strong> {connectedLoad ? connectedLoad + " kW" : "N/A"}</p>
                            <p><strong>Type of Roof:</strong> {ROOF_TYPES.find(r => r.v === roofType)?.l || "N/A"}</p>
                            <p><strong>DG Synchronization:</strong> {dgSync ? "Required" : "Not Required"}</p>
                        </div>
                        <div className="info-box">
                            <h3>Technical Specifications</h3>
                            <p><strong>Proposed Capacity:</strong> {systemKW} kWp (Solar PV Plant)</p>
                            <p><strong>Solar Modules:</strong> {calc?.selMod?.modelName || "N/A"}{calc?.selMod?.wattage ? " (" + calc.selMod.wattage + "Wp)" : ""}</p>
                            <p><strong>Inverter Model:</strong> {calc?.selectedInverterDetails?.map(inv => inv.modelName + " (x" + inv.qty + ")").join(", ") || "N/A"}</p>
                            <p><strong>Mounting Structure:</strong> {calc?.selectedStructures?.map(st => (ALL_STRUCTURE_TYPES.find(opt => opt.v === st.type)?.l || st.type || "") + " (" + st.kw + "kW)").join(", ") || "N/A"}</p>
                            {dcCableM > 0 && <p><strong>DC Cable Run:</strong> {dcCableM}m of {calc?.selDcCable?.label || ""}</p>}
                            {invToAcdbCableM > 0 && <p><strong>AC Cable (Inv-ACDB):</strong> {invToAcdbCableM}m of {calc?.selInvToAcdbCable?.label || ""}</p>}
                            {acdbToMainCableM > 0 && <p><strong>AC Cable (ACDB-Main):</strong> {acdbToMainCableM}m of {calc?.selAcdbToMainCable?.label || ""}</p>}
                        </div>
                    </div>

                    {/* Table */}
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: '40px', textAlign: 'center' }}>S.No</th>
                                <th style={{ textAlign: 'left' }}>Particulars / Components</th>
                                <th style={{ width: '80px', textAlign: 'center' }}>Qty / Size</th>
                                <th style={{ width: '50px', textAlign: 'center' }}>Unit</th>
                                <th style={{ width: '100px', textAlign: 'right' }}>Unit Rate</th>
                                <th style={{ width: '120px', textAlign: 'right' }}>Total (INR)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, idx) => (
                                <tr key={idx}>
                                    <td style={{ textAlign: 'center' }}>{row.sno}</td>
                                    <td dangerouslySetInnerHTML={{ __html: row.particulars }} />
                                    <td style={{ textAlign: 'center' }}>{row.qty}</td>
                                    <td style={{ textAlign: 'center' }}>{row.unit}</td>
                                    <td style={{ textAlign: 'right' }}>
                                        {typeof row.rate === 'number' ? formatINR(row.rate) : row.rate}
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        {typeof row.cost === 'number' ? formatINR(row.cost) : row.cost}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Totals */}
                    <div className="totals-wrap">
                        <div className="totals">
                            <div className="totals-row">
                                <span>Base Project Cost:</span>
                                <span><strong>{formatINR(calc?.baseTotal)}</strong></span>
                            </div>
                            <div className="totals-row">
                                <span>GST (8.90%):</span>
                                <span>{formatINR(calc?.gst)}</span>
                            </div>
                            <div className="totals-grand">
                                <span>Grand Total (Net Value):</span>
                                <span>{formatINR(calc?.grandTotal)}</span>
                            </div>
                            <p className="totals-note">Average cost per watt: ₹{calc?.perWp?.toFixed(2)}/Wp (incl. GST)</p>
                        </div>
                    </div>

                    {/* Milestones & Terms */}
                    <div className="bottom-grid">
                        <div>
                            <h4>Payment Milestones Schedule</h4>
                            <ul className="payment-list">
                                <li>
                                    <span>1. Advance Booking Amount (10%):</span>
                                    <strong>{formatINR(calc?.grandTotal * 0.1)}</strong>
                                </li>
                                <li>
                                    <span>2. Material Dispatch Stage (85%):</span>
                                    <strong>{formatINR(calc?.grandTotal * 0.85)}</strong>
                                </li>
                                <li>
                                    <span>3. Post-Commissioning Handover (5%):</span>
                                    <strong>{formatINR(calc?.grandTotal * 0.05)}</strong>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4>Project Execution Terms</h4>
                            <ul className="terms-list" dangerouslySetInnerHTML={{ __html: `
                                <li>Estimated Delivery: 4 to 6 weeks from structural layout approval and receipt of advance.</li>
                                <li>Grid integration approvals (Net Metering) timeline varies according to State DISCOM.</li>
                                <li>Quotation validity: 15 days from the date of issuance.</li>
                                <li>Warranty: 25 years performance warranty on solar modules, 5 years on grid-tie inverters.</li>
                                ${customTermRows}
                            `}} />
                        </div>
                    </div>

                    {/* Signatures */}
                    <div className="footer">
                        <div className="sig">
                            <div className="sig-line">
                                Authorized Signatory<br/>
                                <strong>Divvy Solar Representative</strong>
                            </div>
                        </div>
                        <div className="sig">
                            <div className="sig-line">
                                Accepted and Agreed<br/>
                                <strong>Client Representative</strong>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Custom CSS specifically matching your exact print guidelines */}
            <style dangerouslySetInnerHTML={{ __html: `
                .page {
                    width: 794px;
                    padding: 32px 36px;
                    background: #ffffff;
                }
                .hdr {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 2.5px solid #eab308;
                    padding-bottom: 16px;
                    margin-bottom: 24px;
                }
                .hdr-logo img {
                    width: 190px;
                    height: auto;
                    display: block;
                }
                .hdr-mid {
                    flex: 1;
                    text-align: center;
                    padding: 0 16px;
                }
                .hdr-mid h1 {
                    font-size: 14px;
                    font-weight: 800;
                    color: #1e3a8a;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin: 0;
                }
                .hdr-mid .addr1 {
                    font-size: 9px;
                    font-weight: 700;
                    color: #1e293b;
                    margin-top: 4px;
                }
                .hdr-mid .addr2 {
                    font-size: 8.5px;
                    color: #64748b;
                    margin-top: 2px;
                }
                .hdr-right {
                    width: 180px;
                    text-align: right;
                }
                .hdr-right .type {
                    font-size: 11px;
                    font-weight: 900;
                    color: #eab308;
                    text-transform: uppercase;
                }
                .hdr-right p {
                    font-size: 9px;
                    color: #64748b;
                    margin-top: 4px;
                    margin-bottom: 0;
                }
                .info-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                    margin-bottom: 20px;
                }
                .info-box {
                    border: 1px solid #cbd5e1;
                    background: #f8fafc;
                    border-radius: 6px;
                    padding: 12px;
                }
                .info-box h3 {
                    font-size: 10px;
                    font-weight: 800;
                    color: #1e3a8a;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    border-bottom: 2px solid #eab308;
                    padding-bottom: 6px;
                    margin-top: 0;
                    margin-bottom: 8px;
                }
                .info-box p {
                    font-size: 11px;
                    color: #334155;
                    margin-bottom: 3px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }
                th {
                    font-size: 10px;
                    font-weight: 700;
                    color: #fff;
                    background: #1e3a8a;
                    text-transform: uppercase;
                    padding: 8px 12px;
                    border: 1px solid #1e3a8a;
                }
                td {
                    font-size: 11px;
                    color: #334155;
                    padding: 8px 12px;
                    border: 1px solid #cbd5e1;
                    vertical-align: top;
                }
                tr:nth-child(even) td {
                    background: #f8fafc;
                }
                .totals-wrap {
                    display: flex;
                    justify-content: flex-end;
                    margin-bottom: 20px;
                }
                .totals {
                    width: 50%;
                    border: 2px solid #eab308;
                    background: #fefcf0;
                    border-radius: 6px;
                    padding: 12px 16px;
                }
                .totals-row {
                    display: flex;
                    justify-content: space-between;
                    font-size: 11px;
                    color: #334155;
                    padding: 3px 0;
                }
                .totals-grand {
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                    font-weight: 900;
                    color: #1e3a8a;
                    border-top: 2px solid #eab308;
                    padding-top: 8px;
                    margin-top: 6px;
                }
                .totals-note {
                    font-size: 8.5px;
                    color: #64748b;
                    text-align: right;
                    margin-top: 4px;
                    margin-bottom: 0;
                    font-weight: 600;
                }
                .bottom-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 24px;
                    padding-top: 16px;
                    border-top: 1px solid #e2e8f0;
                    margin-bottom: 32px;
                }
                .bottom-grid h4 {
                    font-size: 10px;
                    font-weight: 800;
                    color: #1e3a8a;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-top: 0;
                    margin-bottom: 10px;
                }
                .payment-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .payment-list li {
                    display: flex;
                    justify-content: space-between;
                    font-size: 11px;
                    color: #334155;
                    font-weight: 500;
                    padding: 3px 0;
                }
                .terms-list {
                    list-style: decimal;
                    padding-left: 16px;
                    margin: 0;
                }
                .terms-list li {
                    font-size: 10px;
                    color: #475569;
                    padding: 2px 0;
                    line-height: 1.5;
                }
                .footer {
                    display: flex;
                    justify-content: space-between;
                    padding-top: 24px;
                    border-top: 1px solid #cbd5e1;
                }
                .sig {
                    width: 40%;
                    text-align: center;
                }
                .sig-line {
                    border-top: 1px solid #94a3b8;
                    padding-top: 8px;
                    font-size: 10px;
                    color: #64748b;
                    font-weight: 600;
                }

                @media print {
                    .no-print {
                        display: none !important;
                    }
                    body {
                        background: white !important;
                        color: black !important;
                    }
                    .page {
                        border: none !important;
                        box-shadow: none !important;
                        padding: 0 !important;
                        width: 100% !important;
                    }
                    @page {
                        size: A4;
                        margin: 15mm;
                    }
                }
            `}} />
        </div>
    );
}
