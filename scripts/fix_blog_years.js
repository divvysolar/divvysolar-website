const mongoose = require('mongoose');

// Need to define temporary model if not available in script context
const BlogSchema = new mongoose.Schema({
    title: String,
    slug: String,
    content: String,
    excerpt: String,
    createdAt: Date
}, { timestamps: true });

async function updateBlogs() {
    const MONGODB_URI = "mongodb://developer_db_user:DivvySolar2026@ac-afxaprq-shard-00-00.vbju23x.mongodb.net:27017,ac-afxaprq-shard-00-01.vbju23x.mongodb.net:27017,ac-afxaprq-shard-00-02.vbju23x.mongodb.net:27017/divvysolar?ssl=true&replicaSet=atlas-uordce-shard-0&authSource=admin&appName=Cluster0";
    
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
        
        const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
        
        const blogs = await Blog.find({});
        console.log(`Found ${blogs.length} blogs`);
        
        for (const blog of blogs) {
            let updated = false;
            const updateData = {};
            
            // 1. Update Title (2026 -> 2025)
            if (blog.title && blog.title.includes('2026')) {
                updateData.title = blog.title.replace(/2026/g, '2025');
                updated = true;
            }
            
            // 2. Update Excerpt
            if (blog.excerpt && blog.excerpt.includes('2026')) {
                updateData.excerpt = blog.excerpt.replace(/2026/g, '2025');
                updated = true;
            }
            
            // 3. Update Content
            if (blog.content && blog.content.includes('2026')) {
                updateData.content = blog.content.replace(/2026/g, '2025');
                updated = true;
            }
            
            // 4. Update CreatedAt (Set year to 2025)
            const oldDate = new Date(blog.createdAt || Date.now());
            const newDate = new Date(oldDate);
            if (newDate.getFullYear() === 2026) {
                newDate.setFullYear(2025);
                updateData.createdAt = newDate;
                updated = true;
            }
            
            if (updated) {
                console.log(`Updating blog: ${blog.title} -> ${updateData.title || blog.title}`);
                // Use updateOne to bypass timestamp auto-update if possible
                await Blog.collection.updateOne(
                    { _id: blog._id },
                    { $set: updateData }
                );
            }
        }
        
        console.log('Update complete!');
        process.exit(0);
        
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

updateBlogs();
