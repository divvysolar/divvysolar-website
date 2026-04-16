import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a title'],
            trim: true,
            maxlength: [150, 'Title cannot be more than 150 characters'],
        },
        slug: {
            type: String,
            required: [true, 'Please provide a slug'],
            unique: true,
            trim: true,
            lowercase: true,
        },
        content: {
            type: String,
            required: [true, 'Please provide blog content'],
        },
        excerpt: {
            type: String,
            required: [true, 'Please provide an excerpt'],
            maxlength: [300, 'Excerpt cannot be more than 300 characters'],
        },
        image: {
            type: String,
            required: [true, 'Please provide a cover image URL'],
        },
        author: {
            type: String,
            default: 'Divvy Solar Expert',
        },
        published: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

// Optimize published, slug, and createdAt queries
BlogSchema.index({ published: 1 });
BlogSchema.index({ createdAt: -1 });

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
