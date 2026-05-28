import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroBg from '../components/HeroBg'
import Reveal from '../components/Reveal'
import { events } from '../data/events'

export default function Events() {
  return (
    <>
      <Navbar />
      <div className="content-page">
        <h1>All Events</h1>
        <p className="page-subtitle">Workshops, hackathons, and meetups — there's always something happening.</p>
        <Reveal>
          <div className="card-grid">
            {events.map((item) => (
              <div className="card" key={item.title}>
                <div className="card-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <HeroBg />
      <Footer />
    </>
  )
}
