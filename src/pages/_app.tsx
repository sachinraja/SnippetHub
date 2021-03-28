/* eslint-disable react/jsx-props-no-spreading */
import 'public/main.css'
import Head from 'next/head'
import Nav from '@components/Nav/Nav'
import React from 'react'
import type { AppProps } from 'next/app'

export function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{pageProps.title || 'SnippetHub'}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/logo.svg" />
      </Head>

      <Nav />
      <Component {...pageProps} />
    </>
  )
}

export default App
