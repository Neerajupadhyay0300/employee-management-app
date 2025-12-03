import { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'

const TEST_QUERY = gql`
  query TestConnection {
    __schema {
      types {
        name
      }
    }
  }
`

export default function ConnectionTest() {
  const [backendStatus, setBackendStatus] = useState<'checking' | 'connected' | 'error'>('checking')
  const [errorMessage, setErrorMessage] = useState('')

  const { loading, error, data } = useQuery(TEST_QUERY, {
    onCompleted: () => setBackendStatus('connected'),
    onError: (err) => {
      setBackendStatus('error')
      setErrorMessage(err.message)
    }
  })

  // Also try a simple fetch test
  useEffect(() => {
    const testFetch = async () => {
      try {
        const response = await fetch('http://localhost:4000/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: '{ __typename }'
          })
        })
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        
        const result = await response.json()
        console.log('Backend response:', result)
      } catch (err) {
        console.error('Fetch test failed:', err)
      }
    }
    
    testFetch()
  }, [])

  return (
    <div className="p-6 max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Backend Connection Test</h2>
      
      <div className="space-y-3">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-3 ${
            backendStatus === 'checking' ? 'bg-yellow-500' :
            backendStatus === 'connected' ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <span className="font-medium">
            {backendStatus === 'checking' && 'Checking connection...'}
            {backendStatus === 'connected' && 'Connected to GraphQL backend!'}
            {backendStatus === 'error' && 'Connection failed'}
          </span>
        </div>

        {loading && <p className="text-gray-600">Loading GraphQL schema...</p>}
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded p-3">
            <p className="text-red-700 font-medium">Error:</p>
            <p className="text-red-600 text-sm">{errorMessage}</p>
            <p className="text-gray-600 text-sm mt-2">
              Make sure backend is running at http://localhost:4000
            </p>
          </div>
        )}

        {data && (
          <div className="bg-green-50 border border-green-200 rounded p-3">
            <p className="text-green-700 font-medium">✓ Connected successfully!</p>
            <p className="text-gray-600 text-sm mt-1">
              Found {data.__schema.types.length} GraphQL types
            </p>
          </div>
        )}

        <div className="text-sm text-gray-500 mt-4">
          <p>Backend URL: http://localhost:4000/graphql</p>
          <p>Frontend URL: http://localhost:5173</p>
        </div>
      </div>
    </div>
  )
}