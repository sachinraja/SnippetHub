import { ComponentPropsWithRef, forwardRef } from 'react'
import { getTextSizeClassNameFromProp } from '@lib/styling/text-size'

type ParagraphProps = ComponentPropsWithRef<'p'> & {
  children: React.ReactNode
  className?: string
  size?: TextSize
}

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ children, className, size, ...props }, ref) => {
    const textSizeClassName = getTextSizeClassNameFromProp(size)

    return (
      <p className={`${textSizeClassName} ${className}`} ref={ref} {...props}>
        {children}
      </p>
    )
  },
)

Paragraph.defaultProps = {
  className: '',
  size: undefined,
}

Paragraph.displayName = 'Paragraph'

export default Paragraph
