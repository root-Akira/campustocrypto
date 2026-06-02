import Layout from '../components/Layout'
import Reveal from '../components/Reveal'
import EventCard from '../components/EventCard'
import { useAutoRefresh } from '../hooks/useAutoRefresh'
import { fetchAllEvents } from '../data/events'

export default function Events() {
  const { data: events = [], loading } = useAutoRefresh(fetchAllEvents)

  return (
    <Layout>
      <div className="content-page">
        <h1>Events</h1>
        <p className="page-subtitle">Workshops, hackathons, and meetups — there's always something happening.</p>
        <Reveal>
          {loading ? (
            <div className="card-grid">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="event-card card-skeleton">
                  <div className="skeleton-line" style={{ height: 148, width: '100%', borderRadius: 0 }} />
                  <div className="event-card-body">
                    <div className="event-card-date">
                      <span className="skeleton-line" style={{ height: 10, width: 24, margin: '0 auto 4px' }} />
                      <span className="skeleton-line" style={{ height: 24, width: 28, margin: '0 auto' }} />
                    </div>
                    <div className="event-card-divider" />
                    <div className="event-card-content">
                      <div className="skeleton-line" style={{ height: 10, width: '40%', marginBottom: 6 }} />
                      <div className="skeleton-line" style={{ height: 14, width: '70%', marginBottom: 4 }} />
                      <div className="skeleton-line" style={{ height: 10, width: '100%', marginBottom: 10 }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : events.length === 0 ? (
            <div className="empty-state">
              <p className="empty-state-icon">📌</p>
              <p>No events yet. Check back soon!</p>
            </div>
          ) : (
            <div className="card-grid">
              {events.map((item) => (
                <EventCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </Layout>
  )
}
