const mongoose = require('mongoose');

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
            enum: ['Residential', 'Industrial', 'Utility-Scale', 'General', 'RESIDENTIAL/HOME', 'INDUSTRIAL/COMMERCIAL', 'UTILITY/PPA'],
            default: 'General',
        },
    }
);

const Lead = mongoose.model('Lead', LeadSchema);

const testLead = new Lead({
    name: 'tyfghj',
    email: 'developer@divvysolar.in',
    whatsapp: '87654323456',
    location: 'uiooiug',
    monthlyBill: 'Under ₹3,000',
    serviceType: 'RESIDENTIAL/HOME'
});

const error = testLead.validateSync();
if (error) {
    console.log('Validation Failed:', error.message);
} else {
    console.log('Validation Passed!');
}
