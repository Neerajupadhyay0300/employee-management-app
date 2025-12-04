import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000/graphql'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => console.error(`[GraphQL error]: ${message}`))
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`)
  }
})

const httpLink = createHttpLink({
  uri: apiUrl,
  credentials: 'same-origin',
  headers: { 'Content-Type': 'application/json' },
})

const link = from([errorLink, httpLink])

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: { fetchPolicy: 'network-only', errorPolicy: 'all' },
    mutate: { errorPolicy: 'all' },
  },
})
