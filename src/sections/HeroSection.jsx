import Reveal from '../components/Reveal'

export default function HeroSection() {
  return (
    <section id="home">
      <main className="hero">
        <h1>From Campus<br />to Crypto.</h1>
        <p className="subtext">
          A student-driven community bridging the gap between campus life and the blockchain world.
          Learn, build, and network with fellow crypto enthusiasts.
        </p>
        <Reveal>
          <div className="features">
            <div className="feature-item">
              <div className="feature-icon">🎓</div>
              <h3>Learn Together</h3>
              <p>Workshops and study groups covering blockchain fundamentals to advanced DeFi.</p>
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
            <a href="#join" className="btn-large btn-primary">Join the Community →</a>
            <a href="#about" className="btn-large btn-secondary">Learn More</a>
          </div>
        </Reveal>
      </main>
    </section>
  )
}
