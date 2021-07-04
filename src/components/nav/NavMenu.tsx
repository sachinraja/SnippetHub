import { Menu } from '@headlessui/react'
import LinkWithPropsPassed from '@components/LinkWithPropsPassed'
import type { ComponentProps } from 'react'

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
      className="overflow-hidden absolute right-0 z-10 mt-2 w-48 bg-carbon-700 rounded-lg origin-top-right"
      {...props}
    />
  )
}

type MenuLinkProps = ComponentProps<'a'> & {
  className?: string
  href: string
}

const NavMenuLink = ({ className, href, ...props }: MenuLinkProps) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <LinkWithPropsPassed
          href={href}
          className={`block p-2 hover:bg-carbon-500 ${
            active ? 'bg-carbon-500' : ''
          } ${className}`}
          {...props}
        />
      )}
    </Menu.Item>
  )
}

NavMenuLink.defaultProps = {
  className: '',
}

type NavMenuItemProps = ComponentProps<'button'>

const NavMenuItem = ({ className, ...props }: NavMenuItemProps) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          type="button"
          tabIndex={-1}
          className={`p-2 w-full text-left hover:bg-carbon-500 ${
            active ? 'bg-carbon-500' : ''
          } ${className}`}
          {...props}
        />
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
  Link: NavMenuLink,
}

export default NavMenu
