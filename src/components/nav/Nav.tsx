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
import { signOut, useSession } from 'next-auth/client'
import NavMenu from '@components/nav/NavMenu'
import NavLink from '@components/nav/NavLink'
import logo from 'assets/logo.svg'
import defaultProfilePic from 'assets/default-profile-pic.png'

const links: Record<string, string> = {
  '/': 'Top Packs',
  '/search': 'Search Packs',
  '/faq': 'FAQ',
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
    <nav className="py-2 sm:py-4 px-2 sm:px-6 bg-carbon-800">
      <div className="flex items-center">
        <button
          type="button"
          aria-label="toggle mobile menu"
          className="block sm:hidden p-1 mr-2 text-carbon-400 rounded-md hover:bg-carbon-70"
          onClick={() => {
            setIsMobileOpen(!isMobileOpen)
          }}
        >
          {isMobileOpen ? <XIcon width={25} /> : <MenuIcon width={25} />}
        </button>

        {/* take up available space and center image inside */}
        <div className="flex flex-1 sm:flex-none justify-center sm:justify-start items-center sm:items-stretch">
          <Link href="/">
            <a className="relative w-8 h-8">
              <Image
                alt="SnippetHub Logo"
                layout="fill"
                objectFit="cover"
                src={logo}
              />
            </a>
          </Link>
        </div>

        <div className="hidden sm:flex ml-6 space-x-4">
          <NavLinks />
        </div>

        <div className="flex ml-auto">
          {session ? (
            <>
              <div className="relative">
                <Menu>
                  {({ open }) => (
                    <>
                      <NavMenu.Button open={open} className="whitespace-nowrap">
                        <PlusIcon className="inline w-6 h-6" />
                        <ChevronDownIcon className="inline w-4 h-6 -translate-x-1 translate-y-2" />
                      </NavMenu.Button>

                      <NavMenu.Items>
                        <NavMenu.Link href="/new">New Pack</NavMenu.Link>
                      </NavMenu.Items>
                    </>
                  )}
                </Menu>
              </div>

              <div className="relative">
                <Menu>
                  {({ open }) => (
                    <>
                      <NavMenu.Button open={open}>
                        <div className="relative w-8 h-8">
                          <Image
                            alt="Profile"
                            className="rounded-full"
                            layout="fill"
                            src={session.user.image ?? defaultProfilePic.src}
                          />
                        </div>
                      </NavMenu.Button>

                      <NavMenu.Items>
                        <NavMenu.Link href={`/@${session.user.username}`}>
                          Profile
                        </NavMenu.Link>
                        <NavMenu.Item onClick={() => signOut()}>
                          Sign out
                        </NavMenu.Item>
                      </NavMenu.Items>
                    </>
                  )}
                </Menu>
              </div>
            </>
          ) : (
            <>
              <NavLink href="/signup">Sign Up</NavLink>
              <NavLink href="/login">Login</NavLink>
            </>
          )}
        </div>
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
