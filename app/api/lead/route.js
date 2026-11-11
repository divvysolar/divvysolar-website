import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Lead from '@/models/Lead';

export async function POST(req) {
    try {
        const body = await req.json();
        const { id, name, phone, monthlyBill, location, honeypot, landingPage } = body;
        const sourceLandingPage = typeof landingPage === 'string' && landingPage.trim() ? landingPage.trim() : '/industrial-solar-epc';

        // Hidden honeypot field protection against automated bots
        if (honeypot) {
            return NextResponse.json({ success: false, error: 'Spam submission detected' }, { status: 400 });
        }

        // Server-side validation
        if (!name || typeof name !== 'string' || !name.trim()) {
            return NextResponse.json({ success: false, error: 'Full Name is required' }, { status: 400 });
        }

        const phoneRegex = /^[6-9]\d{9}$/;
        const cleanPhone = (phone || '').replace(/\D/g, '');
        if (!phoneRegex.test(cleanPhone)) {
            return NextResponse.json({ success: false, error: 'Please enter a valid 10-digit mobile number' }, { status: 400 });
        }

        if (!monthlyBill || typeof monthlyBill !== 'string' || !monthlyBill.trim()) {
            return NextResponse.json({ success: false, error: 'Monthly power bill range is required' }, { status: 400 });
        }
        if (!location || typeof location !== 'string' || !location.trim()) {
            return NextResponse.json({ success: false, error: 'Plant / Factory location is required' }, { status: 400 });
        }

        // Save lead in MongoDB
        let savedLeadId = id || null;
        try {
            await connectToDatabase();
            const lead = await Lead.create({
                name: name.trim(),
                whatsapp: cleanPhone,
                monthlyBill: monthlyBill.trim(),
                location: location.trim(),
                serviceType: 'Industrial Solar EPC',
                landingPage: sourceLandingPage
            });
            savedLeadId = lead._id ? lead._id.toString() : null;
        } catch (dbErr) {
            console.error('[LEAD_API] Database operation failed (continuing to webhook):', dbErr.message);
        }

        // Webhook delivery
        const webhookUrl = process.env.LEAD_WEBHOOK_URL;
        if (!webhookUrl) {
            console.error('[LEAD_API] Missing LEAD_WEBHOOK_URL environment variable [VERIFY: webhook URL]');
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'LEAD_WEBHOOK_URL is not configured [VERIFY: webhook URL]' 
                }, 
                { status: 500 }
            );
        }

        try {
            const webhookRes = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    leadId: savedLeadId,
                    name: name.trim(),
                    phone: cleanPhone,
                    monthlyBill: monthlyBill.trim(),
                    location: location.trim(),
                    landingPage: sourceLandingPage,
                    timestamp: new Date().toISOString()
                })
            });

            if (!webhookRes.ok) {
                console.warn(`[LEAD_API] Webhook responded with status: ${webhookRes.status}`);
            }
        } catch (webhookErr) {
            console.error('[LEAD_API] Webhook dispatch error:', webhookErr.message);
        }

        return NextResponse.json({
            success: true,
            leadId: savedLeadId,
            message: 'Feasibility request submitted successfully'
        });
    } catch (err) {
        console.error('[LEAD_API] Unhandled error:', err);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
