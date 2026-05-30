import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEvent, useSetFeatured, useDeleteEvent } from '@/hooks/useEvents'
import { Skeleton } from '@/components/ui/skeleton'
import { ConfirmModal } from '@/components/ui/confirm-modal'
import { useToast } from '@/components/ui/toast'
import { formatDate, formatTime } from '@/lib/utils'
import { Edit2, ArrowLeft, Star, StarOff, Trash2 } from 'lucide-react'

export default function EventDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: event, isLoading } = useEvent(id!)
  const setFeatured = useSetFeatured()
  const deleteEvent = useDeleteEvent()
  const { toast } = useToast()
  const [showDelete, setShowDelete] = useState(false)

  const handleToggleFeatured = async () => {
    if (!event) return
    try {
      if (event.featured) {
        await setFeatured.mutateAsync(null)
        toast('Featured event removed')
      } else {
        await setFeatured.mutateAsync(event.id)
        toast('Event set as featured')
      }
    } catch {
      toast('Failed to update featured status', 'error')
    }
  }

  const handleDelete = async () => {
    if (!event) return
    try {
      await deleteEvent.mutateAsync(event.id)
      toast('Event deleted')
      navigate('/events')
    } catch {
      toast('Failed to delete event', 'error')
    }
  }

  if (isLoading) {
    return (
      <div className="glass rounded-2xl p-6 space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-6 w-32" />
      </div>
    )
  }

  if (!event) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <p className="text-red-400 font-bold mb-4">Event not found</p>
        <Link to="/events" className="btn-accent px-5 py-2 rounded-xl text-sm">Back to Events</Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Link to="/events" className="inline-flex items-center gap-1 text-sm opacity-60 hover:opacity-100 transition-opacity">
        <ArrowLeft size={16} /> Back to Events
      </Link>

      <div className="glass rounded-2xl overflow-hidden">
        {event.cover_image && (
          <img src={event.cover_image} alt={event.title} className="w-full h-48 sm:h-64 object-cover" />
        )}
        <div className="p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold">{event.title}</h1>
              {event.featured && (
                <span className="text-xs uppercase tracking-wider text-[var(--accent-color)] font-bold">Featured Event</span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleToggleFeatured}
                className={`btn-ghost px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 ${event.featured ? 'text-yellow-400' : ''}`}
                disabled={setFeatured.isPending}
              >
                {event.featured ? <StarOff size={14} /> : <Star size={14} />}
                {event.featured ? 'Remove Featured' : 'Set as Featured'}
              </button>
              <Link to={`/events/edit/${event.id}`} className="btn-ghost px-4 py-2 rounded-xl text-xs flex items-center gap-1.5">
                <Edit2 size={14} /> Edit
              </Link>
              <button
                onClick={() => setShowDelete(true)}
                className="btn-ghost px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 text-red-400"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-xs uppercase tracking-wider opacity-60 block font-bold">Date</span>
              <span>{formatDate(event.date)}</span>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider opacity-60 block font-bold">Time</span>
              <span>{formatTime(event.time)}</span>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider opacity-60 block font-bold">Location</span>
              <span>{event.location}</span>
            </div>
          </div>

          {event.registration_link && (
            <div>
              <span className="text-xs uppercase tracking-wider opacity-60 block font-bold mb-1">Registration Link</span>
              <a href={event.registration_link} target="_blank" rel="noopener noreferrer" className="text-[var(--accent-color)] text-sm break-all hover:underline">
                {event.registration_link}
              </a>
            </div>
          )}

          <div>
            <span className="text-xs uppercase tracking-wider opacity-60 block font-bold mb-1">Description</span>
            <p className="text-sm opacity-80 whitespace-pre-wrap">{event.description}</p>
          </div>
        </div>
      </div>

      <ConfirmModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Event"
        message="Are you sure you want to delete this event? This action cannot be undone."
        loading={deleteEvent.isPending}
      />
    </div>
  )
}
