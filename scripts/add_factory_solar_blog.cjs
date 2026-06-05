/**
 * Script to add the second new blog post to MongoDB.
 * Run with: node scripts/add_factory_solar_blog.cjs
 */

const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://developer_db_user:DivvySolar2026@ac-afxaprq-shard-00-00.vbju23x.mongodb.net:27017,ac-afxaprq-shard-00-01.vbju23x.mongodb.net:27017,ac-afxaprq-shard-00-02.vbju23x.mongodb.net:27017/divvysolar?ssl=true&replicaSet=atlas-uordce-shard-0&authSource=admin&appName=Cluster0';

const blog = {
    slug: 'is-solar-worth-it-for-factory-business-2026',
    title: 'Is Solar Worth It for Your Factory or Business in 2026? Here Is the Honest Answer',
    author: 'Divvy Solar Expert',
    image: '/uti1_main.jpeg',
    excerpt: 'Every factory owner in Punjab and Haryana knows the feeling. You open your monthly electricity bill, see a number that has gone up again, and quietly absorb it as a cost of doing business. Here is the honest ROI breakdown for industrial solar in 2026.',
    content: `<p>Every factory owner in Punjab and Haryana knows the feeling. You open your monthly electricity bill, see a number that has gone up again, and quietly absorb it as a cost of doing business. Textile units, manufacturing plants, metal processing facilities, agro industries — the electricity bill is often the second or third largest operating expense after raw material and labour.</p>

<p>What most business owners have not fully calculated is just how dramatically solar can change that number.</p>

<p>Let us be direct about it.</p>

<h3>The Electricity Cost Problem Is Only Getting Worse</h3>

<p>Industrial electricity tariffs in Haryana and Punjab have seen consistent increases over the past decade. State DISCOMs are under financial pressure, and commercial and industrial consumers tend to bear the larger rate hikes because residential subsidies get protected politically.</p>

<p>A manufacturing unit consuming 50,000 units per month at ₹8–9 per unit is paying ₹4–4.5 lakh every month just on electricity. That is ₹50+ lakh a year — before any further tariff revision.</p>

<p>Now consider this: the solar energy your rooftop generates costs you roughly ₹2–3 per unit over the life of the system. That gap — between what you pay the grid and what solar costs you — is your return on investment.</p>

<h3>What Does the ROI Actually Look Like?</h3>

<p>Here is a straightforward example for a manufacturing unit in Haryana:</p>

<ul>
<li>Monthly electricity consumption: 60,000 units</li>
<li>Current tariff: ₹8.50 per unit</li>
<li>Monthly electricity bill: ₹5.1 lakh</li>
<li>Solar system installed: 400 kW rooftop system</li>
<li>Monthly solar generation (approx.): 48,000–52,000 units</li>
<li>Estimated monthly savings: ₹4–4.4 lakh</li>
<li>System cost: ₹1.6–1.8 crore</li>
<li>Simple payback period: 3.5 to 4 years</li>
</ul>

<p>After the payback period, you are generating power at near-zero cost for the next 20+ years. The panels come with a 25-year performance warranty. The inverters typically carry a 5–10 year warranty with extension options.</p>

<p>For businesses that operate primarily during daytime hours — which includes most industrial and commercial operations — the alignment between solar generation and power consumption is near perfect. You are not generating electricity while you sleep; you are generating it exactly when your machines are running.</p>

<h3>The Tax Benefit Most Businesses Are Not Using</h3>

<p>This one is genuinely underutilised.</p>

<p>Under the Indian Income Tax Act, commercial and industrial solar installations qualify for accelerated depreciation of up to 40% in the first year. This means a ₹1.5 crore solar installation can give you a depreciation benefit of up to ₹60 lakh in year one alone — directly reducing your taxable income.</p>

<p>For profitable businesses in higher tax brackets, this benefit alone can reduce the effective cost of the solar system by 20–25%, dramatically improving the actual payback period.</p>

<p>Speak to your CA about this before you make the decision — the numbers often look even better once accelerated depreciation is factored in.</p>

<h3>What About Cloudy Days and Power Cuts?</h3>

<p>Fair question. Two clarifications:</p>

<p><strong>On cloudy days:</strong> Solar panels do not stop working when it is overcast. They generate at reduced capacity — typically 20–40% of peak output. North India averages 250–300 sunny days a year, and even the monsoon months contribute meaningful generation.</p>

<p><strong>On power cuts:</strong> A standard on-grid solar system shuts down automatically during a grid outage. This is a safety requirement to protect linemen working on the grid. If uninterrupted power is critical to your operations, a hybrid system with battery backup is the right configuration — it costs more upfront but ensures your critical loads never go down.</p>

<p>For most industrial users, an on-grid system is sufficient because power cuts tend to be short and manageable, and the cost savings of going on-grid versus hybrid are significant.</p>

<h3>The Financing Question</h3>

<p>You do not need to invest the full capital upfront. Several NBFC financing options are available specifically for commercial and industrial solar installations, with loan tenures of 5–7 years. In many cases, the monthly EMI is lower than the monthly electricity savings from day one — meaning the system pays for itself from the first month of operation.</p>

<p>This is not a hypothetical. It is the structure Divvy Solar routinely helps clients set up through its NBFC financing partnerships.</p>

<h3>One Thing That Makes or Breaks the Investment</h3>

<p>The quality of execution.</p>

<p>A 400 kW system that is poorly designed — wrong panel layout, suboptimal inverter sizing, inadequate earthing, no monitoring — will not deliver the returns modelled above. It will deliver something significantly lower, and you will spend years trying to figure out why.</p>

<p>The difference between a 90% efficient system and a 75% efficient system on a 400 kW installation is roughly ₹30–40 lakh in lost revenue over ten years.</p>

<p>This is why the choice of EPC partner matters at least as much as the choice of panel brand.</p>

<h3>Why Choose Divvy Solar?</h3>

<p>Since 2018, Divvy Solar has executed solar projects across textile units, manufacturing facilities, metal processing plants, agro industries, and commercial buildings across Punjab, Haryana, and Delhi NCR. With over 1,000 completed projects and dedicated service teams in Hisar, Gurgaon, Mohali, and Ludhiana, we handle the full project lifecycle — from detailed site assessment and custom system design to commissioning, government approvals, and 24/7 remote monitoring.</p>`,
    createdAt: new Date('2025-06-01'),
    updatedAt: new Date(),
    published: true
};

async function main() {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected!');

    const collection = mongoose.connection.collection('blogs');

    const existing = await collection.findOne({ slug: blog.slug });
    if (existing) {
        console.log('Blog already exists. Updating...');
        await collection.updateOne({ slug: blog.slug }, { $set: blog });
        console.log('✅ Blog updated successfully!');
    } else {
        await collection.insertOne(blog);
        console.log('✅ Blog inserted successfully!');
    }

    console.log(`\n📖 Blog URL: https://divvysolar.in/blogs/${blog.slug}`);
    await mongoose.connection.close();
    process.exit(0);
}

main().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
