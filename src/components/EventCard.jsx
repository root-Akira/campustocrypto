import { formatAMPM } from '../lib/helpers'

export default function EventCard({ item }) {
  return (
    <div className="card">
      <div className="card-icon">{item.icon}</div>
      <h3>{item.title}</h3>
      {item.date && (
        <p className="card-date">
          {new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
          {item.time ? ` at ${formatAMPM(item.time)}` : ''}
        </p>
      )}
      <p>{item.text}</p>
      {item.registration_link && (
        <a href={item.registration_link} target="_blank" rel="noopener noreferrer" className="card-register">
          Register →
        </a>
      )}
    </div>
  )
}
