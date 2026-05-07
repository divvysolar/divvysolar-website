const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://developer_db_user:DivvySolar2026@ac-afxaprq-shard-00-00.vbju23x.mongodb.net:27017,ac-afxaprq-shard-00-01.vbju23x.mongodb.net:27017,ac-afxaprq-shard-00-02.vbju23x.mongodb.net:27017/divvysolar?ssl=true&replicaSet=atlas-uordce-shard-0&authSource=admin&appName=Cluster0';

async function main() {
    await mongoose.connect(MONGODB_URI);
    const collection = mongoose.connection.collection('blogs');
    const blogs = await collection.find({}).toArray();
    console.log(JSON.stringify(blogs, null, 2));
    await mongoose.connection.close();
}

main().catch(console.error);
