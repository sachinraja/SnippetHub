import { getTextSizeClassNameFromProp } from '@lib/styling/text-size'
import type { ReactNode } from 'react'

export interface HeadingProps {
  priority: 1 | 2 | 3 | 4 | 5 | 6
  size?: TextSize
  bold?: boolean
  className?: string
  children: ReactNode
}
const Heading = ({
  priority,
  size,
  bold,
  className,
  children,
}: HeadingProps) => {
  const HTag = `h${priority}` as const
  const textSizeClassName = getTextSizeClassNameFromProp(size)
  return (
    <HTag
      className={`${textSizeClassName} ${
        bold ? ' font-bold' : ''
      } ${className}`}
    >
      {children}
    </HTag>
  )
}

Heading.defaultProps = {
  size: undefined,
  bold: false,
  className: '',
}

export default Heading
