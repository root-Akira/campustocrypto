import Layout from '../components/Layout'
import HeroSection from '../sections/HeroSection'
import AboutSection from '../sections/AboutSection'
import EventsSection from '../sections/EventsSection'
import ResourcesSection from '../sections/ResourcesSection'
import BlogSection from '../sections/BlogSection'
import TeamSection from '../sections/TeamSection'
import FAQSection from '../sections/FAQSection'
import JoinSection from '../sections/JoinSection'

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <ResourcesSection />
      <BlogSection />
      <TeamSection />
      <FAQSection />
      <JoinSection />
    </Layout>
  )
}
