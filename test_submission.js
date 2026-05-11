const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSubmission() {
  console.log("Testing Supabase connection and insertion...");

  const { error } = await supabase
    .from('intake_submissions')
    .insert([
      {
        name: "Test User (Automated)",
        phone: "555-0100",
        assistance_type: "Housing Assistance",
        description: "This is an automated test submission to verify database connectivity."
      }
    ]);

  if (error) {
    console.error("❌ Insertion failed!");
    console.error(error);
  } else {
    console.log("✅ Insertion successful!");
    // We expect data to be null or empty if RLS blocks SELECT, but no error means the INSERT worked!
  }
}

testSubmission();
