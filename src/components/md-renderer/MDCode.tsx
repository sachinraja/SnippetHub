import CodeBlock from '@components/CodeBlock'

interface MDCodeProps {
  language?: string
  value?: string
}

const MDCode = ({ language, value }: MDCodeProps) => (
  <CodeBlock language={language}>{value}</CodeBlock>
)

MDCode.defaultProps = {
  language: undefined,
  value: '',
}

export default MDCode
