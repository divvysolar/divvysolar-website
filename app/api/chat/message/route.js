import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import ChatLog from '@/models/ChatLog';
import Lead from '@/models/Lead';
import { sendEmail } from '@/lib/sendEmail';

export const dynamic = 'force-dynamic';

// Helper to extract phone
function extractPhone(text) {
    if (!text) return null;
    const clean = String(text).replace(/[\s\-\(\)\.]/g, '');
    const match = clean.match(/(?:\+91|91|0)?([5-9]\d{9})/);
    return match ? match[1] : null;
}

// Helper to extract email
function extractEmail(text) {
    if (!text) return null;
    const match = String(text).match(/[\w\.-]+@[\w\.-]+\.\w{2,10}/);
    return match ? match[0] : null;
}

// Language detector to ensure responses strictly match user's language
function isHindiOrHinglish(text) {
    if (!text) return false;
    if (/[\u0900-\u097F]/.test(text)) return true;
    const hinglishRegex = /\b(kya|hai|hain|kitna|kitne|kitni|kaise|kahan|kyu|kyon|chahiye|hoga|hogi|batao|bataiye|lagwana|lagana|kharcha|bachega|bijli|ghar|mera|meri|hum|aap|apna|bhai|namaste|pranam|shukriya|dhanyawad)\b/i;
    return hinglishRegex.test(text);
}

// Active Gemini LLM Integration with Multi-Model Fallback
async function callGeminiIfAvailable(userText, history = []) {
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) return null;

    const candidateModels = [
        'gemini-2.0-flash',
        'gemini-1.5-flash',
        'gemini-2.5-flash',
        'gemini-1.5-pro'
    ];

    try {
        const systemPrompt = `You are a real, knowledgeable, and helpful Solar Engineer at Divvy Solar Power & Solutions Pvt. Ltd. (operating in Haryana, Punjab, Delhi NCR, and North India).

CRITICAL RULES:
1. STRICT LANGUAGE MATCHING:
   - ALWAYS reply in the EXACT SAME LANGUAGE as the user.
   - If user asks in English, reply 100% in natural, clear, professional English. NEVER use Hindi words (do not say "Namaste", "bhai", etc.) when the user asked in English.
   - If user asks in Hindi or Hinglish, reply naturally in Hindi/Hinglish.
   - Never output Hindi on your own if the input was English.

2. HUMANIZED, CONCISE & TO THE POINT:
   - Give a direct, crisp, and human answer to the user's specific question in 2-4 short sentences or 2-3 focused points.
   - Do NOT give long generic dumps or irrelevant boilerplate text.
   - Speak naturally like a friendly expert engineer, never like a rigid bot. No "As an AI" phrases.

3. ACCURATE SOLAR FACTS (INDIA EPC):
   - PM Surya Ghar Subsidy: 1 kW = ₹33,000 | 2 kW = ₹66,000 | 3 kW to 10 kW = Fixed ₹78,000 max.
   - Generation: 1 kW generates approx 4 to 4.5 units/day (120–135 units/month).
   - Space Required: Approx 80–100 sq.ft shadow-free rooftop per 1 kW (250–300 sq.ft for 3 kW).
   - Commercial/Industrial: CAPEX (100% ownership + 40% Accelerated Depreciation tax benefit) vs OPEX/RESCO (zero Capex, cheaper power).
   - Hardware: Tier-1 N-Type TopCon panels (25-30 year performance warranty).

4. GENTLE CALL TO ACTION:
   - If relevant to their question, politely offer to calculate exact savings or 3D roof layout if they share their monthly bill or city.`;

        const contents = [
            { role: "user", parts: [{ text: systemPrompt }] },
            { role: "model", parts: [{ text: "Understood. I will provide direct, concise, humanized answers matching the user's language perfectly without any unprompted Hindi." }] }
        ];

        // Append last 4 messages for context
        if (history && history.length > 0) {
            history.slice(-4).forEach(m => {
                contents.push({
                    role: m.sender === 'user' ? 'user' : 'model',
                    parts: [{ text: m.text }]
                });
            });
        }

        contents.push({ role: "user", parts: [{ text: userText }] });

        for (const model of candidateModels) {
            try {
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 6000);

                const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ contents }),
                    signal: controller.signal
                });
                clearTimeout(timeout);

                if (res.ok) {
                    const data = await res.json();
                    const candidate = data?.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (candidate && candidate.trim().length > 0) {
                        return candidate.trim();
                    }
                }
            } catch (modelErr) {
                console.warn(`Gemini model ${model} attempt failed:`, modelErr.message);
            }
        }
    } catch (err) {
        console.error("Gemini API overall error:", err);
    }
    return null;
}

