import type { ReactNode } from 'react'

interface HeadingProps {
  bold?: boolean
  center?: boolean
  children: ReactNode
  className?: string
  priority: 1 | 2 | 3 | 4 | 5 | 6
  size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
}
const Heading = ({
  bold,
  center,
  children,
  className,
  priority,
  size,
}: HeadingProps) => {
  const HTag = `h${priority}` as keyof JSX.IntrinsicElements
  const textSizeClass = size === 1 ? 'text-xl' : `text-${size}xl`
  return (
    <HTag
      className={`${className} ${textSizeClass}${bold ? ' font-bold' : ''}${
        center ? ' text-center' : ''
      }`}
    >
      {children}
    </HTag>
  )
}

Heading.defaultProps = {
  bold: false,
  center: false,
  className: '',
}

export default Heading
