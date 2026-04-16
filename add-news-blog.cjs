require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: String,
    slug: String,
    content: String,
    excerpt: String,
    image: String,
    author: String,
    published: Boolean,
});
const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

async function addBlog() {
    try {
        if (!process.env.MONGODB_URI) throw new Error("Missing MONGODB_URI");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');
        
        await Blog.deleteOne({ slug: "future-of-solar-energy-india-2026-news" }); // clear old if exists
        
        const content = `
        <div class="blog-content font-sans text-slate-700 leading-relaxed">
            <p class="text-xl md:text-2xl text-slate-800 font-medium mb-10 leading-snug">
                As we step further into 2026, India's solar power ecosystem is expanding faster than ever. Driven by massive government subsidies and cutting-edge technology, what was once an alternative energy source has now become the core backbone of the nation's power grid.
            </p>

            <h2 class="text-2xl md:text-3xl font-extrabold text-[#0a1122] mt-14 mb-8 tracking-tight" style="font-family: var(--font-heading);">1. Record-Breaking Commercial Installations 🏭</h2>
            <p class="mb-8 text-lg">
                Industries and large-scale commercial entities are leading the charge. With the rising cost of traditional grid electricity, commercial rooftop solar isn't just an environmental choice—it's the absolute most profitable financial decision a business can make in 2026.
            </p>
            
            <figure class="mb-14">
                <img src="/image-2 1.jpg" alt="Commercial Solar Installation 2026" class="w-full rounded-3xl shadow-2xl object-cover hover:scale-[1.02] transition-transform duration-500" style="max-height: 550px;" />
                <figcaption class="text-center text-sm text-slate-500 mt-4 italic">Modern commercial solar infrastructure being deployed rapidly across industrial zones.</figcaption>
            </figure>

            <h2 class="text-2xl md:text-3xl font-extrabold text-[#0a1122] mt-14 mb-8 tracking-tight" style="font-family: var(--font-heading);">2. The Push for "Zero-Bill" Homes 🏠</h2>
            <p class="mb-8 text-lg">
                Thanks to streamlined processes by regional authorities, homeowners are seeing faster approvals and direct subsidy deposits. The concept of a "zero-bill home" is no longer a distant dream—it is the modern standard for residential construction across North India.
            </p>

            <figure class="mb-14">
                <img src="/360_F_519445978_PEPYf1rgopUdcN31HobzIVv8RAaoqNRE.jpg" alt="Residential Solar Power 2026" class="w-full rounded-3xl shadow-2xl object-cover hover:scale-[1.02] transition-transform duration-500" style="max-height: 550px;" />
                <figcaption class="text-center text-sm text-slate-500 mt-4 italic">Residential rooftops are transforming into personal power plants.</figcaption>
            </figure>

            <div class="bg-gradient-to-br from-slate-50 to-slate-100 border-l-4 border-[#FECB00] p-8 md:p-10 rounded-r-3xl my-14 shadow-sm relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-[#FECB00]/10 rounded-bl-full pointer-events-none"></div>
                <h3 class="text-xl font-extrabold text-[#0a1122] mb-4 uppercase tracking-wider text-sm" style="font-family: var(--font-heading);">Expert Insight: Divvy Solar EPC Team</h3>
                <p class="text-slate-600 m-0 text-lg italic">"The technology we are deploying in 2026 is lightyears ahead in efficiency. With bi-facial panels and smart micro-inverters, our clients are extracting maximum power even on cloudy days. The ROI timeline has dropped to just 2.5 to 3 years."</p>
            </div>

            <h2 class="text-2xl md:text-3xl font-extrabold text-[#0a1122] mt-14 mb-8 tracking-tight" style="font-family: var(--font-heading);">3. What's Next? 🚀</h2>
            <p class="mb-8 text-lg">
                Are you ready to join the solar revolution? The policies in 2026 are highly favorable, but grid capacities in premium sectors are filling up fast. Securing your solar asset today guarantees decades of free, clean energy and high property valuation. 
            </p>

            <div class="text-center mt-12 mb-4 p-8 bg-[#0a1122] text-white rounded-3xl shadow-xl">
                <p class="font-bold text-xl mb-6">Connect with Divvy Solar today to lock in your 2026 subsidies and start your transition to ultimate energy independence.</p>
                <a href="/contact" class="inline-block bg-[#FECB00] text-[#0a1122] font-bold px-8 py-3 rounded-full hover:bg-yellow-400 transition-colors">Book Free Consultation</a>
            </div>
        </div>
        `;

        const newBlog = new Blog({
            title: "The Future of Solar Energy in India (2026): A New Era of Power",
            slug: "future-of-solar-energy-india-2026-news",
            content: content,
            excerpt: "Discover the latest trends, government policies, and technological advancements driving India's solar revolution in 2026. See how commercial and residential sectors are adapting.",
            image: "/image-3 1.jpg",
            author: "Divvy Solar Editorial",
            published: true,
        });

        await newBlog.save();
        console.log("Blog successfully created!");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

addBlog();
