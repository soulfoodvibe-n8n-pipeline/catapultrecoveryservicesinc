'use server';

import { GoogleGenAI } from '@google/genai';
import { supabase } from '../../lib/supabase';
import { client } from '../../../sanity/lib/client';

export async function fetchBlueprintData() {
  try {
    const officers = await client.fetch(`*[_type == "officer"] | order(order asc) { name, role }`);
    const events = await client.fetch(`*[_type == "fundraisingEvent" && isPastEvent != true] | order(eventDate asc) { title, eventDate, description }`);
    const sponsors = await client.fetch(`*[_type == "sponsor"] { name, tier }`);
    
    return {
      success: true,
      data: {
        leadership: officers,
        upcomingEvents: events,
        sponsors: sponsors
      }
    };
  } catch (error: any) {
    console.error("Sanity Fetch Error:", error);
    throw new Error("Failed to fetch blueprint data from CMS.");
  }
}

export async function generateCampaign(objective: string, context: string, blueprint?: any) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const prompt = `
You are an elite Marketing Director for Catapult Recovery Services, a non-profit focusing on transitional housing, substance recovery, mental health, and job readiness in Jacksonville.

The campaign objective is: ${objective}
The specific goal/context from the user is: ${context}

${blueprint ? `
LIVE ORGANIZATIONAL BLUEPRINT (USE THIS DATA FACTUALLY):
Leadership Team: ${JSON.stringify(blueprint.leadership, null, 2)}
Upcoming Events: ${JSON.stringify(blueprint.upcomingEvents, null, 2)}
Corporate Sponsors: ${JSON.stringify(blueprint.sponsors, null, 2)}

Instruction: Seamlessly weave the names of staff, upcoming events, or sponsors into the ad copy ONLY IF it naturally fits the psychological angle (e.g., mention an event in "The Urgent Crisis", or a staff member in "The Success Story"). Do not force it if it doesn't make sense.
` : ''}

Generate exactly 8 different Facebook Ad copies. Each ad must correspond exactly to one of these 8 psychological skills/angles:
1. The Direct Impact
2. The Urgent Crisis
3. The Success Story
4. Community Pride
5. The Root Cause
6. Behind the Scenes
7. Corporate Sponsor
8. Volunteer Pipeline

Return the response strictly as a JSON array of 8 objects. Each object must have exactly these keys:
"skill" (the name of the skill, e.g. "The Direct Impact"),
"headline" (a punchy Facebook ad headline, max 60 chars),
"primaryText" (the main body copy for the Facebook ad, including emojis and a strong call to action).
`;

  try {
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text || "[]";
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw new Error("Failed to generate campaign. Check your API key or try again.");
  }
}

export async function saveCampaign(objective: string, context: string, variants: any[]) {
  try {
    // 1. Insert Campaign
    const { data: campaign, error: campaignError } = await supabase
      .from('ad_campaigns')
      .insert([
        { objective, context, status: 'Awaiting_Meta_Connection' }
      ])
      .select()
      .single();

    if (campaignError) throw campaignError;

    // 2. Insert Variants
    const variantsToInsert = variants.map((v) => ({
      campaign_id: campaign.id,
      skill: v.skill,
      headline: v.headline,
      primary_text: v.primaryText,
      image_url: v.imageUrl || null,
      status: v.status || 'Pending_Review'
    }));

    const { error: variantsError } = await supabase
      .from('ad_variants')
      .insert(variantsToInsert);

    if (variantsError) throw variantsError;

    return { success: true, campaignId: campaign.id };
  } catch (error: any) {
    console.error("Database Save Error:", error);
    throw new Error(error.message || "Failed to save campaign to the database.");
  }
}
