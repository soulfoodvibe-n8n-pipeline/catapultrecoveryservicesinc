export default function MissionVision() {
  return (
    <section id="mission" style={{ padding: '100px 0', background: 'var(--background)', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>Our <span className="ascension-text">Mission</span></h2>
          <div style={{ width: '60px', height: '4px', background: 'var(--primary)', margin: '0 auto', borderRadius: '2px' }}></div>
        </div>

        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
          {/* Mission Card */}
          <div className="glass-panel" style={{ flex: '1 1 400px', padding: '40px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'var(--primary-glow)', filter: 'blur(50px)', borderRadius: '50%' }}></div>
            <h3 style={{ fontSize: '2rem', marginBottom: '24px', color: 'var(--primary)' }}>The Mission</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--foreground-muted)' }}>
              Providing services for the displaced, mentally ill, and substance abuse users to achieve a path to recovery. We believe everyone deserves a second chance to reach a state of well-being.
            </p>
          </div>

          {/* Vision Card */}
          <div className="glass-panel" style={{ flex: '1 1 400px', padding: '40px', position: 'relative', overflow: 'hidden', borderTop: '2px solid var(--secondary)' }}>
            <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '150px', height: '150px', background: 'rgba(59, 130, 246, 0.2)', filter: 'blur(50px)', borderRadius: '50%' }}></div>
            <h3 style={{ fontSize: '2rem', marginBottom: '24px', color: '#60A5FA' }}>The Vision</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--foreground-muted)' }}>
              Seeing those who are displaced, mentally ill, and substance abuse users, to reach a state of well-being and to become productive members of their community. A thriving, restored Jacksonville.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
