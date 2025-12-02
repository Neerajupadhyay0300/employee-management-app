import React, { useState } from 'react';
import { Menu, X, Bell } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  isOpen?: boolean;
}

export default function Header({ onMenuClick, isOpen = false }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // 水平导航项 - 范例风格
  const horizontalMenuItems = [
    { label: 'Overview', href: '/', active: true },
    { label: 'Employees', href: '/employees', count: 156 },
    { label: 'Departments', href: '/departments', count: 12 },
    { label: 'Analytics', href: '/analytics' },
    { label: 'Reports', href: '/reports', count: 8 },
  ];

  // 仿照范例的 "Add" 下拉菜单
  const addDropdownItems = [
    { label: 'New Employee', type: 'employee' },
    { label: 'New Department', type: 'department' },
    { label: 'Quick Report', type: 'report' },
    { label: 'Announcement', type: 'announcement' },
  ];

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
            <button className="relative p-2 rounded-lg hover:bg-neutral-100 transition-colors">
              <Bell className="h-5 w-5 text-neutral-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3 pl-3 border-l border-neutral-200">
              <div className="relative">
                <button className="h-9 w-9 rounded-full ring-2 ring-white shadow-sm overflow-hidden focus:outline-none">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
                    alt="User"
                    className="h-full w-full object-cover"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
