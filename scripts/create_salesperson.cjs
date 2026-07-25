/**
 * Script to create a salesperson account in the database.
 * 
 * Usage: node scripts/create_salesperson.cjs
 * 
 * Edit the SALES_USER object below before running.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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

const SALES_USER = {
    name: 'Sales Demo',
    email: process.env.DEFAULT_SALES_EMAIL,
    password: process.env.DEFAULT_SALES_PASSWORD,
    role: 'salesperson',
};

const AdminSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String, select: false },
    role: { type: String, enum: ['admin', 'salesperson'], default: 'admin' },
}, { timestamps: true });

async function main() {
    try {
        if (!process.env.DEFAULT_SALES_EMAIL || !process.env.DEFAULT_SALES_PASSWORD) {
            throw new Error('DEFAULT_SALES_EMAIL and DEFAULT_SALES_PASSWORD must be defined in .env.local');
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

        // Check if user already exists
        const existing = await Admin.findOne({ email: SALES_USER.email });
        if (existing) {
            console.log(`User with email ${SALES_USER.email} already exists. Updating role to 'salesperson' and resetting password.`);
            existing.role = 'salesperson';
            const salt = await bcrypt.genSalt(10);
            existing.password = await bcrypt.hash(SALES_USER.password, salt);
            await existing.save();
            console.log('Role and password updated successfully!');
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(SALES_USER.password, salt);

            await Admin.create({
                name: SALES_USER.name,
                email: SALES_USER.email,
                password: hashedPassword,
                role: SALES_USER.role,
            });

            console.log('Salesperson account created successfully!');
            console.log(`Email: ${SALES_USER.email}`);
            console.log(`Password: ${SALES_USER.password}`);
        }
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

main();
