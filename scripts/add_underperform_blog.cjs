/**
 * Script to add the new blog post to MongoDB.
 * Run with: node scripts/add_underperform_blog.cjs
 */

const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://developer_db_user:DivvySolar2026@ac-afxaprq-shard-00-00.vbju23x.mongodb.net:27017,ac-afxaprq-shard-00-01.vbju23x.mongodb.net:27017,ac-afxaprq-shard-00-02.vbju23x.mongodb.net:27017/divvysolar?ssl=true&replicaSet=atlas-uordce-shard-0&authSource=admin&appName=Cluster0';

const blog = {
    slug: 'why-most-rooftop-solar-systems-in-india-underperform',
    title: 'Why Most Rooftop Solar Systems in India Underperform — And How to Avoid It',
    author: 'Divvy Solar Expert',
    image: '/utility_hero_4k.png',
    excerpt: 'You got solar installed. You were told to expect 80% savings on your electricity bill. Three months in, the bill has barely moved. This is one of the most common frustrations we hear from homeowners and business owners across Punjab, Haryana, and Delhi NCR.',
    content: `<p>You got solar installed. You were told to expect 80% savings on your electricity bill. Three months in, the bill has barely moved.</p>

<p>Sound familiar?</p>

<p>This is one of the most common frustrations we hear from homeowners and business owners across Punjab, Haryana, and Delhi NCR. The solar industry in India has grown at a breakneck pace — and unfortunately, so has the number of poorly installed systems. If your rooftop solar system is not delivering the savings you were promised, the problem is almost never the technology. It is almost always the process behind it.</p>

<p>Here is what actually goes wrong — and how to make sure it does not happen to you.</p>

<h3>1. The Site Survey Was Either Skipped or Done Poorly</h3>

<p>A proper site survey is not just someone walking up to your roof and counting available space. It means a trained engineer analysing your roof orientation, measuring shading from trees, water tanks, and neighbouring buildings across different times of day, assessing your roof structure, and studying your actual electricity consumption patterns.</p>

<p>When this step is rushed — which it often is when a company is focused on closing the deal quickly — the system gets designed on assumptions instead of facts. A panel installed in the wrong orientation or under partial shade can lose 20–40% of its potential output before it even starts generating.</p>

<p>Ask any installer: when did you last see a poorly designed system blamed on the design? It always gets blamed on "bad weather" or "cloudy season."</p>

<h3>2. The System Was Sized for Commission, Not for Your Consumption</h3>

<p>Bigger system, bigger sale. That is the incentive for many solar vendors.</p>

<p>An oversized system sounds appealing — more panels means more generation, right? But if your actual consumption does not match the system output, and your state's net metering policy limits export credits, you end up with expensive panels generating electricity that is essentially wasted.</p>

<p>The right system size is calculated from your average monthly units consumed, your load profile across the day, and your available roof area. Nothing else. A 5 kW system that perfectly matches your load will always outperform a 10 kW system that was sold to you on a commission.</p>

<h3>3. Components Were Cheap but the Quote Looked Good</h3>

<p>The solar market in India has a serious problem with component quality. There are dozens of low-cost panel manufacturers and off-brand inverters flooding the market, and many installers use them to offer the lowest price and win the deal.</p>

<p>The issue is you will not see the quality gap on day one. You will see it in year three, when panel degradation is running at 2-3% annually instead of 0.5%, or when the inverter needs replacement after four years instead of lasting ten.</p>

<p>Tier-1 solar panels from manufacturers like Vikram Solar and inverters from brands like Sungrow are not more expensive for no reason. They come with verified performance data, international certifications, and after-sales support. When you are making an investment that needs to generate returns over 20+ years, the component quality is not a place to save money.</p>

<h3>4. Nobody Is Monitoring the System</h3>

<p>This one surprises a lot of people. Most solar systems, once installed, are essentially left to run on their own. There is no active monitoring, no alerts, no periodic checks.</p>

<p>Here is the reality: inverters trip. String connections loosen over time. A panel can get partially shaded by a new structure nearby. Bird droppings accumulate. Each of these issues individually can reduce output by 10–15%, and together they can quietly drag your system performance down to 50% of its rated capacity — while your electricity bills slowly start climbing back up.</p>

<p>24/7 remote monitoring with real-time alerts for performance drops is not a luxury feature. It is what separates a system that delivers returns for 25 years from one that disappoints you after the first year.</p>

<h3>5. You Picked the Cheapest Quote Without Checking What Was Behind It</h3>

<p>We understand — rooftop solar is a significant investment. Getting the best price makes sense. But there is a difference between a competitive price and a price that is only possible because corners are being cut somewhere.</p>

<p>The questions to ask any installer before signing:</p>

<ul>
<li>Which panel brand and model? What is the performance warranty?</li>
<li>Which inverter? What is the inverter warranty?</li>
<li>Will you handle DISCOM approvals and net metering paperwork?</li>
<li>Do you provide remote monitoring after installation?</li>
<li>How many projects have you completed, and can I speak to any of your clients?</li>
</ul>

<p>A company that cannot answer these questions clearly is a company that is betting you will not ask them.</p>

<h3>Why Choose Divvy Solar?</h3>

<p>Since 2018, Divvy Solar has completed over 1,000 solar installations across residential, commercial, and industrial projects in North India. Every project starts with a thorough site survey, a system designed around your actual load, components sourced from trusted brands, and a commissioning process that includes setting up 24/7 remote monitoring before we leave the site.</p>

<p>We also handle all government approvals, net metering applications, and NBFC financing support — so the process is genuinely turnkey for our clients.</p>

<p>If your existing system is underperforming, or if you are considering solar for the first time and want to do it right, we are happy to start with a free site assessment.</p>`,
    createdAt: new Date('2025-05-29'),
    updatedAt: new Date(),
    published: true
};

async function main() {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected!');

    const collection = mongoose.connection.collection('blogs');

    // Check if blog already exists
    const existing = await collection.findOne({ slug: blog.slug });
    if (existing) {
        console.log('Blog already exists. Updating...');
        await collection.updateOne(
            { slug: blog.slug },
            { $set: blog }
        );
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
