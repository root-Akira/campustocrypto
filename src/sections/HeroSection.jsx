import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'

export default function HeroSection() {
  return (
    <section id="home">
      <div className="hero">
        <h1>From Campus to Crypto</h1>
        <p className="subtext">
          <span>India's First university Blockchain Community (since 2018)</span>
          <span className="sub-gap">The student-led Web3 community at Centurion University<br /></span>
          — organizing hackathons, workshops, and ecosystem events across the world's leading blockchain networks.
        </p>
        <Reveal>
          <div className="features">
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              </div>
              <h3>Learn Together</h3>
              <p>Workshops, study groups &amp; blockchain fundamentals to advanced topics.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              </div>
              <h3>Build Projects</h3>
              <p>Collaborate on real-world dApps, smart contracts, and web3 tools with peers.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h3>Network & Grow</h3>
              <p>Connect with industry mentors, alumni, and like-minded builders in the space.</p>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="cta-group">
            <Link to="/register" className="btn-large btn-primary">Upcoming Event →</Link>
            <Link to="/about" className="btn-large btn-secondary">About Us</Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
