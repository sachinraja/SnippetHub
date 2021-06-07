import { getTextSizeClassNameFromProp } from '@lib/styling/text-size'

interface ParagraphProps {
  children: React.ReactNode
  className?: string
  size?: TextSize
}

const Paragraph = ({ children, className, size }: ParagraphProps) => {
  const textSizeClassName = getTextSizeClassNameFromProp(size)

  return <p className={`${textSizeClassName} ${className}`}>{children}</p>
}

Paragraph.defaultProps = {
  className: '',
  size: undefined,
}

export default Paragraph
