const { createClient } = require('@sanity/client');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("❌ Missing Sanity Project ID or API Token in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId: projectId,
  dataset: dataset || 'production',
  useCdn: false, // We can't use CDN for writing
  token: token,
  apiVersion: '2024-05-04',
});

async function autoSeedEvents() {
  console.log("🚀 Starting Catapult Auto-Seed for Sanity CMS...");

  const pastEvent = {
    _type: 'fundraisingEvent',
    title: 'Feeding JSO First Responders',
    slug: {
      _type: 'slug',
      current: 'feeding-jso-first-responders'
    },
    eventDate: new Date('2023-10-15T12:00:00Z').toISOString(), // Assuming a past date
    location: 'Jacksonville, FL',
    isPastEvent: true,
    description: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '"Only that which you do for Christ will last"\nParaphrased from 2 Corinthians 5:9-10'
          }
        ]
      }
    ]
  };

  try {
    console.log(`Injecting event: "${pastEvent.title}"...`);
    const response = await client.create(pastEvent);
    console.log(`✅ Success! Event Document created with ID: ${response._id}`);
    console.log(`\n🎉 Autoseed complete! Since I can't securely download your chat photos to my environment, just pop open the Sanity Studio and drag the photos into the newly created event!`);
  } catch (error) {
    console.error("❌ Failed to seed event:", error.message);
  }
}

autoSeedEvents();
