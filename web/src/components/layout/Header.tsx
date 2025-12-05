import { Menu, X, Bell } from 'lucide-react';
import { useState } from 'react'
import { useComingSoon } from '../../context/comingSoon'

interface HeaderProps {
  onMenuClick: () => void;
  isOpen?: boolean;
}

export default function Header({ onMenuClick, isOpen = false }: HeaderProps) {
  const [notifOpen, setNotifOpen] = useState(false)
  const notifCount = 3
  const { openModal } = useComingSoon()

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-neutral-200 shadow-sm">
      <div className="px-2 py-3 max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg hover:bg-neutral-100 transition-transform"
            >
              {isOpen ? (
                <X className="h-5 w-5 text-neutral-700 transform rotate-90 transition-transform" />
              ) : (
                <Menu className="h-5 w-5 text-neutral-700 transform transition-transform" />
              )}
            </button>
            <nav className="flex items-center space-x-2">
              <span className="font-extrabold text-xl bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                Employee Management System
              </span>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button title={`${notifCount} unread`} className="relative p-2 rounded-lg hover:bg-neutral-100 transition-colors" onClick={() => setNotifOpen(o => !o)}>
                <Bell className="h-5 w-5 text-neutral-600" />
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-4 px-1 bg-red-600 text-white text-[10px] leading-4 rounded-full text-center">
                  {notifCount}
                </span>
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-lg border border-neutral-200 bg-white shadow-xl">
                  <div className="px-3 py-2 border-b flex items-center justify-between">
                    <span className="text-sm font-medium">Notifications</span>
                    <button className="text-xs text-primary-600 hover:text-primary-700" onClick={() => setNotifOpen(false)}>
                      <X className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                  <div className="p-2 space-y-2">
                    {[
                      { id: 1, title: 'New employee signup', desc: 'A new user registered.' },
                      { id: 2, title: 'Policy update', desc: 'HR policy updated.' },
                      { id: 3, title: 'Timesheet reminder', desc: 'Submit timesheet today.' },
                    ].map(n => (
                      <button key={n.id} className="w-full text-left p-3 rounded-md hover:bg-neutral-50 border border-neutral-200" onClick={() => { setNotifOpen(false); openModal(); }}>
                        <div className="text-sm font-medium">{n.title}</div>
                        <div className="text-xs text-neutral-600">{n.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-3 pl-3 border-l border-neutral-200">
              <div className="relative group">
                <button title="user@example.com" className="h-9 w-9 rounded-full ring-2 ring-white shadow-sm overflow-hidden focus:outline-none group-hover:ring-primary-500">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
                    alt="User"
                    className="h-full w-full object-cover"
                  />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition pointer-events-none bg-neutral-900 text-white text-xs px-2 py-1 rounded shadow">
                  user@example.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
