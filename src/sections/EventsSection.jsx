import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { events } from '../data/events'

export default function EventsSection() {
  return (
    <section id="events" className="content-page">
      <h1>Events</h1>
      <p className="page-subtitle">Workshops, hackathons, and meetups — there's always something happening.</p>
      <Reveal>
        <div className="card-grid">
          {events.slice(0, 6).map((item) => (
            <div className="card" key={item.title}>
              <div className="card-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal>
        <div className="cta-group cta-centered">
          <Link to="/events" className="btn-large btn-primary">See More →</Link>
        </div>
      </Reveal>
    </section>
  )
}
