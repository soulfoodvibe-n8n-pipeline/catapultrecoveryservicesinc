import Link from 'next/link';

export default function SubstanceRecoveryPage() {
  return (
    <main style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <div className="container">
        
        {/* Cinematic Header */}
        <div style={{ position: 'relative', padding: '60px', borderRadius: '24px', overflow: 'hidden', marginBottom: '64px', border: '1px solid var(--surface-border)' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(5, 5, 17, 1))', zIndex: -1 }}></div>
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'rgba(59, 130, 246, 0.3)', filter: 'blur(100px)', borderRadius: '50%', zIndex: -2 }}></div>
          
          <div style={{ maxWidth: '800px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🛤️</div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '24px' }}>
              Substance <span style={{ color: '#60A5FA' }}>Recovery</span>
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--foreground-muted)', lineHeight: 1.6, marginBottom: '32px' }}>
              Evidence-based programs designed to break the cycle of addiction. We offer a highly structured roadmap to help individuals get clean and build a sustainable, sober future.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/intake" className="btn-primary" style={{ padding: '12px 32px' }}>Get Help Today</Link>
              <Link href="/#impact" className="btn-primary" style={{ padding: '12px 32px', background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', boxShadow: 'none' }}>Fund This Program</Link>
            </div>
          </div>
        </div>

        {/* Program Details Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
          
          <div style={{ gridColumn: '1 / -1', '@media (min-width: 768px)': { gridColumn: '1 / 2' } } as any}>
            <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>The Core Process</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="glass-panel" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#60A5FA' }}>01. Safe Detox Support</h3>
                <p style={{ color: 'var(--foreground-muted)', lineHeight: 1.6 }}>Partnering with local medical facilities to ensure individuals undergo a safe, monitored detoxification process before entering the program.</p>
              </div>
              <div className="glass-panel" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#60A5FA' }}>02. 12-Step Integration</h3>
                <p style={{ color: 'var(--foreground-muted)', lineHeight: 1.6 }}>Daily integration into proven recovery frameworks, including group therapy, AA/NA meetings, and personal accountability sessions.</p>
              </div>
              <div className="glass-panel" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#60A5FA' }}>03. Relapse Prevention Strategy</h3>
                <p style={{ color: 'var(--foreground-muted)', lineHeight: 1.6 }}>Equipping individuals with the psychological tools and coping mechanisms to identify triggers and maintain long-term sobriety.</p>
              </div>
            </div>
          </div>

          <div style={{ gridColumn: '1 / -1', '@media (min-width: 768px)': { gridColumn: '2 / 3' } } as any}>
            <div className="glass-panel" style={{ padding: '40px', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '32px' }}>Program Impact</h2>
              
              <div style={{ marginBottom: '32px' }}>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: '#60A5FA', marginBottom: '8px' }}>92%</div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Program Retention</h4>
                <p style={{ color: 'var(--foreground-muted)', fontSize: '0.9rem' }}>Of individuals who complete the first 30 days remain engaged in the program for its duration.</p>
              </div>

              <div>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: '#60A5FA', marginBottom: '8px' }}>3x</div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Lower Relapse Rate</h4>
                <p style={{ color: 'var(--foreground-muted)', fontSize: '0.9rem' }}>Participants who utilize our peer mentorship program are 3 times less likely to relapse in their first year.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
