import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import TicketRow from './TicketRow'

const COLUMNS = [
  { key: 'id', label: 'ID' },
  { key: 'customer', label: 'Customer' },
  { key: 'subject', label: 'Subject' },
  { key: 'channel', label: 'Channel' },
  { key: 'priority', label: 'Priority', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'assignee', label: 'Agent' },
  { key: 'createdAt', label: 'Created', sortable: true },
]

function SortHeader({ column, sort, onSort }) {
  const active = sort.key === column.key
  const Icon = !active ? ArrowUpDown : sort.dir === 'asc' ? ArrowUp : ArrowDown
  return (
    <button
      type="button"
      onClick={() => onSort(column.key)}
      className={`inline-flex items-center gap-1 uppercase hover:text-slate-700 dark:hover:text-slate-200 ${active ? 'text-slate-700 dark:text-slate-200' : ''}`}
    >
      {column.label}
      <Icon className="size-3.5" aria-hidden="true" />
    </button>
  )
}

function SkeletonRows({ count }) {
  return Array.from({ length: count }, (_, i) => (
    <tr key={i}>
      {COLUMNS.map((c) => (
        <td key={c.key} className="px-4 py-4">
          <div className="h-3 animate-pulse rounded bg-slate-200 dark:bg-slate-700" style={{ width: `${50 + ((i * 7 + c.key.length * 9) % 45)}%` }} />
        </td>
      ))}
    </tr>
  ))
}

export default function TicketsTable({ tickets, loading, sort, onSort, onOpen, onStatusChange }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[960px] text-sm">
        <thead className="border-y border-slate-200 bg-slate-50 text-left text-xs font-medium tracking-wide text-slate-500 uppercase dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
          <tr>
            {COLUMNS.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-4 py-3 font-medium"
                aria-sort={sort.key === column.key ? (sort.dir === 'asc' ? 'ascending' : 'descending') : undefined}
              >
                {column.sortable ? <SortHeader column={column} sort={sort} onSort={onSort} /> : column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {loading ? (
            <SkeletonRows count={8} />
          ) : (
            tickets.map((ticket) => (
              <TicketRow key={ticket.id} ticket={ticket} onOpen={onOpen} onStatusChange={onStatusChange} />
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
