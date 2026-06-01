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
                <div key={i} className="card card-skeleton">
                  <div className="card-icon">📌</div>
                  <h3 className="skeleton-line" />
                  <p className="skeleton-line skeleton-line-short" />
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
