import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#numbers', label: 'Numbers' },
  { href: '#journey', label: 'Journey' },
  { href: '#partners', label: 'Partners' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#team', label: 'Team' },
  { href: '#faq', label: 'FAQ' },
]

function scrollTo(id) {
  const el = document.querySelector(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isHome = pathname === '/'

  const handleClick = (href) => {
    setOpen(false)
    if (isHome) {
      scrollTo(href)
    } else {
      navigate('/')
    }
  }

  return (
    <nav>
      {isHome ? (
        <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); scrollTo('#home') }}>CampustoCrypto</a>
      ) : (
        <Link to="/" className="logo">CampustoCrypto</Link>
      )}
      <button className="mobile-toggle" onClick={() => setOpen((v) => !v)} aria-label="Toggle navigation" aria-expanded={open}>☰</button>
      <div className={`nav-links${open ? ' open' : ''}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); handleClick(l.href) }}>{l.label}</a>
        ))}
        <Link to="/about" onClick={() => setOpen(false)}>About Us</Link>
      </div>
      {isHome ? (
        <a href="#join" className="btn-small" onClick={(e) => { e.preventDefault(); scrollTo('#join') }}>Join Us →</a>
      ) : (
        <Link to="/" className="btn-small">Back to Home →</Link>
      )}
    </nav>
  )
}
