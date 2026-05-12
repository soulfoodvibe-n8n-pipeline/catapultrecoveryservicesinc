import Image from 'next/image';
import { client } from '../../sanity/lib/client';
import { urlForImage } from '../../sanity/lib/image';

const fallbackTeam = [
  { name: 'Roberta Nixon', role: 'Executive Director' },
  { name: 'Makisha Lester', role: 'President' },
  { name: 'Jacqueline Smith', role: 'Executive Administrator' },
  { name: 'Michandra Williams', role: 'Treasurer' },
  { name: 'Avagay Green', role: 'Officer' },
];

async function getOfficers() {
  const query = `*[_type == "officer"] | order(order asc) {
    _id,
    name,
    role,
    image
  }`;
  return client.fetch(query);
}

export default async function CommandCenter() {
  const officers = await getOfficers();
  
  // Graceful fallback: If no officers are in Sanity yet, use the static list.
  const displayTeam = officers.length > 0 ? officers : fallbackTeam;

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
          {displayTeam.map((member: any, idx: number) => (
            <div key={member._id || idx} className="glass-panel" style={{ padding: '32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {member.image ? (
                <div style={{ width: '120px', height: '120px', borderRadius: '50%', marginBottom: '24px', overflow: 'hidden', border: '2px solid var(--surface-border)', position: 'relative' }}>
                  <img 
                    src={urlForImage(member.image)?.url()} 
                    alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ) : (
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--surface-border), rgba(255,255,255,0.02))', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'var(--primary-glow)', border: '1px solid var(--surface-border)' }}>
                  {member.name.charAt(0)}
                </div>
              )}
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
