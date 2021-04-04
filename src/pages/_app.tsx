/* eslint-disable react/jsx-props-no-spreading */
import 'public/main.css'
import Head from 'next/head'
import React from 'react'
import type { AppProps } from 'next/app'

export function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
