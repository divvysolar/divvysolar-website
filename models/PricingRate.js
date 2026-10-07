import mongoose from 'mongoose';

/* ── Sub-schema: A single panel / inverter model ── */
const ModuleModelSchema = new mongoose.Schema(
    {
        modelName: { type: String, required: true }, // e.g. "Waaree 540Wp Mono-Perc" or "TopCon Non DCR"
        technology: { type: String, default: '' },   // e.g. "TopCon DCR", "TopCon Non DCR", "Mono PERC", "Bifacial"
        wattage: { type: Number, default: 0 },       // e.g. 540 (Wp per panel)
        ratePerWp: { type: Number, required: true }, // e.g. 30 (₹ per Watt)
        inStock: { type: Boolean, default: true },   // toggleable by admin
    },
    { _id: true }
);

const InverterModelSchema = new mongoose.Schema(
    {
        modelName: { type: String, required: true }, // e.g. "Havells 10kW 3-Phase"
        capacity: { type: Number, default: 0 },      // kW
        ratePerKW: { type: Number, required: true }, // ₹ per kW
        inStock: { type: Boolean, default: true },
    },
    { _id: true }
);

/* ── Sub-schema: AC/DC cabling matrix (per meter) ── */
const CableMatrixSchema = new mongoose.Schema(
    {
        label: { type: String },                          // Human-readable e.g. "4C×16mm² Cu AC"
        conductor: { type: String, enum: ['copper', 'aluminium'], default: 'copper' },
        cores: { type: String, enum: ['2', '3', '3.5', '4'], default: '4' },
        sizeSqMm: { type: Number, default: 16 },          // Cross-section (mm²)
        ratePerMeter: { type: Number, default: 0 },       // ₹ per meter
        armoured: { type: Boolean, default: false },
    },
    { _id: true }
);

/* ── Main pricing rate card ── */
const PricingRateSchema = new mongoose.Schema(
    {
        // ─── 1. Solar Module Brands & Models ─────────────────────────────────
        // Dynamic brands & models. inStock per model toggles visibility on salesperson UI.
        modules: { type: mongoose.Schema.Types.Mixed, default: {} },

        // ─── 2. Inverter Brands & Models ─────────────────────────────────────
        inverters: { type: mongoose.Schema.Types.Mixed, default: {} },

        // ─── 3. Structure — Capacity Brackets (₹/kW) ──────────────────────────
        // Rates change by system capacity. Admin defines each bracket range.
        structure: { type: mongoose.Schema.Types.Mixed, default: {} },

        // ─── 4. Cabling Matrix (AC & DC) per meter ────────────────────────────
        acCables: { type: [CableMatrixSchema], default: [] }, // AC cable types
        dcCables: { type: [CableMatrixSchema], default: [] }, // DC cable types (tinned copper 4/6mm²)

        // ─── 5. BOS items — per-unit rates (scale dynamically by capacity) ────
        earthingPitRateCu: { type: Number, default: 3500 },      // ₹ per pit (Copper Chemical Pit)
        earthingPitsPerKW: { type: Number, default: 0.3 },       // pits needed per kW (e.g. 0.3 = 3 pits per 10kW)
        earthingGiStripRate: { type: Number, default: 65 },       // ₹ per meter (GI Strip)
        earthingCu4Rate: { type: Number, default: 45 },           // ₹ per meter (Copper 4 sqmm)
        earthingCu6Rate: { type: Number, default: 65 },           // ₹ per meter (Copper 6 sqmm)
        earthingCu10Rate: { type: Number, default: 105 },         // ₹ per meter (Copper 10 sqmm)
        earthingCu16Rate: { type: Number, default: 165 },         // ₹ per meter (Copper 16 sqmm)
        earthingCu25Rate: { type: Number, default: 260 },         // ₹ per meter (Copper 25 sqmm)
        earthingCu35Rate: { type: Number, default: 360 },         // ₹ per meter (Copper 35 sqmm)

        laConventionalRate: { type: Number, default: 0 }, // ₹ per LA unit
        laEseRate: { type: Number, default: 0 },          // ₹ per ESE LA unit
        laPerKW: { type: Number, default: 0.1 },          // LAs needed per kW (e.g. 0.1 = 1 LA per 10kW)

        walkwayGiRate: { type: Number, default: 0 },      // ₹ per meter (GI walkway)
        walkwayFrpRate: { type: Number, default: 0 },     // ₹ per meter (FRP walkway)

        safetyLineRate: { type: Number, default: 0 },     // ₹ per meter safety line
        safetyLinePerKW: { type: Number, default: 2 },    // meters needed per kW

        mc4ConnectorRate: { type: Number, default: 0 },   // ₹ per pair of MC4 connectors
        branchConnectorRate: { type: Number, default: 0 },// ₹ per Branch (Y) connector
        acdbRatePerKw: { type: Number, default: 0 },      // ₹ per kW
        dcdbRatePerKw: { type: Number, default: 0 },      // ₹ per kW

        // ─── 6. Flat-rate add-ons ─────────────────────────────────────────────
        discomSinglePhaseCost: { type: Number, default: 0 }, 
        discomThreePhaseCost: { type: Number, default: 0 },  
        discomLtCost: { type: Number, default: 0 },          
        discomHtCost: { type: Number, default: 0 },       // Net metering HT

        // ─── 7. Installation & Commissioning ─────────────────────────────────
        installationRate: { type: Number, default: 0 },   // ₹ per kW (fallback)
        installationRateRcc: { type: Number, default: 0 },   // ₹ per kW
        installationRateGround: { type: Number, default: 0 },// ₹ per kW
        installationRateShed: { type: Number, default: 0 },  // ₹ per kW

        // ─── 8. Financial Markups & Percentage Controls (Finance Team & Admin) ──
        financialSettings: {
            // Residential Specific Settings (Configurable by Admin & Finance)
            residential: {
                profitMarginPercent: { type: Number, default: 0 },    // Base Company Profit Margin % for Residential Rooftop
                maxDiscountPercent: { type: Number, default: 0 },      // Max allowable negotiation discount % for sales team
            },
            profitMarginPercent: { type: Number, default: 0 },        // Fallback / Base Profit Margin %
            dealerCommissionPercent: { type: Number, default: 0 },     // Channel partner / dealer commission %
            maxDiscountPercent: { type: Number, default: 0 },          // Fallback / Max allowable discount %
            gstPercent: { type: Number, default: 8.9 },                // Standard Solar EPC GST % (8.90%)
            advancePaymentPercent: { type: Number, default: 0 },       // Payment Milestone: Advance Booking %
            dispatchPaymentPercent: { type: Number, default: 0 },      // Payment Milestone: Material Dispatch %
            handoverPaymentPercent: { type: Number, default: 0 },      // Payment Milestone: Post-Commissioning %
        },

        // ─── 9. Standard Company Terms & Conditions (Configured by Admin) ──
        standardTerms: {
            type: String,
            default: 'Payment Mode: Milestone Payments (Bank Transfer / RTGS / Cheque)\nEstimated Delivery: 4 to 6 weeks from structural layout approval and receipt of advance.\nGrid integration approvals (Net Metering) timeline varies according to State DISCOM.\nQuotation validity: 15 days from the date of issuance.\nWarranty: 25 years performance warranty on solar modules, 5 years on grid-tie inverters.',
        },

        // ─── Active flag ──────────────────────────────────────────────────────
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true, strict: false }
);

delete mongoose.models.PricingRate;
export default mongoose.model('PricingRate', PricingRateSchema);
