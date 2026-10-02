import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Lead from '@/models/Lead';
import ChatLog from '@/models/ChatLog';

export const dynamic = 'force-dynamic';

const getPin = () => process.env.LEADS_PORTAL_PIN || 'divvy@leads';

// POST: Verify if the user-entered PIN is correct
export async function POST(req) {
    try {
        const { pin } = await req.json();
        if (!pin || pin !== getPin()) {
            return NextResponse.json({ success: false, error: 'Invalid PIN' }, { status: 401 });
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("PIN verification error:", error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}

// GET: Return all leads & chat sessions if matching X-Leads-PIN header is provided
export async function GET(req) {
    try {
        const pinHeader = req.headers.get('X-Leads-PIN');
        if (!pinHeader || pinHeader !== getPin()) {
            return NextResponse.json({ success: false, error: 'Unauthorized access' }, { status: 401 });
        }

        await connectToDatabase();

        const [leads, chatLogs] = await Promise.all([
            Lead.find({}).sort({ createdAt: -1, updatedAt: -1 }).limit(300),
            ChatLog.find({ 'messages.0': { $exists: true } }).sort({ updatedAt: -1, createdAt: -1 }).limit(100)
        ]);

        return NextResponse.json({ 
            success: true, 
            count: leads.length, 
            data: leads,
            chatLogs: chatLogs || []
        });
    } catch (error) {
        console.error('Leads portal fetch error:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}
