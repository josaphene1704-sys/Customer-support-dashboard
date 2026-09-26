import { format, formatDistanceToNowStrict } from 'date-fns'

export const formatRelative = (iso) => `${formatDistanceToNowStrict(new Date(iso))} ago`

export const formatFullDate = (iso) => format(new Date(iso), 'MMM d, yyyy · HH:mm')

export const formatNumber = (n) => new Intl.NumberFormat('en-US').format(n)

/** Formats a duration in minutes as "45m" or "3.2h". */
export function formatDuration(minutes) {
  if (minutes == null || Number.isNaN(minutes)) return '—'
  if (minutes < 60) return `${Math.round(minutes)}m`
  return `${(minutes / 60).toFixed(1)}h`
}

/** Percentage change from `previous` to `current`, or null when there's no baseline. */
export function percentChange(current, previous) {
  if (current == null || previous == null || previous === 0) return null
  return ((current - previous) / previous) * 100
}
