export default function ChartCard({ title, subtitle, legend, children, className = '' }) {
  return (
    <figure className={`flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`}>
      <figcaption className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>}
        </div>
        {legend}
      </figcaption>
      <div className="h-64">{children}</div>
    </figure>
  )
}

/** Shared tooltip for all charts — text stays in text colors, the swatch carries identity. */
export function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg dark:border-slate-700 dark:bg-slate-800">
      {label && <p className="mb-1 font-medium text-slate-900 dark:text-slate-100">{label}</p>}
      {payload.map((item) => (
        <p key={item.dataKey ?? item.name} className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <span className="size-2.5 rounded-full" style={{ background: item.color ?? item.payload?.fill }} />
          {item.name}
          <span className="ml-auto pl-3 font-semibold text-slate-900 tabular-nums dark:text-slate-100">{item.value}</span>
        </p>
      ))}
    </div>
  )
}

export function LegendItem({ color, label }) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
      <span className="h-0.5 w-3 rounded-full" style={{ background: color, height: 3 }} />
      {label}
    </span>
  )
}
