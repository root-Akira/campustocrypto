import Reveal from '../components/Reveal'

const stats = [
  { number: '2', label: 'Graduated Batches of Blockchain Domain Students' },
  { number: '90+', label: 'Total Students from Blockchain Domain (45 per cohort)' },
  { number: '150+', label: 'Total Students Enrolled in Blockchain Skill Course since 2019' },
  { number: '30%', label: 'Direct Industry Employment Rate in Web3 and Blockchain' },
]

export default function NumbersSection() {
  return (
    <section id="numbers" className="content-page">
      <h1>By the Numbers</h1>
      <p className="page-subtitle">Proven Results, Real Talent</p>
      <Reveal>
        <div className="stats-grid">
          {stats.map((s) => (
            <div className="stat-card" key={s.number}>
              <div className="stat-number">{s.number}</div>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
