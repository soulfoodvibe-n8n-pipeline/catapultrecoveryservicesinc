import Link from 'next/link';

export default function MentalHealthPage() {
  return (
    <main style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <div className="container">
        
        {/* Cinematic Header */}
        <div style={{ position: 'relative', padding: '60px', borderRadius: '24px', overflow: 'hidden', marginBottom: '64px', border: '1px solid var(--surface-border)' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(5, 5, 17, 1))', zIndex: -1 }}></div>
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'rgba(168, 85, 247, 0.3)', filter: 'blur(100px)', borderRadius: '50%', zIndex: -2 }}></div>
          
          <div style={{ maxWidth: '800px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🧠</div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '24px' }}>
              Mental Health <span style={{ color: '#C084FC' }}>Counseling</span>
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--foreground-muted)', lineHeight: 1.6, marginBottom: '32px' }}>
              Healing the mind is critical to long-term success. Our dedicated mental health services address underlying trauma and promote psychological well-being.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/intake" className="btn-primary" style={{ padding: '12px 32px' }}>Request Evaluation</Link>
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
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#C084FC' }}>01. Comprehensive Evaluation</h3>
                <p style={{ color: 'var(--foreground-muted)', lineHeight: 1.6 }}>Every individual receives a full psychological assessment to identify underlying conditions, trauma, or dual diagnoses.</p>
              </div>
              <div className="glass-panel" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#C084FC' }}>02. One-on-One Therapy</h3>
                <p style={{ color: 'var(--foreground-muted)', lineHeight: 1.6 }}>Weekly individual sessions with licensed therapists focusing on cognitive behavioral therapy (CBT) and trauma resolution.</p>
              </div>
              <div className="glass-panel" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#C084FC' }}>03. Peer Support Groups</h3>
                <p style={{ color: 'var(--foreground-muted)', lineHeight: 1.6 }}>Facilitated group sessions that build community, reduce isolation, and foster shared healing among peers.</p>
              </div>
            </div>
          </div>

          <div style={{ gridColumn: '1 / -1', '@media (min-width: 768px)': { gridColumn: '2 / 3' } } as any}>
            <div className="glass-panel" style={{ padding: '40px', background: 'rgba(168, 85, 247, 0.05)', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '32px' }}>Program Impact</h2>
              
              <div style={{ marginBottom: '32px' }}>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: '#C084FC', marginBottom: '8px' }}>78%</div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Reduction in Crisis Events</h4>
                <p style={{ color: 'var(--foreground-muted)', fontSize: '0.9rem' }}>Of enrolled individuals experience a significant decrease in severe mental health crises requiring emergency intervention.</p>
              </div>

              <div>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: '#C084FC', marginBottom: '8px' }}>4x</div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Therapy Attendance</h4>
                <p style={{ color: 'var(--foreground-muted)', fontSize: '0.9rem' }}>Participants attend 4 times more therapy sessions compared to standard outpatient care due to our integrated housing model.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
