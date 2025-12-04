import { useBackendHealth } from '../hooks/useBackendHealth'

export function BackendStatus() {
  const { status, lastChecked, error, check, retryCount } = useBackendHealth()

  const color = status === 'up' ? 'bg-green-500' : status === 'down' ? 'bg-red-500' : 'bg-yellow-500'
  const text = status === 'up' ? 'Backend Connected' : status === 'down' ? 'Backend Unavailable' : 'Checking Connection...'

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg shadow-lg ${color} bg-opacity-90 text-white`}>
        <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
        <span className="text-sm font-medium">{text}</span>
        {status === 'down' && retryCount > 0 && (
          <span className="text-xs opacity-75">(Retry {retryCount}/3)</span>
        )}
        {lastChecked && (
          <span className="text-xs opacity-75">Last checked: {lastChecked.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        )}
        <button
          onClick={check}
          className="ml-2 px-2 py-1 text-xs bg-white bg-opacity-20 rounded hover:bg-opacity-30 transition"
          disabled={status === 'up'}
        >
          Retry
        </button>
      </div>
      {error && status === 'down' && (
        <div className="mt-2 p-2 bg-red-100 text-red-800 text-xs rounded shadow">
          Error: {error}
        </div>
      )}
    </div>
  )
}

