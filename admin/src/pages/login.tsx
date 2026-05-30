import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/toast'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await signIn(email, password)
    } catch {
      toast('Invalid email or password', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass rounded-2xl p-8 max-w-sm w-full">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[var(--accent-color)] flex items-center justify-center text-white text-lg font-bold mx-auto mb-4">
            C2C
          </div>
          <h1 className="text-xl font-bold">Admin Login</h1>
          <p className="text-sm opacity-60 mt-1">CampustoCrypto Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider opacity-60 block mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-transparent border border-[var(--glass-border)] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[var(--accent-color)] transition-colors"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider opacity-60 block mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-transparent border border-[var(--glass-border)] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[var(--accent-color)] transition-colors"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="btn-accent w-full py-2.5 rounded-xl text-sm disabled:opacity-50 mt-2"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
