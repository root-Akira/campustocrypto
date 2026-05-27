import Reveal from '../components/Reveal'

const items = [
  { icon: '📘', title: 'Getting Started', text: 'Beginner guides — what is blockchain, how wallets work, and your first crypto transaction.' },
  { icon: '📄', title: 'Whitepapers', text: 'Essential reading: Bitcoin, Ethereum, and key protocol whitepapers with study notes.' },
  { icon: '💻', title: 'Developer Tools', text: 'Solidity, Hardhat, Foundry, web3.js, and other tools to start building on-chain.' },
  { icon: '🎥', title: 'Video Courses', text: 'Curated playlists and free courses on blockchain development, DeFi, and cryptography.' },
  { icon: '📊', title: 'Market & Research', text: 'Dashboards, on-chain analytics tools, and research reports to stay informed.' },
  { icon: '🔗', title: 'Community Links', text: 'Our Discord, Telegram, Twitter, and GitHub — where the community connects and builds.' },
]

export default function ResourcesSection() {
  return (
    <section id="resources" className="content-page">
      <h1>Resources</h1>
      <p className="page-subtitle">Curated learning materials to accelerate your crypto journey.</p>
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
