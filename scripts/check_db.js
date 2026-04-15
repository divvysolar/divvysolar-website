require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('MONGODB_URI is missing');
    process.exit(1);
}

async function checkDB() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB successfully!');
        
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));
        
        // Try to create a temporary test lead
        const LeadSchema = new mongoose.Schema({ name: String, serviceType: String });
        const Lead = mongoose.models.TestLead || mongoose.model('TestLead', LeadSchema);
        
        await Lead.create({ name: 'System Test', serviceType: 'RESIDENTIAL/HOME' });
        console.log('Test record created successfully!');
        
        await Lead.deleteOne({ name: 'System Test' });
        console.log('Test record deleted. Database is WRITABLE.');
        
        process.exit(0);
    } catch (err) {
        console.error('Database Check Failed:', err.message);
        process.exit(1);
    }
}

checkDB();
