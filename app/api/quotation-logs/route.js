import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import QuotationLog from '@/models/QuotationLog';

// Allow up to 10MB request body for PDF base64 storage
export const dynamic = 'force-dynamic';

// ── POST /api/quotation-logs ──────────────────────────────────────────────────
// Called from the sales pricing page when a salesperson downloads a PDF.
// Requires an active salesperson session.
export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        console.log('[QuotationLog POST] session:', session ? `${session.user?.email} / role=${session.user?.role}` : 'null/unauthenticated');

        if (!session || session.user?.role !== 'salesperson') {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        console.log("POST /api/quotation-logs keys:", Object.keys(body));
        console.log("pdfData length in request:", body.pdfData ? body.pdfData.length : "undefined/empty");

        const {
            clientName,
            clientPhone,
            clientLocation,
            quoteRef,
            systemKW,
            grandTotal,
            projectCategory,
            action,
            pdfData,
            calcState,
        } = body;

        await connectToDatabase();

        const log = await QuotationLog.create({
            salespersonId: session.user.id,
            salespersonName: session.user.name || 'Unknown',
            salespersonEmail: session.user.email || '',
            clientName: clientName || '',
            clientPhone: clientPhone || '',
            clientLocation: clientLocation || '',
            quoteRef: quoteRef || '',
            systemKW: Number(systemKW) || 0,
            grandTotal: Number(grandTotal) || 0,
            projectCategory: projectCategory || 'residential',
            action: action || 'downloaded',
            pdfData: pdfData || '',
            hasPDF: !!pdfData,
            calcState: calcState || '',
            hasState: !!calcState,
        });

        return NextResponse.json({ success: true, data: log }, { status: 201 });
    } catch (error) {
        console.error('[POST /api/quotation-logs]', error);
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}

// ── GET /api/quotation-logs ───────────────────────────────────────────────────
// Admin only. Returns paginated quotation logs with optional filters.
// Query params: page, limit, salespersonId, from (ISO date), to (ISO date)
export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user?.role !== 'admin') {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
        const limit = Math.min(200, parseInt(searchParams.get('limit') || '50', 10));
        const salespersonId = searchParams.get('salespersonId') || '';
        const from = searchParams.get('from') || '';
        const to = searchParams.get('to') || '';

        await connectToDatabase();

        const filter = {};
        if (salespersonId) filter.salespersonId = salespersonId;
        if (from || to) {
            filter.createdAt = {};
            if (from) filter.createdAt.$gte = new Date(from);
            if (to) {
                // Include the full "to" day
                const toDate = new Date(to);
                toDate.setHours(23, 59, 59, 999);
                filter.createdAt.$lte = toDate;
            }
        }

        const total = await QuotationLog.countDocuments(filter);
        const logs = await QuotationLog.find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        return NextResponse.json({
            success: true,
            data: logs,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        console.error('[GET /api/quotation-logs]', error);
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}
