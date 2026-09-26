import { TrendingDown, TrendingUp } from 'lucide-react'

const ACCENTS = {
  indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300',
  blue: 'bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300',
  emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300',
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300',
  violet: 'bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300',
  red: 'bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-300',
}

/**
 * @param {number|null} trend - percent change; null hides the trend row
 * @param {boolean} invertTrend - true when a decrease is good (e.g. response time)
 */
export default function KpiCard({ icon: Icon, title, value, trend, trendLabel = 'vs last week', hint, invertTrend = false, accent = 'indigo' }) {
  const hasTrend = trend != null && Number.isFinite(trend)
  const isUp = trend > 0
  const isGood = invertTrend ? !isUp : isUp
  const TrendIcon = isUp ? TrendingUp : TrendingDown

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <div className={`rounded-xl p-2 ${ACCENTS[accent]}`}>
          <Icon className="size-4" aria-hidden="true" />
        </div>
      </div>

      <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>

      <div className="mt-1 h-5 text-xs">
        {hasTrend ? (
          <span className="flex items-center gap-1">
            <span className={`flex items-center gap-0.5 font-medium ${Math.round(trend) === 0 ? 'text-slate-500' : isGood ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
              <TrendIcon className="size-3.5" aria-hidden="true" />
              {Math.abs(trend).toFixed(0)}%
            </span>
            <span className="text-slate-400">{trendLabel}</span>
          </span>
        ) : (
          hint && <span className="text-slate-400">{hint}</span>
        )}
      </div>
    </div>
  )
}
