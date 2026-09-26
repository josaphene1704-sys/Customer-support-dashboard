import { FilterX } from 'lucide-react'
import FilterSelect from '../ui/FilterSelect'
import SearchInput from '../ui/SearchInput'
import { AGENTS, CHANNELS, PRIORITIES, STATUSES } from '../../utils/constants'

const AGENT_OPTIONS = [{ value: 'unassigned', label: 'Unassigned' }, ...AGENTS.map((a) => ({ value: a, label: a }))]
const DATE_OPTIONS = [
  { value: 'today', label: 'Today' },
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
]
const STATUS_TABS = [{ value: 'all', label: 'All' }, ...STATUSES]

export default function TicketFilters({ search, onSearch, filters, onFilter, statusCounts, hasActiveFilters, onClear }) {
  return (
    <div className="space-y-4 px-4 pt-4">
      {/* Status tabs */}
      <div className="-mx-4 overflow-x-auto px-4">
        <div role="tablist" aria-label="Filter by status" className="inline-flex gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          {STATUS_TABS.map((tab) => {
            const selected = filters.status === tab.value
            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => onFilter('status', tab.value)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors
                  ${selected ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
              >
                {tab.label}
                <span className={`rounded-md px-1.5 text-xs ${selected ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300' : 'bg-slate-200 dark:bg-slate-700'}`}>
                  {statusCounts[tab.value] ?? 0}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Search + dropdown filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <SearchInput value={search} onChange={onSearch} placeholder="Search ID, customer, email…" />
        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
          <FilterSelect label="Priority" value={filters.priority} onChange={(v) => onFilter('priority', v)} options={PRIORITIES} />
          <FilterSelect label="Channel" value={filters.channel} onChange={(v) => onFilter('channel', v)} options={CHANNELS} />
          <FilterSelect label="Agent" value={filters.agent} onChange={(v) => onFilter('agent', v)} options={AGENT_OPTIONS} />
          <FilterSelect label="Date" value={filters.dateRange} onChange={(v) => onFilter('dateRange', v)} options={DATE_OPTIONS} allLabel="All time" />
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl px-3 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700 lg:ml-auto dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <FilterX className="size-4" aria-hidden="true" />
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}
