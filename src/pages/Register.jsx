import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import Countdown from '../components/Countdown'
import EventCard from '../components/EventCard'
import { useAutoRefresh } from '../hooks/useAutoRefresh'
import { fetchFeaturedEvent } from '../data/events'

export default function Register() {
  const { data: event } = useAutoRefresh(fetchFeaturedEvent)

  return (
    <Layout>
      <div className="content-page centered-page">
        {event ? (
          <>
            <h1>Upcoming Event</h1>
            <div className="countdown-card">
              <Countdown targetDate={event.date} targetTime={event.time} />
            </div>
            <div style={{ maxWidth: 400, margin: '0 auto 30px' }}>
              <EventCard item={event} />
            </div>
          </>
        ) : (
          <>
            <h1>Coming Soon.....</h1>
            <p className="page-subtitle">We're working on something exciting. Stay tuned!</p>
            <Link to="/" className="btn-large btn-primary">Back to Home →</Link>
          </>
        )}
      </div>
    </Layout>
  )
}