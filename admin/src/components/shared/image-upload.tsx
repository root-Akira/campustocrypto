import { useState, useRef, useCallback } from 'react'

interface ImageUploadProps {
  currentImage?: string
  onUpload: (file: File) => void
  onRemove: () => void
  uploading?: boolean
}

const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE = 10 * 1024 * 1024

export function ImageUpload({ currentImage, onUpload, onRemove, uploading }: ImageUploadProps) {
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const validate = useCallback((file: File) => {
    setError(null)
    if (!ACCEPTED.includes(file.type)) {
      setError('Only JPG, PNG, and WEBP are allowed')
      return false
    }
    if (file.size > MAX_SIZE) {
      setError('File size must be under 10MB')
      return false
    }
    return true
  }, [])

  const handleFile = useCallback((file: File) => {
    if (!validate(file)) return
    const obj = URL.createObjectURL(file)
    setPreview(obj)
    onUpload(file)
  }, [validate, onUpload])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }, [handleFile])

  const handleRemove = useCallback(() => {
    setPreview(null)
    setError(null)
    onRemove()
  }, [onRemove])

  const displayUrl = preview || currentImage

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
          transition-all duration-200
          ${dragOver ? 'border-[var(--accent-color)] bg-[var(--accent-color)]/5' : 'border-[var(--glass-border)]'}
          ${displayUrl ? 'p-2' : 'p-8'}
        `}
      >
        {displayUrl ? (
          <div className="relative group">
            <img src={displayUrl} alt="Preview" className="max-h-48 mx-auto rounded-lg object-contain" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-3">
              <span className="text-white text-sm font-bold">Click to change</span>
            </div>
          </div>
        ) : (
          <div className="text-sm opacity-60">
            <svg className="mx-auto mb-3" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p>Drag and drop or click to upload</p>
            <p className="mt-1 opacity-50">JPG, PNG, WEBP up to 10MB</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          className="hidden"
          onChange={handleChange}
        />
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      {displayUrl && (
        <div className="flex gap-2 mt-2">
          <button
            type="button"
            className="text-xs btn-ghost px-3 py-1.5 rounded-lg"
            onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Replace'}
          </button>
          <button
            type="button"
            className="text-xs btn-ghost px-3 py-1.5 rounded-lg text-red-500"
            onClick={(e) => { e.stopPropagation(); handleRemove() }}
            disabled={uploading}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  )
}
