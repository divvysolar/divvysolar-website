import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import PricingRate from '@/models/PricingRate';

export const dynamic = 'force-dynamic';

// GET — Fetch the currently active pricing rate card
export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectToDatabase();

        let rates = await PricingRate.findOne({ isActive: true }).lean();

        // If no rate card exists yet, create a default one
        if (!rates) {
            rates = await PricingRate.create({ isActive: true });
            rates = rates.toObject();
        }

        return NextResponse.json({ success: true, data: rates });
    } catch (error) {
        console.error('GET /api/pricing/rates error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// PUT — Update pricing rates & financial percentage settings (Admin & Finance access)
export async function PUT(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user || (session.user.role !== 'admin' && session.user.role !== 'finance')) {
            return NextResponse.json(
                { error: 'Forbidden — admin or finance access required' },
                { status: 403 }
            );
        }

        await connectToDatabase();
        const body = await request.json();

        // Remove fields that should never be client-editable
        delete body._id;
        delete body.__v;
        delete body.createdAt;
        delete body.updatedAt;

        // If user is not admin (e.g. finance), preserve all financialSettings (profit margin, discount caps, gst)
        if (session.user.role !== 'admin') {
            const existing = await PricingRate.findOne({ isActive: true }).lean();
            if (existing?.financialSettings) {
                body.financialSettings = existing.financialSettings;
            }
        }

        let rates = await PricingRate.findOneAndUpdate(
            { isActive: true },
            { $set: body },
            { new: true, upsert: true, runValidators: true }
        ).lean();

        return NextResponse.json({ success: true, data: rates });
    } catch (error) {
        console.error('PUT /api/pricing/rates error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
