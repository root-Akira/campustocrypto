import Reveal from '../components/Reveal'

const members = [
  { name: 'Promise Wilfred', role: 'Community President', url: 'https://x.com/Promise_wils' },
  { name: 'Nirvan Abhilash', role: 'Co-founder & Lead', url: 'https://www.linkedin.com/in/nirvan-abhilash-8a890218b/' },
  { name: 'Siddharth Kumar', role: 'Co-founder & Lead', url: 'https://x.com/Sidd_BITCOIN' },
  { name: 'Abhi Mitra', role: 'Co-founder & Lead', url: 'https://x.com/abhimitrax' },
  { name: 'Sunny Singh', role: 'Community Manager', url: 'https://x.com/with_AK1RA' },
]

function Avatar({ name }) {
  const initials = name.split(' ').map(n => n[0]).join('')
  return <div className="team-avatar">{initials}</div>
}

export default function TeamSection() {
  return (
    <section id="team" className="content-page">
      <h1>Our Team</h1>
      <p className="page-subtitle">Meet the people building CampustoCrypto.</p>
      <Reveal>
        <div className="card-grid team-grid">
          {members.map((m) => (
            <a href={m.url} target="_blank" rel="noopener noreferrer" className="card" key={m.name}>
              <Avatar name={m.name} />
              <h3>{m.name}</h3>
              <p className="team-role">{m.role}</p>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
