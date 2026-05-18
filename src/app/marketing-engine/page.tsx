'use client';
import React, { useState } from 'react';
import { generateCampaign, saveCampaign, fetchBlueprintData } from './actions';

export default function MarketingEngine() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedObjective, setSelectedObjective] = useState('Drive Financial Donations');
  const [context, setContext] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [blueprint, setBlueprint] = useState<any>(null);
  const [generatedAds, setGeneratedAds] = useState<any[]>([]);

  const objectives = [
    'Drive Financial Donations',
    'Acquire Corporate Sponsors',
    'Recruit Elite Volunteers',
    'General Brand Awareness'
  ];

  const skills = [
    { icon: '🎯', name: 'The Direct Impact', desc: 'Focuses on ROI & clear outcome metrics.' },
    { icon: '🚨', name: 'The Urgent Crisis', desc: 'Drives action via the Jacksonville fentanyl/homeless crisis.' },
    { icon: '🌅', name: 'The Success Story', desc: 'Narrative-driven story of individual triumph.' },
    { icon: '🤝', name: 'Community Pride', desc: 'Taps into "Jacksonville takes care of its own" civic duty.' },
    { icon: '🧠', name: 'The Root Cause', desc: 'Focuses on holistic healing and breaking generational trauma.' },
    { icon: '👁️', name: 'Behind the Scenes', desc: 'Raw, unfiltered look at the grueling reality of recovery work.' },
    { icon: '🏢', name: 'Corporate Sponsor', desc: 'B2B angle focusing on CSR and tax-deductible benefits.' },
    { icon: '⏱️', name: 'Volunteer Pipeline', desc: '"Time is Money" angle asking for 2 hours to join the movement.' },
  ];

  const campaignIdeas = [
    "We need to raise $5,000 this month to secure 5 new beds for our Transitional Housing facility before the winter season begins.",
    "We are looking for local business leaders to sponsor our upcoming 'Job Readiness' workshop, providing mentorship and hiring pipelines for our graduates.",
    "We need 20 volunteers this Saturday for our community outreach event to distribute meals and hygiene kits to the homeless population in downtown Jacksonville.",
    "We are launching a new mental health counseling initiative and need to raise $10,000 to fund a full-time trauma therapist for the next 6 months.",
    "We want to highlight our recent success stories to drive general brand awareness and build a monthly recurring donor base of 'Catapult Champions'."
  ];

  const handleSyncBlueprint = async () => {
    setIsSyncing(true);
    try {
      const result = await fetchBlueprintData();
      if (result.success) {
        setBlueprint(result.data);
      }
    } catch (error: any) {
      alert(error.message || 'Error fetching blueprint.');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleGenerate = async () => {
    if (!context) return alert('Please enter a campaign goal/context.');
    setIsGenerating(true);
    setSaveSuccess(false);
    try {
      const results = await generateCampaign(selectedObjective, context, blueprint);
      // Initialize state for each ad
      const adsWithState = results.map((ad: any) => ({
        ...ad,
        status: 'Pending_Review',
        imageUrl: ''
      }));
      setGeneratedAds(adsWithState);
    } catch (error: any) {
      alert(error.message || 'Error generating campaign.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUpdateAd = (index: number, field: string, value: any) => {
    const updatedAds = [...generatedAds];
    updatedAds[index][field] = value;
    setGeneratedAds(updatedAds);
  };

  const handleSaveCampaign = async () => {
    if (generatedAds.length === 0) return;
    setIsSaving(true);
    try {
      await saveCampaign(selectedObjective, context, generatedAds);
      setSaveSuccess(true);
      alert('Campaign and variants successfully saved to the queue!');
    } catch (error: any) {
      alert(error.message || 'Error saving campaign.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '100px' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(255, 69, 0, 0.1)', border: '1px solid var(--primary-glow)', borderRadius: '30px', color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '16px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary-glow)' }}></span>
            AI SOCIAL DIRECTOR
          </div>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '16px' }}>Marketing <span className="ascension-text">Command Center</span></h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--foreground-muted)', maxWidth: '700px', margin: '0 auto' }}>
            The autonomous engine that generates, tests, and optimizes 8 distinct psychological marketing angles to drive donations and community growth.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px' }}>
          
          {/* Main Console */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Blueprint Ingestion Panel */}
            <div className="glass-panel" style={{ padding: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--surface-border)', paddingBottom: '16px' }}>
                <h2 style={{ fontSize: '1.5rem', margin: 0 }}>1. Business Blueprint Ingestion</h2>
                <button 
                  onClick={handleSyncBlueprint}
                  disabled={isSyncing}
                  style={{ padding: '8px 16px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '4px', fontSize: '0.9rem', cursor: isSyncing ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  {isSyncing ? '🔄 SYNCING...' : '📡 SYNC WITH CMS'}
                </button>
              </div>

              {!blueprint ? (
                <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--foreground-muted)' }}>
                  <p>No CMS data ingested yet. Sync with your Sanity CMS to pull in Leadership, Events, and Sponsors to feed into the AI.</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', textAlign: 'center' }}>
                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--surface-border)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>👥</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{blueprint.leadership?.length || 0}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--foreground-muted)' }}>Leaders</div>
                  </div>
                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--surface-border)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📅</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{blueprint.upcomingEvents?.length || 0}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--foreground-muted)' }}>Active Events</div>
                  </div>
                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--surface-border)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🏢</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{blueprint.sponsors?.length || 0}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--foreground-muted)' }}>Sponsors</div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Campaign Input Form */}
            <div className="glass-panel" style={{ padding: '40px' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', borderBottom: '1px solid var(--surface-border)', paddingBottom: '16px' }}>2. Define Campaign Payload</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ position: 'relative' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--foreground-muted)', fontSize: '0.9rem', fontWeight: 500 }}>CAMPAIGN OBJECTIVE</label>
                  
                  {/* Custom Dropdown */}
                  <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    style={{ width: '100%', padding: '16px', background: 'var(--surface)', border: `1px solid ${isDropdownOpen ? 'var(--primary)' : 'var(--surface-border)'}`, borderRadius: '8px', color: 'white', fontSize: '1rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'border-color 0.2s' }}
                  >
                    {selectedObjective}
                    <span style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
                  </div>
                  
                  {isDropdownOpen && (
                    <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '8px', background: '#0a0a0a', border: '1px solid var(--surface-border)', borderRadius: '8px', overflow: 'hidden', zIndex: 10, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                      {objectives.map((obj) => (
                        <div 
                          key={obj}
                          onClick={() => {
                            setSelectedObjective(obj);
                            setIsDropdownOpen(false);
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                          style={{ padding: '16px', cursor: 'pointer', transition: 'background 0.2s', color: selectedObjective === obj ? 'var(--primary)' : 'white' }}
                        >
                          {obj}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label style={{ color: 'var(--foreground-muted)', fontSize: '0.9rem', fontWeight: 500 }}>CAMPAIGN GOAL / CONTEXT</label>
                    <button 
                      onClick={handleSurpriseMe}
                      style={{ background: 'rgba(255, 69, 0, 0.1)', color: 'var(--primary)', border: '1px solid var(--primary-glow)', borderRadius: '20px', padding: '4px 12px', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 69, 0, 0.2)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 69, 0, 0.1)'}
                    >
                      ✨ Need an Idea?
                    </button>
                  </div>
                  <textarea 
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    placeholder="e.g., We need to raise $5,000 this month for our new Transitional Housing facility beds. Focus on the upcoming winter months."
                    style={{ width: '100%', minHeight: '120px', padding: '16px', background: 'var(--surface)', border: '1px solid var(--surface-border)', borderRadius: '8px', color: 'white', fontSize: '1rem', outline: 'none', resize: 'vertical' }}
                  ></textarea>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--foreground-muted)', fontSize: '0.9rem', fontWeight: 500 }}>MEDIA ASSET UPLOAD</label>
                  <div style={{ width: '100%', padding: '40px', border: '2px dashed var(--surface-border)', borderRadius: '8px', textAlign: 'center', cursor: 'pointer', background: 'rgba(255,255,255,0.02)' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '16px' }}>📸</div>
                    <p style={{ color: 'var(--foreground-muted)', marginBottom: '8px' }}>Drag & Drop photos of the facility, staff, or community events.</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>Must be high-resolution (1080x1080 recommended)</p>
                  </div>
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  style={{ width: '100%', padding: '20px', background: isGenerating ? 'var(--surface-border)' : 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.2rem', fontWeight: 600, cursor: isGenerating ? 'not-allowed' : 'pointer', boxShadow: isGenerating ? 'none' : '0 0 20px var(--primary-glow)', marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', transition: 'all 0.3s' }}
                >
                  <span>{isGenerating ? '⏳' : '⚡'}</span> {isGenerating ? 'ANALYZING & GENERATING...' : 'GENERATE CAMPAIGN PIPELINE'}
                </button>
              </div>
            </div>

            {/* Generated Output Preview */}
            <div className="glass-panel" style={{ padding: '40px', opacity: generatedAds.length > 0 ? 1 : 0.5, transition: 'opacity 0.5s' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', borderBottom: '1px solid var(--surface-border)', paddingBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                3. AI Generation Review
                <span style={{ fontSize: '0.8rem', padding: '4px 12px', background: generatedAds.length > 0 ? 'var(--primary)' : 'var(--surface-border)', borderRadius: '20px', color: 'white' }}>
                  {generatedAds.length > 0 ? '8 AD VARIANTS READY' : 'AWAITING PAYLOAD'}
                </span>
              </h2>
              
              {generatedAds.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '16px', animation: isGenerating ? 'pulse 1s infinite' : 'pulse 2s infinite' }}>🤖</div>
                  <p style={{ color: 'var(--foreground-muted)' }}>{isGenerating ? 'The AI is currently crafting 8 psychological ad angles...' : 'Fill out the payload above to generate 8 optimized ad variants.'}</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '32px' }}>
                  {generatedAds.map((ad, idx) => (
                    <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${ad.status === 'Approved' ? 'var(--primary)' : ad.status === 'Rejected' ? '#ff3333' : 'var(--surface-border)'}`, borderRadius: '8px', padding: '24px', transition: 'border-color 0.3s' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{ad.skill}</span>
                        
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            onClick={() => handleUpdateAd(idx, 'status', 'Approved')}
                            style={{ padding: '6px 12px', background: ad.status === 'Approved' ? 'var(--primary)' : 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer' }}
                          >
                            ✓ Approve
                          </button>
                          <button 
                            onClick={() => handleUpdateAd(idx, 'status', 'Rejected')}
                            style={{ padding: '6px 12px', background: ad.status === 'Rejected' ? '#ff3333' : 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer' }}
                          >
                            ✕ Reject
                          </button>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--foreground-muted)', marginBottom: '4px' }}>HEADLINE</label>
                          <input 
                            value={ad.headline}
                            onChange={(e) => handleUpdateAd(idx, 'headline', e.target.value)}
                            style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--surface-border)', borderRadius: '4px', color: 'white', fontSize: '1rem', fontWeight: 600 }}
                          />
                        </div>
                        
                        <div>
                          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--foreground-muted)', marginBottom: '4px' }}>PRIMARY TEXT</label>
                          <textarea 
                            value={ad.primaryText}
                            onChange={(e) => handleUpdateAd(idx, 'primaryText', e.target.value)}
                            style={{ width: '100%', padding: '12px', minHeight: '100px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--surface-border)', borderRadius: '4px', color: 'white', fontSize: '0.95rem', lineHeight: 1.5, resize: 'vertical' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--foreground-muted)', marginBottom: '4px' }}>IMAGE / MEDIA URL</label>
                          <input 
                            value={ad.imageUrl}
                            onChange={(e) => handleUpdateAd(idx, 'imageUrl', e.target.value)}
                            placeholder="https://..."
                            style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--surface-border)', borderRadius: '4px', color: 'white', fontSize: '0.9rem' }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div style={{ marginTop: '16px', padding: '24px', borderTop: '1px solid var(--surface-border)', textAlign: 'center' }}>
                    <button 
                      onClick={handleSaveCampaign}
                      disabled={isSaving || saveSuccess}
                      style={{ padding: '16px 32px', background: saveSuccess ? '#00cc66' : isSaving ? 'var(--surface-border)' : 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 600, cursor: (isSaving || saveSuccess) ? 'not-allowed' : 'pointer', transition: 'all 0.3s' }}
                    >
                      {saveSuccess ? '✓ SAVED TO QUEUE' : isSaving ? '⏳ SAVING...' : '💾 SAVE CAMPAIGN & VARIANTS'}
                    </button>
                    {saveSuccess && (
                      <p style={{ color: '#00cc66', marginTop: '12px', fontSize: '0.9rem' }}>
                        Campaign successfully saved to Supabase database. Awaiting Meta integration.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Sidebar - Active Skills */}
          <div className="glass-panel" style={{ padding: '32px', height: 'fit-content' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '24px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary-glow)' }}></div>
              ACTIVE AI SKILLS
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {skills.map((skill, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '1.5rem', background: 'var(--surface)', padding: '12px', borderRadius: '8px', border: '1px solid var(--surface-border)' }}>
                    {skill.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>{skill.name}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--foreground-muted)', lineHeight: 1.4 }}>{skill.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--surface-border)' }}>
               <h4 style={{ fontSize: '0.9rem', marginBottom: '12px', color: 'var(--foreground-muted)' }}>META API STATUS</h4>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                 <span style={{ color: 'red' }}>●</span> Not Connected
               </div>
               <p style={{ fontSize: '0.8rem', color: 'var(--foreground-muted)', marginTop: '8px', lineHeight: 1.4 }}>
                 Requires Meta Business Manager verification to auto-publish campaigns.
               </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
