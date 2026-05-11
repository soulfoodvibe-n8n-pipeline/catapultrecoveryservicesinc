import Link from 'next/link';

export default function ProgramsPage() {
  const programs = [
    {
      title: "Transitional Housing",
      slug: "transitional-housing",
      description: "Providing a safe, structured, and supportive living environment for displaced individuals. Our housing program is the first step toward stability, giving residents the peace of mind needed to focus entirely on their recovery.",
      icon: "🏠"
    },
    {
      title: "Substance Abuse Recovery",
      slug: "substance-recovery",
      description: "Comprehensive, evidence-based programs designed to break the cycle of addiction. We offer peer support, counseling, and a highly structured roadmap to help individuals get clean and build a sustainable, sober future.",
      icon: "🛤️"
    },
    {
      title: "Mental Health Counseling",
      slug: "mental-health",
      description: "Healing the mind is critical to long-term success. Our dedicated mental health services include clinical evaluations, ongoing therapy, and group sessions to address underlying trauma and promote psychological well-being.",
      icon: "🧠"
    },
    {
      title: "Job Readiness & Life Skills",
      slug: "job-readiness",
      description: "We don't just treat the symptoms; we rebuild the foundation. Our job readiness program provides interview preparation, resume building, and essential life skills training so our residents can become productive, self-sufficient members of the community.",
      icon: "💼"
    }
  ];

  return (
    <main style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '800px', margin: '0 auto 80px auto' }}>
          <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '20px', border: '1px solid var(--primary-glow)', background: 'rgba(249, 115, 22, 0.1)', backdropFilter: 'blur(10px)', marginBottom: '24px', fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
            Our Pillars of Support
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '24px' }}>
            The Blueprint for <span className="ascension-text">Recovery</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--foreground-muted)', lineHeight: 1.6 }}>
            At Catapult Recovery Services, we tackle the root causes of displacement and addiction. Our four-pillar approach ensures that every individual receives the holistic care required to permanently transition into a state of well-being.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {programs.map((prog, idx) => (
            <Link href={`/programs/${prog.slug}`} key={idx} className="glass-panel" style={{ padding: '40px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', textDecoration: 'none' }}>
              <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '120px', height: '120px', background: 'var(--primary-glow)', filter: 'blur(40px)', borderRadius: '50%' }}></div>
              <div style={{ fontSize: '3rem', marginBottom: '24px' }}>{prog.icon}</div>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'white' }}>{prog.title}</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--foreground-muted)', lineHeight: 1.7, flex: 1, marginBottom: '24px' }}>
                {prog.description}
              </p>
              <div style={{ color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>
                View Program Details &rarr;
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
