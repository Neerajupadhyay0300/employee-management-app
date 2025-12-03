// src/components/layout/AppLayout.tsx
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import MainContent from './MainContant'

interface AppLayoutProps {
  children?: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <>
    <div className={`h-screen grid ${sidebarOpen ? 'grid-cols-[16rem_1fr]' : 'grid-cols-[4rem_1fr]'} grid-rows-[64px_1fr]`}>

  <div className="row-start-1 col-start-2 border-b">
        <Header isOpen={sidebarOpen} onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
  </div>
  <div className={`row-span-2 ${sidebarOpen ? 'border-r border-neutral-200' : 'border-r-2 border-neutral-300'} ${sidebarOpen ? 'w-64' : 'w-16'} hidden lg:block bg-white`}>
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
  </div>
  <div className="row-start-2 col-start-2 overflow-hidden bg-white">
          {children ? children : <Outlet />}
  </div>
</div>

  {sidebarOpen && (
    <div 
      className="fixed inset-0 bg-black/30 z-40 lg:hidden"
      onClick={() => setSidebarOpen(false)}
    />
  )}
  <div className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-neutral-200 z-50 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden`}>
    <Sidebar isOpen={true} onClose={() => setSidebarOpen(false)} />
  </div>

  </>
  )
}
