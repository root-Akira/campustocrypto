import { supabase } from '@/lib/supabase'
import type { Event, EventFormData, DashboardStats } from '@/types'

export async function fetchEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
  if (error) throw error
  if (!data) return []

  const now = new Date()
  const upcoming = data
    .filter(e => new Date(`${e.date}T${e.time || '00:00'}`) > now)
    .sort((a, b) => new Date(`${a.date}T${a.time || '00:00'}`).getTime() - new Date(`${b.date}T${b.time || '00:00'}`).getTime())
  const past = data
    .filter(e => new Date(`${e.date}T${e.time || '00:00'}`) <= now)
    .sort((a, b) => new Date(`${b.date}T${b.time || '00:00'}`).getTime() - new Date(`${a.date}T${a.time || '00:00'}`).getTime())

  return [...upcoming, ...past]
}

export async function fetchEvent(id: string): Promise<Event | null> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export async function createEvent(event: EventFormData): Promise<Event> {
  const { data, error } = await supabase
    .from('events')
    .insert(event)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateEvent(id: string, event: Partial<EventFormData & { featured: boolean }>): Promise<Event> {
  const { data, error } = await supabase
    .from('events')
    .update(event)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteEvent(id: string) {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id)
  if (error) throw error
}

const HOMEPAGE_LIMIT = 3

export async function countHomepageEvents(): Promise<number> {
  const { data, error } = await supabase.from('events').select('id').eq('show_on_homepage', true)
  if (error) throw error
  return data?.length ?? 0
}

export async function uploadImage(file: File, path: string): Promise<string> {
  const { error } = await supabase.storage
    .from('events')
    .upload(path, file, { upsert: true })
  if (error) throw error

  const { data: url } = supabase.storage
    .from('events')
    .getPublicUrl(path)

  return url.publicUrl
}

export async function deleteImage(path: string) {
  const { error } = await supabase.storage
    .from('events')
    .remove([path])
  if (error) throw error
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const { data: all, error } = await supabase
    .from('events')
    .select('*')
  if (error) throw error

  const now = new Date()
  const upcoming = all?.filter(e => new Date(`${e.date}T${e.time}`) > now) ?? []
  const previous = all?.filter(e => new Date(`${e.date}T${e.time}`) <= now) ?? []
  const featured = all?.find(e => e.featured) ?? null

  return {
    total_events: all?.length ?? 0,
    upcoming_events: upcoming.length,
    previous_events: previous.length,
    featured_event: featured,
  }
}

export async function setFeaturedEvent(id: string | null) {
  if (id) {
    const { error: unsetAll } = await supabase
      .from('events')
      .update({ featured: false })
      .neq('id', id)
    if (unsetAll) throw unsetAll

    return updateEvent(id, { featured: true })
  } else {
    const { error } = await supabase
      .from('events')
      .update({ featured: false })
      .eq('featured', true)
    if (error) throw error
    return null
  }
}
