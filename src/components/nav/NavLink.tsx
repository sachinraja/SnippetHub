import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

type NavLinkProps = ComponentProps<'a'> & {
  href: string
  active?: boolean
  children: ReactNode
}

const NavLink = ({
  href,
  active,
  className,
  children,
  ...props
}: NavLinkProps) => (
  <Link href={href}>
    <a
      className={`px-3 py-2 text-sm font-medium rounded-md ${
        active ? 'bg-carbon-900' : 'text-carbon-300 hover:bg-carbon-700'
      } ${className}`}
      {...props}
    >
      {children}
    </a>
  </Link>
)

NavLink.displayName = 'NavLink'

NavLink.defaultProps = {
  active: false,
}

export default NavLink
