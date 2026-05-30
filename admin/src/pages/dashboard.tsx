import { Link } from 'react-router-dom'
import { Calendar, CalendarCheck, CalendarX, Star } from 'lucide-react'
import { useDashboardStats, useSetFeatured } from '@/hooks/useEvents'
import { CardSkeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/toast'
import { formatDate, formatTime } from '@/lib/utils'

export default function Dashboard() {
  const { data, isLoading, error } = useDashboardStats()
  const setFeatured = useSetFeatured()
  const { toast } = useToast()

  const handleUnfeature = async () => {
    try {
      await setFeatured.mutateAsync(null)
      toast('Featured event removed')
    } catch {
      toast('Failed to update featured event', 'error')
    }
  }

  if (error) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <p className="text-red-400 font-bold mb-2">Failed to load dashboard</p>
        <p className="text-sm opacity-60">Make sure Supabase is configured correctly.</p>
      </div>
    )
  }

  const cards = [
    { label: 'Total Events', value: data?.total_events ?? 0, icon: Calendar, color: 'text-blue-400' },
    { label: 'Upcoming', value: data?.upcoming_events ?? 0, icon: CalendarCheck, color: 'text-green-400' },
    { label: 'Previous', value: data?.previous_events ?? 0, icon: CalendarX, color: 'text-orange-400' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {isLoading ? (
          <>
            <CardSkeleton /><CardSkeleton /><CardSkeleton />
          </>
        ) : (
          cards.map(c => (
            <div key={c.label} className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider opacity-60 font-bold">{c.label}</span>
                <c.icon size={20} className={c.color} />
              </div>
              <p className="text-3xl font-bold">{c.value}</p>
            </div>
          ))
        )}
      </div>

      {isLoading ? (
        <CardSkeleton />
      ) : data?.featured_event ? (
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider">Featured Event</h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            {data.featured_event.cover_image && (
              <img src={data.featured_event.cover_image} alt="" className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg">{data.featured_event.title}</h3>
              <p className="text-sm opacity-70 mt-1">
                {formatDate(data.featured_event.date)} at {formatTime(data.featured_event.time)} — {data.featured_event.location}
              </p>
              {data.featured_event.description && (
                <p className="text-sm opacity-60 mt-2 line-clamp-2">{data.featured_event.description}</p>
              )}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Link to={`/events/edit/${data.featured_event.id}`} className="btn-ghost px-4 py-2 rounded-xl text-xs">
                Edit
              </Link>
              <button
                onClick={handleUnfeature}
                className="btn-ghost px-4 py-2 rounded-xl text-xs text-red-400"
                disabled={setFeatured.isPending}
              >
                Remove Featured
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass rounded-2xl p-6 text-center">
          <Star size={24} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm opacity-60">No featured event set.</p>
          <Link to="/events" className="text-sm text-[var(--accent-color)] font-bold mt-2 inline-block">
            Go to Events →
          </Link>
        </div>
      )}
    </div>
  )
}
