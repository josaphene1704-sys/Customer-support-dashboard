import { ChevronDown } from 'lucide-react'

/** options: [{ value, label }] — an "All" option with value "all" is added automatically. */
export default function FilterSelect({ label, value, onChange, options, allLabel = 'All' }) {
  const active = value !== 'all'
  return (
    <label className="relative flex-1 sm:flex-none">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-10 w-full appearance-none rounded-xl border bg-white pr-8 pl-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:bg-slate-800
          ${active ? 'border-indigo-300 text-indigo-700 dark:border-indigo-500/50 dark:text-indigo-300' : 'border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-200'}`}
      >
        <option value="all">{`${label}: ${allLabel}`}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
    </label>
  )
}
