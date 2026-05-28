import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroBg from '../components/HeroBg'

export default function Blog() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Navbar />
      <div className="content-page" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1, paddingTop: '60px' }}>
        <h1>Coming Soon.....</h1>
        <p className="page-subtitle">Our blog is in the works. Stay tuned for articles, tutorials, and updates!</p>
      </div>
      <HeroBg />
      <Footer />
    </div>
  )
}
