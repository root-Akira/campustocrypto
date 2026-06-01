import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroBg from '../components/HeroBg'
import Countdown from '../components/Countdown'
import { useAutoRefresh } from '../hooks/useAutoRefresh'
import { fetchFeaturedEvent } from '../data/events'

function formatAMPM(time) {
  if (!time) return ''
  const [h, m] = time.split(':')
  const hour = parseInt(h)
  return `${hour % 12 || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`
}

export default function Register() {
  const { data: event } = useAutoRefresh(fetchFeaturedEvent)

  return (
    <>
      <Navbar />
      <div className="content-page centered-page">
        {event ? (
          <>
            <h1>{event.title}</h1>
            <p className="page-subtitle">
              {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              {event.time ? ` at ${formatAMPM(event.time)}` : ''}
              {event.location ? ` — ${event.location}` : ''}
            </p>
            <div style={{
              maxWidth: 500, margin: '0 auto 30px', padding: '30px 24px',
              background: 'var(--glass-bg)', backdropFilter: 'blur(12px)',
              borderRadius: 16, border: '1px solid var(--glass-border)',
            }}>
              <Countdown targetDate={event.date} targetTime={event.time} />
            </div>
            <p style={{ maxWidth: 600, opacity: 0.8, marginBottom: 30, fontSize: '0.9rem' }}>{event.text}</p>
            <a
              href={event.registration_link || '#'}
              target={event.registration_link ? '_blank' : undefined}
              rel={event.registration_link ? 'noopener noreferrer' : undefined}
              className="btn-large btn-primary"
              style={{ marginBottom: 20, display: 'inline-block' }}
            >
              Register Now →
            </a>
          </>
        ) : (
          <>
            <h1>Coming Soon.....</h1>
            <p className="page-subtitle">We're working on something exciting. Stay tuned!</p>
            <Link to="/" className="btn-large btn-primary">Back to Home →</Link>
          </>
        )}
      </div>
      <HeroBg />
      <Footer />
    </>
  )
}
