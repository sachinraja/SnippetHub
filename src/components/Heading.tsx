import { ComponentPropsWithRef, forwardRef } from 'react'
import { getTextSizeClassNameFromProp } from '@lib/styling/text-size'
import type { ReactNode } from 'react'

export type HeadingProps = ComponentPropsWithRef<
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
> & {
  priority: 1 | 2 | 3 | 4 | 5 | 6
  size?: TextSize
  bold?: boolean
  className?: string
  children: ReactNode
}
const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ priority, size, bold, className, ...props }, ref) => {
    const HTag = `h${priority}` as const
    const textSizeClassName = getTextSizeClassNameFromProp(size)
    return (
      <HTag
        className={`${textSizeClassName} ${
          bold ? ' font-bold' : ''
        } ${className}`}
        ref={ref}
        {...props}
      />
    )
  },
)

Heading.defaultProps = {
  size: undefined,
  bold: false,
  className: '',
}

Heading.displayName = 'Heading'

export default Heading
