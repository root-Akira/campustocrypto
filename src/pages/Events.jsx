import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroBg from '../components/HeroBg'
import Reveal from '../components/Reveal'
import { useAutoRefresh } from '../hooks/useAutoRefresh'
import { fetchAllEvents } from '../data/events'

function formatAMPM(time) {
  if (!time) return ''
  const [h, m] = time.split(':')
  const hour = parseInt(h)
  return `${hour % 12 || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`
}

export default function Events() {
  const { data: events = [], loading } = useAutoRefresh(fetchAllEvents)

  return (
    <>
      <Navbar />
      <div className="content-page">
        <h1>Events</h1>
        <p className="page-subtitle">Workshops, hackathons, and meetups — there's always something happening.</p>
        <Reveal>
          {loading ? (
            <div className="card-grid">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="card" style={{ opacity: 0.4 }}>
                  <div className="card-icon">📌</div>
                  <h3 style={{ background: 'var(--glass-bg)', height: 14, width: '60%', borderRadius: 4 }}>&nbsp;</h3>
                  <p style={{ background: 'var(--glass-bg)', height: 10, width: '80%', borderRadius: 4, marginTop: 8 }}>&nbsp;</p>
                </div>
              ))}
            </div>
          ) : events.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 60, opacity: 0.5 }}>
              <p style={{ fontSize: '2.5rem', marginBottom: 8 }}>📌</p>
              <p>No events yet. Check back soon!</p>
            </div>
          ) : (
            <div className="card-grid">
              {events.map((item) => (
                <div className="card" key={item.title}>
                  <div className="card-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  {item.date && (
                    <p style={{ fontSize: '0.65rem', opacity: 0.6, marginBottom: 4 }}>
                      {new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                      {item.time ? ` at ${formatAMPM(item.time)}` : ''}
                    </p>
                  )}
                  <p>{item.text}</p>
                  {item.registration_link && (
                    <a href={item.registration_link} target="_blank" rel="noopener noreferrer"
                       style={{ fontSize: '0.7rem', color: 'var(--accent-color)', fontWeight: 700, marginTop: 8, display: 'inline-block' }}>
                      Register →
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </Reveal>
        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <Link to="/" className="btn-large btn-secondary">Back to Home</Link>
        </div>
      </div>
      <HeroBg />
      <Footer />
    </>
  )
}
