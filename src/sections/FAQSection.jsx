import { useState } from 'react'
import Reveal from '../components/Reveal'

const faqs = [
  { q: 'Do I need to know anything about crypto to join?', a: 'Not at all! We welcome complete beginners. Our workshops start from the very basics and work up from there.' },
  { q: 'Is this only for CS/tech students?', a: 'No — we welcome students from all majors: business, design, law, economics, and beyond. Crypto touches everything.' },
  { q: 'Is there a membership fee?', a: 'Zero. CampustoCrypto is completely free for all students.' },
  { q: 'How often do you meet?', a: 'We have weekly builder sessions every Saturday, bi-weekly deep dives, monthly workshops, and casual Friday coffee chats.' },
  { q: 'Can I start a chapter at my university?', a: 'Yes! We\'re working on a chapter program. Reach out on the join form and we\'ll help you get started.' },
  { q: 'What should I bring to my first meetup?', a: 'Just yourself and curiosity. A laptop is helpful for builder sessions but not required.' },
]

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item${open ? ' open' : ''}`} onClick={() => setOpen(!open)}>
      <div className="faq-question">
        <span>{faq.q}</span>
        <span className="faq-arrow">{open ? '−' : '+'}</span>
      </div>
      {open && <div className="faq-answer">{faq.a}</div>}
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
          {faqs.map((faq, i) => (
            <FaqItem key={i} faq={faq} />
          ))}
        </div>
      </Reveal>
    </section>
  )
}
