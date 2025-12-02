import { useState } from "react";
import { Home, Users, CreditCard, FileText, User as UserIcon, Sparkles } from 'lucide-react'

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ isOpen = true }: SidebarProps) {
  const [openTeams, setOpenTeams] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);

  return (
      <div className={`h-full flex flex-col justify-between border-r border-neutral-200 bg-white ${isOpen ? 'w-64' : 'w-16'} overflow-y-auto shadow-sm`}>
        <div className={`flex items-center ${isOpen ? 'justify-start px-4 space-x-3' : 'justify-center px-0'} h-16 border-b border-neutral-200`}> 
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400 shadow-sm flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          {isOpen && <span className="font-bold text-neutral-900">EMS</span>}
        </div>
        <div className="px-4 pt-3 pb-4 h-full">
        <ul className="mt-6 space-y-1">
          {/* General */}
          <li>
            <a
              href="#"
              className={`flex items-center ${isOpen ? 'justify-start px-4 space-x-3' : 'justify-center px-0'} rounded-lg py-2 text-sm font-medium bg-primary-50 text-primary-700 border border-primary-100`}
            >
              <Home className="h-5 w-5" />
              {isOpen && <span>General</span>}
            </a>
          </li>

          {/* Teams Dropdown */}
          <li>
            <div
              onClick={() => { if (isOpen) setOpenTeams(!openTeams) }}
              className={`flex ${isOpen ? 'cursor-pointer' : 'cursor-default'} items-center ${isOpen ? 'justify-between px-4' : 'justify-center px-0'} rounded-lg py-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900`}
            >
              <div className={`flex items-center ${isOpen ? 'space-x-3' : ''}`}>
                <Users className="h-5 w-5" />
                {isOpen && <span className="text-sm font-medium">Teams</span>}
              </div>

              {isOpen && (
                <span
                  className={`shrink-0 transition duration-300 ${
                    openTeams ? "-rotate-180" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </div>

            {isOpen && openTeams && (
              <ul className={`mt-2 space-y-1 ${isOpen ? 'px-4' : 'px-2'}`}>
                <li>
                  <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                  >
                    Banned Users
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                  >
                    Calendar
                  </a>
                </li>
              </ul>
            )}
          </li>

          {/* Billing */}
          <li>
            <a
              href="#"
              className={`flex items-center ${isOpen ? 'justify-start px-4 space-x-3' : 'justify-center px-0'} rounded-lg py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900`}
            >
              <CreditCard className="h-5 w-5" />
              {isOpen && <span>Billing</span>}
            </a>
          </li>

          {/* Invoices */}
          <li>
            <a
              href="#"
              className={`flex items-center ${isOpen ? 'justify-start px-4 space-x-3' : 'justify-center px-0'} rounded-lg py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900`}
            >
              <FileText className="h-5 w-5" />
              {isOpen && <span>Invoices</span>}
            </a>
          </li>

          {/* Account Dropdown */}
          <li>
            <div
              onClick={() => { if (isOpen) setOpenAccount(!openAccount) }}
              className={`flex ${isOpen ? 'cursor-pointer' : 'cursor-default'} items-center ${isOpen ? 'justify-between px-4' : 'justify-center px-0'} rounded-lg py-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900`}
            >
              <div className={`flex items-center ${isOpen ? 'space-x-3' : ''}`}>
                <UserIcon className="h-5 w-5" />
                {isOpen && <span className="text-sm font-medium">Account</span>}
              </div>

              {isOpen && (
                <span
                  className={`shrink-0 transition duration-300 ${
                    openAccount ? "-rotate-180" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </div>

            {isOpen && openAccount && (
              <ul className={`mt-2 space-y-1 ${isOpen ? 'px-4' : 'px-2'}`}>
                <li>
                  <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                  >
                    Details
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                  >
                    Security
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            )}
          </li>
        </ul>
        </div>

      {/* Bottom User Profile */}
      {isOpen && (
        <div className="sticky inset-x-0 bottom-0 border-t border-neutral-200 bg-white">
          <div className="flex items-center gap-2 p-4">

            <div>
              <p className="text-xs text-neutral-600">
                <strong className="block font-medium text-neutral-900">App Version</strong>
                <span>1.1.0</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
