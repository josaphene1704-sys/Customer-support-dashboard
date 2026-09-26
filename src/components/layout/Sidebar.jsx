import { BarChart3, ChevronsLeft, ChevronsRight, Headset, LayoutDashboard, Settings, Ticket, Users, X } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Tickets', icon: Ticket },
  { label: 'Customers', icon: Users },
  { label: 'Reports', icon: BarChart3 },
  { label: 'Settings', icon: Settings },
]

export default function Sidebar({ collapsed, onToggleCollapse, mobileOpen, onCloseMobile }) {
  return (
    <>
      {/* Mobile overlay */}
      <div
        onClick={onCloseMobile}
        className={`fixed inset-0 z-30 bg-slate-900/50 transition-opacity lg:hidden ${mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        aria-hidden="true"
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-all duration-200 dark:border-slate-800 dark:bg-slate-900
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${collapsed ? 'lg:w-20' : 'lg:w-64'}`}
      >
        <div className="flex h-16 items-center gap-3 px-5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <Headset className="size-5" />
          </div>
          <span className={`font-semibold whitespace-nowrap ${collapsed ? 'lg:hidden' : ''}`}>SupportDesk</span>
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close menu"
            className="ml-auto rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV_ITEMS.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              type="button"
              disabled={!active}
              title={collapsed ? label : undefined}
              aria-current={active ? 'page' : undefined}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors
                ${active
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300'
                  : 'cursor-not-allowed text-slate-400 dark:text-slate-500'}
                ${collapsed ? 'lg:justify-center' : ''}`}
            >
              <Icon className="size-5 shrink-0" />
              <span className={collapsed ? 'lg:hidden' : ''}>{label}</span>
              {!active && (
                <span className={`ml-auto rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] dark:bg-slate-800 ${collapsed ? 'lg:hidden' : ''}`}>
                  Soon
                </span>
              )}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="m-3 hidden items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-500 transition-colors hover:bg-slate-100 lg:flex dark:hover:bg-slate-800"
        >
          {collapsed ? <ChevronsRight className="size-5" /> : <><ChevronsLeft className="size-5" /> Collapse</>}
        </button>
      </aside>
    </>
  )
}
