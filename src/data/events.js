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

export async function fetchFeaturedEvent(signal) {
  try {
    const { data, error } = await supabase.from('events').select('*', { signal })
    if (error) throw error
    if (!data || data.length === 0) return null

    const upcoming = data.filter(isUpcoming).sort(
      (a, b) => toDate(a) - toDate(b)
    )

    const featured = upcoming.find(e => e.featured) || upcoming[0]
    return featured ? mapEvent(featured) : null
  } catch (e) {
    console.error('Failed to fetch featured event:', e)
    return null
  }
}
