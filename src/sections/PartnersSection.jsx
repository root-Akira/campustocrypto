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
  { name: 'Polkadot', icon: NetworkPolkadot },
  { name: 'Solana', icon: NetworkSolana },
  { name: 'Arbitrum', icon: NetworkArbitrumOne },
  { name: 'Stellar', icon: NetworkStellar },
  { name: 'ICP', icon: TokenICP },
  { name: 'Filecoin', icon: NetworkFilecoin },
  { name: 'Stacks', icon: NetworkStacks },
  { name: 'Nexa', icon: TokenNEXA },
  { name: 'Avalanche', icon: NetworkAvalanche },
  { name: 'RiseIn', icon: null, image: '/partners/id3t_Uq0DW_logos-removebg-preview.png' },
]

export default function PartnersSection() {
  return (
    <section id="partners" className="content-page">
      <h1>Our Partners</h1>
      <p className="page-subtitle">Backed by leading blockchain networks</p>
      <div className="partners-grid">
        {partners.map((p) => (
          <div key={p.name} className="partner-card">
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
          </div>
        ))}
      </div>
    </section>
  )
}
