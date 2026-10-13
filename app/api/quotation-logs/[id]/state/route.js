import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import QuotationLog from '@/models/QuotationLog';

export const dynamic = 'force-dynamic';

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

        const log = await QuotationLog.findById(id).select('+calcState');
        if (!log) {
            return NextResponse.json(
                { success: false, message: 'Quotation log not found' },
                { status: 404 }
            );
        }

        // Privacy check: Salesperson can only load their own quotation
        if (isSalesperson && log.salespersonId?.toString() !== session.user.id?.toString()) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized to access this quotation state' },
                { status: 403 }
            );
        }

        if (!log.calcState) {
            return NextResponse.json(
                { success: false, message: 'Configuration state was not stored for this quotation' },
                { status: 404 }
            );
        }

        let parsedState = {};
        try {
            parsedState = JSON.parse(log.calcState);
        } catch (err) {
            return NextResponse.json(
                { success: false, message: 'Corrupt configuration state format' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            id: log._id,
            quoteRef: log.quoteRef,
            clientName: log.clientName,
            clientPhone: log.clientPhone,
            clientLocation: log.clientLocation,
            systemKW: log.systemKW,
            grandTotal: log.grandTotal,
            projectCategory: log.projectCategory,
            createdAt: log.createdAt,
            state: parsedState,
        });
    } catch (error) {
        console.error('[GET /api/quotation-logs/[id]/state]', error);
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}
