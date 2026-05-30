import { supabase } from '../lib/supabase'

export const fallbackEvents = [
  { icon: '📅', title: 'Weekly Builder Sessions', text: 'Every Saturday at 3 PM. Bring your laptop and build something in web3. All skill levels welcome.' },
  { icon: '📖', title: 'Blockchain Fundamentals', text: 'Monthly workshop series covering Bitcoin, Ethereum, smart contracts, and DeFi basics. Next session: June 10.' },
  { icon: '⚡', title: 'Crypto Hackathon', text: '48-hour buildathon in July. Form a team, build a dApp, and win prizes. Registration opens June 15.' },
  { icon: '🎤', title: 'Guest Speaker Series', text: 'Industry leaders share their journey into crypto. Past speakers include founders, engineers, and researchers.' },
  { icon: '☕', title: 'Crypto Coffee Chat', text: 'Casual Friday meetups. No agenda — just good conversations about crypto over coffee.' },
  { icon: '🏆', title: 'Protocol Deep Dives', text: 'Bi-weekly deep dives into specific protocols. Past topics: Solana, L2s, zk-proofs, and oracles.' },
  { icon: '🔧', title: 'Hands-on Workshop: Build a dApp', text: 'Learn to build a full-stack decentralized application from scratch. All tools and resources provided.' },
  { icon: '🌐', title: 'Web3 Networking Night', text: 'Connect with blockchain professionals, alumni, and fellow students over food and conversations.' },
  { icon: '🧠', title: 'Crypto Trivia & Quiz Night', text: 'Test your crypto knowledge and win prizes. Fun for beginners and experts alike.' },
]

function mapEvent(e) {
  return {
    id: e.id,
    title: e.title,
    text: e.description,
    date: e.date,
    time: e.time,
    location: e.location,
    registration_link: e.registration_link,
    cover_image: e.cover_image,
    featured: e.featured,
    icon: '📌',
  }
}

function isUpcoming(e) {
  return new Date(`${e.date}T${e.time || '00:00'}`) > new Date()
}

export async function fetchUpcomingEvents() {
  try {
    const { data, error } = await supabase.from('events').select('*')
    if (error) throw error
    if (!data || data.length === 0) return fallbackEvents

    const upcoming = data
      .filter(isUpcoming)
      .sort((a, b) => new Date(`${a.date}T${a.time || '00:00'}`) - new Date(`${b.date}T${b.time || '00:00'}`))
      .map(mapEvent)

    return upcoming.length ? upcoming : fallbackEvents
  } catch {
    return fallbackEvents
  }
}

export async function fetchAllEvents() {
  try {
    const { data, error } = await supabase.from('events').select('*')
    if (error) throw error
    if (!data || data.length === 0) return fallbackEvents

    const mapped = data.map(mapEvent)
    const upcoming = mapped.filter(e => isUpcoming(e))
    const past = mapped.filter(e => !isUpcoming(e))

    return [...upcoming, ...past]
  } catch {
    return fallbackEvents
  }
}

export async function fetchFeaturedEvent() {
  try {
    const { data, error } = await supabase.from('events').select('*')
    if (error) throw error
    if (!data || data.length === 0) return null

    const upcoming = data.filter(isUpcoming).sort(
      (a, b) => new Date(`${a.date}T${a.time || '00:00'}`) - new Date(`${b.date}T${b.time || '00:00'}`)
    )

    const featured = upcoming.find(e => e.featured) || upcoming[0]
    return featured ? mapEvent(featured) : null
  } catch {
    return null
  }
}
