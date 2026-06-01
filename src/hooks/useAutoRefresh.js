import { useState, useEffect, useCallback, useRef } from 'react'

export function useAutoRefresh(fetchFn, interval = 5000) {
  const [data, setData] = useState(null)
  const [initialLoading, setInitialLoading] = useState(true)
  const fetchFnRef = useRef(fetchFn)
  fetchFnRef.current = fetchFn

  const refresh = useCallback(async (isInitial = false) => {
    if (isInitial) setInitialLoading(true)
    try {
      const result = await fetchFnRef.current()
      setData(result)
    } catch {
      setData(null)
    }
    if (isInitial) setInitialLoading(false)
  }, [])

  useEffect(() => {
    refresh(true)
    const id = setInterval(() => refresh(false), interval)
    return () => clearInterval(id)
  }, [refresh, interval])

  return { data, loading: initialLoading }
}
