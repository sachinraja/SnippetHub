import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import CodeBlock from '@components/CodeBlock'

interface MDRendererProps {
  children: string
  className?: string
}

const MDRenderer = ({
  children: rendererChildren,
  className: rendererClassName,
}: MDRendererProps) => {
  return (
    <ReactMarkdown
      className={`prose prose-quoteless prose-tight p-2 max-w-none font-inter ${rendererClassName}`}
      plugins={[gfm]}
      components={{
        // do not want `node` to be passed as prop
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className ?? '')

          const language = (match && match[1]) ?? undefined

          const component = !inline ? (
            <CodeBlock language={language} {...props}>
              {String(children).replace(/\n$/, '')}
            </CodeBlock>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )

          return component
        },
      }}
    >
      {rendererChildren}
    </ReactMarkdown>
  )
}

MDRenderer.defaultProps = {
  className: '',
}

export default MDRenderer
