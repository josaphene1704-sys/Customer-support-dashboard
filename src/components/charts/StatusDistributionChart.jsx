import { useMemo } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { useChartTheme } from '../../hooks/useChartTheme'
import { ticketsByStatus } from '../../utils/chartData'
import ChartCard, { ChartTooltip } from './ChartCard'

export default function StatusDistributionChart({ tickets }) {
  const theme = useChartTheme()
  const data = useMemo(() => ticketsByStatus(tickets), [tickets])
  const total = tickets.length

  return (
    <ChartCard title="Tickets by Status" subtitle="Current distribution">
      <div className="flex h-full items-center gap-4">
        <div className="relative h-full min-w-0 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<ChartTooltip />} />
              <Pie data={data} dataKey="value" nameKey="name" innerRadius="62%" outerRadius="90%"
                stroke={theme.surface} strokeWidth={2} isAnimationActive={false}>
                {data.map((d) => <Cell key={d.key} fill={theme.status[d.key]} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-semibold tabular-nums">{total}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">tickets</span>
          </div>
        </div>

        {/* Legend with counts doubles as the direct labels */}
        <ul className="shrink-0 space-y-2 text-xs">
          {data.map((d) => (
            <li key={d.key} className="flex items-center gap-2">
              <span className="size-2.5 rounded-full" style={{ background: theme.status[d.key] }} />
              <span className="text-slate-600 dark:text-slate-300">{d.name}</span>
              <span className="ml-auto pl-2 font-semibold tabular-nums">{d.value}</span>
              <span className="w-8 text-right text-slate-400 tabular-nums">{total ? Math.round((d.value / total) * 100) : 0}%</span>
            </li>
          ))}
        </ul>
      </div>
    </ChartCard>
  )
}
