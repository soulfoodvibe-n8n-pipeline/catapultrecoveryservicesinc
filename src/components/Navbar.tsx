import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ padding: '24px 0', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
          Catapult <span className="ascension-text">Recovery</span>
        </Link>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <div className="nav-links">
            <Link href="/" style={{ fontSize: '0.95rem', color: 'var(--foreground-muted)', fontWeight: 500, transition: 'color 0.2s' }}>Home</Link>
            <Link href="/programs" style={{ fontSize: '0.95rem', color: 'var(--foreground-muted)', fontWeight: 500, transition: 'color 0.2s' }}>Programs</Link>
            <Link href="/intake" style={{ fontSize: '0.95rem', color: 'var(--foreground-muted)', fontWeight: 500, transition: 'color 0.2s' }}>Get Help</Link>
            <Link href="/events" style={{ fontSize: '0.95rem', color: 'var(--foreground-muted)', fontWeight: 500, transition: 'color 0.2s' }}>Events</Link>
          </div>
          <Link href="/studio" style={{ fontSize: '0.85rem', color: 'var(--foreground-muted)', opacity: 0.7, fontWeight: 500, transition: 'opacity 0.2s' }}>Staff Login</Link>
          <Link href="/sponsor" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.95rem' }}>Donate Now</Link>
        </div>
      </div>
    </nav>
  );
}
