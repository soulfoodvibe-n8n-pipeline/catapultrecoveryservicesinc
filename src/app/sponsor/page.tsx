import { client } from '../../../sanity/lib/client';
import { urlForImage } from '../../../sanity/lib/image';

export const revalidate = 60;

async function getSponsors() {
  const query = `*[_type == "sponsor"] | order(tier asc) {
    _id,
    name,
    tier,
    logo,
    website
  }`;
  return client.fetch(query);
}

export default async function SponsorPage() {
  const sponsors = await getSponsors();

  return (
    <main style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <div className="container">
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '24px' }}>
            Fund the <span className="ascension-text">Mission</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--foreground-muted)', lineHeight: 1.6, marginBottom: '32px' }}>
            It takes a village to catapult individuals from hardship into a stable, lasting recovery. 
            Your generous support directly funds transitional housing, substance recovery programs, and job readiness training.
          </p>
        </div>

        {/* Action Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '100px' }}>
          
          {/* Stripe / Main Donation Stub */}
          <div className="glass-panel" style={{ padding: '48px', textAlign: 'center', borderTop: '2px solid var(--primary)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '24px' }}>💳</div>
            <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>One-Time Donation</h2>
            <p style={{ color: 'var(--foreground-muted)', marginBottom: '32px' }}>
              Make a secure, instant donation via Stripe to support our daily operations.
            </p>
            {/* STUB: This will be replaced by the actual Stripe Checkout link */}
            <button className="btn-primary" style={{ width: '100%', marginBottom: '16px' }}>
              Donate with Stripe
            </button>
            <p style={{ fontSize: '0.8rem', color: 'var(--foreground-muted)' }}>*Stripe Integration Pending Client Info</p>
          </div>

          {/* PayPal / Alternate Stub */}
          <div className="glass-panel" style={{ padding: '48px', textAlign: 'center', borderTop: '2px solid #003087' }}>
            <div style={{ fontSize: '3rem', marginBottom: '24px' }}>🅿️</div>
            <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>PayPal / CashApp</h2>
            <p style={{ color: 'var(--foreground-muted)', marginBottom: '32px' }}>
              Prefer to use your existing PayPal or CashApp balance? We accept all major platforms.
            </p>
            {/* STUB: This will be replaced by the actual PayPal/CashApp links */}
            <button className="btn-primary" style={{ width: '100%', backgroundColor: 'transparent', border: '1px solid #003087', color: '#003087', boxShadow: 'none', marginBottom: '16px' }}>
              Donate with PayPal
            </button>
            <p style={{ fontSize: '0.8rem', color: 'var(--foreground-muted)' }}>*PayPal Integration Pending Client Info</p>
          </div>

        </div>

        {/* Corporate Sponsors Section (Driven by Sanity) */}
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Our Corporate Sponsors</h2>
          <p style={{ color: 'var(--foreground-muted)', marginBottom: '48px' }}>
            We are deeply grateful for the local businesses that make our mission possible.
          </p>

          {sponsors.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', alignItems: 'center' }}>
              {sponsors.map((sponsor: any) => (
                <a key={sponsor._id} href={sponsor.website || '#'} target="_blank" rel="noreferrer" className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.2s', textDecoration: 'none', color: 'inherit' }}>
                  {sponsor.logo ? (
                    <img 
                      src={urlForImage(sponsor.logo)?.url()} 
                      alt={sponsor.name} 
                      style={{ maxWidth: '150px', maxHeight: '100px', objectFit: 'contain', marginBottom: '16px' }}
                    />
                  ) : (
                    <div style={{ width: '100px', height: '100px', backgroundColor: 'var(--surface-border)', borderRadius: '50%', marginBottom: '16px' }} />
                  )}
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{sponsor.name}</h3>
                  <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase' }}>
                    {sponsor.tier}
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <div className="glass-panel" style={{ padding: '48px', maxWidth: '600px', margin: '0 auto' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Become a Founding Sponsor</h3>
              <p style={{ color: 'var(--foreground-muted)' }}>
                We are currently seeking corporate partners to help us launch our next major initiative. 
                Contact us today to learn about our sponsorship tiers.
              </p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
