import { useState, useEffect, useCallback, useRef } from 'react'

export function useAutoRefresh(fetchFn, interval = 30000) {
  const [data, setData] = useState(null)
  const [initialLoading, setInitialLoading] = useState(true)
  const fetchFnRef = useRef(fetchFn)
  const abortRef = useRef(null)
  fetchFnRef.current = fetchFn

  const refresh = useCallback(async (isInitial = false) => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    if (isInitial) setInitialLoading(true)
    try {
      const result = await fetchFnRef.current(controller.signal)
      if (!controller.signal.aborted) {
        setData(result)
      }
    } catch {
      if (!controller.signal.aborted) {
        setData(null)
      }
    }
    if (isInitial && !controller.signal.aborted) setInitialLoading(false)
  }, [])

  useEffect(() => {
    refresh(true)
    const id = setInterval(() => refresh(false), interval)
    return () => {
      clearInterval(id)
      abortRef.current?.abort()
    }
  }, [refresh, interval])

  return { data, loading: initialLoading }
}
