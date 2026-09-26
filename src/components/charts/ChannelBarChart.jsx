import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useChartTheme } from '../../hooks/useChartTheme'
import { ticketsByChannel } from '../../utils/chartData'
import ChartCard, { ChartTooltip } from './ChartCard'

export default function ChannelBarChart({ tickets }) {
  const theme = useChartTheme()
  const data = useMemo(() => ticketsByChannel(tickets), [tickets])
  const axis = { stroke: theme.axis, fontSize: 12, tickLine: false, axisLine: false }

  return (
    <ChartCard title="Tickets by Channel" subtitle="All time">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke={theme.grid} />
          <XAxis dataKey="name" {...axis} />
          <YAxis {...axis} allowDecimals={false} />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: theme.grid, opacity: 0.5 }} />
          <Bar dataKey="value" name="Tickets" fill={theme.series1} radius={[4, 4, 0, 0]} maxBarSize={40} isAnimationActive={false}>
            <LabelList dataKey="value" position="top" fill={theme.axis} fontSize={12} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
