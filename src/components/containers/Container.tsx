import Head from 'next/head'
import Nav from '@components/nav/Nav'
import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  head?: ReactNode
  meta?: {
    title?: string
  }
}
function Container({ children, className, head, meta }: ContainerProps) {
  return (
    <>
      <Head>
        <title>{meta?.title}</title>
        {head}
      </Head>

      <Nav />
      <main className={className}>{children}</main>
    </>
  )
}

Container.defaultProps = {
  className: '',
  head: undefined,
  meta: {
    title: 'SnippetHub',
  },
}
export default Container
