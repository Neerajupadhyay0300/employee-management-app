import { ApolloProvider } from '@apollo/client'
import { client } from './lib/apollo-client'
import AppLayout from './components/layout/Applayout'
import MainContent from './components/layout/MainContant'
import ConnectionStatus from './pages/ConnectionStatus'
import AddEmployee from './pages/AddEmployee'
import { useBackendHealth } from './hooks/useBackendHealth'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BackendStatus } from './components/BackendStatus'
import type { ReactNode } from 'react'

function App() {
  function BackendGuard({ children }: { children: ReactNode }) {
    const { status } = useBackendHealth()
    if (status === 'down') return <ConnectionStatus />
    return children
  }

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <BackendGuard>
          <Routes>
            <Route path="/" element={<AppLayout />}> 
              <Route index element={<MainContent />} />
              <Route path="employees" element={<MainContent />} />
              <Route path="employees/new" element={<AddEmployee />} />
              <Route path="connection" element={<ConnectionStatus />} />
            </Route>
          </Routes>
        </BackendGuard>
        <BackendStatus />
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
