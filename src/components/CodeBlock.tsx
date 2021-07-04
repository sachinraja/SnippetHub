import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'

interface CodeBlockProps {
  language?: string
  children?: string
}

const CodeBlock = ({ language, children }: CodeBlockProps) => {
  return (
    <SyntaxHighlighter language={language} style={atomDark} showLineNumbers>
      {children}
    </SyntaxHighlighter>
  )
}

CodeBlock.defaultProps = {
  language: '',
  children: '',
}

export default CodeBlock
