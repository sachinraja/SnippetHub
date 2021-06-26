import 'styles/main.css'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'
import { Provider as NextAuthProvider } from 'next-auth/client'
import { useApollo } from '@lib/apollo-client'
import Toaster from '@components/Toaster'
import type { AppProps } from 'next/app'

export function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <>
      <Head>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
      </Head>

      <NextAuthProvider session={pageProps.session}>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
          <Toaster />
        </ApolloProvider>
      </NextAuthProvider>
    </>
  )
}

export default App
