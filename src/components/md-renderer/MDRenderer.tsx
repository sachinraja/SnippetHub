import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import MDCode from '@components/md-renderer/MDCode'

interface MDRendererProps {
  children: string
  className?: string
}

const MDRenderer = ({ children, className }: MDRendererProps) => {
  return (
    <ReactMarkdown
      className={`prose prose-quoteless prose-tight p-2 max-w-none font-inter bg-carbon-800 ${className}`}
      plugins={[gfm]}
      components={{
        code: (node, ...props) => {
          const component = <MDCode {...props} />
          return component
        },
      }}
    >
      {children}
    </ReactMarkdown>
  )
}

MDRenderer.defaultProps = {
  className: '',
}

export default MDRenderer
