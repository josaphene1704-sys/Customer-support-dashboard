import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

export default function Layout({ children, collapsed, onToggleCollapse, ...headerProps }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={onToggleCollapse}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header onOpenMenu={() => setMobileOpen(true)} {...headerProps} />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
