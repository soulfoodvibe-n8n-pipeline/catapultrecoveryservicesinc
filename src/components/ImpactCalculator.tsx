"use client";

import { useState } from 'react';

export default function ImpactCalculator() {
  const [amount, setAmount] = useState<number>(50);

  const getImpactMessage = (val: number) => {
    if (val < 100) return "Provides a week of warm meals and basic hygiene supplies for one displaced individual.";
    if (val < 500) return "Funds one month of critical substance abuse counseling and recovery support group access.";
    if (val < 1000) return "Sponsors a complete mental health evaluation and personalized recovery plan.";
    return "Catalyzes a full transitional housing sponsorship, launching them into a state of productivity and well-being.";
  };

  return (
    <section id="impact" style={{ padding: '100px 0', background: 'var(--surface)', borderTop: '1px solid var(--surface-border)', borderBottom: '1px solid var(--surface-border)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>The <span className="ascension-text">Impact Engine</span></h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--foreground-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Slide to see how your contribution directly catapults someone from hardship to a path of recovery.
          </p>
        </div>

        <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto', padding: '48px', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--primary)', marginBottom: '24px', textShadow: '0 0 20px var(--primary-glow)' }}>
            ${amount}
          </div>
          
          <input 
            type="range" 
            min="10" 
            max="1500" 
            step="10" 
            value={amount} 
            onChange={(e) => setAmount(Number(e.target.value))}
            style={{ width: '100%', marginBottom: '40px', accentColor: 'var(--primary)', cursor: 'pointer' }}
          />

          <div style={{ minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', marginBottom: '32px' }}>
            <p style={{ fontSize: '1.25rem', lineHeight: 1.6, fontWeight: 500 }}>
              {getImpactMessage(amount)}
            </p>
          </div>

          <button className="btn-primary" style={{ padding: '16px 48px', fontSize: '1.2rem', width: '100%', maxWidth: '300px' }}>
            Donate ${amount} Now
          </button>
        </div>
      </div>
    </section>
  );
}
