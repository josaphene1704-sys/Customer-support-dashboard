import { Bell, Menu, Moon, Sun } from 'lucide-react'
import LiveIndicator from '../ui/LiveIndicator'

const iconButton =
  'relative rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'

export default function Header({ onOpenMenu, live, onToggleLive, dark, onToggleTheme, openCount }) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur sm:px-6 dark:border-slate-800 dark:bg-slate-900/80">
      <button type="button" onClick={onOpenMenu} aria-label="Open menu" className={`${iconButton} lg:hidden`}>
        <Menu className="size-5" />
      </button>

      <div className="min-w-0">
        <h1 className="truncate text-lg font-semibold">
          <span className="hidden sm:inline">Support </span>Dashboard
        </h1>
        <p className="hidden text-xs text-slate-500 sm:block dark:text-slate-400">{today}</p>
      </div>

      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        <LiveIndicator live={live} onToggle={onToggleLive} />

        <button type="button" onClick={onToggleTheme} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} className={iconButton}>
          {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </button>

        <button type="button" aria-label={`${openCount} open tickets`} className={iconButton}>
          <Bell className="size-5" />
          {openCount > 0 && (
            <span className="absolute top-1 right-1 flex min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
              {openCount > 99 ? '99+' : openCount}
            </span>
          )}
        </button>

        <div className="ml-1 hidden size-9 sm:flex items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300" aria-label="Signed in as Agent">
          AG
        </div>
      </div>
    </header>
  )
}
