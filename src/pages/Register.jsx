import Layout from '../components/Layout'
import Countdown from '../components/Countdown'
import { useAutoRefresh } from '../hooks/useAutoRefresh'
import { fetchFeaturedEvent } from '../data/events'
import { formatAMPM } from '../lib/helpers'

export default function Register() {
  const { data: event } = useAutoRefresh(fetchFeaturedEvent)

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  }

  return (
    <Layout>
      <div className="content-page centered-page">
        {event ? (
          <>
            <h1>Upcoming Event</h1>
            <div className="upcoming-card">
              {event.cover_image && (
                <img src={event.cover_image} alt={event.title} className="upcoming-card-img" loading="lazy" />
              )}
              <div className="upcoming-card-body">
                <div className="upcoming-card-countdown">
                  <Countdown targetDate={event.date} targetTime={event.time} />
                </div>
                <p className="upcoming-card-datetime">
                  {formatDate(event.date)}{event.time && ` · ${formatAMPM(event.time)}`}
                </p>
                <div className="upcoming-card-header">
                  <h2 className="upcoming-card-title">{event.title}</h2>
                  {event.location && (
                    <span className="upcoming-card-location">📍 {event.location}</span>
                  )}
                </div>
                <p className="upcoming-card-desc">{event.text}</p>
                {event.registration_link && (
                  <a href={event.registration_link} target="_blank" rel="noopener noreferrer" className="upcoming-card-link">
                    Register →
                  </a>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <h1>Coming Soon.....</h1>
            <p className="page-subtitle">We're working on something exciting. Stay tuned!</p>
          </>
        )}
      </div>
    </Layout>
  )
}