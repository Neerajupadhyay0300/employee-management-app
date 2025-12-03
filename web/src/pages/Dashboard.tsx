import { BarChart3, Users, TrendingUp, Clock, MoreVertical } from 'lucide-react'

export default function Dashboard() {
  const stats = [
    { label: 'Total Employees', value: '1,248', change: '+12.5%', icon: <Users className="h-5 w-5" />, color: 'primary' },
    { label: 'Active Now', value: '892', change: '+5.2%', icon: <Clock className="h-5 w-5" />, color: 'secondary' },
    { label: 'Departments', value: '24', change: '+2', icon: <BarChart3 className="h-5 w-5" />, color: 'neutral' },
    { label: 'Avg. Rating', value: '4.8', change: '+0.3', icon: <TrendingUp className="h-5 w-5" />, color: 'primary' },
  ]

  return (
    <div>
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Welcome back, Alex</h1>
            <p className="text-neutral-600">Here's what's happening with your team today.</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-neutral-500">Last updated: Today, 10:42 AM</span>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                <div className={`text-${stat.color}-600`}>
                  {stat.icon}
                </div>
              </div>
              <button className="p-1 hover:bg-neutral-100 rounded-lg">
                <MoreVertical className="h-4 w-4 text-neutral-400" />
              </button>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900">{stat.value}</h3>
            <p className="text-sm text-neutral-600 mb-2">{stat.label}</p>
            <div className="flex items-center">
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {stat.change}
              </span>
              <span className="text-xs text-neutral-500 ml-2">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State for Employee Content */}
      <div className="bg-white rounded-xl border border-neutral-200 p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="h-16 w-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
            <Users className="h-8 w-8 text-primary-500" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">Employee Dashboard</h3>
          <p className="text-neutral-600 mb-6">
            Grid and tile views will appear here. Toggle between views to see employees in different layouts.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <div className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg font-medium">
              Grid View
            </div>
            <div className="px-4 py-2 bg-neutral-100 text-neutral-600 rounded-lg font-medium">
              Tile View
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-primary-50 to-white border border-primary-100 rounded-xl p-6">
          <h4 className="font-semibold text-primary-800 mb-2">Quick Actions</h4>
          <p className="text-sm text-primary-600 mb-4">Common tasks at your fingertips</p>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-primary-100 text-primary-700 text-sm">
              Add new employee
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-primary-100 text-primary-700 text-sm">
              Generate monthly report
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-primary-100 text-primary-700 text-sm">
              Schedule team meeting
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-secondary-50 to-white border border-secondary-100 rounded-xl p-6">
          <h4 className="font-semibold text-secondary-800 mb-2">Recent Activity</h4>
          <p className="text-sm text-secondary-600 mb-4">Latest updates from your team</p>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="h-2 w-2 mt-2 rounded-full bg-secondary-500"></div>
              <div>
                <p className="text-sm text-neutral-700">Sarah Chen updated her profile</p>
                <p className="text-xs text-neutral-500">10 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-2 w-2 mt-2 rounded-full bg-secondary-500"></div>
              <div>
                <p className="text-sm text-neutral-700">New employee joined: Michael Rodriguez</p>
                <p className="text-xs text-neutral-500">2 hours ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-neutral-50 to-white border border-neutral-200 rounded-xl p-6">
          <h4 className="font-semibold text-neutral-800 mb-2">System Status</h4>
          <p className="text-sm text-neutral-600 mb-4">All systems operational</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-700">API Service</span>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-700">Database</span>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">Healthy</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-700">Cache Server</span>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">Optimal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
