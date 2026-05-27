import Layout from '../components/Layout'
import HeroSection from '../sections/HeroSection'
import NumbersSection from '../sections/NumbersSection'
import JourneySection from '../sections/JourneySection'
import PartnersSection from '../sections/PartnersSection'
import EventsSection from '../sections/EventsSection'
import BlogSection from '../sections/BlogSection'
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
      <EventsSection />
      <BlogSection />
      <TeamSection />
      <FAQSection />
      <JoinSection />
    </Layout>
  )
}
