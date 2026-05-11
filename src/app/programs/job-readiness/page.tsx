import Link from 'next/link';

export default function JobReadinessPage() {
  return (
    <main style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <div className="container">
        
        {/* Cinematic Header */}
        <div style={{ position: 'relative', padding: '60px', borderRadius: '24px', overflow: 'hidden', marginBottom: '64px', border: '1px solid var(--surface-border)' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 5, 17, 1))', zIndex: -1 }}></div>
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'rgba(16, 185, 129, 0.2)', filter: 'blur(100px)', borderRadius: '50%', zIndex: -2 }}></div>
          
          <div style={{ maxWidth: '800px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>💼</div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '24px' }}>
              Job Readiness & <span style={{ color: '#34D399' }}>Life Skills</span>
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--foreground-muted)', lineHeight: 1.6, marginBottom: '32px' }}>
              We don't just treat the symptoms; we rebuild the foundation. Our job readiness program prepares our residents to become productive, self-sufficient members of the community.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/intake" className="btn-primary" style={{ padding: '12px 32px' }}>Join the Program</Link>
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
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#34D399' }}>01. Resume & Application Building</h3>
                <p style={{ color: 'var(--foreground-muted)', lineHeight: 1.6 }}>Workshops on how to translate past experiences into a compelling resume, and how to navigate online job applications.</p>
              </div>
              <div className="glass-panel" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#34D399' }}>02. Mock Interviews & Professionalism</h3>
                <p style={{ color: 'var(--foreground-muted)', lineHeight: 1.6 }}>Simulated interviews with feedback, along with coaching on workplace etiquette and professional communication.</p>
              </div>
              <div className="glass-panel" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#34D399' }}>03. Employer Placement Network</h3>
                <p style={{ color: 'var(--foreground-muted)', lineHeight: 1.6 }}>Direct connections with local Jacksonville employers who partner with Catapult to provide second-chance employment opportunities.</p>
              </div>
            </div>
          </div>

          <div style={{ gridColumn: '1 / -1', '@media (min-width: 768px)': { gridColumn: '2 / 3' } } as any}>
            <div className="glass-panel" style={{ padding: '40px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '32px' }}>Program Impact</h2>
              
              <div style={{ marginBottom: '32px' }}>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: '#34D399', marginBottom: '8px' }}>65%</div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Employment Secured</h4>
                <p style={{ color: 'var(--foreground-muted)', fontSize: '0.9rem' }}>Of program graduates secure steady employment within 90 days of completing the Job Readiness track.</p>
              </div>

              <div>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: '#34D399', marginBottom: '8px' }}>50+</div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Employer Partners</h4>
                <p style={{ color: 'var(--foreground-muted)', fontSize: '0.9rem' }}>Local businesses actively collaborating with us to provide jobs to our program graduates.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
