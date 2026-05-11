import Image from 'next/image';

export default function Hero() {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px', overflow: 'hidden' }}>
      {/* Background Image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: -2 }}>
        <Image 
          src="/hero_sunrise.png"
          alt="Ascension Sunrise"
          fill
          style={{ objectFit: 'cover', opacity: 0.4 }}
          priority
        />
      </div>
      {/* Gradient Overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--background) 0%, rgba(5, 5, 17, 0.5) 100%)', zIndex: -1 }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '20px', border: '1px solid var(--primary-glow)', background: 'rgba(249, 115, 22, 0.1)', backdropFilter: 'blur(10px)', marginBottom: '24px', fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
          A Path to Recovery
        </div>
        <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1.1, marginBottom: '24px' }}>
          Achieving a State of <br />
          <span className="ascension-text">Well-being.</span>
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--foreground-muted)', marginBottom: '40px', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto 40px auto' }}>
          Providing critical services for the displaced, mentally ill, and substance abuse users to become productive members of the Jacksonville community.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#impact" className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>See Our Impact</a>
          <a href="#mission" style={{ padding: '16px 32px', fontSize: '1.1rem', borderRadius: '8px', border: '1px solid var(--surface-border)', background: 'var(--surface)', fontWeight: 600, transition: 'all 0.3s', color: 'white' }}>Learn More</a>
        </div>
      </div>
    </section>
  );
}
