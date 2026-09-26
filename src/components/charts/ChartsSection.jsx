import AgentPerformanceChart from './AgentPerformanceChart'
import ChannelBarChart from './ChannelBarChart'
import StatusDistributionChart from './StatusDistributionChart'
import TicketsOverTimeChart from './TicketsOverTimeChart'

export default function ChartsSection({ tickets }) {
  return (
    <section aria-label="Analytics" className="grid gap-4 lg:grid-cols-3">
      <TicketsOverTimeChart tickets={tickets} />
      <StatusDistributionChart tickets={tickets} />
      <ChannelBarChart tickets={tickets} />
      <AgentPerformanceChart tickets={tickets} />
    </section>
  )
}
