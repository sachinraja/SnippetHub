import ErrorPageLayout from '@layouts/ErrorPageLayout'

const NotFound = () => {
  return <ErrorPageLayout statusCode={404} title="Page Not Found" />
}

export default NotFound
