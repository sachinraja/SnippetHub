import NavLink from '@components/nav/Link'
import { Menu } from '@headlessui/react'
import {
  ChevronDownIcon,
  MenuIcon,
  PlusIcon,
  XIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'
import { useState } from 'react'

const Nav = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <nav className="bg-carbon-800 px-6 flex items-center">
      <button
        type="button"
        aria-label="toggle mobile menu"
        className="p-1 rounded-md text-carbon-400 block hover:bg-carbon-70 sm:hidden"
        onClick={() => {
          setIsMobileOpen(!isMobileOpen)
        }}
      >
        {isMobileOpen ? <XIcon width={30} /> : <MenuIcon width={30} />}
      </button>

      <div className="relative w-8 h-8">
        <Image
          alt="SnippetHub Logo"
          layout="fill"
          objectFit="cover"
          src="/logo.svg"
        />
      </div>

      <div className="flex space-x-4 ml-6">
        <NavLink link="/" active>
          Browse
        </NavLink>
        <NavLink link="/">Your Snippets</NavLink>
      </div>

      <Menu>
        <Menu.Button className="p-1 text-carbon-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
          <PlusIcon className="h-6 w-6 inline" />
          <ChevronDownIcon className="h-6 w-4 inline transform translate-y-2 -translate-x-1" />
        </Menu.Button>

        <Menu.Items className="bg-carbon-700 rounded-lg p-2 w-1/4">
          <Menu.Item>
            <p>New Pack</p>
          </Menu.Item>
          <Menu.Item>
            <p>hi</p>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </nav>
  )
}

export default Nav
