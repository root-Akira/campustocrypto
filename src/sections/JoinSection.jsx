import { useState } from 'react'
import Reveal from '../components/Reveal'

const initial = { name: '', email: '', university: '', interest: '', message: '' }

export default function JoinSection() {
  const [form, setForm] = useState(initial)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section id="join" className="content-page" style={{ textAlign: 'center' }}>
        <h1>You're In! 🎉</h1>
        <p className="page-subtitle">Thanks {form.name}! We'll be in touch soon.</p>
      </section>
    )
  }

  return (
    <section id="join" className="content-page">
      <h1>Join Us</h1>
      <p className="page-subtitle">Ready to dive in? We'd love to have you.</p>
      <Reveal>
        <form className="join-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
          <input type="text" name="university" placeholder="University / College" value={form.university} onChange={handleChange} />
          <input type="text" name="interest" placeholder="Your Interest (e.g., DeFi, NFTs, Development)" value={form.interest} onChange={handleChange} />
          <textarea name="message" placeholder="What excites you about crypto?" value={form.message} onChange={handleChange} />
          <button type="submit" className="btn-large btn-primary">Send →</button>
        </form>
      </Reveal>
    </section>
  )
}
