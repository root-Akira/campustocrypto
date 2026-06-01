export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  registration_link?: string
  cover_image?: string
  featured: boolean
  show_on_homepage: boolean
  created_at: string
  updated_at: string
}

export type EventFormData = Omit<Event, 'id' | 'featured' | 'created_at' | 'updated_at'>

export interface DashboardStats {
  total_events: number
  upcoming_events: number
  previous_events: number
  featured_event: Event | null
}

export interface AuthUser {
  id: string
  email: string
}
