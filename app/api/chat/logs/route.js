import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from '@/lib/mongodb';
import ChatLog from '@/models/ChatLog';

export const dynamic = 'force-dynamic';

const getPin = () => process.env.LEADS_PORTAL_PIN || 'divvy@leads';

export async function GET(req) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(req.url);
        const sessionId = searchParams.get('sessionId');
        const leadId = searchParams.get('leadId');
        const phone = searchParams.get('phone');
        const chatId = searchParams.get('chatId');
        const isPortalQuery = searchParams.get('portal') === 'true';

        // 1. Client restoring their own chat session in the browser widget
        if (sessionId && !isPortalQuery) {
            const chatLog = await ChatLog.findOne({ sessionId });
            return NextResponse.json({
                success: true,
                data: chatLog ? chatLog.messages : [],
                visitorInfo: chatLog ? {
                    name: chatLog.visitorName,
                    phone: chatLog.visitorPhone,
                    email: chatLog.visitorEmail
                } : null
            });
        }

        // 2. Admin / Leads Portal querying conversation transcript
        const session = await getServerSession(authOptions);
        const pinHeader = req.headers.get('X-Leads-PIN');
        const isAuthorized = (session && session.user) || (pinHeader && pinHeader === getPin());

        if (!isAuthorized) {
            return NextResponse.json({ success: false, error: 'Unauthorized access' }, { status: 401 });
        }

        let query = {};
        if (chatId) query._id = chatId;
        else if (leadId) query.leadId = leadId;
        else if (phone) query.visitorPhone = phone;
        else if (sessionId) query.sessionId = sessionId;

        let chatLog = null;
        if (Object.keys(query).length > 0) {
            chatLog = await ChatLog.findOne(query).sort({ updatedAt: -1 });
        }

        // If queried by phone but phone has multiple chats, get latest
        if (!chatLog && phone) {
            const clean = phone.replace(/\D/g, '').slice(-10);
            chatLog = await ChatLog.findOne({ visitorPhone: new RegExp(clean) }).sort({ updatedAt: -1 });
        }

        return NextResponse.json({
            success: true,
            data: chatLog,
            messages: chatLog ? chatLog.messages : [],
        });
    } catch (error) {
        console.error('Chat log query error:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}
