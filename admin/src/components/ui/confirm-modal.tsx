import { Modal } from './modal'

interface ConfirmModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  loading?: boolean
}

export function ConfirmModal({ open, onClose, onConfirm, title, message, loading }: ConfirmModalProps) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-sm opacity-80 mb-6">{message}</p>
      <div className="flex gap-3 justify-end">
        <button className="btn-ghost px-5 py-2 rounded-xl text-sm" onClick={onClose}>Cancel</button>
        <button
          className="btn-accent px-5 py-2 rounded-xl text-sm disabled:opacity-50"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </Modal>
  )
}
