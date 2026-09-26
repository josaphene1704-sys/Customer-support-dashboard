import { Pause, Play } from 'lucide-react'

export default function LiveIndicator({ live, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={live}
      aria-label={live ? 'Pause live updates' : 'Resume live updates'}
      title={live ? 'Pause live updates' : 'Resume live updates'}
      className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
    >
      <span className="relative flex size-2">
        {live && <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />}
        <span className={`relative inline-flex size-2 rounded-full ${live ? 'bg-emerald-500' : 'bg-slate-400'}`} />
      </span>
      {live ? 'Live' : 'Paused'}
      {live ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
    </button>
  )
}
