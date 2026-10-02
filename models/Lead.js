import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            trim: true,
            default: 'Valued Prospect',
            maxlength: [100, 'Name cannot be more than 100 characters'],
        },
        email: {
            type: String,
            trim: true,
            default: '',
        },
        whatsapp: {
            type: String,
            required: [true, 'Please provide a WhatsApp number'],
            trim: true,
            maxlength: [30, 'Phone number cannot be longer than 30 characters'],
        },
        location: {
            type: String,
            trim: true,
            default: 'North India',
        },
        monthlyBill: {
            type: String,
            trim: true,
            default: '₹3,000 - ₹8,000 / month',
        },
        serviceType: {
            type: String,
            trim: true,
            default: 'Residential (Chatbot Quality Lead)',
        },
        status: {
            type: String,
            enum: ['new', 'contacted', 'converted', 'rejected'],
            default: 'new',
        },
        notes: {
            type: String,
            default: '',
        },
    },
    { timestamps: true }
);

// Optimize status and createdAt queries for admin dashboard
LeadSchema.index({ status: 1 });
LeadSchema.index({ createdAt: -1 });

// Ensure the model is re-registered during development to pick up schema changes
if (mongoose.models && mongoose.models.Lead) {
    delete mongoose.models.Lead;
}

export default mongoose.model('Lead', LeadSchema);
