import nodemailer from 'nodemailer';
import dns from 'dns';

// Force IPv4 first to prevent ETIMEDOUT errors on IPv6 networks
dns.setDefaultResultOrder('ipv4first');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async ({ to, subject, html }) => {
    try {
        // Clean up recipient address(es) to handle spaces/commas in environment variables
        let recipients = to;
        if (typeof to === 'string') {
            recipients = to.split(',').map(email => email.trim()).filter(Boolean);
            if (recipients.length === 1) {
                recipients = recipients[0];
            }
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: recipients,
            subject,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
};
