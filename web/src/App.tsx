import { ApolloProvider } from '@apollo/client'
import { client } from './lib/apollo-client'
import AppLayout from './components/layout/Applayout'
import MainContent from './components/layout/MainContant'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}> 
            <Route index element={<MainContent />} />
            <Route path="employees" element={<MainContent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
