import { Menu } from '@headlessui/react'
import LinkWithPropsPassed from '@components/LinkWithPropsPassed'
import type { ComponentProps, ReactNode } from 'react'

type NavMenuButtonProps = ExtractProps<typeof Menu.Button> & {
  open: boolean
}

const NavMenuButton = ({ open, className, ...props }: NavMenuButtonProps) => (
  <Menu.Button
    className={`p-1 text-carbon-400 rounded-full hover:text-white focus:outline-none ${
      open ? 'ring-2 ring-white' : 'focus:ring-2 focus:ring-white'
    } ${className}`}
    {...props}
  />
)

const NavMenuItems = (props: ExtractProps<typeof Menu.Items>) => {
  return (
    <Menu.Items
      className="bg-carbon-700 z-10 rounded-lg overflow-hidden origin-top-right absolute right-0 mt-2 w-48"
      {...props}
    />
  )
}

type MenuItemProps = ComponentProps<'a'> & {
  className?: string
  children: ReactNode
  href: string
}

const NavMenuItem = ({
  className,
  children,
  href,
  ...props
}: MenuItemProps) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <LinkWithPropsPassed href={href}>
          <a
            className={`block p-2 hover:bg-carbon-500 ${
              active ? 'bg-carbon-500' : ''
            } ${className}`}
            {...props}
          >
            {children}
          </a>
        </LinkWithPropsPassed>
      )}
    </Menu.Item>
  )
}

NavMenuItem.defaultProps = {
  className: '',
}

const NavMenu = {
  Button: NavMenuButton,
  Items: NavMenuItems,
  Item: NavMenuItem,
}

export default NavMenu