// Concise, Humanized Solar Knowledge Engine (Strict Language Matching)
function generateSolarResponse(userText, history = [], visitorData = {}) {
    const q = userText.toLowerCase().trim();
    const isHindi = isHindiOrHinglish(userText);

    // 1. Phone number detected
    const phone = extractPhone(userText);
    if (phone) {
        return {
            reply: isHindi
                ? `✅ **Aapka number (+91 ${phone}) note kar liya gaya hai!**\n\nHamare Senior Solar Engineer jald hi aapse connect karke customized 3D design aur quote share karenge. Koi aur sawaal ho toh zaroor batayein! ☀️`
                : `✅ **Thank you! We have received your number (+91 ${phone}).**\n\nOur Senior Solar Engineer will contact you shortly with your customized 3D roof layout and savings quote. Feel free to ask any other questions! ☀️`,
            leadCaptured: true,
            extractedPhone: phone,
        };
    }

    // 2. Greetings
    if (/^(hi|hello|hey|namaste|good morning|good evening|good afternoon|hola|start|help|batao|kya hai)/i.test(q) && q.length < 20) {
        return {
            reply: isHindi
                ? `Namaste! 🙏 Divvy Solar me aapka swagat hai.\n\nAap rooftop solar system, PM Surya Ghar subsidy ya bill savings ke baare me kya jaanna chahte hain?`
                : `Hello! 👋 Welcome to Divvy Solar.\n\nHow can I help you today with rooftop solar systems, PM Surya Ghar subsidies, or electricity bill savings?`,
        };
    }

    // 3. PM Surya Ghar Muft Bijli Yojana / Subsidy
    if (q.includes('subsidy') || q.includes('pm surya') || q.includes('muft bijli') || q.includes('government') || q.includes('78000') || q.includes('dbt')) {
        return {
            reply: isHindi
                ? `💰 **PM Surya Ghar Yojana Subsidy Breakdown:**\n\n• **1 kW System:** ₹33,000 direct DBT subsidy\n• **2 kW System:** ₹66,000 direct DBT subsidy\n• **3 kW to 10 kW System:** Fixed maximum **₹78,000** subsidy\n\nNet-meter lagne ke 30 dino ke andar subsidy direct aapke bank account me DBT ke through aa jaati hai. Aap kis city se hain?`
                : `💰 **PM Surya Ghar Subsidy Breakdown:**\n\n• **1 kW System:** ₹33,000 central DBT subsidy\n• **2 kW System:** ₹66,000 central DBT subsidy\n• **3 kW to 10 kW System:** Fixed maximum **₹78,000** central subsidy\n\nSubsidy is credited directly to your bank account via DBT within 30 days of net-meter commissioning. Which city is your property located in?`,
        };
    }

    // 4. Monthly Savings & Bill Calculation
    if (q.includes('bill') || q.includes('saving') || q.includes('save') || q.includes('cost') || q.includes('price') || q.includes('rate') || q.includes('kitna bachega')) {
        return {
            reply: isHindi
                ? `⚡ Solar lagane se net metering ke through aapka bijli bill **80% se 90% tak** kam ho jata hai.\n\n• **3 kW System:** Saal ka approx **₹30,000 – ₹40,000** bachat karta hai.\n• **5 kW System:** Saal ka approx **₹50,000 – ₹70,000** bachat karta hai.\n\nAapka average monthly electricity bill kitna aata hai?`
                : `⚡ Rooftop solar with net metering reduces your electricity bill by **up to 90%**.\n\n• **3 kW System:** Saves approx **₹30,000 – ₹40,000/year**\n• **5 kW System:** Saves approx **₹50,000 – ₹70,000/year**\n\nWhat is your average monthly electricity bill or sanctioned load?`,
        };
    }

    // 5. Commercial / Industrial / CAPEX vs OPEX / RESCO
    if (q.includes('commercial') || q.includes('industrial') || q.includes('factory') || q.includes('capex') || q.includes('opex') || q.includes('resco') || q.includes('tax') || q.includes('depreciation')) {
        return {
            reply: isHindi
                ? `🏭 **Commercial & Industrial (C&I) Solar Models:**\n\n• **CAPEX:** Aapka 100% plant ownership, 3.5 saal me ROI, plus **40% Accelerated Depreciation** tax benefit.\n• **OPEX / RESCO:** Zero upfront investment — aapko grid se 30–40% sasti bijli milti hai.\n\nAapki factory/building kis location par hai?`
                : `🏭 **Commercial & Industrial (C&I) Solar Solutions:**\n\n• **CAPEX Model:** 100% upfront investment, 3.5 year payback period, plus **40% Accelerated Depreciation** tax benefit under Section 32.\n• **OPEX / RESCO Model:** Zero capital investment — you get clean solar power at 30–40% cheaper rates than grid tariffs.\n\nWhere is your facility located?`,
        };
    }

    // 6. Net Metering & Approvals
    if (q.includes('net meter') || q.includes('dhbvn') || q.includes('pspcl') || q.includes('uhbvn') || q.includes('bses') || q.includes('discom') || q.includes('approval')) {
        return {
            reply: isHindi
                ? `🔄 **Net Metering Process:**\nDivvy Solar DISCOM (DHBVN, PSPCL, UHBVN, BSES) ke sath approval, meter testing, aur synchronization ka poora process end-to-end handle karta hai. Timeline lagbhag 15-25 working days hoti hai.`
                : `🔄 **Net Metering Process:**\nDivvy Solar handles 100% of DISCOM liaisoning (DHBVN, PSPCL, UHBVN, BSES, TPDDL), meter testing, and grid synchronization end-to-end. Typical timeline is 15–25 working days.`,
        };
    }

    // 7. Area Required / Rooftop Space
    if (q.includes('area') || q.includes('space') || q.includes('roof') || q.includes('sqft') || q.includes('jagah')) {
        return {
            reply: isHindi
                ? `📐 1 kW solar ke liye lagbhag **80 se 100 sq. ft.** shade-free roof area chahiye hota hai.\n• **3 kW System:** ~250–300 sq. ft.\n• **5 kW System:** ~400–500 sq. ft.\n\nAapka roof RCC flat slab hai ya tin shed?`
                : `📐 You need approx **80 to 100 sq. ft.** of shadow-free rooftop space per 1 kW.\n• **3 kW System:** ~250–300 sq. ft.\n• **5 kW System:** ~400–500 sq. ft.\n\nIs your roof an RCC flat concrete slab or a metal sheet?`,
        };
    }

    // 8. 1kW / 2kW / 3kW / 5kW Specific Sizing
    if (q.includes('1kw') || q.includes('1 kw') || q.includes('2kw') || q.includes('2 kw') || q.includes('3kw') || q.includes('3 kw') || q.includes('5kw') || q.includes('5 kw') || q.includes('10kw') || q.includes('10 kw')) {
        return {
            reply: isHindi
                ? `⚡ **Solar Generation Output:**\n• **1 kW:** 4 se 4.5 units/day (approx 125 units/month)\n• **3 kW:** 12 se 14 units/day (approx 380 units/month — 3-4 BHK homes ke liye best)\n• **5 kW:** 20 se 23 units/day (approx 650 units/month — supports 2 ACs)\n\nSabhi systems me Tier-1 N-Type TopCon panels (25-30 saal performance warranty) lagte hain.`
                : `⚡ **Solar Generation Output:**\n• **1 kW:** 4 to 4.5 units/day (approx 125 units/month)\n• **3 kW:** 12 to 14 units/day (approx 380 units/month — ideal for standard 3-4 BHK homes)\n• **5 kW:** 20 to 23 units/day (approx 650 units/month — supports 2 ACs + appliances)\n\nEquipped with Tier-1 N-Type TopCon bifacial modules with a 25-30 year performance warranty.`,
        };
    }

    // 9. Location & Service Areas
    if (q.includes('location') || q.includes('haryana') || q.includes('punjab') || q.includes('delhi') || q.includes('hisar') || q.includes('ludhiana') || q.includes('chandigarh') || q.includes('gurgaon') || q.includes('noida') || q.includes('kahan') || q.includes('where')) {
        return {
            reply: isHindi
                ? `📍 **Divvy Solar Service Areas:**\nHaryana (Hisar HQ, Gurugram, Faridabad, Karnal, Panipat), Punjab (Mohali, Ludhiana, Jalandhar), Delhi NCR, Chandigarh aur Rajasthan.\n\nHead Office: SJ Tower, Sector-13, Dabra Road, Hisar, Haryana.`
                : `📍 **Divvy Solar Service Regions:**\nHaryana (Hisar HQ, Gurugram, Faridabad, Karnal, Panipat), Punjab (Mohali, Ludhiana, Jalandhar, Amritsar), Delhi NCR, Chandigarh Tricity, and Rajasthan.\n\nHead Office: SJ Tower, Sector-13, Dabra Road, Hisar, Haryana.`,
        };
    }

    // 10. Contact / Phone Number / Office Visit
    if (q.includes('contact') || q.includes('phone') || q.includes('number') || q.includes('address') || q.includes('call') || q.includes('baat')) {
        return {
            reply: isHindi
                ? `📞 **Divvy Solar Support:**\n• Phone / WhatsApp: +91-9254969113 / +91-7983890840\n• Email: info@divvysolar.in\n• Office: SJ Tower, Sector-13, Dabra Road, Hisar\n\nAap apna phone number drop kar sakte hain, hamari team jald hi aapse connect karegi!`
                : `📞 **Contact Divvy Solar:**\n• Phone / WhatsApp: +91-9254969113 / +91-7983890840\n• Email: info@divvysolar.in\n• Office: SJ Tower, Sector-13, Dabra Road, Hisar, Haryana\n\nYou can also leave your phone number here, and an expert will call you shortly!`,
        };
    }

    // 11. Battery / On-Grid vs Off-Grid vs Hybrid
    if (q.includes('battery') || q.includes('hybrid') || q.includes('off grid') || q.includes('on grid') || q.includes('power cut')) {
        return {
            reply: isHindi
                ? `🔋 **System Types:**\n1. **On-Grid:** Grid se connected + Net Meter + Full PM Surya Ghar Subsidy (Highest ROI).\n2. **Hybrid:** Grid + Lithium battery backup (power cuts me seamless bijli).\n3. **Off-Grid:** Pure battery system jahan grid connection nahi hai.`
                : `🔋 **Solar System Types:**\n1. **On-Grid:** Connected to DISCOM grid with Net Meter + Full PM Surya Ghar Subsidy (fastest ROI).\n2. **Hybrid:** Connected to grid + Lithium/Lead-Acid battery backup (runs during power outages).\n3. **Off-Grid:** Standalone battery-backed system for areas with no stable grid.`,
        };
    }

    // 12. Default Contextual Prompt
    return {
        reply: isHindi
            ? `Aapke property ke hisaab se exact solar sizing, subsidy aur quotation ke liye, apna **monthly electricity bill** ya **city** batayein!`
            : `To give you the exact solar capacity, subsidy calculation, and quotation for your roof, what is your **monthly electricity bill** or **city**?`,
    };
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { sessionId, message, visitorInfo, pageUrl, isLeadForm, formData } = body;

        if (!sessionId) {
            return NextResponse.json({ success: false, error: 'sessionId is required' }, { status: 400 });
        }

        await connectToDatabase();

        // 1. Retrieve or create ChatLog document
        let chatLog = await ChatLog.findOne({ sessionId });
        if (!chatLog) {
            chatLog = new ChatLog({
                sessionId,
                pageUrl: pageUrl || '/',
                messages: [],
                visitorName: visitorInfo?.name || formData?.name || '',
                visitorPhone: visitorInfo?.phone || formData?.phone || '',
                visitorEmail: visitorInfo?.email || formData?.email || '',
                location: visitorInfo?.location || formData?.location || '',
                serviceType: formData?.propertyType || visitorInfo?.propertyType || 'Residential',
            });
        }

        // -------------------------------------------------------------
        // A. Handle Direct Quality Lead Form Submission from Chatbot
        // -------------------------------------------------------------
        if (isLeadForm && formData) {
            const rawPhone = String(formData.phone || '').replace(/\D/g, '');
            const cleanPhone = rawPhone.length >= 10 ? rawPhone.slice(-10) : rawPhone;
            const clientName = formData.name?.trim() || 'Valued Visitor';
            const clientCity = formData.location?.trim() || 'North India';
            const clientBill = formData.monthlyBill?.trim() || '₹3,000 - ₹8,000 / month';
            const clientProp = formData.propertyType || 'Residential';
            const clientEmail = formData.email?.trim() || (cleanPhone ? `${cleanPhone}@divvysolar-chat.in` : '');

            chatLog.visitorName = clientName;
            chatLog.visitorPhone = cleanPhone;
            chatLog.visitorEmail = clientEmail;
            chatLog.location = clientCity;
            chatLog.monthlyBill = clientBill;
            chatLog.serviceType = `${clientProp} (Chatbot Quality Lead)`;

            // Save user submission in chat transcript
            chatLog.messages.push({
                sender: 'user',
                text: `📋 **[Submitted Free 3D Solar Audit Form]**\n• **Name:** ${clientName}\n• **Phone:** +91 ${cleanPhone}\n• **City/Location:** ${clientCity}\n• **Monthly Bill:** ${clientBill}\n• **Property Type:** ${clientProp}`,
                timestamp: new Date(),
            });

            // Guaranteed Lead creation in MongoDB
            let leadRecord = null;
            try {
                leadRecord = await Lead.create({
                    name: clientName,
                    email: clientEmail,
                    whatsapp: cleanPhone || '9876543210',
                    location: clientCity,
                    monthlyBill: clientBill,
                    serviceType: `${clientProp} (Chatbot Quality Lead)`,
                    status: 'new',
                    notes: `High-Intent 3D Solar Audit Form submitted in AI Chatbot on: ${pageUrl || '/'}`,
                });
                chatLog.leadId = leadRecord._id;
            } catch (err) {
                console.error("Lead.create error:", err);
                leadRecord = await Lead.create({
                    name: clientName,
                    whatsapp: cleanPhone || '9876543210',
                    serviceType: `${clientProp} (Chatbot Quality Lead)`,
                    status: 'new',
                    notes: `Fallback form lead on: ${pageUrl || '/'}`,
                });
                chatLog.leadId = leadRecord._id;
            }

            // Bot Confirmation Reply
            const botConfirmation = `🎉 **Thank you, ${clientName}! Your Solar Audit Request is Confirmed.**\n\n⚡ **Summary of your request:**\n• **Phone:** +91 ${cleanPhone}\n• **Location:** ${clientCity}\n• **Monthly Bill:** ${clientBill}\n• **System Type:** ${clientProp}\n\nOur Senior Solar EPC Engineer is reviewing your roof feasibility and will connect with you shortly with your customized **3D Solar Layout, PM Surya Ghar Subsidy calculation & detailed quotation**. Feel free to ask any other questions below! ☀️`;

            chatLog.messages.push({
                sender: 'bot',
                text: botConfirmation,
                timestamp: new Date(),
            });

            chatLog.updatedAt = new Date();
            await chatLog.save();

            // Admin Email Notification
            if (process.env.ADMIN_EMAIL && cleanPhone) {
                sendEmail({
                    to: process.env.ADMIN_EMAIL,
                    subject: `⭐ High-Intent Solar Lead: ${clientName} (+91 ${cleanPhone})`,
                    html: `
                        <h2>⭐ New High-Quality Solar Lead (from AI Chatbot Form)</h2>
                        <p><strong>Name:</strong> ${clientName}</p>
                        <p><strong>WhatsApp / Phone:</strong> +91 ${cleanPhone}</p>
                        <p><strong>City / Location:</strong> ${clientCity}</p>
                        <p><strong>Monthly Electricity Bill:</strong> ${clientBill}</p>
                        <p><strong>Property / Sector:</strong> ${clientProp}</p>
                        <p><strong>Page Source:</strong> ${pageUrl || '/'}</p>
                        <p><a href="https://divvysolar.in/leads-portal" style="background:#FECB00;padding:10px 18px;color:#000;font-weight:bold;text-decoration:none;border-radius:8px;">Open Divvy Dashboard</a></p>
                    `,
                }).catch(err => console.error("Chatbot lead form email error:", err));
            }

            return NextResponse.json({
                success: true,
                reply: botConfirmation,
                sessionId,
                leadCaptured: true,
                leadId: leadRecord?._id
            });
        }

        // -------------------------------------------------------------
        // B. Handle Normal Conversational Chat Message
        // -------------------------------------------------------------
        if (!message) {
            return NextResponse.json({ success: false, error: 'message is required' }, { status: 400 });
        }

        // 2. Append User message
        chatLog.messages.push({
            sender: 'user',
            text: message,
            timestamp: new Date(),
        });

        // 3. Try LLM (Gemini) if configured, else use Comprehensive Solar Engine
        let replyText = null;
        const phone = extractPhone(message) || extractPhone(formData?.phone) || extractPhone(visitorInfo?.phone);

        if (!phone) {
            replyText = await callGeminiIfAvailable(message, chatLog.messages);
        }

        if (!replyText) {
            const result = generateSolarResponse(message, chatLog.messages, visitorInfo || formData);
            replyText = result.reply;
        }

        // 4. If phone or form details detected, create/sync with Lead model
        const phoneToUse = phone || chatLog.visitorPhone;
        const candidateName = formData?.name?.trim() || visitorInfo?.name?.trim() || chatLog.visitorName;
        const candidateCity = formData?.location?.trim() || visitorInfo?.location?.trim() || chatLog.location;
        const candidateBill = formData?.monthlyBill?.trim() || visitorInfo?.monthlyBill?.trim() || chatLog.monthlyBill;
        const candidateProp = formData?.propertyType || visitorInfo?.propertyType || chatLog.serviceType || 'Residential';
        const emailToUse = extractEmail(message) || formData?.email || visitorInfo?.email || chatLog.visitorEmail || (phoneToUse ? `${phoneToUse}@divvysolar-chat.in` : '');

        if (phoneToUse) {
            chatLog.visitorPhone = phoneToUse;
            if (candidateName) chatLog.visitorName = candidateName;
            if (candidateCity) chatLog.location = candidateCity;
            if (candidateBill) chatLog.monthlyBill = candidateBill;
            if (candidateProp) chatLog.serviceType = candidateProp.includes('Chatbot') ? candidateProp : `${candidateProp} (Chatbot Quality Lead)`;

            try {
                const leadName = chatLog.visitorName || `Website Visitor (${phoneToUse.slice(-4)})`;
                const leadLocation = chatLog.location || 'North India';
                const leadBill = chatLog.monthlyBill || '₹3,000 - ₹8,000 / month';
                const leadSector = chatLog.serviceType || 'Residential (Chatbot Quality Lead)';

                const newLead = await Lead.create({
                    name: leadName,
                    email: emailToUse,
                    whatsapp: phoneToUse,
                    location: leadLocation,
                    monthlyBill: leadBill,
                    serviceType: leadSector.includes('Chatbot') ? leadSector : `${leadSector} (Chatbot Quality Lead)`,
                    status: 'new',
                    notes: `Initiated via Website AI Chat on page: ${pageUrl || '/'} | Latest user message: "${message.slice(0, 150)}"`,
                });
                chatLog.leadId = newLead._id;

                // Email notification to Admin
                if (process.env.ADMIN_EMAIL) {
                    sendEmail({
                        to: process.env.ADMIN_EMAIL,
                        subject: `New Solar AI Chat Lead: ${leadName} (+91 ${phoneToUse})`,
                        html: `
                            <h2>New Consultation Lead via AI Chatbot</h2>
                            <p><strong>Name:</strong> ${leadName}</p>
                            <p><strong>Phone:</strong> +91 ${phoneToUse}</p>
                            <p><strong>Location:</strong> ${leadLocation}</p>
                            <p><strong>Bill / Sector:</strong> ${leadBill} / ${leadSector}</p>
                            <p><strong>Page:</strong> ${pageUrl || '/'}</p>
                            <p><strong>Latest Message:</strong> ${message}</p>
                            <p><a href="https://divvysolar.in/leads-portal">View in Leads Portal</a></p>
                        `,
                    }).catch(err => console.error("Chat lead email trigger error:", err));
                }
            } catch (leadErr) {
                console.error("Lead sync error during chat:", leadErr);
            }
        }

        // 5. Append Bot message
        chatLog.messages.push({
            sender: 'bot',
            text: replyText,
            timestamp: new Date(),
        });

        chatLog.updatedAt = new Date();
        await chatLog.save();

        return NextResponse.json({
            success: true,
            reply: replyText,
            sessionId,
            leadCaptured: Boolean(phoneToUse),
        });
    } catch (error) {
        console.error('Chat message handler error:', error);
        return NextResponse.json({
            success: false,
            reply: "I received your message. Please share your WhatsApp / Phone number so our senior engineer can send you the exact 3D solar layout & quote!",
            error: error.message
        }, { status: 500 });
    }
}
