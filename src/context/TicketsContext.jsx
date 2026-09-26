import { createContext, useCallback, useEffect, useMemo, useReducer } from 'react'
import { createMockTickets } from '../data/mockTickets'
import { setTicketSequence } from '../data/generateTicket'

const STORAGE_KEY = 'support-dashboard:tickets'

export const TicketsContext = createContext(null)

function ticketsReducer(state, action) {
  switch (action.type) {
    case 'ADD_TICKET':
      return [action.ticket, ...state]
    case 'UPDATE_STATUS': {
      const now = new Date().toISOString()
      return state.map((t) => {
        if (t.id !== action.id) return t
        const done = action.status === 'resolved' || action.status === 'closed'
        return {
          ...t,
          status: action.status,
          updatedAt: now,
          firstResponseAt: t.firstResponseAt ?? (action.status !== 'open' ? now : null),
          resolvedAt: done ? (t.resolvedAt ?? now) : null,
        }
      })
    }
    case 'UPDATE_TICKET':
      return state.map((t) => (t.id === action.id ? { ...t, ...action.changes, updatedAt: new Date().toISOString() } : t))
    case 'REPLACE_TICKET':
      return state.map((t) => (t.id === action.ticket.id ? action.ticket : t))
    case 'RESET':
      return createMockTickets()
    default:
      return state
  }
}

function loadInitialTickets() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (Array.isArray(saved) && saved.length) {
      // Continue ticket numbering after the highest saved id
      setTicketSequence(Math.max(...saved.map((t) => Number(t.id.split('-')[1]) || 0)))
      return saved
    }
  } catch {
    // Ignore storage errors and fall back to fresh mock data
  }
  return createMockTickets()
}

export function TicketsProvider({ children }) {
  const [tickets, dispatch] = useReducer(ticketsReducer, undefined, loadInitialTickets)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets))
    } catch {
      // Storage may be full or blocked — the app keeps working in memory
    }
  }, [tickets])

  const addTicket = useCallback((ticket) => dispatch({ type: 'ADD_TICKET', ticket }), [])
  const updateStatus = useCallback((id, status) => dispatch({ type: 'UPDATE_STATUS', id, status }), [])
  const updateTicket = useCallback((id, changes) => dispatch({ type: 'UPDATE_TICKET', id, changes }), [])
  const replaceTicket = useCallback((ticket) => dispatch({ type: 'REPLACE_TICKET', ticket }), [])
  const resetTickets = useCallback(() => dispatch({ type: 'RESET' }), [])

  const value = useMemo(
    () => ({ tickets, addTicket, updateStatus, updateTicket, replaceTicket, resetTickets }),
    [tickets, addTicket, updateStatus, updateTicket, replaceTicket, resetTickets],
  )

  return <TicketsContext.Provider value={value}>{children}</TicketsContext.Provider>
}
