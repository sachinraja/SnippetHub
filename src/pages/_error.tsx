import Error from 'next/error'
import ErrorPageLayout from '@layouts/ErrorPageLayout'
import type { ErrorProps } from 'next/error'
import type { NextPageContext } from 'next'

const ErrorPage = ({ statusCode }: ErrorProps) => {
  return <ErrorPageLayout statusCode={statusCode} />
}

ErrorPage.getInitialProps = async (ctx: NextPageContext) => {
  return Error.getInitialProps(ctx)
}

export default ErrorPage
