import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import Login from '@/pages/login'
import Dashboard from '@/pages/dashboard'
import EventsList from '@/pages/events-list'
import EventCreate from '@/pages/event-create'
import EventEdit from '@/pages/event-edit'
import EventDetails from '@/pages/event-details'
import UpcomingEvents from '@/pages/events-upcoming'
import PreviousEvents from '@/pages/events-previous'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="skeleton h-8 w-8 rounded-full" />
      </div>
    )
  }
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  const { signOut } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout onSignOut={signOut} />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events" element={<EventsList />} />
        <Route path="/events/create" element={<EventCreate />} />
        <Route path="/events/edit/:id" element={<EventEdit />} />
        <Route path="/events/upcoming" element={<UpcomingEvents />} />
        <Route path="/events/previous" element={<PreviousEvents />} />
        <Route path="/events/:id" element={<EventDetails />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
