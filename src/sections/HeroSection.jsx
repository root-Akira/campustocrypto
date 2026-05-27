import Reveal from '../components/Reveal'

export default function HeroSection() {
  return (
    <section id="home">
      <main className="hero">
        <h1>Build the Future<br />of Web3 in Odisha</h1>
        <p className="subtext">
          <span>Odisha's First Blockchain Community</span>
          <span className="sub-gap">The student-led Web3 community at Centurion University<br /></span>
          — organizing hackathons, workshops, and ecosystem events across the world's leading blockchain networks.
        </p>
        <Reveal>
          <div className="features">
            <div className="feature-item">
              <div className="feature-icon">🎓</div>
              <h3>Learn Together</h3>
              <p>Workshops, study groups &amp; blockchain fundamentals to advanced topics.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔨</div>
              <h3>Build Projects</h3>
              <p>Collaborate on real-world dApps, smart contracts, and web3 tools with peers.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🤝</div>
              <h3>Network & Grow</h3>
              <p>Connect with industry mentors, alumni, and like-minded builders in the space.</p>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="cta-group">
            <a href="#join" className="btn-large btn-primary">Register for upcoming event →</a>
            <a href="#about" className="btn-large btn-secondary">Learn More</a>
          </div>
        </Reveal>
      </main>
    </section>
  )
}
