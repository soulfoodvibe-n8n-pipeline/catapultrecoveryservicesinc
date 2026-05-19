import { client } from '../../../../sanity/lib/client';
import { urlForImage } from '../../../../sanity/lib/image';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 60;

async function getEvent(slug: string) {
  const query = `*[_type == "fundraisingEvent" && slug.current == $slug][0] {
    _id,
    title,
    eventDate,
    location,
    mainImage,
    isPastEvent,
    registrationLink,
    description
  }`;
  return client.fetch(query, { slug });
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await the params object before using its properties in Next.js 15+ 
  const resolvedParams = await params;
  const event = await getEvent(resolvedParams.slug);

  if (!event) {
    notFound();
  }

  return (
    <main style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '32px' }}>
          <Link href="/events" style={{ color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
            <span>←</span> Back to Events
          </Link>
        </div>

        {event.mainImage && (
          <div style={{ marginBottom: '40px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--surface-border)' }}>
            <img 
              src={urlForImage(event.mainImage)?.url()} 
              alt={event.title} 
              style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }} 
            />
          </div>
        )}

        <div className="glass-panel" style={{ padding: '48px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {event.isPastEvent ? (
              <span style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '0.8rem', color: 'white' }}>Past Event</span>
            ) : (
              <span style={{ padding: '4px 12px', background: 'rgba(255, 69, 0, 0.1)', border: '1px solid var(--primary-glow)', borderRadius: '20px', fontSize: '0.8rem', color: 'var(--primary)', boxShadow: '0 0 10px var(--primary-glow)' }}>Upcoming</span>
            )}
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '24px' }}>
            {event.title}
          </h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', color: 'var(--foreground-muted)', marginBottom: '40px', fontSize: '1.1rem', fontWeight: 500 }}>
            {event.eventDate && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--primary)' }}>🗓️</span> 
                {new Date(event.eventDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                  {' @ ' + new Date(event.eventDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            )}
            {event.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--primary)' }}>📍</span> {event.location}
              </div>
            )}
          </div>

          <div style={{ lineHeight: 1.8, fontSize: '1.1rem', color: 'var(--foreground)' }} className="portable-text-container">
            {event.description ? (
              <PortableText value={event.description} />
            ) : (
              <p>No description provided.</p>
            )}
          </div>

          {event.registrationLink && !event.isPastEvent && (
            <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--surface-border)', textAlign: 'center' }}>
              <a href={event.registrationLink} target="_blank" rel="noreferrer" className="btn-primary" style={{ display: 'inline-block', padding: '16px 48px', fontSize: '1.2rem' }}>
                Register / Get Tickets
              </a>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
