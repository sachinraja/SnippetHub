/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import React from 'react';
import 'public/main.css';
import Nav from '@components/Nav/Nav';
import type { AppProps } from 'next/app';

export function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>SnippetHub</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/logo.svg" />
      </Head>

      <Nav />
      <Component {...pageProps} />
    </>
  );
}

export default App;
