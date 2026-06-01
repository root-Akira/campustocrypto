import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ImageUpload } from './image-upload'
import type { EventFormData } from '@/types'

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  location: z.string().min(1, 'Location is required'),
  registration_link: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  cover_image: z.string().optional(),
  show_on_homepage: z.boolean(),
})

interface EventFormProps {
  defaultValues?: Partial<EventFormData>
  onSubmit: (data: EventFormData) => void
  onImageUpload: (file: File) => void
  onImageRemove: () => void
  loading?: boolean
  uploading?: boolean
  currentImage?: string
}

export function EventForm({
  defaultValues,
  onSubmit,
  onImageUpload,
  onImageRemove,
  loading,
  uploading,
  currentImage,
}: EventFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<EventFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      registration_link: '',
      cover_image: '',
      show_on_homepage: false,
      ...defaultValues,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="glass rounded-2xl p-6 space-y-5">
        <h2 className="text-sm font-bold uppercase tracking-wider opacity-60">Event Details</h2>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider opacity-60 block mb-1.5">Title</label>
          <input {...register('title')} className="w-full bg-transparent border border-[var(--glass-border)] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[var(--accent-color)] transition-colors" placeholder="Event title" />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider opacity-60 block mb-1.5">Description</label>
          <textarea {...register('description')} rows={4} className="w-full bg-transparent border border-[var(--glass-border)] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[var(--accent-color)] transition-colors resize-none" placeholder="Describe the event..." />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider opacity-60 block mb-1.5">Date</label>
            <input type="date" {...register('date')} className="w-full bg-transparent border border-[var(--glass-border)] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[var(--accent-color)] transition-colors" />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider opacity-60 block mb-1.5">Time</label>
            <input type="time" {...register('time')} className="w-full bg-transparent border border-[var(--glass-border)] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[var(--accent-color)] transition-colors" />
            {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider opacity-60 block mb-1.5">Location</label>
          <input {...register('location')} className="w-full bg-transparent border border-[var(--glass-border)] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[var(--accent-color)] transition-colors" placeholder="Event location" />
          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider opacity-60 block mb-1.5">Registration Link (optional)</label>
          <input {...register('registration_link')} className="w-full bg-transparent border border-[var(--glass-border)] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[var(--accent-color)] transition-colors" placeholder="https://..." />
          {errors.registration_link && <p className="text-red-500 text-xs mt-1">{errors.registration_link.message}</p>}
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" {...register('show_on_homepage')} className="w-4 h-4 rounded border-[var(--glass-border)] text-[var(--accent-color)] focus:ring-[var(--accent-color)]" />
          <span className="text-xs font-bold uppercase tracking-wider opacity-60">Show on Homepage</span>
        </label>
      </div>

      <div className="glass rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider opacity-60">Cover Image</h2>
        <ImageUpload
          currentImage={currentImage}
          onUpload={onImageUpload}
          onRemove={onImageRemove}
          uploading={uploading}
        />
      </div>

      <div className="flex justify-end gap-3">
        <button type="submit" className="btn-accent px-8 py-3 rounded-xl text-sm disabled:opacity-50" disabled={loading || uploading}>
          {loading ? 'Saving...' : 'Save Event'}
        </button>
      </div>
    </form>
  )
}
