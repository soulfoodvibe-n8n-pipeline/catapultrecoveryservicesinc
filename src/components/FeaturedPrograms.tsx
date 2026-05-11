import Link from 'next/link';

export default function FeaturedPrograms() {
  return (
    <section style={{ padding: '100px 0', background: 'var(--surface)', borderTop: '1px solid var(--surface-border)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>Core <span className="ascension-text">Programs</span></h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--foreground-muted)', maxWidth: '600px' }}>
              We provide the necessary tools and structured environments to catapult individuals from hardship into lasting recovery.
            </p>
          </div>
          <Link href="/programs" className="btn-primary" style={{ padding: '12px 32px', background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', boxShadow: 'none' }}>
            View All Services
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          
          <div className="glass-panel" style={{ padding: '32px', borderTop: '2px solid var(--primary)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🏠</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Transitional Housing</h3>
            <p style={{ color: 'var(--foreground-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
              Safe, supportive living environments for the displaced to build a foundation.
            </p>
            <Link href="/programs" style={{ color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>Learn More &rarr;</Link>
          </div>

          <div className="glass-panel" style={{ padding: '32px', borderTop: '2px solid var(--secondary)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🛤️</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Substance Recovery</h3>
            <p style={{ color: 'var(--foreground-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
              Evidence-based programs and peer support to break the cycle of addiction.
            </p>
            <Link href="/programs" style={{ color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>Learn More &rarr;</Link>
          </div>

          <div className="glass-panel" style={{ padding: '32px', borderTop: '2px solid #10B981' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>💼</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Job Readiness</h3>
            <p style={{ color: 'var(--foreground-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
              Life skills, interview prep, and resume building to create productive members of society.
            </p>
            <Link href="/programs" style={{ color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>Learn More &rarr;</Link>
          </div>

        </div>
      </div>
    </section>
  );
}
