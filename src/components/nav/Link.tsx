import Link from 'next/link'
import { ReactNode } from 'react'

interface NavLinkProps {
  link: string
  active?: boolean
  children: ReactNode
}

const NavLink = ({ link, active, children }: NavLinkProps) => (
  <Link href={link} passHref>
    <a
      className={`px-3 py-2 text-sm font-medium sm:rounded-md ${
        active ? 'bg-carbon-900' : 'text-carbon-300 hover:bg-carbon-700'
      }`}
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
