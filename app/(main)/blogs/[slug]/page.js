import BlogHero from '@/components/blog/BlogHero';
import { notFound } from 'next/navigation';

import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';

export const revalidate = 0; // Disable cache to reflect admin edits immediately

const fallbackBlogs = {
    'solar-potential-in-india-2025-key-trends-insights': {
        title: 'Unlocking Solar Potential in India: Key Trends & Insights for Homes, Businesses & Enterprises in 2025!',
        author: 'Divvy Expert',
        createdAt: '2025-04-14',
        image: '/utility_hero_4k.png',
        content: `
            <p>Are you ready to embrace the sunshine and transform your homes and businesses?</p>
            <p>As we know, India is taking steps towards solar power with great confidence, and government policies have also made it quite easy. It presents a valuable opportunity for large industries, enterprises, and homeowners. Technological advancements in solar energy are attracting the market and are becoming the trend. However, by using solar energy, you cut your electric bill. This is a very good opportunity for the industries and enterprises. There is a lot of awareness about solar energy in the Indian market, which aims to protect the environment and ensure a future filled with clean energy. In this blog, I am talking about some trends regarding solar energy and making it clear why it's time to transition to renewable energy. Divvy Solar has emerged as an influential partner in many parts, like Haryana, Punjab, and Chandigarh, and now it is establishing its foothold in Gurgaon.</p>

            <h3>The Current Solar Landscape in India</h3>
            <p>India is a developing country; hence, it is always looking for opportunities to develop our nation so that we can keep pace with the world. As we know, the world is moving forward to solar energy because of environmental concerns and a cost-effective energy solution. Over the past decade, the Indian market has undergone a transformative shift due to technological advancement, and the government's incentives, policy support, and schemes have scaled up solar installation.</p>

            <h3>A Promising Future: Unprecedented Growth in Installed Capacity</h3>
            <p>India will become the global leader in the field of solar energy in 2025. Our country is experiencing a rapid increase in renewable energy, and as of January, has reached approximately 271.62 GW project capacity, and solar power installation capacity has reached, contributing approximately 47%.</p>
            <p>Our Indian government is taking an ambitious step towards renewable energy to accelerate energy adaptation through initiatives like the National Solar Mission, the Production-Linked Incentive (PLI) scheme, and solar rooftop programs. India has been positioned as a global leader in solar energy with large-scale solar parks and decentralised rooftop systems.</p>

            <h3>Government Initiatives: Powering Progress</h3>
            <p>The Indian government has set an ambitious target of achieving 500 GW of non-fossil fuel-based energy capacity by 2030, with a focus on solar power transition, and aims to accelerate solar energy adoption across the country.</p>
            <p>Solar park scheme driving the growth seeks to develop 50 solar parks with a cumulative capacity of approximately 38 GW. These solar parks provide pre-identified land, grid connectivity, and essential infrastructure. By fostering large-scale solar installations, the scheme not only enhances India's renewable energy capacity but also contributes to job creation.</p>
            <p>The government has also launched the Kisan Urja Suraksha evam Utthan Mahabhiyan (PM-KUSUM) to promote decentralised solar solutions in rural areas and various solar rooftop subsidy programs to encourage adoption among residential and commercial consumers.</p>

            <h4>Key Incentives for Solar Adoption:</h4>
            <ul>
                <li><strong>MNRE Subsidies:</strong> Get up to a 40% subsidy on residential solar installations.</li>
                <li><strong>State-Specific Incentives:</strong> Benefits in states like Gujarat, Maharashtra, and Rajasthan.</li>
                <li><strong>Net Metering:</strong> Sell excess solar power back to the grid.</li>
                <li><strong>GST &amp; Loan Benefits:</strong> Reduced GST rates (5%) and easy financing options.</li>
            </ul>

            <p>Switching to solar is not just an environmentally conscious decision—it's also a financially smart one.</p>

            <h3>Trends Shaping Solar Energy in 2025</h3>

            <h4>1. Technological Innovations: Efficiency Meets Affordability</h4>
            <p>India's energy demand has increased due to population growth and consumption patterns. In 2025, exponential advancements in solar panels and their efficiency will be more crucial than ever. Silicon-based panels are achieving remarkable efficiency levels, averaging around 25%, and perovskite-silicon tandem solar cells are pushing past 30%.</p>
            <p>The trend is moving towards solar energy storage solutions, enhancing overall energy security. Virtual power plants (VPPs) allow users to sell stored energy to create an extra source of income.</p>

            <h4>2. Decentralised Solar Solutions: Empowering Consumers</h4>
            <p>Programs like the PM Surya Ghar: Muft Bijli Yojana are making it easier for homeowners to install rooftop solar systems. Community solar programs are also playing a significant role in bridging the energy gap in rural areas, promoting economic empowerment.</p>

            <h4>3. Smart Technologies: The Future of Energy Management</h4>
            <p>The integration of AI and IoT in solar systems is revolutionising energy management. AI-driven solutions can predict maintenance needs, communicate with smart appliances, and optimize energy usage based on weather forecasts and consumption patterns.</p>

            <h4>4. Aesthetic &amp; Flexible Solar Solutions</h4>
            <p>Modern architecture now blends with aesthetics through stylish solar panels:</p>
            <ul>
                <li><strong>Solar Shingles:</strong> Integrate directly into the structure of the roof.</li>
                <li><strong>Transparent Solar Windows:</strong> Convert sunlight into electricity while allowing natural light.</li>
                <li><strong>Black-on-Black Panels:</strong> Offer a sleek, modern aesthetic with high efficiency.</li>
            </ul>

            <h3>Customised Solar Solutions for Every Need</h3>
            <p>Divvy Solar provides tailored EPC solutions for homeowners and businesses alike, recognizing that every project has distinct requirements.</p>

            <h4>Residential Solar Solutions</h4>
            <p>Designed to maximise energy efficiency and lower costs through rooftop systems, smart management, and expert support.</p>

            <h4>Commercial &amp; Industrial Solar Solutions</h4>
            <p>We provide ground-mounted solar farms, solar carports, and industrial-scale installations to meet significant energy demands while improving cost efficiency and sustainability.</p>

            <h3>Why Choose Divvy Solar?</h3>
            <p>Over the last few years, Divvy Solar has established itself as one of the best EPC providers in Haryana and Punjab, with over 16,000 successful projects.</p>
            <ul>
                <li><strong>Project Management:</strong> End-to-end site assessment to installation.</li>
                <li><strong>Proven Record:</strong> Successful installations across Haryana, Chandigarh, and Punjab, now expanding to Gurgaon.</li>
                <li><strong>PPA Options:</strong> Predictable energy pricing with zero upfront costs.</li>
            </ul>

            <h3>Future Outlook: The Road Ahead</h3>
            <p>India is well on its way to becoming a global leader in solar power. Investing in solar today not only ensures financial savings but also contributes to a more sustainable, carbon-free future. Divvy Solar is your trusted partner in this journey—now is the time to take action!</p>
        `
    },
    'solar-power-is-the-future-2025': {
        title: 'Solar Power Is The Future: Why Now Is the Ideal Time to Transition (2025 Edition)',
        author: 'Divvy Expert',
        createdAt: '2025-04-14',
        image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2000&auto=format&fit=crop',
        content: `
            <h3>Why Now is the Perfect Time to Make the Transition</h3>
            <p>As the world rapidly moves toward a more sustainable future, technological advancements are transforming the energy landscape. Solar power is no longer just an alternative but a central component of how we produce and consume energy. Divvy Solar helps cut costs and emphasise environmental responsibility, so transitioning to solar energy is now a strategic and forward-thinking decision. Adopting solar power means securing financial stability and contributing to a cleaner and more sustainable future. The shift is no longer just an option—it has become more essential.</p>
            
            <p>Let's take a look at some of the key reasons that make solar power the future of energy in 2025.</p>

            <h3>What is solar power?</h3>
            <p>Solar energy harnesses the sun's radiation and converts it into heat or electricity. Solar energy is typically captured through two methods: photovoltaic (PV), which directly converts sunlight into electricity, while concentrated solar power (CSP) uses focused sunlight to generate heat and electricity. Solar energy is renewable, sustainable, and reduces greenhouse gas emissions compared to fossil fuels. The advantages of solar energy include environmental benefits, and while facing challenges like intermittency and high initial cost, advancements in storage and efficiency continue to improve.</p>

            <h3>The Economic Case</h3>
            <p>Solar energy makes a compelling economic case that is hard to ignore and is becoming an attractive economic choice for individuals, businesses, and governments worldwide. This economic shift dramatically decreases solar panel prices, government incentives, and subsidies. Over the decade, solar technology has continued to evolve, and the financial cases of solar have become even stronger.</p>

            <h3>Significant Cost Reductions</h3>
            <p>One of the most visible changes in the solar industry is that the cost of solar technology has plummeted in recent years. In 2025 alone, solar component prices fell by 35%. Additionally, the incentives available to homeowners and businesses make the transition to solar power even more affordable. As installation costs decrease, the return on investment becomes attractive, and policies play a crucial role in accelerating the switch to clean energy.</p>

            <h3>Energy Independence and Security</h3>
            <p>The Indian solar energy market is rapidly expanding and achieving energy independence by offering security and stability, valued at USD 10.3 billion in 2025 and projected to grow to USD 50.4 billion by 2031, growing at a CAGR of 21.9%. Some estimates suggest even more significant growth; the market could reach USD 1,254 billion by 2033.</p>
            <p>Solar contributes to energy independence and security by allowing grid stability, reducing fossil fuel consumption, and enhancing resilience. Government incentives such as the National Solar Mission and the PM Surya Ghar: Muft Bijali Yojana offer 40% of installation costs for residential rooftop solar, making solar energy more accessible.</p>

            <h3>A Sustainable Long-Term Investment</h3>
            <p>Solar power provides long-term financial savings, unlike traditional energy sources. Beyond cutting monthly bills, lowering your long-term expenses offers a predictable and stable cost structure. Furthermore, an energy-efficient property value is significantly higher, making it more attractive to investors for real estate investment. Investing in solar contributes to a resilient, decentralised energy infrastructure, insulating communities from grid disruptions.</p>

            <h3>Significant Technological Advancements in Solar Energy</h3>
            <p>The solar energy industry has witnessed remarkable technological growth and innovation in photovoltaic (PV) panel efficiency, and smart grid integration has significantly improved the reliability and scalability of solar systems.</p>

            <h4>Key Innovations in 2025:</h4>
            <ul>
                <li><strong>Community Solar:</strong> Shared access, crediting utility bills for energy output.</li>
                <li><strong>Perovskite Solar Cells:</strong> Cheaper, thinner, flexible, and more efficient.</li>
                <li><strong>Bifacial Panels:</strong> Capture sunlight on both sides for maximum energy in limited spaces.</li>
                <li><strong>AI Optimisation:</strong> Algorithms analyse data to maximise energy output.</li>
                <li><strong>Smart Inverters:</strong> Enhance energy management and storage integration.</li>
                <li><strong>Solid-State Batteries:</strong> Safer, longer-lasting, and higher energy density.</li>
                <li><strong>Vanadium Flow Batteries:</strong> Grid-scale storage for high solar generation periods.</li>
            </ul>

            <h3>Rising Demand for Clean Energy</h3>
            <p>The global demand for clean energy is on the rise due to environmental concerns, climate change, and energy security needs. These initiatives, technological advancements, and cost reductions have positioned solar energy as the leading alternative to traditional fossil fuels, and the IEA projects solar PV will contribute to global electricity growth in 2025.</p>

            <h3>Environmental Benefits</h3>
            <p>Solar energy is a significant advantage in reducing air pollution, as it reduces the use of coal, oil, and natural gas, which release pollutants such as carbon dioxide (CO2), sulfur dioxide (SO2), and nitrogen oxides (NOx). According to a 2023 Air Quality Life Index report, reducing global PM2.5 air pollution to meet WHO guidelines would add 2.3 years to the average human life expectancy.</p>

            <h3>The Undeniable Environmental Benefits of Solar Energy</h3>
            <p>Traditional power generation often requires large amounts of water for cooling; however, PV systems require minimal water. Solar power diminishes the greenhouse effect responsible for global warming, and every 1,000 kWh of energy harvested from solar radiation reduces carbon dioxide emissions by about 812 kilograms per year. The lifecycle emissions per kWh of electricity produced by rooftop solar are around 12 times less than those of natural gas and 20 times less than coal.</p>
        `
    },
    'epc-solutions-in-solar-energy-2025': {
        title: 'Mastering EPC Solutions in Solar Energy: A 2025 Guide',
        author: 'Divvy Expert',
        createdAt: '2025-04-14',
        image: 'https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?q=80&w=2000&auto=format&fit=crop',
        content: `
            <p>Everyone is talking about a global shift toward renewable energy, as traditional fossil fuels are no longer a viable option. However, when you consider the time required to meet with different members for solar installation, imagine having to travel to various locations to purchase materials, as well as to different contractors for installation. How much trouble would it be, right?</p>

            <p>An experienced EPC company helps you with a successful solar system installation. This is the backbone of whether you want to do rooftop installation or a large solar farm; it will ensure long-term work performance and efficiency. For a hassle-free solar system installation, EPC companies tie up with different companies for different materials. So in this blog, we will understand everything about EPC services.</p>

            <h3>Understanding EPC in Solar Energy</h3>
            <p>Solar system installation could be challenging without an EPC solution because this is not an easy process. There are many steps involved, and the EPC solution comes into the picture. If you want to install a solar system, you have to make a structured plan. As you know, EPC stands for Engineering, Procurement, and Construction. A company that does EPC for solar power projects takes care of all three of these important steps.</p>

            <h3>Core Components of a High-Performance EPC Solution</h3>

            <h4>1. Precision Engineering &amp; Design</h4>
            <p>Engineering and design are the foundation of any solar installation project. In this part, we analyse the sites, perform feasibility studies and system design that will determine solar installation efficiency and long-term performance. It's like planning how your solar panels will look, how many panels will be installed, where to put them, and how to connect them.</p>

            <h4>2. Strategic Procurement for High-Quality Components</h4>
            <p>In procurement, choosing the right material is crucial for the durability and performance of the solar system. For solar installation, we need to buy high-quality solar panels, inverters, and mounting structures. EPC companies source these on your behalf, ensuring the solar system efficiently converts solar energy into usable electricity.</p>

            <h4>3. Streamlined &amp; Scalable Construction</h4>
            <p>Just like building a home needs planning, materials, and a good contractor, solar installation also needs a good contractor who ensures efficiency. In construction, the building process starts when we install the structured system and commission it. Key stages include:</p>
            <ul>
                <li>Getting the site ready</li>
                <li>Installing all solar panels and connecting them</li>
                <li>Installing all supporting equipment</li>
                <li>Connecting properly to the electricity grid</li>
                <li>Testing everything to ensure it works safely and correctly</li>
            </ul>

            <h4>4. Regulatory Compliance &amp; Risk Management</h4>
            <p>For a solar system installation, there are many rules and laws — local permitting, environmental regulations, and grid interconnection policies. A good EPC partner like Divvy Solar knows all these rules, manages supply chain disruptions, and plans for regulatory changes to prevent costly delays.</p>

            <h4>5. Robust Operations &amp; Maintenance (O&amp;M) Framework</h4>
            <p>After installation, the major concern is operation and maintenance. Proper maintenance includes proactive monitoring, regular checking, and spotting potential problems before they happen, with timely repairs. The maintenance cost depends on the type of solar system installed.</p>

            <h3>Benefits of Solar EPC</h3>
            <p>EPC solution companies play a crucial role in the solar installation process. The EPC model offers several advantages over traditional project management approaches:</p>
            <ul>
                <li><strong>Single Point of Accountability:</strong> Reduces miscommunication and enhances oversight by having one contractor responsible for all phases.</li>
                <li><strong>Streamlined Communication:</strong> Simplifies project timelines and minimises risks associated with managing multiple contractors.</li>
                <li><strong>Cost Efficiency:</strong> Results in cost savings due to better coordination and reduced delays.</li>
            </ul>

            <h3>Challenges in EPC Solutions for Solar Energy</h3>
            <p>At Divvy Solar, we aim to provide authentic knowledge. Here are some real challenges in the EPC process:</p>
            <ul>
                <li>Complexity of project coordination</li>
                <li>Logistics disruptions such as material shortages and transportation delays</li>
                <li>Lengthy regulatory processes and approval delays</li>
                <li>Harsh climate and environmental factors</li>
                <li>Budget limitations due to unforeseen cost escalations</li>
                <li>Shortage of skilled labour</li>
            </ul>

            <h3>Why Choose an Experienced EPC Partner?</h3>
            <p>Whenever you go for a solar system installation, your concern is which solar company is trustworthy. The Indian solar market has become very competitive, and you may notice price variations. Cheap installations can result in low-quality systems that reduce efficiency. A company like Divvy Solar — an experienced EPC partner — ensures efficiency and helps to build solar power projects smoothly from start to finish.</p>

            <h3>Conclusion</h3>
            <p>In short, you need to be aware of EPC solutions before installing solar. A successful solar system requires precision design, strategic procurement of quality components, and seamless construction. Regulatory compliance, risk management, and a robust O&amp;M framework are also essential. At Divvy Solar, we provide efficient solar system installation for your home or business while contributing to a cleaner energy future.</p>
            <p><strong>Are you planning to invest in solar energy? Contact Divvy Solar today for a tailored EPC solution that meets your energy needs!</strong></p>
        `
    }
};

