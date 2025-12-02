import { ApolloProvider } from '@apollo/client'
import { client } from './lib/apollo-client'
import AppLayout from './components/layout/Applayout'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <ApolloProvider client={client}>
      <AppLayout>
        <Dashboard />
      </AppLayout>
    </ApolloProvider>
  )
}

export default App