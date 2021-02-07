import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import 'public/main.css'
import Nav from '@components/Nav/Nav';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>SnippetsHub</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/snippetsplace.svg" />
      </Head>
      
      <Nav />
      <Component className="bg-gray-500" {...pageProps} />
    </>
  )
}

export default MyApp
