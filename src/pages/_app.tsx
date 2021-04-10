/* eslint-disable react/jsx-props-no-spreading */
import 'public/main.css'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '@lib/apollo-client'
import Head from 'next/head'
import React from 'react'
import type { AppProps } from 'next/app'

export function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <>
      <Head>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
      </Head>

      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  )
}

export default App
