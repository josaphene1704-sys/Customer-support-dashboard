import { useCallback, useEffect, useState } from 'react'
import { fetchCustomers, isAirtableConfigured } from '../services/airtable'

/** Loads customers from Airtable; `reload` re-fetches on demand. */
export function useAirtableCustomers() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(isAirtableConfigured)
  const [error, setError] = useState(null)
  const [version, setVersion] = useState(0)

  useEffect(() => {
    if (!isAirtableConfigured) return
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetchCustomers(controller.signal)
      .then(setCustomers)
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [version])

  const reload = useCallback(() => setVersion((v) => v + 1), [])

  return { customers, loading, error, reload, configured: isAirtableConfigured }
}
