import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import QuotationLog from '@/models/QuotationLog';

export const dynamic = 'force-dynamic';

// GET /api/quotation-logs/next-ref
// Computes and returns the next auto-incremented Quotation Reference Number (e.g. DS/QP/2026/0006)
export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();

        const currentYear = new Date().getFullYear();
        const yearPrefix = `DS/QP/${currentYear}/`;

        // 1. Count total quotation logs
        const totalLogs = await QuotationLog.countDocuments();

        // 2. Find any recent logs with reference numbers matching the current year pattern
        const recentLogs = await QuotationLog.find(
            { quoteRef: { $regex: `^DS/QP/${currentYear}/`, $options: 'i' } },
            { quoteRef: 1 }
        ).sort({ createdAt: -1 }).limit(100).lean();

        let maxSeq = 0;
        for (const log of recentLogs) {
            if (log.quoteRef) {
                const parts = log.quoteRef.split('/');
                const lastPart = parts[parts.length - 1];
                const parsedNum = parseInt(lastPart, 10);
                if (!isNaN(parsedNum) && parsedNum > maxSeq) {
                    maxSeq = parsedNum;
                }
            }
        }

        // Starts fresh from 1 (DS/QP/YYYY/0001) and auto-increments with each submitted proposal
        const nextSequence = maxSeq + 1;
        const paddedSequence = String(nextSequence).padStart(4, '0');
        const nextRef = `${yearPrefix}${paddedSequence}`;

        return NextResponse.json({
            success: true,
            nextRef,
            sequenceNumber: nextSequence,
            totalLogs,
        });
    } catch (error) {
        console.error('[GET /api/quotation-logs/next-ref]', error);
        const fallbackYear = new Date().getFullYear();
        return NextResponse.json({
            success: true,
            nextRef: `DS/QP/${fallbackYear}/0001`,
            sequenceNumber: 1,
            fallback: true,
        });
    }
}
