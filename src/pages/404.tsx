import ErrorPageLayout from '@layouts/ErrorPageLayout'

const NotFound = () => (
  <ErrorPageLayout statusCode={404} title="Page Not Found" />
)

export default NotFound
