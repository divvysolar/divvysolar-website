export const revalidate = 0; // Fresh content on every load

import Hero from '@/components/home/Hero';
import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';
import dynamic from 'next/dynamic';

// Lazy load below-the-fold components for max performance
const Execution = dynamic(() => import('@/components/home/Execution'));
const Testimonials = dynamic(() => import('@/components/home/Testimonials'));
const LatestBlogs = dynamic(() => import('@/components/home/LatestBlogs'));
const FAQ = dynamic(() => import('@/components/home/FAQ'));
const Brands = dynamic(() => import('@/components/home/Brands'));

async function getLatestBlogs() {
    try {
        await connectToDatabase();
        const blogs = await Blog.find({ published: true })
            .sort({ createdAt: -1 })
            .limit(3)
            .lean();
        return JSON.parse(JSON.stringify(blogs));
    } catch (error) {
        console.error('Error fetching latest blogs:', error);
        return [];
    }
}

export default async function Home() {
    const latestBlogs = await getLatestBlogs();

    return (
        <>
            <Hero />
            <Execution />
            <Testimonials />
            <LatestBlogs blogs={latestBlogs} />
            <FAQ />
            <Brands />
        </>
    );
}
