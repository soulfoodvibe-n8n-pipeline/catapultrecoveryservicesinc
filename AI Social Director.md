# AI Social Director (Content Diversity Ad Engine) Architecture

The AI Social Director is an autonomous, skill-based marketing engine designed for SaaS platforms and multi-tenant marketplaces. It leverages Meta's Marketing API and Gemini's multimodal capabilities to programmatically generate, launch, and optimize high-conversion ad campaigns.

This document serves as a blueprint for porting this architecture to other projects.

---

## 1. Core Philosophy: The Diversity Approach

Meta's modern advertising algorithm favors **Creative Diversity** over manual targeting. Instead of guessing who the buyer is, the engine feeds Meta 4 to 6 distinct marketing "angles" (Skills). Meta's machine learning then automatically tests these angles, finds the resonant audience for each, and allocates budget to the winners.

**The AI Social Director automates this entire pipeline:**
1. Ingests raw business data (photos, reviews, pricing).
2. Generates distinct ad creatives based on predefined psychological angles ("Skills").
3. Assembles the Campaign, Ad Set, and Ads via the Meta API.
4. Auto-optimizes based on Conversion API (CAPI) feedback.

---

## 2. Meta API Prerequisites

To build this engine, a single foundational hurdle must be cleared: **Meta App Approval**.

1. **Business Verification:** The legal entity behind the SaaS must be verified in Meta Business Manager ([business.facebook.com](https://business.facebook.com)).
2. **Meta Developer App:** Create a "Business" app at [developers.facebook.com](https://developers.facebook.com).
3. **API Permissions Required:**
   - `ads_management` (Create and edit campaigns)
   - `ads_read` (Pull reporting data for dashboards)
   - `pages_manage_posts` (Auto-publish organic content)
   - `read_insights` (Analytics)
4. **App Review:** Meta manually reviews the integration to ensure a legitimate business use-case (in this case, providing marketing automation tools to SaaS tenants).

> [!IMPORTANT]
> A single approval unlocks the entire suite. Once your developer app has these permissions, you can authenticate any tenant (via a standard OAuth flow) and control their ad accounts programmatically.

---

## 3. The Dual-Engine Architecture

The system is split into two distinct engines—one for platform growth, one for tenant revenue.

### Engine A: The Platform Director (Admin Level)
- **Goal:** User acquisition for the main platform (B2C).
- **Targeting:** Broad regional (County, State, Radius) or specific behavioral cohorts.
- **Funding:** Platform marketing budget.
- **Workflow:** Admin selects a "Growth Skill" → AI generates creative → Campaign launches across all Meta placements.

### Engine B: The Tenant Director (B2B User Level)
- **Goal:** Direct conversions for the tenant (e.g., a restaurant, tradesperson, or consultant).
- **Targeting:** Hyper-local radius (3/5/10 miles) anchored to the tenant's geo-coordinates.
- **Funding:** Tenant's linked credit card (via Stripe, often with a SaaS markup).
- **Workflow:** Tenant clicks "Launch Ads" on their dashboard → AI pulls their specific profile data → Generates 6 custom ads → Launches via their connected Facebook Page.

---

## 4. Skill-Based Prompt Engineering

The "Skills" are system prompts that instruct the LLM on *how* to write the ad copy. When a campaign is launched, the AI runs the tenant's data through multiple skills simultaneously.

### Example Tenant Skills (Restaurant Context)
1. 🔥 **The Craving:** Focuses purely on visual appeal and hunger triggers.
2. 👨‍👩‍👧‍👦 **Family Night:** Emphasizes convenience and value for busy parents.
3. 📍 **The Local:** Taps into neighborhood pride ("Support local").
4. 🎬 **Behind the Scenes:** Highlights authenticity, origin story, or raw craftsmanship.
5. 💰 **The Deal:** Lead-generation logic (First-time discount, free side).
6. ⭐ **Social Proof:** Repurposes top 5-star reviews into ad copy.

### Example LLM Pipeline
- **Model 1 (`gemini-3-flash`):** The primary brain. Takes the "Skill" prompt + Tenant Data (JSON) + Image/Video context and generates the core ad copy (Headline, Primary Text, Call to Action).
- **Model 2 (`gemini-3.1-flash-lite`):** The variation engine. Takes the output from Model 1 and quickly spins up 3 different "Hook" variations (e.g., Question Hook, Bold Statement Hook, Story Hook) for A/B testing.

---

## 5. Technical Implementation Flow

### 1. Data Ingestion (The Blueprint)
The system requires a structured "Blueprint" of the business before generation can begin.
```json
{
  "businessName": "Acme Corp",
  "location": "Orlando, FL",
  "topProducts": ["Product A", "Product B"],
  "uniqueSellingPoints": ["24/7 Service", "Family Owned"],
  "recentReviews": ["Best service ever", "Highly recommended"],
  "mediaAssets": ["url1.jpg", "url2.webm"]
}
```

### 2. Campaign Assembly Logic (Node.js / Next.js)
The backend orchestration sequence when "Launch Campaign" is triggered:

1. **AI Generation Phase:** `Promise.all()` sends the Blueprint to Gemini via 6 parallel requests (one for each Skill).
2. **Meta API - Campaign:** Create a `CAMPAIGN` object (Objective: OUTCOME_SALES or OUTCOME_LEADS).
3. **Meta API - Ad Set:** Create an `AD_SET` object attached to the Campaign. Define the daily budget, schedule, and hyper-local geo-targeting. Ensure "Advantage+ Placements" is enabled.
4. **Meta API - Creative:** For each AI-generated output, upload the corresponding media asset and create an `AD_CREATIVE` object.
5. **Meta API - Ad:** Attach the 6 `AD_CREATIVE` objects to the `AD_SET`.
6. **Publish:** Set status to `ACTIVE`.

### 3. The Analytics Loop
- A daily cron job queries the Meta Insights API (`/v19.0/{ad_set_id}/insights`).
- Pulls Spend, Impressions, CTR, and Cost Per Action (CPA).
- Feeds this back to `gemini-3.1-flash-lite` to generate a natural language weekly summary for the tenant: *"The 'Social Proof' angle is driving 60% of your conversions this week at a $4.20 CPA. We recommend shifting more budget there."*

---

## 6. Financial Mechanics (SaaS Revenue)

If integrating this into a SaaS, you do not let the tenant manage their own Meta billing directly. Instead:

1. **The Charge:** The tenant pays the SaaS platform via Stripe (e.g., $100 Ad Budget).
2. **The Margin:** The SaaS platform charges a markup or flat fee (e.g., 20% automation fee).
3. **The Spend:** The SaaS platform's centralized Meta Ad Account runs the ads on behalf of the tenant's Facebook Page, spending $80.
4. **The Net:** The SaaS clears $20 pure profit per campaign automatically, without manual intervention.

---

## 7. Migration Checklist for New Projects

To adapt this to a new industry (e.g., Roofing, Real Estate, E-Commerce):
- [ ] Define the 6 psychological "Skills" specific to that industry.
- [ ] Map the data ingestion points (What data points equal a "Blueprint"?).
- [ ] Define the conversion event (Lead Form completion vs. E-Commerce checkout).
- [ ] Set up the Meta CAPI (Conversions API) pixel on the target landing pages.
