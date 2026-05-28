import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'

const items = [
  { icon: '📅', title: 'Weekly Builder Sessions', text: 'Every Saturday at 3 PM. Bring your laptop and build something in web3. All skill levels welcome.' },
  { icon: '📖', title: 'Blockchain Fundamentals', text: 'Monthly workshop series covering Bitcoin, Ethereum, smart contracts, and DeFi basics. Next session: June 10.' },
  { icon: '⚡', title: 'Crypto Hackathon', text: '48-hour buildathon in July. Form a team, build a dApp, and win prizes. Registration opens June 15.' },
  { icon: '🎤', title: 'Guest Speaker Series', text: 'Industry leaders share their journey into crypto. Past speakers include founders, engineers, and researchers.' },
  { icon: '☕', title: 'Crypto Coffee Chat', text: 'Casual Friday meetups. No agenda — just good conversations about crypto over coffee.' },
  { icon: '🏆', title: 'Protocol Deep Dives', text: 'Bi-weekly deep dives into specific protocols. Past topics: Solana, L2s, zk-proofs, and oracles.' },
]

export default function EventsSection() {
  return (
    <section id="events" className="content-page">
      <h1>Events</h1>
      <p className="page-subtitle">Workshops, hackathons, and meetups — there's always something happening.</p>
      <Reveal>
        <div className="card-grid">
          {items.map((item, i) => (
            <div className="card" key={i}>
              <div className="card-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal>
        <div className="cta-group" style={{ justifyContent: 'center' }}>
          <Link to="/events" className="btn-large btn-primary">See More →</Link>
        </div>
      </Reveal>
    </section>
  )
}
