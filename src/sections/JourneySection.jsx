import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { milestones } from '../data/milestones'

export default function JourneySection() {
  return (
    <section id="journey" className="content-page">
      <h1>The Journey So Far</h1>
      <p className="page-subtitle">
        From the first cryptocurrency mining rig in Odisha to India's most advanced dedicated blockchain laboratory — here's how far we've come.
      </p>
      <div className="timeline">
        <div className="timeline-line" />
          {milestones.slice(0, 4).map((m, i) => (
          <div className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}           key={m.title}>
            <div className="timeline-dot" />
            <Reveal>
              <div className="timeline-card">
                <span className="timeline-card-year">{m.year}</span>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </div>
            </Reveal>
          </div>
        ))}
      </div>
      <div className="see-more-wrap">
        <Link to="/journey" className="see-more-link">See More →</Link>
      </div>
    </section>
  )
}
