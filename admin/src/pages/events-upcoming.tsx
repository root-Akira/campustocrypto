import { useEvents } from '@/hooks/useEvents'
import { TableSkeleton } from '@/components/ui/skeleton'
import { formatDate, formatTime } from '@/lib/utils'
import { CalendarCheck, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function UpcomingEvents() {
  const { data: events, isLoading, error } = useEvents()

  const now = new Date()
  const upcoming = (events ?? [])
    .filter(e => new Date(`${e.date}T${e.time}`) > now)
    .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime())

  if (isLoading) return <TableSkeleton />

  if (error) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <p className="text-red-400 font-bold">Failed to load events</p>
      </div>
    )
  }

  if (upcoming.length === 0) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <CalendarCheck size={32} className="mx-auto mb-3 opacity-30" />
        <p className="font-bold mb-1">No upcoming events</p>
        <p className="text-sm opacity-60 mb-4">Create a new event to get started.</p>
        <Link to="/events/create" className="btn-accent px-5 py-2 rounded-xl text-sm">Create Event</Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {upcoming.map(e => (
        <Link to={`/events/${e.id}`} key={e.id} className="glass rounded-2xl overflow-hidden hover:translate-y-[-2px] transition-all">
          {e.cover_image && (
            <img src={e.cover_image} alt={e.title} className="w-full h-36 object-cover" />
          )}
          <div className="p-4 space-y-2">
            <h3 className="font-bold text-sm truncate">{e.title}</h3>
            <p className="text-xs opacity-70">{formatDate(e.date)} at {formatTime(e.time)}</p>
            <p className="text-xs opacity-50 truncate">{e.location}</p>
            {e.registration_link && (
              <div className="flex items-center gap-1 text-xs text-[var(--accent-color)] font-bold">
                <ExternalLink size={12} /> Register
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}
