import Badge from '../ui/Badge'

const COLUMNS = ['Business', 'Contact', 'Phone', 'City', 'Region', 'Delivery days', 'Type', 'Status', 'Orders']

// Status values come from the Hebrew single-select options in Airtable
const STATUS_BADGES = {
  'פעיל': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  'לא פעיל': 'bg-slate-200 text-slate-700 dark:bg-slate-500/20 dark:text-slate-300',
  'ליד חדש': 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300',
}

function SkeletonRows({ count }) {
  return Array.from({ length: count }, (_, i) => (
    <tr key={i}>
      {COLUMNS.map((c) => (
        <td key={c} className="px-4 py-4">
          <div className="h-3 animate-pulse rounded bg-slate-200 dark:bg-slate-700" style={{ width: `${50 + ((i * 7 + c.length * 9) % 45)}%` }} />
        </td>
      ))}
    </tr>
  ))
}

function CustomerRow({ customer: c }) {
  return (
    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
      <td className="px-4 py-3 font-medium" dir="auto">{c.businessName}</td>
      <td className="px-4 py-3">
        <div dir="auto">{c.contact}</div>
        {c.email && <div className="text-xs text-slate-500 dark:text-slate-400">{c.email}</div>}
      </td>
      <td className="px-4 py-3 whitespace-nowrap">{c.phone}</td>
      <td className="px-4 py-3" dir="auto">{c.city}</td>
      <td className="px-4 py-3" dir="auto">{c.region}</td>
      <td className="px-4 py-3" dir="auto">{c.deliveryDays.join(', ')}</td>
      <td className="px-4 py-3" dir="auto">{c.type}</td>
      <td className="px-4 py-3">
        {c.status && <Badge className={STATUS_BADGES[c.status] ?? STATUS_BADGES['לא פעיל']}>{c.status}</Badge>}
      </td>
      <td className="px-4 py-3 tabular-nums">{c.orderCount}</td>
    </tr>
  )
}

export default function CustomersTable({ customers, loading }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[960px] text-sm">
        <thead className="border-y border-slate-200 bg-slate-50 text-left text-xs font-medium tracking-wide text-slate-500 uppercase dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
          <tr>
            {COLUMNS.map((label) => (
              <th key={label} scope="col" className="px-4 py-3 font-medium">{label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {loading ? <SkeletonRows count={6} /> : customers.map((c) => <CustomerRow key={c.id} customer={c} />)}
        </tbody>
      </table>
    </div>
  )
}
