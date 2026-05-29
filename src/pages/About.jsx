import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroBg from '../components/HeroBg'
import Reveal from '../components/Reveal'

export default function About() {
  return (
    <>
      <Navbar />
      <div className="content-page about-page">
        <h1>About Us</h1>
        <p className="page-subtitle">Empowering students to explore blockchain and crypto together.</p>
        <Reveal>
          <div className="about-content">
            <p>We didn't wait for Web3 to come to us. We built it from scratch — inside a Centurion university campus in Odisha, India, and took it global.</p>
            <p>Campus to Crypto is a student-led Web3 community that started with a single mining rig in 2018 and has since grown into one of India's most active blockchain ecosystems. We've delivered 50+ events, trained 90+ builders, and connected a growing network of developers, traders, and founders across India and beyond.</p>
            <p>We are the on-ground execution engine. Hackathons. Bootcamps. Hacker houses. Late-night build sessions. We've run official events and partnerships with some of the biggest names in the space — Avalanche, Solana, Arbitrum, Polkadot, Stellar, ICP, Stacks, Filecoin, and more. We were selected as the official Educational Partner for the Stellar × Polkadot Hacker House Bangalore. We brought Polkadot to an Indian university for the very first time.</p>
            <p>We don't just participate in the global Web3 ecosystem — we contribute to it. Our core team members are active contributors inside Avalanche and Solana ecosystems. Our curriculum is peer-reviewed and validated by leading blockchain protocols. Our builders show up at International Blockchain Week.</p>
            <p>Wherever you are in the world — if you build, we speak your language.</p>
            <p className="about-tagline">Campus to Crypto. Building Web3. Globally.</p>
          </div>
        </Reveal>
      </div>
      <HeroBg />
      <Footer />
    </>
  )
}
