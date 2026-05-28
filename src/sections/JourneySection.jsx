import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'

const milestones = [
  {
    year: '2018',
    title: 'First Mining Rig in Odisha',
    text: 'Entirely student-led initiative — the first community-driven Web3 exploration in the state, marking the beginning of hands-on blockchain education in the region.',
  },
  {
    year: '2019',
    title: '4-Credit Blockchain Skill Course',
    text: 'Introduced a 4-credit specialized skill course in Blockchain technology for students across disciplines at Centurion University.',
  },
  {
    year: '2020',
    title: 'Campus to Crypto Community',
    text: 'Launched the Campus to Crypto community, building a thriving Web3 ecosystem across Odisha\'s campuses — active and growing since 2020.',
  },
  {
    year: '2024',
    title: '22-Credit Major in Blockchain Domain',
    text: 'Odisha\'s only dedicated blockchain institution and Lab offering India\'s first dedicated blockchain curriculum — a comprehensive 22-credit major in Blockchain Domain.',
  },
  {
    year: 'Now',
    title: 'First-Mover in Odisha Web3 Education',
    text: 'Curriculum peer-reviewed and validated by leading blockchain protocols — pioneering direct protocol integration among Indian universities with a dedicated blockchain laboratory.',
  },
]

export default function JourneySection() {
  return (
    <section id="journey" className="content-page">
      <h1>The Journey So Far</h1>
      <p className="page-subtitle">
        From the first cryptocurrency mining rig in Odisha to India's most advanced dedicated blockchain laboratory — here's how far we've come.
      </p>
      <div className="timeline">
        <div className="timeline-line" />
        {milestones.map((m, i) => (
          <div className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`} key={i}>
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
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="/journey" style={{ color: 'var(--accent-color)', fontWeight: 700, fontSize: '0.9rem' }}>See More →</Link>
      </div>
    </section>
  )
}
