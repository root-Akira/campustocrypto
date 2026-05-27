import Reveal from '../components/Reveal'

const items = [
  { icon: '✍️', title: 'Why We Started CampustoCrypto', text: 'A student\'s perspective on why campus needs a crypto community. — May 20, 2026' },
  { icon: '📝', title: 'Understanding Smart Contracts', text: 'A beginner-friendly walkthrough of how smart contracts work and why they matter. — May 15, 2026' },
  { icon: '🔍', title: 'Our First Hackathon Recap', text: 'What we built, what we learned, and what\'s next for the community. — May 8, 2026' },
  { icon: '💡', title: 'DeFi for Students', text: 'How decentralized finance tools can help students manage money smarter. — April 28, 2026' },
  { icon: '🗣️', title: 'Meet the Core Team', text: 'Get to know the people behind CampustoCrypto and what drives them. — April 20, 2026' },
]

export default function BlogSection() {
  return (
    <section id="blog" className="content-page">
      <h1>Blog</h1>
      <p className="page-subtitle">Thoughts, tutorials, and updates from the community.</p>
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
    </section>
  )
}
