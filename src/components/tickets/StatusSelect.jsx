import { ChevronDown } from 'lucide-react'
import { STATUSES, STATUS_MAP } from '../../utils/constants'

export default function StatusSelect({ ticketId, value, onChange, size = 'sm' }) {
  const { badge } = STATUS_MAP[value]
  return (
    <label className="relative inline-flex" onClick={(e) => e.stopPropagation()}>
      <span className="sr-only">{`Status for ticket ${ticketId}`}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`cursor-pointer appearance-none rounded-full pr-6 font-medium outline-none focus:ring-2 focus:ring-indigo-500/40 ${badge}
          ${size === 'sm' ? 'py-0.5 pl-2.5 text-xs' : 'py-1.5 pl-3 text-sm'}`}
      >
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value} className="bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100">
            {s.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-1.5 size-3.5 -translate-y-1/2 opacity-70" aria-hidden="true" />
    </label>
  )
}
