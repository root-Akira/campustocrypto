import Layout from '../components/Layout'
import HeroSection from '../sections/HeroSection'
import NumbersSection from '../sections/NumbersSection'
import JourneySection from '../sections/JourneySection'
import PartnersSection from '../sections/PartnersSection'
import GallerySection from '../sections/GallerySection'
import TeamSection from '../sections/TeamSection'
import FAQSection from '../sections/FAQSection'
import JoinSection from '../sections/JoinSection'

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <NumbersSection />
      <JourneySection />
      <PartnersSection />
      <GallerySection />
      <TeamSection />
      <FAQSection />
      <JoinSection />
    </Layout>
  )
}
