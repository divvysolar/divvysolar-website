/**
 * Script to seed comprehensive PricingRates into the database.
 * 
 * Usage: node scripts/seed_pricing_rates.cjs
 */

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Load .env.local manually
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
        const eqIndex = trimmed.indexOf('=');
        if (eqIndex > 0) {
            const key = trimmed.substring(0, eqIndex).trim();
            const value = trimmed.substring(eqIndex + 1).trim();
            if (!process.env[key]) process.env[key] = value;
        }
    }
});

// Definitions matching models/PricingRate.js schema
const ModuleModelSchema = new mongoose.Schema({
    modelName: String,
    wattage: Number,
    ratePerWp: Number,
    inStock: { type: Boolean, default: true }
});

const InverterModelSchema = new mongoose.Schema({
    modelName: String,
    capacity: Number,
    ratePerKW: Number,
    inStock: { type: Boolean, default: true }
});

const CableMatrixSchema = new mongoose.Schema({
    label: String,
    conductor: String,
    cores: String,
    sizeSqMm: Number,
    ratePerMeter: Number
});

const PricingRateSchema = new mongoose.Schema({
    modules: {
        waaree: [ModuleModelSchema],
        vikram: [ModuleModelSchema],
        jakson: [ModuleModelSchema],
        adani: [ModuleModelSchema],
        havells: [ModuleModelSchema],
        luminous: [ModuleModelSchema],
        typeAdder: {
            ongrid: Number,
            hybrid: Number
        }
    },
    inverters: {
        havells: [InverterModelSchema],
        luminous: [InverterModelSchema],
        utl: [InverterModelSchema],
        sungrow: [InverterModelSchema]
    },
    structure: {
        gi: { upTo5kW: Number, upto20kW: Number, upto100kW: Number, above100kW: Number },
        aluminium: { upTo5kW: Number, upto20kW: Number, upto100kW: Number, above100kW: Number },
        monorail: { upTo5kW: Number, upto20kW: Number, upto100kW: Number, above100kW: Number }
    },
    acCables: [CableMatrixSchema],
    dcCables: [CableMatrixSchema],
    earthingPitRate: Number,
    earthingPitsPerKW: Number,
    laConventionalRate: Number,
    laEseRate: Number,
    laPerKW: Number,
    walkwayGiRate: Number,
    walkwayFrpRate: Number,
    safetyLineRate: Number,
    safetyLinePerKW: Number,
    mc4ConnectorRate: Number,
    mc4ConnectorsPerKW: Number,
    discomCost: Number,
    installationRate: Number,
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Generate 22 models for a brand (20-25 models)
function generatePanelModels(brandName, baseRate) {
    const list = [];
    const types = ['Mono-Perc', 'Bifacial', 'Poly', 'Half-Cut', 'N-Type'];
    for (let i = 1; i <= 22; i++) {
        const type = types[i % types.length];
        const wattage = 330 + (i * 10); // 340W to 550W
        const ratePerWp = Number((baseRate + (i * 0.15) - (type === 'Poly' ? 1.5 : 0)).toFixed(2));
        // Toggle inStock flag on a couple of models for out-of-stock testing
        const inStock = i !== 5 && i !== 12; 
        list.push({
            modelName: `${brandName.charAt(0).toUpperCase() + brandName.slice(1)} ${wattage}Wp ${type}`,
            wattage: wattage,
            ratePerWp: ratePerWp,
            inStock: inStock
        });
    }
    return list;
}

// Generate 12-15 inverter models for a brand
function generateInverterModels(brandName, baseRatePerKW) {
    const list = [];
    const capacities = [3, 5, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 80, 100, 120];
    capacities.forEach((cap, idx) => {
        const rate = Math.round(baseRatePerKW - (cap * 15)); // larger system, lower cost per kW
        const inStock = idx !== 4; // one model out of stock
        list.push({
            modelName: `${brandName.charAt(0).toUpperCase() + brandName.slice(1)} ${cap}kW Grid-Tie`,
            capacity: cap,
            ratePerKW: rate,
            inStock: inStock
        });
    });
    return list;
}

async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const PricingRate = mongoose.models.PricingRate || mongoose.model('PricingRate', PricingRateSchema);

        // Delete existing active rates
        await PricingRate.deleteMany({ isActive: true });
        console.log('Cleared existing active rates');

        // Build new rates
        const newRates = {
            modules: {
                waaree: generatePanelModels('waaree', 21.0),
                vikram: generatePanelModels('vikram', 20.5),
                jakson: generatePanelModels('jakson', 20.0),
                adani: generatePanelModels('adani', 22.0),
                havells: generatePanelModels('havells', 21.5),
                luminous: generatePanelModels('luminous', 20.8),
                typeAdder: {
                    ongrid: 0,
                    hybrid: 4.5 // 4.5 ₹/Wp extra for hybrid module sync configuration
                }
            },
            inverters: {
                havells: generateInverterModels('havells', 7500),
                luminous: generateInverterModels('luminous', 7200),
                utl: generateInverterModels('utl', 6500),
                sungrow: generateInverterModels('sungrow', 8000)
            },
            structure: {
                gi: {
                    upTo5kW: 6000,
                    upto20kW: 4500,
                    upto100kW: 3500,
                    above100kW: 3000
                },
                aluminium: {
                    upTo5kW: 8000,
                    upto20kW: 6500,
                    upto100kW: 5500,
                    above100kW: 5000
                },
                monorail: {
                    upTo5kW: 5000,
                    upto20kW: 4000,
                    upto100kW: 3000,
                    above100kW: 2500
                }
            },
            dcCables: [
                { label: '4 sqmm Single-Core Copper DC Cable', conductor: 'copper', cores: '2', sizeSqMm: 4, ratePerMeter: 65 },
                { label: '6 sqmm Single-Core Copper DC Cable', conductor: 'copper', cores: '2', sizeSqMm: 6, ratePerMeter: 90 }
            ],
            acCables: [
                // Aluminium AC Cables
                { label: '3.5C x 25 sqmm Aluminium AC Cable', conductor: 'aluminium', cores: '3.5', sizeSqMm: 25, ratePerMeter: 120 },
                { label: '3.5C x 35 sqmm Aluminium AC Cable', conductor: 'aluminium', cores: '3.5', sizeSqMm: 35, ratePerMeter: 160 },
                { label: '3.5C x 50 sqmm Aluminium AC Cable', conductor: 'aluminium', cores: '3.5', sizeSqMm: 50, ratePerMeter: 220 },
                { label: '3.5C x 70 sqmm Aluminium AC Cable', conductor: 'aluminium', cores: '3.5', sizeSqMm: 70, ratePerMeter: 310 },
                { label: '3.5C x 95 sqmm Aluminium AC Cable', conductor: 'aluminium', cores: '3.5', sizeSqMm: 95, ratePerMeter: 410 },
                { label: '3.5C x 120 sqmm Aluminium AC Cable', conductor: 'aluminium', cores: '3.5', sizeSqMm: 120, ratePerMeter: 520 },
                { label: '4C x 6 sqmm Aluminium AC Cable', conductor: 'aluminium', cores: '4', sizeSqMm: 6, ratePerMeter: 55 },
                { label: '4C x 10 sqmm Aluminium AC Cable', conductor: 'aluminium', cores: '4', sizeSqMm: 10, ratePerMeter: 75 },
                { label: '4C x 16 sqmm Aluminium AC Cable', conductor: 'aluminium', cores: '4', sizeSqMm: 16, ratePerMeter: 95 },
                // Copper AC Cables
                { label: '4C x 6 sqmm Copper AC Cable', conductor: 'copper', cores: '4', sizeSqMm: 6, ratePerMeter: 280 },
                { label: '4C x 10 sqmm Copper AC Cable', conductor: 'copper', cores: '4', sizeSqMm: 10, ratePerMeter: 450 },
                { label: '4C x 16 sqmm Copper AC Cable', conductor: 'copper', cores: '4', sizeSqMm: 16, ratePerMeter: 680 },
                { label: '4C x 25 sqmm Copper AC Cable', conductor: 'copper', cores: '4', sizeSqMm: 25, ratePerMeter: 1100 }
            ],
            earthingPitRate: 9500,
            earthingPitsPerKW: 0.3,
            laConventionalRate: 12000,
            laEseRate: 48000,
            laPerKW: 0.1,
            walkwayGiRate: 1500,
            walkwayFrpRate: 2200,
            safetyLineRate: 650,
            safetyLinePerKW: 2,
            mc4ConnectorRate: 120,
            mc4ConnectorsPerKW: 2,
            discomCost: 20000,
            installationRate: 2000,
            isActive: true
        };

        const created = await PricingRate.create(newRates);
        console.log('Seeded database with new rates successfully! ID:', created._id);
        console.log(`Waaree panels: ${created.modules.waaree.length}`);
        console.log(`Sungrow inverters: ${created.inverters.sungrow.length}`);
    } catch (error) {
        console.error('Error seeding rates:', error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

main();
