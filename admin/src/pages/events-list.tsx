import { useState } from 'react'
import { useEvents, useDeleteEvent } from '@/hooks/useEvents'
import { EventTable } from '@/components/shared/event-table'
import { ConfirmModal } from '@/components/ui/confirm-modal'
import { TableSkeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/toast'

export default function EventsList() {
  const { data: events, isLoading, error } = useEvents()
  const deleteEvent = useDeleteEvent()
  const { toast } = useToast()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await deleteEvent.mutateAsync(deleteId)
      toast('Event deleted')
      setDeleteId(null)
    } catch {
      toast('Failed to delete event', 'error')
    }
  }

  if (error) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <p className="text-red-400 font-bold mb-2">Failed to load events</p>
        <p className="text-sm opacity-60">Make sure the events table exists in Supabase.</p>
      </div>
    )
  }

  return (
    <div>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <EventTable
          events={events ?? []}
          onDelete={(id) => setDeleteId(id)}
        />
      )}

      <ConfirmModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Event"
        message="Are you sure you want to delete this event? This action cannot be undone."
        loading={deleteEvent.isPending}
      />
    </div>
  )
}
