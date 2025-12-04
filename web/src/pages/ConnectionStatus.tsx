import { AlertTriangle, RefreshCw } from 'lucide-react'
import { useBackendHealth } from '../hooks/useBackendHealth'

export default function ConnectionStatus() {
  const { status, lastChecked, error, check, apiUrl, healthUrl } = useBackendHealth()

  const isDown = status === 'down'

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-6">
      <div className="max-w-xl w-full bg-white shadow-lg rounded-xl p-6 border border-neutral-200">
        <div className="flex items-center space-x-3 mb-4">
          <AlertTriangle className={`h-6 w-6 ${isDown ? 'text-red-600' : 'text-green-600'}`} />
          <h1 className="text-xl font-semibold">Backend Connectivity</h1>
        </div>

        <div className="space-y-3 text-sm text-neutral-700">
          <div className="flex justify-between"><span>Status</span><span className={isDown ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>{status.toUpperCase()}</span></div>
          <div className="flex justify-between"><span>GraphQL</span><span className="font-mono">{apiUrl}</span></div>
          <div className="flex justify-between"><span>Health</span><span className="font-mono">{healthUrl}</span></div>
          <div className="flex justify-between"><span>Last Checked</span><span>{lastChecked ? lastChecked.toLocaleString() : '—'}</span></div>
          {error && (
            <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-xs">
              {error}
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-end space-x-3">
          <button onClick={check} className="inline-flex items-center px-3 py-2 text-sm rounded-md border border-neutral-300 hover:bg-neutral-100">
            <RefreshCw className="h-4 w-4 mr-2" />Retry
          </button>
        </div>
      </div>
    </div>
  )
}

