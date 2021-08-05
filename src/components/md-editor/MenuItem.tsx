import { MouseEventHandler, ReactNode, forwardRef } from 'react'

interface MenuItemProps {
  children: ReactNode
  className?: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  ({ children, className, onClick }: MenuItemProps, ref) => (
    <button
      ref={ref}
      type="button"
      className={`border-r-1 border-carbon-800 p-2 focus:border-b-0 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  ),
)

MenuItem.displayName = 'MenuItem'

MenuItem.defaultProps = {
  className: '',
}

export default MenuItem
