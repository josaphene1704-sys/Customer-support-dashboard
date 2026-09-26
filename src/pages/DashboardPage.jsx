import KpiGrid from '../components/kpi/KpiGrid'
import { useTickets } from '../hooks/useTickets'

export default function DashboardPage() {
  const { tickets } = useTickets()

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      <KpiGrid tickets={tickets} />
    </div>
  )
}
