import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from '@/lib/mongodb';
import Lead from '@/models/Lead';
import { sendEmail } from '@/lib/sendEmail';


// POST: Public submission of contact form
export async function POST(req) {
    try {
        const data = await req.json();

        await connectToDatabase();

        // Save to DB
        const lead = await Lead.create(data);

        // Send email notification to admin asynchronously
        if (process.env.ADMIN_EMAIL) {
            const emailHtml = `
        <h2>New Solar Consultation Request</h2>
        <p><strong>Name:</strong> ${lead.name}</p>
        <p><strong>Email:</strong> ${lead.email}</p>
        <p><strong>WhatsApp:</strong> ${lead.whatsapp}</p>
        <p><strong>Location:</strong> ${lead.location}</p>
        <p><strong>Monthly Bill:</strong> ${lead.monthlyBill}</p>
        <p><strong>Service Type:</strong> ${lead.serviceType}</p>
      `;

            // Fire and forget email
            sendEmail({
                to: process.env.ADMIN_EMAIL,
                subject: `New Lead: ${lead.serviceType} - ${lead.name}`,
                html: emailHtml
            }).catch(err => console.error("Background email send failed:", err));
        }

        // Create the response
        const response = NextResponse.json({ success: true, data: lead }, { status: 201 });

        // Add CORS Headers
        response.headers.set('Access-Control-Allow-Origin', '*');
        response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        return response;
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            const res = NextResponse.json({ success: false, error: messages.join(', ') }, { status: 400 });
            res.headers.set('Access-Control-Allow-Origin', '*');
            return res;
        }
        console.error('Lead creation error:', error);
        const res = NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
        res.headers.set('Access-Control-Allow-Origin', '*');
        return res;
    }
}

// OPTIONS: Handle preflight requests for CORS
export async function OPTIONS() {
    const response = new NextResponse(null, { status: 204 });
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
}

// GET: Admin only - Fetch all leads
export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ success: false, error: 'Unauthorized access' }, { status: 401 });
        }

        await connectToDatabase();

        const { searchParams } = new URL(req.url);
        const status = searchParams.get('status');
        const limit = parseInt(searchParams.get('limit')) || 50;

        const query = status ? { status } : {};

        const leads = await Lead.find(query)
            .sort({ createdAt: -1 })
            .limit(limit);

        return NextResponse.json({ success: true, count: leads.length, data: leads });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}
