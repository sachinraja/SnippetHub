import Container from '@components/containers/Container'
import Heading from '@components/Heading'
import Paragraph from '@components/Paragraph'
import type { ErrorProps } from 'next/error'

const ErrorPageLayout = ({ statusCode, title }: ErrorProps) => {
  return (
    <Container meta={{ title: `${statusCode} | SnippetHub` }}>
      <div className="absolute top-1/2 left-1/2 text-center -translate-x-1/2 -translate-y-1/2 -mr-1/2">
        <Heading priority={1} size="5xl">
          {statusCode} Error
        </Heading>
        {title && <Paragraph size="lg">{title}</Paragraph>}
      </div>
    </Container>
  )
}

export default ErrorPageLayout
