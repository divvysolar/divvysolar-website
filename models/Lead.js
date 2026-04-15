import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            trim: true,
            maxlength: [50, 'Name cannot be more than 50 characters'],
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email',
            ],
        },
        whatsapp: {
            type: String,
            required: [true, 'Please provide a WhatsApp number'],
            maxlength: [20, 'Phone number cannot be longer than 20 characters'],
        },
        location: {
            type: String,
            required: [true, 'Please provide your location/city'],
        },
        monthlyBill: {
            type: String,
            required: [true, 'Please provide your monthly electricity bill estimate'],
        },
        serviceType: {
            type: String,
            required: [true, 'Please select a service type'],
            default: 'General',
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
