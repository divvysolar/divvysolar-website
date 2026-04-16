import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';
import mongoose from 'mongoose';

// GET: Fetch all blogs (public)
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const published = searchParams.get('published');
        const limit = parseInt(searchParams.get('limit')) || 20;

        await connectToDatabase();

        if (id) {
            const blog = await Blog.findById(id);
            if (!blog) {
                return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
            }
            return NextResponse.json({ success: true, data: blog });
        }

        const query = {};
        // If public request, only show published
        if (published === 'true') {
            query.published = true;
        }

        const blogs = await Blog.find(query)
            .sort({ createdAt: -1 })
            .limit(limit);

        return NextResponse.json({ success: true, count: blogs.length, data: blogs });
    } catch (error) {
        console.error('Blog fetch error:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}

// POST: Admin only - Create new blog
export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ success: false, error: 'Unauthorized access' }, { status: 401 });
        }

        const data = await req.json();

        await connectToDatabase();

        // Simple deduplication for slug
        const existingBlog = await Blog.findOne({ slug: data.slug });
        if (existingBlog) {
            data.slug = `${data.slug}-${Date.now()}`;
        }

        const blog = await Blog.create(data);

        return NextResponse.json({ success: true, data: blog }, { status: 201 });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return NextResponse.json({ success: false, error: messages.join(', ') }, { status: 400 });
        }
        console.error('Blog creation error:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}

// DELETE: Admin only - Delete a blog by ID
export async function DELETE(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ success: false, error: 'Unauthorized access' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, error: 'Blog ID is required' }, { status: 400 });
        }

        await connectToDatabase();
        
        const deletedBlog = await Blog.findByIdAndDelete(id);
        
        if (!deletedBlog) {
            return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: {} }, { status: 200 });
    } catch (error) {
        console.error('Blog deletion error:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}

// PUT: Admin only - Update a blog
export async function PUT(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ success: false, error: 'Unauthorized access' }, { status: 401 });
        }

        const body = await req.json();
        const { id, ...updateData } = body;
        
        if (!id) {
            return NextResponse.json({ success: false, error: 'Blog ID is required' }, { status: 400 });
        }

        await connectToDatabase();

        // 1. Sanitize updateData (remove _id, id, and other internal fields)
        const filteredData = { ...updateData };
        delete filteredData._id;
        delete filteredData.id;
        delete filteredData.__v;

        // 2. Handle slug deduplication if slug is being changed
        if (filteredData.slug) {
            const existingBlog = await Blog.findOne({ slug: filteredData.slug, _id: { $ne: id } });
            if (existingBlog) {
                // If the slug is the same as another blog, don't let it update or it will crash due to unique index
                return NextResponse.json({ success: false, error: 'Slug already in use by another article' }, { status: 400 });
            }
        }

        // 3. Handle specific Date conversions
        if (filteredData.createdAt) {
          filteredData.createdAt = new Date(filteredData.createdAt);
        }
        
        // Always update the modified timestamp
        filteredData.updatedAt = new Date();

        // 4. Update using collection to bypass Mongoose's immutable createdAt protection
        const result = await Blog.collection.updateOne(
            { _id: new mongoose.Types.ObjectId(id) },
            { $set: filteredData }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
        }
        
        const blog = await Blog.findById(id);
        return NextResponse.json({ success: true, data: blog }, { status: 200 });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return NextResponse.json({ success: false, error: messages.join(', ') }, { status: 400 });
        }
        console.error('Blog update error:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}
