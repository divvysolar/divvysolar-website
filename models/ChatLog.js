import mongoose from 'mongoose';

const ChatMessageSchema = new mongoose.Schema({
    sender: {
        type: String,
        enum: ['user', 'bot', 'system'],
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const ChatLogSchema = new mongoose.Schema(
    {
        sessionId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        visitorName: {
            type: String,
            default: '',
            trim: true,
        },
        visitorPhone: {
            type: String,
            default: '',
            trim: true,
        },
        visitorEmail: {
            type: String,
            default: '',
            trim: true,
        },
        location: {
            type: String,
            default: '',
            trim: true,
        },
        monthlyBill: {
            type: String,
            default: '',
        },
        serviceType: {
            type: String,
            default: 'Solar Assistant Chat',
        },
        messages: [ChatMessageSchema],
        leadId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lead',
            default: null,
            index: true,
        },
        pageUrl: {
            type: String,
            default: '/',
        },
        ip: {
            type: String,
            default: '',
        },
    },
    { timestamps: true }
);

// Indexes for fast lookup
ChatLogSchema.index({ sessionId: 1 });
ChatLogSchema.index({ visitorPhone: 1 });
ChatLogSchema.index({ createdAt: -1 });

if (mongoose.models && mongoose.models.ChatLog) {
    delete mongoose.models.ChatLog;
}

export default mongoose.model('ChatLog', ChatLogSchema);
