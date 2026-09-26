import { useEffect, useMemo } from 'react'
import { Toaster } from 'react-hot-toast'
import Layout from './components/layout/Layout'
import DashboardPage from './pages/DashboardPage'
import { useLiveTickets } from './hooks/useLiveTickets'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useTickets } from './hooks/useTickets'
import { OPEN_STATUSES } from './utils/constants'

const prefersDark = () => window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false

export default function App() {
  const { tickets } = useTickets()
  const [theme, setTheme] = useLocalStorage('theme', () => (prefersDark() ? 'dark' : 'light'))
  const [live, setLive] = useLocalStorage('live', true)
  const [collapsed, setCollapsed] = useLocalStorage('sidebar-collapsed', false)

  const dark = theme === 'dark'
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  useLiveTickets(live)

  const openCount = useMemo(() => tickets.filter((t) => OPEN_STATUSES.includes(t.status)).length, [tickets])

  return (
    <>
      <Layout
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
        live={live}
        onToggleLive={() => setLive((l) => !l)}
        dark={dark}
        onToggleTheme={() => setTheme(dark ? 'light' : 'dark')}
        openCount={openCount}
      >
        <DashboardPage />
      </Layout>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: '!rounded-xl !text-sm dark:!bg-slate-800 dark:!text-slate-100',
        }}
      />
    </>
  )
}
