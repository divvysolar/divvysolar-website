import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import QuotationLog from '@/models/QuotationLog';

export async function GET(request, { params }) {
    try {
        const session = await getServerSession(authOptions);

        const isPrivileged = session?.user?.role === 'admin' || session?.user?.role === 'finance';
        const isSalesperson = session?.user?.role === 'salesperson';

        if (!session || (!isPrivileged && !isSalesperson)) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id } = params;
        if (!id) {
            return NextResponse.json(
                { success: false, message: 'Log ID is required' },
                { status: 400 }
            );
        }

        await connectToDatabase();

        // Explicitly select pdfData since it's hidden by default
        const log = await QuotationLog.findById(id).select('+pdfData');

        if (!log) {
            return NextResponse.json(
                { success: false, message: 'Quotation log not found' },
                { status: 404 }
            );
        }

        // Privacy check: Salesperson can only download their own quotation
        if (isSalesperson && log.salespersonId?.toString() !== session.user.id?.toString()) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized access to this quotation' },
                { status: 403 }
            );
        }

        if (!log.pdfData) {
            return NextResponse.json(
                { success: false, message: 'PDF document was not stored for this log entry' },
                { status: 404 }
            );
        }

        // Decode the stored base64 PDF
        let base64Content = log.pdfData;
        const commaIndex = base64Content.indexOf(',');
        if (commaIndex !== -1) {
            base64Content = base64Content.substring(commaIndex + 1);
        }

        const pdfBuffer = Buffer.from(base64Content, 'base64');
        const filename = `Divvy_Solar_Quote_${(log.clientName || 'Client').replace(/\s+/g, '_')}.pdf`;

        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Content-Length': pdfBuffer.length.toString(),
            },
        });
    } catch (error) {
        console.error('[GET /api/quotation-logs/[id]]', error);
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}

// ── PUT /api/quotation-logs/[id] ──────────────────────────────────────────────
// Update an existing quotation log when a salesperson edits their quote
export async function PUT(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        const isPrivileged = session?.user?.role === 'admin' || session?.user?.role === 'finance';
        const isSalesperson = session?.user?.role === 'salesperson';

        if (!session || (!isPrivileged && !isSalesperson)) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id } = params;
        if (!id) {
            return NextResponse.json(
                { success: false, message: 'Log ID is required' },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const log = await QuotationLog.findById(id);
        if (!log) {
            return NextResponse.json(
                { success: false, message: 'Quotation log not found' },
                { status: 404 }
            );
        }

        // Privacy check: Salesperson can only update their own quotation
        if (isSalesperson && log.salespersonId?.toString() !== session.user.id?.toString()) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized to edit this quotation' },
                { status: 403 }
            );
        }

        const body = await request.json();
        const updateData = {};

        if (body.firmName !== undefined) updateData.firmName = body.firmName;
        if (body.clientName !== undefined) updateData.clientName = body.clientName;
        if (body.clientPhone !== undefined) updateData.clientPhone = body.clientPhone;
        if (body.clientLocation !== undefined) updateData.clientLocation = body.clientLocation;
        if (body.issuingBranch !== undefined) updateData.issuingBranch = body.issuingBranch;
        if (body.systemKW !== undefined) updateData.systemKW = Number(body.systemKW) || 0;
        if (body.grandTotal !== undefined) updateData.grandTotal = Number(body.grandTotal) || 0;
        if (body.projectCategory !== undefined) updateData.projectCategory = body.projectCategory;

        if (body.pdfData) {
            updateData.pdfData = body.pdfData;
            updateData.hasPDF = true;
        }

        if (body.calcState) {
            updateData.calcState = body.calcState;
            updateData.hasState = true;
        }

        const updated = await QuotationLog.findByIdAndUpdate(id, { $set: updateData }, { new: true })
            .select('-pdfData -calcState');

        return NextResponse.json({
            success: true,
            message: 'Quotation updated successfully',
            data: updated,
        });
    } catch (error) {
        console.error('[PUT /api/quotation-logs/[id]]', error);
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}
