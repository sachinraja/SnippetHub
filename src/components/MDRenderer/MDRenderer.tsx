import CodeBlock from '@components/MDEditor/CodeBlock'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

interface MDRendererProps {
  children: string
  className?: string
}

const MDRenderer = ({ children, className }: MDRendererProps) => {
  return (
    <ReactMarkdown
      className={`prose p-2 max-w-none font-inter ${className}`}
      plugins={[gfm]}
      renderers={{ code: CodeBlock }}
    >
      {children}
    </ReactMarkdown>
  )
}

MDRenderer.defaultProps = {
  className: '',
}

export default MDRenderer
