import { formatAMPM } from '../lib/helpers'

export default function EventCard({ item }) {
  const d = item.date ? new Date(item.date) : null
  const month = d ? d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase() : ''
  const day = d ? d.getDate() : ''
  const fullDate = d ? d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''

  return (
    <div className="event-card">
      {item.cover_image && (
        <img src={item.cover_image} alt={item.title} className="event-card-img" />
      )}
      <div className="event-card-body">
        {d && (
          <>
            <div className="event-card-date">
              <span className="event-card-month">{month}</span>
              <span className="event-card-day">{day}</span>
            </div>
            <div className="event-card-divider" />
          </>
        )}
        <div className="event-card-content">
          {item.location && (
            <div className="event-card-location">📍 {item.location}</div>
          )}
          <h3 className="event-card-title">{item.title}</h3>
          <p className="event-card-desc">{item.text}</p>
          <div className="event-card-row">
            {item.time && (
              <span className="event-card-time">{formatAMPM(item.time)}</span>
            )}
            {item.registration_link && (
              <a href={item.registration_link} target="_blank" rel="noopener noreferrer" className="event-card-link">
                Register →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}