import Reveal from '../components/Reveal'

const members = [
  { name: 'Alex Rivera', role: 'Founder & Lead', emoji: '🧑‍💻', bio: 'CS student passionate about decentralized tech and building communities.' },
  { name: 'Sarah Chen', role: 'Events Lead', emoji: '👩‍🏫', bio: 'Organizes workshops and hackathons. Loves making complex topics accessible.' },
  { name: 'Marcus Johnson', role: 'Tech Lead', emoji: '👨‍🔧', bio: 'Full-stack developer exploring Solidity and zero-knowledge proofs.' },
  { name: 'Priya Patel', role: 'Community Manager', emoji: '👩‍💼', bio: 'Keeps the community thriving across Discord, Twitter, and IRL meetups.' },
  { name: 'Jordan Kim', role: 'Content Lead', emoji: '✍️', bio: 'Writes blog posts, study guides, and keeps everyone informed.' },
  { name: 'Taylor Brooks', role: 'Design Lead', emoji: '🎨', bio: 'Designs branding, presentations, and makes everything look good.' },
]

export default function TeamSection() {
  return (
    <section id="team" className="content-page">
      <h1>Our Team</h1>
      <p className="page-subtitle">Meet the people building CampustoCrypto.</p>
      <Reveal>
        <div className="card-grid">
          {members.map((m, i) => (
            <div className="card" key={i}>
              <div className="card-icon">{m.emoji}</div>
              <h3>{m.name}</h3>
              <p className="team-role">{m.role}</p>
              <p>{m.bio}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
