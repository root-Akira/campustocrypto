import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import EventCard from '../components/EventCard'
import { useAutoRefresh } from '../hooks/useAutoRefresh'
import { fetchHomepageEvents } from '../data/events'

export default function EventsSection() {
  const { data: events = [], loading } = useAutoRefresh(fetchHomepageEvents)

  if (loading) {
    return (
      <section id="events" className="content-page">
        <h1>Events</h1>
        <p className="page-subtitle">Workshops, hackathons, and meetups — there's always something happening.</p>
        <div className="card-grid">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="card card-skeleton">
              <div className="card-icon">📌</div>
              <h3 className="skeleton-line" />
              <p className="skeleton-line skeleton-line-short" />
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section id="events" className="content-page">
      <h1>Events</h1>
      <p className="page-subtitle">Workshops, hackathons, and meetups — there's always something happening.</p>
      <Reveal>
        {events.length === 0 ? (
          <div className="empty-state" style={{ padding: 40 }}>
            <p className="empty-state-icon" style={{ fontSize: '2rem' }}>📌</p>
            <p>No upcoming events yet. Check back soon!</p>
          </div>
        ) : (
        <div className="card-grid">
          {events.slice(0, 3).map((item) => (
            <EventCard key={item.id} item={item} />
          ))}
        </div>
        )}
      </Reveal>
      <Reveal>
        <div className="cta-group cta-centered">
          <Link to="/events" className="btn-large btn-primary">See More →</Link>
        </div>
      </Reveal>
    </section>
  )
}
