import { Prism } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface CodeBlockProps {
  language: string
  value?: string
}

const CodeBlock = ({ language, value }: CodeBlockProps) => {
  return (
    <Prism language={language} style={atomDark}>
      {value}
    </Prism>
  )
}

CodeBlock.defaultProps = {
  value: '',
}

export default CodeBlock