async function getBlog(slug) {
    try {
        await connectToDatabase();
        const blogData = await Blog.findOne({ slug, published: true }).lean();
        if (blogData) {
            const blog = JSON.parse(JSON.stringify(blogData));
            
            // We removed the forced fallback override so your Admin Panel edits work!
            // Fallback content is now only used if the blog doesn't exist in DB at all.
            
            return blog;
        }
    } catch (error) {
        console.error('Error fetching blog from DB:', error);
    }

    // Fallback for articles not yet in DB
    if (fallbackBlogs[slug]) {
        return { ...fallbackBlogs[slug], slug };
    }

    return null;
}

export async function generateStaticParams() {
    try {
        await connectToDatabase();
        const blogs = await Blog.find({ published: true }).select('slug').lean();
        const fallbackSlugs = Object.keys(fallbackBlogs).map(slug => ({ slug }));
        const dbSlugs = blogs.map(blog => ({ slug: blog.slug }));
        return [...fallbackSlugs, ...dbSlugs];
    } catch (error) {
        console.error('Error generating static params:', error);
        return Object.keys(fallbackBlogs).map(slug => ({ slug }));
    }
}

export async function generateMetadata({ params }) {
    const blog = await getBlog(params.slug);
    if (!blog) {
        return { title: 'Not Found' };
    }
    return {
        title: blog.title,
        description: blog.excerpt || 'Read this article from Divvy Solar',
        openGraph: {
            title: blog.title,
            description: blog.excerpt || 'Read this article from Divvy Solar',
            images: [{ url: blog.image || 'https://images.unsplash.com/photo-1509391366360-2e959784a276' }],
        },
    };
}

