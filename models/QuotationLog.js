import mongoose from 'mongoose';

const QuotationLogSchema = new mongoose.Schema(
    {
        salespersonId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin',
            required: true,
        },
        salespersonName: {
            type: String,
            required: true,
        },
        salespersonEmail: {
            type: String,
            required: true,
        },
        clientName: {
            type: String,
            default: '',
        },
        clientPhone: {
            type: String,
            default: '',
        },
        clientLocation: {
            type: String,
            default: '',
        },
        quoteRef: {
            type: String,
            default: '',
        },
        systemKW: {
            type: Number,
            default: 0,
        },
        grandTotal: {
            type: Number,
            default: 0,
        },
        projectCategory: {
            type: String,
            enum: ['residential', 'industrial', 'utility'],
            default: 'residential',
        },
        action: {
            type: String,
            enum: ['downloaded'],
            default: 'downloaded',
        },
        pdfData: {
            type: String,
            select: false,
        },
        hasPDF: {
            type: Boolean,
            default: false,
        },
        calcState: {
            type: String,
            select: false,
        },
        hasState: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, // createdAt = log timestamp
    }
);

export default mongoose.models.QuotationLog ||
    mongoose.model('QuotationLog', QuotationLogSchema);
