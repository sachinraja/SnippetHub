import { Menu } from '@headlessui/react'
import type { ComponentProps } from 'react'

type MenuItemProps = ComponentProps<typeof Menu.Item>

const NavDropDownItem = (props: MenuItemProps) => {
  return <Menu.Item {...props} />
}

export default NavDropDownItem
