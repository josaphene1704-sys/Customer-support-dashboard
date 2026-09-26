export const STATUSES = [
  { value: 'open', label: 'Open', badge: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300', color: '#3b82f6' },
  { value: 'in_progress', label: 'In Progress', badge: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300', color: '#f59e0b' },
  { value: 'pending', label: 'Pending', badge: 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300', color: '#8b5cf6' },
  { value: 'resolved', label: 'Resolved', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300', color: '#10b981' },
  { value: 'closed', label: 'Closed', badge: 'bg-slate-200 text-slate-700 dark:bg-slate-500/20 dark:text-slate-300', color: '#64748b' },
]

// Chart colors — validated for color-blind separation, stepped separately for each theme
export const CHART_COLORS = {
  light: {
    series1: '#2a78d6', series2: '#1baf7a',
    status: { open: '#2a78d6', in_progress: '#eda100', pending: '#4a3aa7', resolved: '#1baf7a', closed: '#eb6834' },
    grid: '#e2e8f0', axis: '#64748b', surface: '#ffffff',
  },
  dark: {
    series1: '#3987e5', series2: '#199e70',
    status: { open: '#3987e5', in_progress: '#c98500', pending: '#9085e9', resolved: '#199e70', closed: '#d95926' },
    grid: '#1e293b', axis: '#94a3b8', surface: '#0f172a',
  },
}

export const PRIORITIES = [
  { value: 'low', label: 'Low', rank: 0, badge: 'bg-slate-100 text-slate-600 dark:bg-slate-500/15 dark:text-slate-300' },
  { value: 'medium', label: 'Medium', rank: 1, badge: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300' },
  { value: 'high', label: 'High', rank: 2, badge: 'bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300' },
  { value: 'urgent', label: 'Urgent', rank: 3, badge: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300' },
]

export const CHANNELS = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'chat', label: 'Chat' },
  { value: 'whatsapp', label: 'WhatsApp' },
]

export const AGENTS = ['Noa Levi', 'Daniel Cohen', 'Maya Peretz', 'Yossi Mizrahi', 'Tamar Friedman', 'Omer Shapiro']

export const OPEN_STATUSES = ['open', 'in_progress', 'pending']
export const DONE_STATUSES = ['resolved', 'closed']

const byValue = (list) => Object.fromEntries(list.map((item) => [item.value, item]))
export const STATUS_MAP = byValue(STATUSES)
export const PRIORITY_MAP = byValue(PRIORITIES)
export const CHANNEL_MAP = byValue(CHANNELS)
