import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroBg from '../components/HeroBg'

export default function Register() {
  return (
    <>
      <Navbar />
      <div className="content-page centered-page">
        <h1>Coming Soon.....</h1>
        <p className="page-subtitle">We're working on something exciting. Stay tuned!</p>
        <Link to="/" className="btn-large btn-primary">Back to Home →</Link>
      </div>
      <HeroBg />
      <Footer />
    </>
  )
}
