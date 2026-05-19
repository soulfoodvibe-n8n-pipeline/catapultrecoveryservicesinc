import { client } from '../../../sanity/lib/client';
import { urlForImage } from '../../../sanity/lib/image';
import Link from 'next/link';

export const revalidate = 60; // Revalidate every minute

async function getEvents() {
  const query = `*[_type == "fundraisingEvent"] | order(eventDate desc) {
    _id,
    title,
    slug,
    eventDate,
    location,
    mainImage,
    isPastEvent,
    registrationLink,
    "descriptionExcerpt": pt::text(description)
  }`;
  return client.fetch(query);
}

export default async function EventsPage() {
  const events = await getEvents();

  const upcomingEvents = events.filter((event: any) => !event.isPastEvent);
  const pastEvents = events.filter((event: any) => event.isPastEvent);

  return (
    <main style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '64px', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '24px' }}>
            Fundraising <span className="ascension-text">Events</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--foreground-muted)', lineHeight: 1.6 }}>
            Join us in our mission to catapult individuals from hardship to recovery. Check out our upcoming events and see the impact we've made together in the past.
          </p>
        </div>

        {upcomingEvents.length > 0 && (
          <div style={{ marginBottom: '80px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '32px', borderBottom: '1px solid var(--surface-border)', paddingBottom: '16px' }}>Upcoming Events</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
              {upcomingEvents.map((event: any) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </div>
        )}

        {pastEvents.length > 0 && (
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '32px', borderBottom: '1px solid var(--surface-border)', paddingBottom: '16px' }}>Past Impact</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', opacity: 0.8 }}>
              {pastEvents.map((event: any) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </div>
        )}

        {events.length === 0 && (
          <div className="glass-panel" style={{ padding: '64px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>More Events Coming Soon!</h3>
            <p style={{ color: 'var(--foreground-muted)' }}>We are currently organizing our next fundraising event. Please check back later.</p>
          </div>
        )}

      </div>
    </main>
  );
}

function EventCard({ event }: { event: any }) {
  return (
    <Link href={`/events/${event.slug.current}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="glass-panel event-card-hover" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%' }}>
        {event.mainImage && (
          <img 
            src={urlForImage(event.mainImage)?.url()} 
            alt={event.title} 
            style={{ width: '100%', height: '240px', objectFit: 'cover' }} 
          />
        )}
        <div style={{ padding: '32px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>{event.title}</h3>
          
          <div style={{ display: 'flex', gap: '16px', color: 'var(--primary)', marginBottom: '16px', fontSize: '0.9rem', fontWeight: 600 }}>
            {event.eventDate && <span>🗓️ {new Date(event.eventDate).toLocaleDateString()}</span>}
            {event.location && <span>📍 {event.location}</span>}
          </div>

          <p style={{ color: 'var(--foreground-muted)', lineHeight: 1.6, marginBottom: '32px', flexGrow: 1 }}>
            {event.descriptionExcerpt ? (event.descriptionExcerpt.substring(0, 150) + '...') : ''}
          </p>

          {event.registrationLink && !event.isPastEvent && (
            <div className="btn-primary" style={{ textAlign: 'center', marginTop: 'auto' }}>
              View Details & Register
            </div>
          )}
          {(!event.registrationLink || event.isPastEvent) && (
            <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', marginTop: 'auto' }}>
              View Details →
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
