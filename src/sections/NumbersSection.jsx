import Reveal from '../components/Reveal'

const stats = [
  { number: '2', suffix: '', label: 'Graduated Batches of Blockchain Domain Students' },
  { number: '90+', suffix: '', label: 'Total Students from Blockchain Domain (45 per cohort)' },
  { number: '150+', suffix: '', label: 'Total Students Enrolled in Blockchain Skill Course since 2019' },
  { number: '30%', suffix: '', label: 'Direct Industry Employment Rate in Web3 and Blockchain' },
]

export default function NumbersSection() {
  return (
    <section id="numbers" className="content-page" style={{ paddingBottom: 5 }}>
      <h1>By the Numbers</h1>
      <p className="page-subtitle">Proven Results, Real Talent</p>
      <Reveal>
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div className="stat-card" key={i}>
              <div className="stat-number">{s.number}</div>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
