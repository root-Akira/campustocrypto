import { supabase } from '../lib/supabase'

function mapItem(item) {
  return {
    id: item.id,
    image_url: item.image_url,
    caption: item.caption,
    event_name: item.event_name,
    created_at: item.created_at,
  }
}

export async function fetchGallery(signal) {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*', { signal })
      .order('created_at', { ascending: false })
    if (error) throw error
    return (data ?? []).map(mapItem)
  } catch (e) {
    console.error('Failed to fetch gallery:', e)
    return []
  }
}

export async function fetchHomepageGallery(signal) {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*', { signal })
      .order('created_at', { ascending: false })
      .limit(6)
    if (error) throw error
    return (data ?? []).map(mapItem)
  } catch (e) {
    console.error('Failed to fetch homepage gallery:', e)
    return []
  }
}
