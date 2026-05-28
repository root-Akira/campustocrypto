import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroBg from '../components/HeroBg'
import Reveal from '../components/Reveal'
import { milestones } from '../data/milestones'

export default function Journey() {
  return (
    <>
      <Navbar />
      <div className="content-page">
        <h1>The Journey So Far</h1>
        <p className="page-subtitle">
          From the first cryptocurrency mining rig in Odisha to India's most advanced dedicated blockchain laboratory — here's how far we've come.
        </p>
        <div className="timeline">
          <div className="timeline-line" />
          {milestones.map((m, i) => (
            <div className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`} key={m.year}>
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
        <Reveal>
          <div className="cta-group" style={{ justifyContent: 'center' }}>
            <Link to="/" className="btn-large btn-primary">Back to Home →</Link>
          </div>
        </Reveal>
      </div>
      <HeroBg />
      <Footer />
    </>
  )
}
