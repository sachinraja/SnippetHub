/* eslint-disable global-require, @typescript-eslint/no-var-requires */
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { mergeDeep } from '@apollo/client/utilities'
import { useMemo } from 'react'
import type { NormalizedCacheObject } from '@apollo/client'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

function createIsomorphLink() {
  if (typeof window === 'undefined') {
    const { SchemaLink } =
      require('@apollo/client/link/schema') as typeof import('@apollo/client/link/schema')

    return new SchemaLink({
      schema: require('@graphql/schema').default,
      context: require('@graphql/context').context,
    })
  }
  const { HttpLink } =
    require('@apollo/client/link/http') as typeof import('@apollo/client/link/http')

  return new HttpLink({
    uri: '/api/graphql',
    credentials: 'same-origin',
  })
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(),
    cache: new InMemoryCache(),
  })
}

export function initializeApollo(
  initialState: NormalizedCacheObject | null = null,
) {
  const resolvedApolloClient = apolloClient ?? createApolloClient()

  if (initialState) {
    const data = mergeDeep(initialState, resolvedApolloClient.extract())

    resolvedApolloClient.cache.restore(data)
  }

  if (typeof window === 'undefined') return resolvedApolloClient

  if (!apolloClient) apolloClient = resolvedApolloClient

  return resolvedApolloClient
}

export function useApollo(initialState: NormalizedCacheObject) {
  return useMemo(() => initializeApollo(initialState), [initialState])
}
