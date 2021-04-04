import Container from '@components/Container/Container'
import Heading from '@components/Heading/Heading'
import Paragraph from '@components/Paragraph/Paragraph'
import type { ErrorProps } from 'next/error'

const ErrorPageLayout = ({ statusCode, title }: ErrorProps) => {
  return (
    <Container meta={{ title: `${statusCode} | SnippetHub` }}>
      <div className="absolute top-1/2 left-1/2 -mr-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <Heading priority={1} size={5}>
          {statusCode} Error
        </Heading>
        {title && <Paragraph size={4}>{title}</Paragraph>}
      </div>
    </Container>
  )
}

export default ErrorPageLayout
