import { useMemo } from 'react'
import { isToday, isYesterday } from 'date-fns'
import { DONE_STATUSES, OPEN_STATUSES } from '../utils/constants'
import { percentChange } from '../utils/formatters'

const DAY = 24 * 60 * 60 * 1000

const average = (values) => (values.length ? values.reduce((a, b) => a + b, 0) / values.length : null)

const responseMinutes = (t) =>
  t.firstResponseAt ? (new Date(t.firstResponseAt) - new Date(t.createdAt)) / 60000 : null

function avgResponse(tickets) {
  return average(tickets.map(responseMinutes).filter((m) => m != null))
}

function csat(tickets) {
  const avg = average(tickets.map((t) => t.satisfaction).filter(Boolean))
  return avg == null ? null : (avg / 5) * 100
}

/** Calculates all dashboard KPIs from the tickets list. */
export function useKpis(tickets) {
  return useMemo(() => {
    const now = Date.now()
    const inRange = (iso, fromDaysAgo, toDaysAgo) => {
      const age = now - new Date(iso).getTime()
      return age >= toDaysAgo * DAY && age < fromDaysAgo * DAY
    }

    // Compare the last 7 days with the 7 days before them
    const createdThisWeek = tickets.filter((t) => inRange(t.createdAt, 7, 0))
    const createdLastWeek = tickets.filter((t) => inRange(t.createdAt, 14, 7))
    const resolvedThisWeek = tickets.filter((t) => t.resolvedAt && inRange(t.resolvedAt, 7, 0))
    const resolvedLastWeek = tickets.filter((t) => t.resolvedAt && inRange(t.resolvedAt, 14, 7))

    const open = tickets.filter((t) => OPEN_STATUSES.includes(t.status))
    const resolvedToday = tickets.filter((t) => DONE_STATUSES.includes(t.status) && t.resolvedAt && isToday(new Date(t.resolvedAt)))
    const resolvedYesterday = tickets.filter((t) => t.resolvedAt && isYesterday(new Date(t.resolvedAt)))
    const urgent = open.filter((t) => t.priority === 'urgent')

    const responseNow = avgResponse(createdThisWeek)
    const csatNow = csat(resolvedThisWeek)

    return {
      total: tickets.length,
      totalTrend: percentChange(createdThisWeek.length, createdLastWeek.length),
      open: open.length,
      unassigned: open.filter((t) => !t.assignee).length,
      resolvedToday: resolvedToday.length,
      resolvedTodayTrend: percentChange(resolvedToday.length, resolvedYesterday.length),
      avgResponse: responseNow,
      avgResponseTrend: percentChange(responseNow, avgResponse(createdLastWeek)),
      csat: csatNow,
      csatTrend: percentChange(csatNow, csat(resolvedLastWeek)),
      urgent: urgent.length,
      urgentUnassigned: urgent.filter((t) => !t.assignee).length,
    }
  }, [tickets])
}
