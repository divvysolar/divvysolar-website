const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://developer_db_user:DivvySolar2026@ac-afxaprq-shard-00-00.vbju23x.mongodb.net:27017,ac-afxaprq-shard-00-01.vbju23x.mongodb.net:27017,ac-afxaprq-shard-00-02.vbju23x.mongodb.net:27017/divvysolar?ssl=true&replicaSet=atlas-uordce-shard-0&authSource=admin&appName=Cluster0';

async function main() {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected!');

    const collection = mongoose.connection.collection('blogs');
    const blogs = await collection.find({}).toArray();

    console.log(`Found ${blogs.length} blogs to check.`);

    for (const blog of blogs) {
        let updatedContent = blog.content;
        let needsUpdate = false;

        // Replace 16,000 with 1,000 in content
        if (updatedContent.includes('16,000')) {
            console.log(`Updating 16,000 -> 1,000 in blog: ${blog.slug}`);
            updatedContent = updatedContent.replace(/16,000/g, '1,000');
            needsUpdate = true;
        }

        // Replace zero upfront with minimal upfront cost
        if (updatedContent.includes('minimal upfront cost costs')) {
            console.log(`Fixing double cost in blog: ${blog.slug}`);
            updatedContent = updatedContent.replace(/minimal upfront cost costs/g, 'minimal upfront cost');
            needsUpdate = true;
        } else if (updatedContent.includes('zero upfront')) {
            console.log(`Updating 'zero upfront' -> 'minimal upfront cost' in blog: ${blog.slug}`);
            updatedContent = updatedContent.replace(/zero upfront costs/g, 'minimal upfront cost');
            updatedContent = updatedContent.replace(/zero upfront/g, 'minimal upfront cost');
            needsUpdate = true;
        }

        if (needsUpdate) {
            await collection.updateOne(
                { _id: blog._id },
                { $set: { content: updatedContent, updatedAt: new Date() } }
            );
            console.log(`✅ Updated blog: ${blog.slug}`);
        }
    }

    console.log('All blogs processed.');
    await mongoose.connection.close();
}

main().catch(console.error);
