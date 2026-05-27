import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroBg from '../components/HeroBg'

export default function Register() {
  return (
    <>
      <Navbar />
      <div className="content-page" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <h1>Coming Soon.....</h1>
        <p className="page-subtitle">We're working on something exciting. Stay tuned!</p>
        <Link to="/" className="btn-large btn-primary">Back to Home →</Link>
      </div>
      <HeroBg />
      <Footer />
    </>
  )
}
