import { ReactNode } from 'react'

interface MenuProps {
  children: ReactNode
}

const Menu = ({ children }: MenuProps) => (
  <div className="flex list-none bg-carbon-700">{children}</div>
)

export const LeftAlign = ({ children }: MenuProps) => (
  <div className="inline-block">{children}</div>
)

export const RightAlign = ({ children }: MenuProps) => (
  <div className="ml-auto">{children}</div>
)
export default Menu
