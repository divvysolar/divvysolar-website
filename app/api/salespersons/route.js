import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';

// ── GET /api/salespersons ─────────────────────────────────────────────────────
// Admin only. Returns all salesperson accounts (no passwords).
export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user?.role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();

        const salespersons = await Admin.find({ role: 'salesperson' })
            .select('-password')
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({ success: true, data: salespersons });
    } catch (error) {
        console.error('[GET /api/salespersons]', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}

// ── POST /api/salespersons ────────────────────────────────────────────────────
// Admin only. Creates a new salesperson account.
// Body: { name, email, password }
export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user?.role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { success: false, message: 'Name, email, and password are required' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { success: false, message: 'Password must be at least 6 characters' },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const existing = await Admin.findOne({ email: email.toLowerCase().trim() });
        if (existing) {
            return NextResponse.json(
                { success: false, message: 'An account with this email already exists' },
                { status: 409 }
            );
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const salesperson = await Admin.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            role: 'salesperson',
        });

        // Return without password
        const result = salesperson.toObject();
        delete result.password;

        return NextResponse.json({ success: true, data: result }, { status: 201 });
    } catch (error) {
        console.error('[POST /api/salespersons]', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
