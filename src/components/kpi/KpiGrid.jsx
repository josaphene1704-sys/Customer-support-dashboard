import { AlertTriangle, CheckCircle2, Clock, Inbox, Smile, Ticket } from 'lucide-react'
import { useKpis } from '../../hooks/useKpis'
import { formatDuration, formatNumber } from '../../utils/formatters'
import KpiCard from './KpiCard'

export default function KpiGrid({ tickets }) {
  const kpi = useKpis(tickets)

  return (
    <section aria-label="Key metrics" className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
      <KpiCard icon={Ticket} title="Total Tickets" value={formatNumber(kpi.total)} trend={kpi.totalTrend} trendLabel="new vs last week" accent="indigo" />
      <KpiCard icon={Inbox} title="Open Tickets" value={formatNumber(kpi.open)} hint={`${kpi.unassigned} unassigned`} accent="blue" />
      <KpiCard icon={CheckCircle2} title="Resolved Today" value={formatNumber(kpi.resolvedToday)} trend={kpi.resolvedTodayTrend} trendLabel="vs yesterday" accent="emerald" />
      <KpiCard icon={Clock} title="Avg. Response" value={formatDuration(kpi.avgResponse)} trend={kpi.avgResponseTrend} invertTrend accent="amber" />
      <KpiCard icon={Smile} title="CSAT" value={kpi.csat == null ? '—' : `${kpi.csat.toFixed(0)}%`} trend={kpi.csatTrend} accent="violet" />
      <KpiCard icon={AlertTriangle} title="Urgent Tickets" value={formatNumber(kpi.urgent)} hint={kpi.urgentUnassigned ? `${kpi.urgentUnassigned} unassigned` : 'All assigned'} accent="red" />
    </section>
  )
}
