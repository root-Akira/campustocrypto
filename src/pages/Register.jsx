import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import Countdown from '../components/Countdown'
import { useAutoRefresh } from '../hooks/useAutoRefresh'
import { fetchFeaturedEvent } from '../data/events'
import { formatAMPM } from '../lib/helpers'

export default function Register() {
  const { data: event } = useAutoRefresh(fetchFeaturedEvent)

  return (
    <Layout>
      <div className="content-page centered-page">
        {event ? (
          <>
            <h1>{event.title}</h1>
            <p className="page-subtitle">
              {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              {event.time ? ` at ${formatAMPM(event.time)}` : ''}
              {event.location ? ` — ${event.location}` : ''}
            </p>
            <div className="countdown-card">
              <Countdown targetDate={event.date} targetTime={event.time} />
            </div>
            <p className="register-description">{event.text}</p>
            {event.registration_link ? (
              <a href={event.registration_link} target="_blank" rel="noopener noreferrer" className="btn-large btn-primary register-btn">
                Register Now →
              </a>
            ) : (
              <span className="btn-large btn-primary register-btn disabled">Register Now →</span>
            )}
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
