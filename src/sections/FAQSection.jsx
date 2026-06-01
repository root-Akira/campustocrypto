import { useState } from 'react'
import Reveal from '../components/Reveal'

const faqs = [
  { q: 'Where do events, workshops, and hackathons happen? Can I join?', a: 'Events, workshops, and hackathons are held at Centurion University and are open to everyone — anybody can join!' },
  { q: 'Do I need to know anything about crypto to join?', a: 'Not at all! We welcome complete beginners. Our workshops start from the very basics and work up from there.' },
  { q: 'Is this only for CS/tech students?', a: 'No — we welcome students from all majors: business, design, law, economics, and beyond. Crypto touches everything.' },
  { q: 'Is there a membership fee?', a: 'Zero. CampustoCrypto is completely free for all students.' },
  { q: 'Can I start a chapter at my university?', a: 'Yes! We\'re working on a chapter program. Reach out on the join form and we\'ll help you get started.' },
]

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(v => !v)
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button className="faq-question" onClick={toggle} aria-expanded={open}>
        <span>{faq.q}</span>
        <span className="faq-arrow">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="faq-answer" role="region">{faq.a}</div>}
    </div>
  )
}

export default function FAQSection() {
  return (
    <section id="faq" className="content-page">
      <h1>FAQ</h1>
      <p className="page-subtitle">Got questions? We've got answers.</p>
      <Reveal>
        <div className="faq-list">
          {faqs.map((faq) => (
            <FaqItem key={faq.q} faq={faq} />
          ))}
        </div>
      </Reveal>
    </section>
  )
}
