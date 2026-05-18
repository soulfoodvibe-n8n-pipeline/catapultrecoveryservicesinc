import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--surface-border)', paddingTop: '64px', paddingBottom: '32px' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '48px', marginBottom: '64px' }}>
        
        {/* Brand Column */}
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', fontWeight: 700 }}>
            Catapult <span className="ascension-text">Recovery</span>
          </h2>
          <p style={{ color: 'var(--foreground-muted)', lineHeight: 1.6, marginBottom: '24px', maxWidth: '300px' }}>
            Providing safe, supportive environments for the displaced, mentally ill, and substance abuse users to achieve a path to recovery.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#" aria-label="Facebook" style={{ color: 'var(--primary)' }}>[ FB ]</a>
            <a href="#" aria-label="Instagram" style={{ color: 'var(--primary)' }}>[ IG ]</a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '24px', fontWeight: 600 }}>Quick Links</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><Link href="/" style={{ color: 'var(--foreground-muted)', textDecoration: 'none' }}>Home</Link></li>
            <li><Link href="/programs" style={{ color: 'var(--foreground-muted)', textDecoration: 'none' }}>Programs</Link></li>
            <li><Link href="/events" style={{ color: 'var(--foreground-muted)', textDecoration: 'none' }}>Impact Events</Link></li>
            <li><Link href="/sponsor" style={{ color: 'var(--foreground-muted)', textDecoration: 'none' }}>Become a Sponsor</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '24px', fontWeight: 600 }}>Contact Us</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--foreground-muted)' }}>
            <li>📍 Jacksonville, FL</li>
            <li>📱 Mobile: 904.469.5181</li>
            <li>📞 Business: 904.834.5150</li>
            <li>✉️ admin@catapultrecoveryservicesinc.org</li>
          </ul>
        </div>

      </div>

      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', borderTop: '1px solid var(--surface-border)', paddingTop: '32px', fontSize: '0.9rem', color: 'var(--foreground-muted)' }}>
        <p>&copy; {new Date().getFullYear()} Catapult Recovery Services Inc. A registered 501(c)(3) Non-Profit.</p>
        
        {/* Discreet Staff Login */}
        <Link href="/studio" style={{ color: 'var(--foreground-muted)', opacity: 0.5, transition: 'opacity 0.2s', fontSize: '0.8rem' }}>
          Staff Login
        </Link>
      </div>
    </footer>
  );
}
