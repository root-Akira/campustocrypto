import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroBg from '../components/HeroBg'
import Reveal from '../components/Reveal'
import { Link } from 'react-router-dom'

const items = [
  { icon: '🚀', title: 'Our Mission', text: 'To create a welcoming space where students from all backgrounds can learn about blockchain technology, build meaningful projects, and launch their careers in web3.' },
  { icon: '👥', title: 'Our Community', text: 'We are a diverse group of students, developers, designers, and crypto enthusiasts united by a shared curiosity for decentralized technology.' },
  { icon: '🌟', title: 'Our Values', text: 'Open education, hands-on learning, inclusive collaboration, and building real-world solutions that make blockchain accessible to everyone on campus.' },
  { icon: '📈', title: 'Our Journey', text: 'Starting from a small study group, we\'ve grown into a campus-wide community hosting hackathons, guest lectures, and weekly builder sessions.' },
]

export default function About() {
  return (
    <>
      <Navbar />
      <div className="content-page">
        <h1>About Us</h1>
        <p className="page-subtitle">Empowering students to explore blockchain and crypto together.</p>
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
        <Reveal>
          <div className="cta-group" style={{ justifyContent: 'center' }}>
            <Link to="/" className="btn-large btn-primary">Back to Home →</Link>
          </div>
        </Reveal>
      </div>
      <HeroBg />
      <Footer />
    </>
  )
}
