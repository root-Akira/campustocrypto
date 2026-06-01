import { supabase } from '../lib/supabase'

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
    if (!data || data.length === 0) return []

    return data
      .filter(isUpcoming)
      .sort((a, b) => new Date(`${a.date}T${a.time || '00:00'}`) - new Date(`${b.date}T${b.time || '00:00'}`))
      .map(mapEvent)
  } catch {
    return []
  }
}

export async function fetchAllEvents() {
  try {
    const { data, error } = await supabase.from('events').select('*')
    if (error) throw error
    if (!data || data.length === 0) return []

    const mapped = data.map(mapEvent)
    const upcoming = mapped.filter(e => isUpcoming(e))
    const past = mapped.filter(e => !isUpcoming(e))

    return [...upcoming, ...past]
  } catch {
    return []
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
