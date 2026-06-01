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

function toDate(e) {
  return new Date(`${e.date}T${e.time || '00:00'}`)
}

function isUpcoming(e) {
  return toDate(e) > new Date()
}

export async function fetchHomepageEvents() {
  try {
    const { data, error } = await supabase.from('events').select('*').eq('show_on_homepage', true)
    if (error) {
      if (error.code === 'PGRST204' || `${error.status}` === '400') {
        const { data: fallback } = await supabase.from('events').select('*')
        if (!fallback) return []
        return fallback
          .filter(isUpcoming)
          .sort((a, b) => toDate(a) - toDate(b))
          .slice(0, 3)
          .map(mapEvent)
      }
      throw error
    }
    if (!data || data.length === 0) return []

    return data
      .sort((a, b) => toDate(a) - toDate(b))
      .map(mapEvent)
  } catch {
    return []
  }
}

export async function fetchUpcomingEvents() {
  try {
    const { data, error } = await supabase.from('events').select('*')
    if (error) throw error
    if (!data || data.length === 0) return []

    return data
      .filter(isUpcoming)
      .sort((a, b) => toDate(a) - toDate(b))
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
    const upcoming = mapped.filter(e => isUpcoming(e)).sort((a, b) => toDate(a) - toDate(b))
    const past = mapped.filter(e => !isUpcoming(e)).sort((a, b) => toDate(b) - toDate(a))

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
      (a, b) => toDate(a) - toDate(b)
    )

    const featured = upcoming.find(e => e.featured) || upcoming[0]
    return featured ? mapEvent(featured) : null
  } catch {
    return null
  }
}