export default async function SingleBlogPage({ params }) {
    const blog = await getBlog(params.slug);

    if (!blog) {
        notFound();
    }

    return (
        <article className="bg-white min-h-screen pb-24">
            <BlogHero
                title={blog.title}
                date={blog.createdAt}
                author={blog.author}
                image={blog.image}
            />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">

                {/* Dark & Attractive Professional Divider */}
                <div className="flex items-center justify-center gap-4 mb-10">
                    <div className="w-24 h-[2px] bg-slate-800 rounded-full"></div>
                    <div className="w-3 h-3 bg-accent rotate-45 shadow-[0_0_10px_rgba(254,203,0,0.5)]"></div>
                    <div className="w-24 h-[2px] bg-slate-800 rounded-full"></div>
                </div>

                <div
                    className="prose prose-lg mx-auto max-w-none 
          prose-headings:font-medium prose-headings:tracking-tight
          prose-p:text-gray-600 prose-p:leading-[1.9] prose-p:text-lg prose-p:font-normal
          prose-strong:text-black prose-strong:font-semibold
          prose-img:rounded-2xl prose-img:shadow-2xl
          prose-li:text-gray-600 prose-li:leading-relaxed prose-li:font-normal
          prose-h2:text-black prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:font-bold
          prose-h3:text-slate-700 prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:font-semibold"
                    dangerouslySetInnerHTML={{ __html: blog.content || '<p>Content missing.</p>' }}
                />

                {/* Footer */}
                <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-center">
                    <p className="text-[11px] font-bold uppercase tracking-[3px] text-gray-300 italic">
                        The Future is Solar &bull; 2025 Edition
                    </p>
                </div>

            </div>
        </article>
    );
}
