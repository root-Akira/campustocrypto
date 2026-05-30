import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateEvent } from '@/hooks/useEvents'
import { EventForm } from '@/components/shared/event-form'
import { uploadImage } from '@/services/events'
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
      const path = `events/${Date.now()}-${file.name}`
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
