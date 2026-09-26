import { useMemo } from 'react'
import { Bar, BarChart, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useChartTheme } from '../../hooks/useChartTheme'
import { agentPerformance } from '../../utils/chartData'
import ChartCard, { ChartTooltip } from './ChartCard'

export default function AgentPerformanceChart({ tickets }) {
  const theme = useChartTheme()
  const data = useMemo(() => agentPerformance(tickets), [tickets])

  return (
    <ChartCard title="Agent Performance" subtitle="Resolved & closed tickets per agent" className="lg:col-span-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 32, left: 0, bottom: 0 }}>
          <XAxis type="number" hide allowDecimals={false} />
          <YAxis type="category" dataKey="name" width={120} stroke={theme.axis} fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: theme.grid, opacity: 0.5 }} />
          <Bar dataKey="value" name="Resolved" fill={theme.series2} radius={[0, 4, 4, 0]} maxBarSize={20} isAnimationActive={false}>
            <LabelList dataKey="value" position="right" fill={theme.axis} fontSize={12} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
