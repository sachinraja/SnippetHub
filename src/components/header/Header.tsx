import { forwardRef } from 'react'
import type { ComponentPropsWithRef, ReactNode } from 'react'

type HeaderProps = ComponentPropsWithRef<'div'> & {
  children: ReactNode
}

const Header = forwardRef<HTMLDivElement, HeaderProps>(
  ({ children, className, ...props }: HeaderProps, ref) => {
    return (
      <div className="py-10 bg-gradient-to-b from-carbon-800 to-carbon-900">
        <div className={`mx-12 ${className}`} ref={ref} {...props}>
          {children}
        </div>
      </div>
    )
  },
)

Header.displayName = 'Header'

export default Header
