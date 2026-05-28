import {
  NetworkPolkadot,
  NetworkSolana,
  NetworkArbitrumOne,
  NetworkStellar,
  NetworkFilecoin,
  NetworkStacks,
  NetworkAvalanche,
} from '@web3icons/react'
import { TokenICP, TokenNEXA } from '@web3icons/react'

const partners = [
  { name: 'Polkadot', icon: NetworkPolkadot, url: 'https://polkadot.network' },
  { name: 'Solana', icon: NetworkSolana, url: 'https://solana.com' },
  { name: 'Arbitrum', icon: NetworkArbitrumOne, url: 'https://arbitrum.io' },
  { name: 'Stellar', icon: NetworkStellar, url: 'https://stellar.org' },
  { name: 'ICP', icon: TokenICP, url: 'https://internetcomputer.org' },
  { name: 'Filecoin', icon: NetworkFilecoin, url: 'https://filecoin.io' },
  { name: 'Stacks', icon: NetworkStacks, url: 'https://stacks.co' },
  { name: 'Nexa', icon: TokenNEXA, url: 'https://nexa.org' },
  { name: 'Avalanche', icon: NetworkAvalanche, url: 'https://avax.network' },
  { name: 'RiseIn', icon: null, image: '/partners/id3t_Uq0DW_logos-removebg-preview.png', url: 'https://risein.com' },
]

export default function PartnersSection() {
  return (
    <section id="partners" className="content-page">
      <h1>Our Partners</h1>
      <p className="page-subtitle">Backed by leading blockchain networks</p>
      <div className="partners-grid">
        {partners.map((p) => (
          <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="partner-card">
            <div className="partner-icon">
              {p.icon ? (
                <p.icon size={40} variant="branded" />
              ) : p.image ? (
                <img src={p.image} alt={p.name} className="partner-img-logo" />
              ) : (
                <span className="partner-text-logo">{p.name}</span>
              )}
            </div>
            <span className="partner-name">{p.name}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
