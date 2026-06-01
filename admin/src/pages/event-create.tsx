import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateEvent } from '@/hooks/useEvents'
import { EventForm } from '@/components/shared/event-form'
import { uploadImage, countHomepageEvents } from '@/services/events'
import { useToast } from '@/components/ui/toast'
import type { EventFormData } from '@/types'

export default function EventCreate() {
  const navigate = useNavigate()
  const createEvent = useCreateEvent()
  const { toast } = useToast()
  const [uploading, setUploading] = useState(false)
  const [uploadedPath, setUploadedPath] = useState<string>('')
  const [pendingFile, setPendingFile] = useState<File | null>(null)

  const handleImageUpload = async (file: File) => {
    setPendingFile(file)
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
    setPendingFile(null)
  }

  const handleSubmit = async (data: EventFormData) => {
    if (data.show_on_homepage) {
      const count = await countHomepageEvents()
      if (count >= 3) {
        toast('Only 3 events can be shown on the homepage. Uncheck another event first.', 'error')
        return
      }
    }
    try {
      await createEvent.mutateAsync({ ...data, cover_image: uploadedPath || undefined })
      toast('Event created')
      navigate('/events')
    } catch {
      toast('Failed to create event', 'error')
    }
  }

  return (
    <EventForm
      onSubmit={handleSubmit}
      onImageUpload={handleImageUpload}
      onImageRemove={handleImageRemove}
      loading={createEvent.isPending}
      uploading={uploading}
      currentImage={uploadedPath}
    />
  )
}
