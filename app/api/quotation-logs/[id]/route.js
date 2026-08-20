import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import QuotationLog from '@/models/QuotationLog';

export async function GET(request, { params }) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user?.role !== 'admin') {
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
