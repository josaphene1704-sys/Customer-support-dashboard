import { useMemo, useState } from 'react'
import { PRIORITY_MAP, STATUSES } from '../utils/constants'
import { useDebounce } from './useDebounce'

const DAY = 24 * 60 * 60 * 1000
const DATE_RANGES = { today: 1, '7d': 7, '30d': 30 }
const STATUS_ORDER = Object.fromEntries(STATUSES.map((s, i) => [s.value, i]))

export const INITIAL_FILTERS = { status: 'all', priority: 'all', channel: 'all', agent: 'all', dateRange: 'all' }

const SORTERS = {
  createdAt: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  priority: (a, b) => PRIORITY_MAP[a.priority].rank - PRIORITY_MAP[b.priority].rank,
  status: (a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status],
}

function matchesSearch(ticket, query) {
  if (!query) return true
  return [ticket.id, ticket.customer.name, ticket.customer.email, ticket.subject].some((field) =>
    field.toLowerCase().includes(query),
  )
}

/** Search + filters + sorting + pagination for the tickets table. */
export function useTicketFilters(tickets) {
  const [search, setSearchState] = useState('')
  const [filters, setFilters] = useState(INITIAL_FILTERS)
  const [sort, setSort] = useState({ key: 'createdAt', dir: 'desc' })
  const [page, setPage] = useState(1)
  const [pageSize, setPageSizeState] = useState(10)

  const debouncedSearch = useDebounce(search.trim().toLowerCase(), 300)

  // Everything except the status filter — used for the status tab counts
  const baseFiltered = useMemo(() => {
    const now = Date.now()
    return tickets.filter((t) => {
      if (filters.priority !== 'all' && t.priority !== filters.priority) return false
      if (filters.channel !== 'all' && t.channel !== filters.channel) return false
      if (filters.agent === 'unassigned' ? t.assignee : filters.agent !== 'all' && t.assignee !== filters.agent) return false
      if (filters.dateRange !== 'all' && now - new Date(t.createdAt) > DATE_RANGES[filters.dateRange] * DAY) return false
      return matchesSearch(t, debouncedSearch)
    })
  }, [tickets, filters.priority, filters.channel, filters.agent, filters.dateRange, debouncedSearch])

  const statusCounts = useMemo(() => {
    const counts = { all: baseFiltered.length }
    for (const t of baseFiltered) counts[t.status] = (counts[t.status] ?? 0) + 1
    return counts
  }, [baseFiltered])

  const filtered = useMemo(() => {
    const list = filters.status === 'all' ? [...baseFiltered] : baseFiltered.filter((t) => t.status === filters.status)
    const direction = sort.dir === 'asc' ? 1 : -1
    // Tie-break by creation date so the order stays stable
    return list.sort((a, b) => direction * SORTERS[sort.key](a, b) || SORTERS.createdAt(b, a))
  }, [baseFiltered, filters.status, sort])

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const pageItems = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const setSearch = (value) => {
    setSearchState(value)
    setPage(1)
  }
  const setFilter = (key, value) => {
    setFilters((f) => ({ ...f, [key]: value }))
    setPage(1)
  }
  const clearFilters = () => {
    setFilters(INITIAL_FILTERS)
    setSearchState('')
    setPage(1)
  }
  const toggleSort = (key) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'desc' }))
  const setPageSize = (size) => {
    setPageSizeState(size)
    setPage(1)
  }

  const hasActiveFilters = search !== '' || Object.keys(INITIAL_FILTERS).some((k) => filters[k] !== INITIAL_FILTERS[k])
  return {
    search, setSearch,
    filters, setFilter, clearFilters, hasActiveFilters,
    sort, toggleSort,
    page: currentPage, setPage, pageSize, setPageSize, pageCount,
    filtered, pageItems, statusCounts,
  }
}
