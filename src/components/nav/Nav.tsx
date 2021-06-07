import NavLink from '@components/nav/Link'
import NavMenu from '@components/nav/NavMenu'
import { Menu } from '@headlessui/react'
import {
  ChevronDownIcon,
  MenuIcon,
  PlusIcon,
  XIcon,
} from '@heroicons/react/outline'
import useUser from '@hooks/use-user'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const NavLinks = () => (
  <>
    <NavLink link="/search" active>
      Browse
    </NavLink>
    <NavLink link="/">Your Snippets</NavLink>
  </>
)

const Nav = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const user = useUser()

  return (
    <nav className="pt-4 bg-carbon-800">
      <div className="flex items-center px-2 sm:px-6">
        <button
          type="button"
          aria-label="toggle mobile menu"
          className="p-1 rounded-md text-carbon-400 block mr-2 hover:bg-carbon-70 sm:hidden"
          onClick={() => {
            setIsMobileOpen(!isMobileOpen)
          }}
        >
          {isMobileOpen ? <XIcon width={25} /> : <MenuIcon width={25} />}
        </button>

        {/* take up available space and center image inside */}
        <div className="flex flex-1 items-center justify-center sm:flex-none sm:items-stretch sm:justify-start">
          <Link href="/">
            <a className="relative w-8 h-8">
              <Image
                alt="SnippetHub Logo"
                layout="fill"
                objectFit="cover"
                src="/logo.svg"
              />
            </a>
          </Link>
        </div>

        <div className="hidden space-x-4 ml-6 sm:flex">
          <NavLinks />
        </div>

        <div className="relative ml-auto">
          <Menu>
            {({ open }) => {
              return (
                <>
                  <NavMenu.Button open={open} className="whitespace-nowrap">
                    <PlusIcon className="h-6 w-6 inline" />
                    <ChevronDownIcon className="h-6 w-4 inline transform translate-y-2 -translate-x-1" />
                  </NavMenu.Button>

                  <NavMenu.Items>
                    <NavMenu.Item href="/new">New Pack</NavMenu.Item>
                  </NavMenu.Items>
                </>
              )
            }}
          </Menu>
        </div>

        <div className="relative">
          <Menu>
            {({ open }) => {
              return (
                <>
                  <NavMenu.Button open={open}>
                    <div className="relative h-8 w-8">
                      <Image
                        alt="Profile Picture"
                        className="rounded-full"
                        layout="fill"
                        objectFit="cover"
                        src={`https://avatars.githubusercontent.com/u/${user?.gitHubId}`}
                      />
                    </div>
                  </NavMenu.Button>

                  <NavMenu.Items>
                    <NavMenu.Item href={`/@${user?.username}`}>
                      Profile
                    </NavMenu.Item>
                    <NavMenu.Item href="/new">Sign out</NavMenu.Item>
                  </NavMenu.Items>
                </>
              )
            }}
          </Menu>
        </div>
      </div>

      <div className={`flex-col sm:hidden ${isMobileOpen ? 'flex' : 'hidden'}`}>
        <NavLinks />
      </div>
    </nav>
  )
}

export default Nav
