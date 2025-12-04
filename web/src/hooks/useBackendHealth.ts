import { useEffect, useState, useCallback } from 'react'

type Status = 'unknown' | 'up' | 'down'

export function useBackendHealth() {
  //const apiUrl = (import.meta.env.VITE_API_URL as string) || 'http://localhost:4000/graphql'
  //Temp Solution
  const apiUrl = "https://meticulous-possibility-production.up.railway.app/graphql"
  
  const healthUrl = apiUrl.replace(/\/graphql$/, '/health')

  const [status, setStatus] = useState<Status>('unknown')
  const [lastChecked, setLastChecked] = useState<Date | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  const check = useCallback(async () => {
    setError(null)
    try {
      const ctrl = new AbortController()
      const id = setTimeout(() => ctrl.abort(), 5000)
      const res = await fetch(healthUrl, { method: 'GET', signal: ctrl.signal })
      clearTimeout(id)
      setLastChecked(new Date())
      if (res.ok) {
        setStatus('up')
        setRetryCount(0)
      } else {
        setStatus('down')
        setError(`Healthcheck failed: ${res.status}`)
        setRetryCount(c => Math.min(c + 1, 3))
      }
    } catch (e: any) {
      setStatus('down')
      setLastChecked(new Date())
      setError(e?.message || 'Network error')
      setRetryCount(c => Math.min(c + 1, 3))
    }
  }, [healthUrl])

  useEffect(() => {
    check()
  }, [check])

  useEffect(() => {
    if (status === 'down' && retryCount > 0 && retryCount < 3) {
      const t = setTimeout(() => check(), 3000)
      return () => clearTimeout(t)
    }
  }, [status, retryCount, check])

  const isHealthy = status === 'up'
  return { status, lastChecked, error, check, apiUrl, healthUrl, isHealthy, retryCount }
}
