import Image from 'next/image';

const team = [
  { name: 'Roberta Nixon', role: 'Executive Director' },
  { name: 'Makisha Lester', role: 'President' },
  { name: 'Jacqueline Smith', role: 'Executive Administrator' },
  { name: 'Michandra Williams', role: 'Treasurer' },
  { name: 'Avagay Green', role: 'Officer' },
];

export default function CommandCenter() {
  return (
    <section id="leadership" style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background Image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: -2 }}>
        <Image 
          src="/abstract_ascension.png"
          alt="Abstract Ascension"
          fill
          style={{ objectFit: 'cover', opacity: 0.15 }}
        />
      </div>
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>Faces of <span className="ascension-text">Change</span></h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--foreground-muted)', maxWidth: '600px', margin: '0 auto' }}>
            The leadership architecture driving the Catapult Recovery mission in Jacksonville.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {team.map((member, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--surface-border), rgba(255,255,255,0.02))', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'var(--primary-glow)', border: '1px solid var(--surface-border)' }}>
                {member.name.charAt(0)}
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{member.name}</h3>
              <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
