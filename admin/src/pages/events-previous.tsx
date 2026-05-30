import { useEvents } from '@/hooks/useEvents'
import { TableSkeleton } from '@/components/ui/skeleton'
import { formatDate, formatTime } from '@/lib/utils'
import { CalendarX } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PreviousEvents() {
  const { data: events, isLoading, error } = useEvents()

  const now = new Date()
  const previous = (events ?? [])
    .filter(e => new Date(`${e.date}T${e.time}`) <= now)
    .sort((a, b) => new Date(`${b.date}T${b.time}`).getTime() - new Date(`${a.date}T${a.time}`).getTime())

  if (isLoading) return <TableSkeleton />

  if (error) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <p className="text-red-400 font-bold">Failed to load events</p>
      </div>
    )
  }

  if (previous.length === 0) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <CalendarX size={32} className="mx-auto mb-3 opacity-30" />
        <p className="font-bold">No previous events</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {previous.map(e => (
        <Link to={`/events/${e.id}`} key={e.id} className="glass rounded-2xl overflow-hidden opacity-75 hover:opacity-100 transition-all hover:translate-y-[-2px]">
          {e.cover_image && (
            <img src={e.cover_image} alt={e.title} className="w-full h-36 object-cover" />
          )}
          <div className="p-4 space-y-2">
            <h3 className="font-bold text-sm truncate">{e.title}</h3>
            <p className="text-xs opacity-70">{formatDate(e.date)} at {formatTime(e.time)}</p>
            <p className="text-xs opacity-50 truncate">{e.location}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
