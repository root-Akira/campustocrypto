import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Calendar, CalendarPlus, CalendarCheck, CalendarX, LogOut, Sun, Moon,
} from 'lucide-react'

interface SidebarProps {
  dark: boolean
  toggleTheme: () => void
  onSignOut: () => void
  open: boolean
  onClose: () => void
}

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/events', label: 'All Events', icon: Calendar },
  { to: '/events/create', label: 'Create Event', icon: CalendarPlus },
  { to: '/events/upcoming', label: 'Upcoming', icon: CalendarCheck },
  { to: '/events/previous', label: 'Previous', icon: CalendarX },
]

export function Sidebar({ dark, toggleTheme, onSignOut, open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={onClose} />
      )}
      <aside className={`
        fixed top-0 left-0 z-40 h-full glass flex flex-col
        transition-transform duration-300 w-[260px]
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex items-center gap-2 px-5 h-16 border-b border-[var(--glass-border)] shrink-0">
          <div className="w-7 h-7 rounded-lg bg-[var(--accent-color)] flex items-center justify-center text-white text-xs font-bold">
            C2C
          </div>
          <span className="font-bold text-sm">Admin</span>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[var(--accent-color)] text-white'
                    : 'hover:bg-[var(--glass-bg)] opacity-70 hover:opacity-100'
                }`
              }
            >
              <l.icon size={18} />
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-[var(--glass-border)] space-y-1 shrink-0">
          <button onClick={toggleTheme} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-[var(--glass-bg)] opacity-70 hover:opacity-100 w-full transition-all">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
            {dark ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button onClick={onSignOut} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-[var(--glass-bg)] opacity-70 hover:opacity-100 w-full transition-all text-red-400">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
