import { useMemo } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useChartTheme } from '../../hooks/useChartTheme'
import { ticketsOverTime } from '../../utils/chartData'
import ChartCard, { ChartTooltip, LegendItem } from './ChartCard'

export default function TicketsOverTimeChart({ tickets }) {
  const theme = useChartTheme()
  const data = useMemo(() => ticketsOverTime(tickets, 14), [tickets])
  const axis = { stroke: theme.axis, fontSize: 12, tickLine: false, axisLine: false }

  return (
    <ChartCard
      title="Tickets Over Time"
      subtitle="New vs resolved, last 14 days"
      className="lg:col-span-2"
      legend={
        <div className="flex gap-4">
          <LegendItem color={theme.series1} label="Created" />
          <LegendItem color={theme.series2} label="Resolved" />
        </div>
      }
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke={theme.grid} />
          <XAxis dataKey="label" {...axis} minTickGap={24} />
          <YAxis {...axis} allowDecimals={false} />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: theme.axis, strokeDasharray: '3 3' }} />
          <Line type="linear" dataKey="created" name="Created" stroke={theme.series1} strokeWidth={2} dot={false}
            activeDot={{ r: 5, stroke: theme.surface, strokeWidth: 2 }} isAnimationActive={false} />
          <Line type="linear" dataKey="resolved" name="Resolved" stroke={theme.series2} strokeWidth={2} dot={false}
            activeDot={{ r: 5, stroke: theme.surface, strokeWidth: 2 }} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
