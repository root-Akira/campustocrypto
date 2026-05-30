import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, ChevronDown, ChevronUp, Eye, Edit2, Trash2 } from 'lucide-react'
import type { Event } from '@/types'
import { formatDate, formatTime } from '@/lib/utils'

interface EventTableProps {
  events: Event[]
  onDelete: (id: string) => void
}

type SortKey = 'title' | 'date' | 'location'

export function EventTable({ events, onDelete }: EventTableProps) {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('date')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [page, setPage] = useState(0)
  const perPage = 10

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return events
      .filter(e => e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q))
      .sort((a, b) => {
        const aVal = a[sortKey]
        const bVal = b[sortKey]
        const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
        return sortDir === 'asc' ? cmp : -cmp
      })
  }, [events, search, sortKey, sortDir])

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice(page * perPage, (page + 1) * perPage)

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
    setPage(0)
  }

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortKey !== k) return null
    return sortDir === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
  }

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-[var(--glass-border)]">
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(0) }}
            placeholder="Search events..."
            className="w-full bg-transparent border border-[var(--glass-border)] rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:border-[var(--accent-color)] transition-colors"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--glass-border)] text-xs uppercase tracking-wider opacity-60">
              <th className="text-left p-4 cursor-pointer select-none" onClick={() => toggleSort('title')}>
                <div className="flex items-center gap-1">Title <SortIcon k="title" /></div>
              </th>
              <th className="text-left p-4 cursor-pointer select-none hidden sm:table-cell" onClick={() => toggleSort('date')}>
                <div className="flex items-center gap-1">Date <SortIcon k="date" /></div>
              </th>
              <th className="text-left p-4 cursor-pointer select-none hidden md:table-cell" onClick={() => toggleSort('location')}>
                <div className="flex items-center gap-1">Location <SortIcon k="location" /></div>
              </th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center opacity-50 text-sm">No events found</td>
              </tr>
            ) : (
              paginated.map(e => (
                <tr key={e.id} className="border-b border-[var(--glass-border)] hover:bg-[var(--glass-bg)] transition-colors">
                  <td className="p-4 font-medium">
                    <div className="flex items-center gap-3">
                      {e.cover_image && (
                        <img src={e.cover_image} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0 hidden sm:block" />
                      )}
                      <div>
                        <p className="truncate max-w-[200px] sm:max-w-xs">{e.title}</p>
                        {e.featured && <span className="text-[10px] uppercase tracking-wider text-[var(--accent-color)] font-bold">Featured</span>}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 opacity-70 hidden sm:table-cell">
                    {formatDate(e.date)} at {formatTime(e.time)}
                  </td>
                  <td className="p-4 opacity-70 hidden md:table-cell">{e.location}</td>
                  <td className="p-4 text-right">
                    <div className="flex gap-1 justify-end">
                      <Link to={`/events/${e.id}`} className="p-2 rounded-lg hover:bg-[var(--glass-bg)] transition-colors">
                        <Eye size={16} />
                      </Link>
                      <Link to={`/events/edit/${e.id}`} className="p-2 rounded-lg hover:bg-[var(--glass-bg)] transition-colors">
                        <Edit2 size={16} />
                      </Link>
                      <button onClick={() => onDelete(e.id)} className="p-2 rounded-lg hover:bg-[var(--glass-bg)] transition-colors text-red-400">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between p-4 border-t border-[var(--glass-border)] text-xs">
          <span className="opacity-60">Page {page + 1} of {totalPages}</span>
          <div className="flex gap-2">
            <button
              className="btn-ghost px-3 py-1.5 rounded-lg disabled:opacity-30"
              disabled={page === 0}
              onClick={() => setPage(p => p - 1)}
            >Previous</button>
            <button
              className="btn-ghost px-3 py-1.5 rounded-lg disabled:opacity-30"
              disabled={page >= totalPages - 1}
              onClick={() => setPage(p => p + 1)}
            >Next</button>
          </div>
        </div>
      )}
    </div>
  )
}
