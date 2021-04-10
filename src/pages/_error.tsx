import Error from 'next/error'
import ErrorPageLayout from '@layouts/ErrorPageLayout'
import type { ErrorProps } from 'next/error'

const ErrorPage = ({ statusCode }: ErrorProps) => {
  return <ErrorPageLayout statusCode={statusCode} />
}

ErrorPage.getInitialProps = Error.getInitialProps

export default ErrorPage
