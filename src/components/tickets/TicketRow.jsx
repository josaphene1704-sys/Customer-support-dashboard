import ChannelIcon from '../ui/ChannelIcon'
import PriorityBadge from '../ui/PriorityBadge'
import { formatFullDate, formatRelative } from '../../utils/formatters'
import StatusSelect from './StatusSelect'

export default function TicketRow({ ticket, onOpen, onStatusChange }) {
  return (
    <tr onClick={() => onOpen(ticket)} className="cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
      <td className="px-4 py-3 font-mono text-xs whitespace-nowrap text-slate-500 dark:text-slate-400">#{ticket.id}</td>
      <td className="px-4 py-3">
        <div className="font-medium whitespace-nowrap">{ticket.customer.name}</div>
        <div className="text-xs text-slate-500 dark:text-slate-400">{ticket.customer.email}</div>
      </td>
      <td className="max-w-64 px-4 py-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onOpen(ticket)
          }}
          className="block max-w-full truncate text-left hover:text-indigo-600 focus:text-indigo-600 focus:outline-none dark:hover:text-indigo-400"
          title={ticket.subject}
        >
          {ticket.subject}
        </button>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <ChannelIcon channel={ticket.channel} />
      </td>
      <td className="px-4 py-3">
        <PriorityBadge priority={ticket.priority} />
      </td>
      <td className="px-4 py-3">
        <StatusSelect ticketId={ticket.id} value={ticket.status} onChange={(status) => onStatusChange(ticket, status)} />
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        {ticket.assignee ?? <span className="text-slate-400 italic">Unassigned</span>}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-slate-500 dark:text-slate-400" title={formatFullDate(ticket.createdAt)}>
        {formatRelative(ticket.createdAt)}
      </td>
    </tr>
  )
}
