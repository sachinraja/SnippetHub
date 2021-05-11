import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism-light'
import csharp from 'react-syntax-highlighter/dist/cjs/languages/prism/csharp'
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css'
import elixir from 'react-syntax-highlighter/dist/cjs/languages/prism/elixir'
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import markup from 'react-syntax-highlighter/dist/cjs/languages/prism/markup'
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python'
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'

interface CodeBlockProps {
  language?: string
  children?: string
}

SyntaxHighlighter.registerLanguage('python', python)
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('csharp', csharp)
SyntaxHighlighter.registerLanguage('elixir', elixir)
SyntaxHighlighter.registerLanguage('markup', markup)
SyntaxHighlighter.registerLanguage('css', css)

const CodeBlock = ({ language, children }: CodeBlockProps) => {
  return (
    <SyntaxHighlighter language={language} style={atomDark} showLineNumbers>
      {children}
    </SyntaxHighlighter>
  )
}

CodeBlock.defaultProps = {
  language: undefined,
  children: '',
}

export default CodeBlock
