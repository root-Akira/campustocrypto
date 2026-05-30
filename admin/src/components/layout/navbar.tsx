import { Menu } from 'lucide-react'

interface NavbarProps {
  title: string
  onMenuClick: () => void
}

export function Navbar({ title, onMenuClick }: NavbarProps) {
  return (
    <header className="h-16 flex items-center gap-3 px-5 border-b border-[var(--glass-border)] glass rounded-b-2xl mb-6 shrink-0">
      <button className="lg:hidden" onClick={onMenuClick}>
        <Menu size={20} />
      </button>
      <h1 className="text-lg font-bold truncate">{title}</h1>
    </header>
  )
}
