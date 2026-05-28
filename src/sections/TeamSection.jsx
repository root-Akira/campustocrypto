import Reveal from '../components/Reveal'

const members = [
  { name: 'Abhi Mitra', role: 'Co-founder & Lead' },
  { name: 'Siddharth Kumar', role: 'Co-founder & Lead' },
  { name: 'Sunny Singh', role: 'Community Manager' },
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
        <div className="card-grid">
          {members.map((m) => (
            <div className="card" key={m.name}>
              <Avatar name={m.name} />
              <h3>{m.name}</h3>
              <p className="team-role">{m.role}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
