import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';

// ── PATCH /api/salespersons/[id] ──────────────────────────────────────────────
// Admin only. Update salesperson name and/or reset password.
// Body: { name?, password? }
export async function PATCH(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user?.role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { id } = params;
        const { name, password } = await request.json();

        await connectToDatabase();

        const salesperson = await Admin.findOne({ _id: id, role: 'salesperson' }).select('+password');
        if (!salesperson) {
            return NextResponse.json({ success: false, message: 'Salesperson not found' }, { status: 404 });
        }

        if (name && name.trim()) {
            salesperson.name = name.trim();
        }

        if (password) {
            if (password.length < 6) {
                return NextResponse.json(
                    { success: false, message: 'Password must be at least 6 characters' },
                    { status: 400 }
                );
            }
            const salt = await bcrypt.genSalt(10);
            salesperson.password = await bcrypt.hash(password, salt);
        }

        await salesperson.save();

        const result = salesperson.toObject();
        delete result.password;

        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        console.error('[PATCH /api/salespersons/[id]]', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}

// ── DELETE /api/salespersons/[id] ─────────────────────────────────────────────
// Admin only. Deletes a salesperson account.
export async function DELETE(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user?.role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { id } = params;

        await connectToDatabase();

        const deleted = await Admin.findOneAndDelete({ _id: id, role: 'salesperson' });
        if (!deleted) {
            return NextResponse.json({ success: false, message: 'Salesperson not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Salesperson deleted successfully' });
    } catch (error) {
        console.error('[DELETE /api/salespersons/[id]]', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
