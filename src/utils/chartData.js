import { format, isSameDay, startOfDay, subDays } from 'date-fns'
import { AGENTS, CHANNELS, DONE_STATUSES, STATUSES } from './constants'

/** Daily counts of created vs resolved tickets for the last `days` days. */
export function ticketsOverTime(tickets, days = 14) {
  const today = startOfDay(new Date())
  const buckets = Array.from({ length: days }, (_, i) => {
    const day = subDays(today, days - 1 - i)
    return { day, label: format(day, 'MMM d'), created: 0, resolved: 0 }
  })
  const bucketFor = (iso) => buckets.find((b) => isSameDay(b.day, new Date(iso)))

  for (const t of tickets) {
    const createdBucket = bucketFor(t.createdAt)
    if (createdBucket) createdBucket.created++
    if (t.resolvedAt && DONE_STATUSES.includes(t.status)) {
      const resolvedBucket = bucketFor(t.resolvedAt)
      if (resolvedBucket) resolvedBucket.resolved++
    }
  }
  return buckets.map(({ label, created, resolved }) => ({ label, created, resolved }))
}

export function ticketsByStatus(tickets) {
  return STATUSES.map((s) => ({ key: s.value, name: s.label, value: tickets.filter((t) => t.status === s.value).length }))
}

export function ticketsByChannel(tickets) {
  return CHANNELS.map((c) => ({ name: c.label, value: tickets.filter((t) => t.channel === c.value).length }))
}

/** Resolved/closed tickets per agent, highest first. */
export function agentPerformance(tickets) {
  return AGENTS.map((agent) => ({
    name: agent,
    value: tickets.filter((t) => t.assignee === agent && DONE_STATUSES.includes(t.status)).length,
  })).sort((a, b) => b.value - a.value)
}
