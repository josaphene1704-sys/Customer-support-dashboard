import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import EmptyState from '../ui/EmptyState'
import { useTicketFilters } from '../../hooks/useTicketFilters'
import { useTickets } from '../../hooks/useTickets'
import { STATUS_MAP } from '../../utils/constants'
import Pagination from './Pagination'
import TicketDrawer from './TicketDrawer'
import TicketFilters from './TicketFilters'
import TicketsTable from './TicketsTable'

export default function TicketsSection({ tickets }) {
  const { updateStatus, updateTicket, replaceTicket } = useTickets()
  const f = useTicketFilters(tickets)
  const [openId, setOpenId] = useState(null)
  const [loading, setLoading] = useState(true)

  // Short skeleton on first render (would be the API request in a real backend)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const openTicket = tickets.find((t) => t.id === openId) ?? null
  const closeDrawer = useCallback(() => setOpenId(null), [])

  const handleStatusChange = (ticket, status) => {
    if (ticket.status === status) return
    updateStatus(ticket.id, status)
    toast(
      (t) => (
        <span className="flex items-center gap-3">
          <span>
            Ticket <b>#{ticket.id}</b> marked as <b>{STATUS_MAP[status].label}</b>
          </span>
          <button
            type="button"
            onClick={() => {
              replaceTicket(ticket)
              toast.dismiss(t.id)
            }}
            className="rounded-md px-2 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 dark:text-indigo-300 dark:hover:bg-indigo-500/15"
          >
            Undo
          </button>
        </span>
      ),
      { icon: '✅', duration: 5000 },
    )
  }

  return (
    <section aria-labelledby="tickets-heading" className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-wrap items-baseline justify-between gap-2 px-4 pt-4">
        <h2 id="tickets-heading" className="font-semibold">Tickets</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400" aria-live="polite">
          Showing {f.pageItems.length} of {f.filtered.length} tickets
          {f.filtered.length !== tickets.length && ` (${tickets.length} total)`}
        </p>
      </div>

      <TicketFilters
        search={f.search}
        onSearch={f.setSearch}
        filters={f.filters}
        onFilter={f.setFilter}
        statusCounts={f.statusCounts}
        hasActiveFilters={f.hasActiveFilters}
        onClear={f.clearFilters}
      />

      <div className="mt-4">
        {!loading && f.filtered.length === 0 ? (
          <EmptyState
            title="No tickets match your filters"
            description="Try a different search term or clear the filters."
            action={
              <button type="button" onClick={f.clearFilters} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                Clear filters
              </button>
            }
          />
        ) : (
          <>
            <TicketsTable
              tickets={f.pageItems}
              loading={loading}
              sort={f.sort}
              onSort={f.toggleSort}
              onOpen={(t) => setOpenId(t.id)}
              onStatusChange={handleStatusChange}
            />
            <Pagination page={f.page} pageCount={f.pageCount} onPageChange={f.setPage} pageSize={f.pageSize} onPageSizeChange={f.setPageSize} />
          </>
        )}
      </div>

      <TicketDrawer ticket={openTicket} onClose={closeDrawer} onStatusChange={handleStatusChange} onUpdate={updateTicket} />
    </section>
  )
}
