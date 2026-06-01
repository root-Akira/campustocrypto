import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useEvent, useUpdateEvent } from '@/hooks/useEvents'
import { EventForm } from '@/components/shared/event-form'
import { uploadImage, countHomepageEvents } from '@/services/events'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/toast'
import type { EventFormData } from '@/types'

export default function EventEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: event, isLoading } = useEvent(id!)
  const updateEvent = useUpdateEvent()
  const { toast } = useToast()
  const [uploading, setUploading] = useState(false)
  const [uploadedPath, setUploadedPath] = useState<string>('')

  const handleImageUpload = async (file: File) => {
    setUploading(true)
    try {
      const path = `events/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const url = await uploadImage(file, path)
      setUploadedPath(url)
      toast('Image uploaded')
    } catch {
      toast('Failed to upload image', 'error')
    } finally {
      setUploading(false)
    }
  }

  const handleImageRemove = () => {
    setUploadedPath('')
  }

  const handleSubmit = async (data: EventFormData) => {
    if (!id || !event) return
    if (data.show_on_homepage && !event.show_on_homepage) {
      const count = await countHomepageEvents()
      if (count >= 3) {
        toast('Only 3 events can be shown on the homepage. Uncheck another event first.', 'error')
        return
      }
    }
    try {
      await updateEvent.mutateAsync({
        id,
        data: { ...data, cover_image: uploadedPath || event?.cover_image || undefined },
      })
      toast('Event updated')
      navigate('/events')
    } catch {
      toast('Failed to update event', 'error')
    }
  }

  if (isLoading) {
    return (
      <div className="glass rounded-2xl p-6 space-y-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    )
  }

  if (!event) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <p className="text-red-400 font-bold">Event not found</p>
      </div>
    )
  }

  return (
    <EventForm
      defaultValues={{
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        location: event.location,
        registration_link: event.registration_link ?? '',
        cover_image: event.cover_image ?? '',
        show_on_homepage: event.show_on_homepage,
      }}
      onSubmit={handleSubmit}
      onImageUpload={handleImageUpload}
      onImageRemove={handleImageRemove}
      loading={updateEvent.isPending}
      uploading={uploading}
      currentImage={uploadedPath || event.cover_image}
    />
  )
}
