import mongoose from 'mongoose';

/* ── Sub-schema: A single panel / inverter model ── */
const ModuleModelSchema = new mongoose.Schema(
    {
        modelName: { type: String, required: true }, // e.g. "Waaree 540Wp Mono-Perc"
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
        // Eastman & Invergy are PERMANENTLY excluded — not present in this schema.
        // inStock per model toggles visibility on salesperson UI.
        modules: {
            waaree: { type: [ModuleModelSchema], default: [] },
            vikram: { type: [ModuleModelSchema], default: [] },
            jakson: { type: [ModuleModelSchema], default: [] },
            adani: { type: [ModuleModelSchema], default: [] },
            havells: { type: [ModuleModelSchema], default: [] },
            luminous: { type: [ModuleModelSchema], default: [] },
            // System type adder (₹/Wp extra added on top of brand rate)
            typeAdder: {
                ongrid: { type: Number, default: 0 },
                hybrid: { type: Number, default: 0 },
            },
        },

        // ─── 2. Inverter Brands & Models ─────────────────────────────────────
        inverters: {
            havells: { type: [InverterModelSchema], default: [] },
            luminous: { type: [InverterModelSchema], default: [] },
            utl: { type: [InverterModelSchema], default: [] },
            sungrow: { type: [InverterModelSchema], default: [] },
        },

        // ─── 3. Structure — Capacity Brackets (₹/kW) ──────────────────────────
        // Rates change by system capacity. Admin defines each bracket range.
        structure: { type: mongoose.Schema.Types.Mixed, default: {} },

        // ─── 4. Cabling Matrix (AC & DC) per meter ────────────────────────────
        acCables: { type: [CableMatrixSchema], default: [] }, // AC cable types
        dcCables: { type: [CableMatrixSchema], default: [] }, // DC cable types (tinned copper 4/6mm²)

        // ─── 5. BOS items — per-unit rates (scale dynamically by capacity) ────
        earthingPitRateGi: { type: Number, default: 0 },         // ₹ per pit (GI Strip)
        earthingPitRateCu: { type: Number, default: 0 },         // ₹ per pit (Copper)
        earthingPitRateCuBonded: { type: Number, default: 0 },   // ₹ per pit (Copper Bonded)
        earthingPitsPerKW: { type: Number, default: 0.3 },// pits needed per kW (e.g. 0.3 = 3 pits per 10kW)

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
        installationRate: { type: Number, default: 0 },   // ₹ per kW (scales with system size)

        // ─── Active flag ──────────────────────────────────────────────────────
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.models.PricingRate ||
    mongoose.model('PricingRate', PricingRateSchema);
