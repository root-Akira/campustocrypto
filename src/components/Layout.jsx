import Navbar from './Navbar'
import Footer from './Footer'
import HeroBg from './HeroBg'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <HeroBg />
      <Footer />
    </>
  )
}
