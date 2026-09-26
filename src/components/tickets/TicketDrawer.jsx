import { useEffect, useRef } from 'react'
import { Calendar, Clock, Mail, MessageSquare, Star, User, X } from 'lucide-react'
import ChannelIcon from '../ui/ChannelIcon'
import { AGENTS, PRIORITIES } from '../../utils/constants'
import { formatDuration, formatFullDate } from '../../utils/formatters'
import StatusSelect from './StatusSelect'

const fieldSelect =
  'h-9 w-full rounded-lg border border-slate-200 bg-white px-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800'

function Detail({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-slate-400" aria-hidden="true" />
      <div className="min-w-0">
        <dt className="text-xs text-slate-500 dark:text-slate-400">{label}</dt>
        <dd className="text-sm">{children}</dd>
      </div>
    </div>
  )
}

export default function TicketDrawer({ ticket, onClose, onStatusChange, onUpdate }) {
  const closeRef = useRef(null)
  const open = Boolean(ticket)

  useEffect(() => {
    if (!open) return undefined
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const responseMinutes = ticket?.firstResponseAt ? (new Date(ticket.firstResponseAt) - new Date(ticket.createdAt)) / 60000 : null

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-slate-900/40 transition-opacity ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={ticket ? `Ticket ${ticket.id}` : 'Ticket details'}
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-xl transition-transform duration-200 dark:bg-slate-900 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {ticket && (
          <>
            <div className="flex items-start justify-between gap-3 border-b border-slate-200 p-5 dark:border-slate-800">
              <div className="min-w-0">
                <p className="font-mono text-xs text-slate-500">#{ticket.id}</p>
                <h2 className="mt-1 text-lg font-semibold">{ticket.subject}</h2>
              </div>
              <button ref={closeRef} type="button" onClick={onClose} aria-label="Close details" className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-5">
              <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300">{ticket.description}</p>

              <div className="grid grid-cols-3 gap-3">
                <label className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                  Status
                  <div><StatusSelect ticketId={ticket.id} value={ticket.status} onChange={(s) => onStatusChange(ticket, s)} size="md" /></div>
                </label>
                <label className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                  Priority
                  <select className={fieldSelect} value={ticket.priority} onChange={(e) => onUpdate(ticket.id, { priority: e.target.value })}>
                    {PRIORITIES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                </label>
                <label className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                  Agent
                  <select className={fieldSelect} value={ticket.assignee ?? ''} onChange={(e) => onUpdate(ticket.id, { assignee: e.target.value || null })}>
                    <option value="">Unassigned</option>
                    {AGENTS.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </label>
              </div>

              <dl className="space-y-4">
                <Detail icon={User} label="Customer">{ticket.customer.name}</Detail>
                <Detail icon={Mail} label="Email">
                  <a href={`mailto:${ticket.customer.email}`} className="text-indigo-600 hover:underline dark:text-indigo-400">{ticket.customer.email}</a>
                </Detail>
                <Detail icon={MessageSquare} label="Channel"><ChannelIcon channel={ticket.channel} /></Detail>
                <Detail icon={Calendar} label="Created">{formatFullDate(ticket.createdAt)}</Detail>
                <Detail icon={Clock} label="First response">{responseMinutes == null ? 'Awaiting response' : formatDuration(responseMinutes)}</Detail>
                {ticket.resolvedAt && <Detail icon={Calendar} label="Resolved">{formatFullDate(ticket.resolvedAt)}</Detail>}
                {ticket.satisfaction && (
                  <Detail icon={Star} label="Satisfaction">
                    <span className="text-amber-500" aria-label={`${ticket.satisfaction} out of 5`}>
                      {'ג˜…'.repeat(ticket.satisfaction)}<span className="text-slate-300 dark:text-slate-600">{'ג˜…'.repeat(5 - ticket.satisfaction)}</span>
                    </span>
                  </Detail>
                )}
              </dl>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
