import { Menu } from '@headlessui/react'
import {
  ChevronDownIcon,
  MenuIcon,
  PlusIcon,
  XIcon,
} from '@heroicons/react/outline'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useSession } from 'next-auth/client'
import NavMenu from '@components/nav/NavMenu'
import NavLink from '@components/nav/NavLink'

const links: Record<string, string> = {
  '/': 'Top Packs',
  '/search': 'Search Packs',
}

const NavLinks = () => {
  const { pathname } = useRouter()

  // loop over and check if link is active
  return (
    <>
      {Object.entries(links).map(([href, text]) => (
        <NavLink key={href} href={href} active={pathname === href}>
          {text}
        </NavLink>
      ))}
    </>
  )
}

const Nav = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [session] = useSession()

  return (
    <nav className="bg-carbon-800 py-2 sm:py-4">
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

        {session && session.user ? (
          <>
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
                            alt="Profile"
                            className="rounded-full"
                            layout="fill"
                            objectFit="cover"
                            // TODO: fix type
                            src={session.user?.image ?? ''}
                          />
                        </div>
                      </NavMenu.Button>

                      <NavMenu.Items>
                        <NavMenu.Item href={`/@${session.user?.name}`}>
                          Profile
                        </NavMenu.Item>
                        <NavMenu.Item href="/new">Sign out</NavMenu.Item>
                      </NavMenu.Items>
                    </>
                  )
                }}
              </Menu>
            </div>
          </>
        ) : (
          <NavLink className="ml-auto" href="/login">
            Login
          </NavLink>
        )}
      </div>

      <div
        className={`flex-col mt-2 sm:hidden ${
          isMobileOpen ? 'flex' : 'hidden'
        }`}
      >
        <NavLinks />
      </div>
    </nav>
  )
}

export default Nav
