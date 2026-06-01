import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './sidebar'
import { Navbar } from './navbar'

interface DashboardLayoutProps {
  onSignOut: () => void
}

const titles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/events': 'All Events',
  '/events/create': 'Create Event',
  '/events/upcoming': 'Upcoming Events',
  '/events/previous': 'Previous Events',
}

export function DashboardLayout({ onSignOut }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { pathname } = useLocation()

  const isEdit = pathname.startsWith('/events/edit/')
  const isDetails = pathname.startsWith('/events/') && !isEdit && pathname !== '/events' && pathname !== '/events/create' && pathname !== '/events/upcoming' && pathname !== '/events/previous'

  let title = titles[pathname]
  if (isEdit) title = 'Edit Event'
  else if (isDetails) title = 'Event Details'
  else if (!title) title = 'Dashboard'

  return (
    <div className="min-h-screen flex">
      <Sidebar
        onSignOut={onSignOut}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-h-screen lg:ml-[260px]">
        <Navbar title={title} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 px-5 pb-8 max-w-6xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
