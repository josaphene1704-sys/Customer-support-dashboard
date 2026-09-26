import { generateTicket } from './generateTicket'

const TICKET_COUNT = 150
const DAYS_BACK = 30

/** Builds ~150 tickets spread over the last 30 days, newest first. */
export function createMockTickets() {
  const now = Date.now()
  const span = DAYS_BACK * 24 * 60 * 60 * 1000

  // Skew creation times toward recent days so charts show a realistic trend
  const times = Array.from({ length: TICKET_COUNT }, () => now - span * Math.random() ** 1.3).sort((a, b) => a - b)

  return times.map((t) => generateTicket(new Date(t))).reverse()
}
