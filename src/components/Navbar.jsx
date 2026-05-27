import { useState } from 'react'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#events', label: 'Events' },
  { href: '#resources', label: 'Resources' },
  { href: '#blog', label: 'Blog' },
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

  const handleClick = (href) => {
    setOpen(false)
    scrollTo(href)
  }

  return (
    <nav>
      <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); scrollTo('#home') }}>CampustoCrypto</a>
      <button className="mobile-toggle" onClick={() => setOpen((v) => !v)}>☰</button>
      <div className={`nav-links${open ? ' open' : ''}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); handleClick(l.href) }}>{l.label}</a>
        ))}
      </div>
      <a href="#join" className="btn-small" onClick={(e) => { e.preventDefault(); scrollTo('#join') }}>Join Us →</a>
    </nav>
  )
}
