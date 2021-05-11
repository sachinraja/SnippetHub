import { ChevronDownIcon, PlusIcon } from '@heroicons/react/outline'
import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Nav = () => {
  const [newOptionsOn, setNewOptionsOn] = useState(false)
  let newOptionsTimeoutId: NodeJS.Timeout
  const newOptionsContainer = useRef<HTMLDivElement>(null)
  const [profileOptionsOn, setProfileOptionsOn] = useState(false)
  let profileOptionsTimeoutId: NodeJS.Timeout
  const profileOptionsContainer = useRef<HTMLDivElement>(null)
  const [mobileMenuOn, setMobileMenuOn] = useState(false)

  return (
    <nav className="bg-carbon-800">
      <div className="px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              aria-expanded="false"
              className="inline-flex items-center justify-center p-2 rounded-md text-carbon-400 dark:hover:text-white hover:bg-carbon-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => {
                setMobileMenuOn(!mobileMenuOn)
              }}
              type="button"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                aria-hidden="true"
                className="block h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              <svg
                aria-hidden="true"
                className="hidden h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <Link href="/">
              <a>
                <div className="flex-shrink-0 flex items-center">
                  <div className="relative w-8 h-8">
                    <Image
                      alt="SnippetHub Logo"
                      layout="fill"
                      objectFit="cover"
                      src="/logo.svg"
                    />
                  </div>
                </div>
              </a>
            </Link>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link href="/">
                  <a className="bg-carbon-900 dark:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Browse
                  </a>
                </Link>
                <Link href="/">
                  <a className="text-carbon-300 hover:bg-carbon-700 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Your Snippets
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div>
              <button
                aria-expanded={newOptionsOn}
                aria-haspopup="true"
                className="p-1 rounded-full text-carbon-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                id="user-menu"
                onBlur={() => {
                  if (
                    profileOptionsContainer.current &&
                    !profileOptionsContainer.current.contains(
                      document.activeElement,
                    ) &&
                    document.activeElement !== profileOptionsContainer.current
                  ) {
                    newOptionsTimeoutId = setTimeout(() => {
                      setNewOptionsOn(false)
                    })
                  }
                }}
                onClick={() => setNewOptionsOn(!newOptionsOn)}
                type="button"
              >
                <span className="sr-only">Create new</span>
                <PlusIcon className="h-6 w-6 inline" />
                <ChevronDownIcon className="h-6 w-4 inline transform translate-y-2 -translate-x-1" />
              </button>
              <div
                ref={newOptionsContainer}
                aria-labelledby="user-menu"
                aria-orientation="vertical"
                className={
                  newOptionsOn
                    ? 'origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-carbon-700 dark:text-white font-medium ring-1 ring-black ring-opacity-5 z-10'
                    : 'hidden'
                }
                onBlur={() => {
                  newOptionsTimeoutId = setTimeout(() => {
                    setNewOptionsOn(false)
                  })
                }}
                onFocus={() => clearTimeout(newOptionsTimeoutId)}
                role="menu"
              >
                <Link href="/new">
                  <a
                    className="block px-4 py-2 text-sm hover:bg-carbon-500"
                    role="menuitem"
                    tabIndex={0}
                  >
                    New Pack
                  </a>
                </Link>
              </div>
            </div>

            <div className="ml-3 relative">
              <div>
                <button
                  aria-expanded={profileOptionsOn}
                  aria-haspopup="true"
                  className="bg-carbon-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-carbon-800 focus:ring-white"
                  id="user-menu"
                  onBlur={() => {
                    if (
                      profileOptionsContainer.current &&
                      !profileOptionsContainer.current.contains(
                        document.activeElement,
                      ) &&
                      document.activeElement !== profileOptionsContainer.current
                    ) {
                      profileOptionsTimeoutId = setTimeout(() => {
                        setProfileOptionsOn(false)
                      })
                    }
                  }}
                  onClick={() => setProfileOptionsOn(!profileOptionsOn)}
                  type="button"
                >
                  <span className="sr-only">Open user menu</span>

                  <div className="relative h-8 w-8">
                    <Image
                      alt="Profile Picture"
                      className="rounded-full"
                      layout="fill"
                      objectFit="cover"
                      src="/profile-pic.png"
                    />
                  </div>
                </button>
              </div>
              <div
                ref={profileOptionsContainer}
                aria-labelledby="user-menu"
                aria-orientation="vertical"
                className={
                  profileOptionsOn
                    ? 'origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-carbon-700 dark:text-white font-medium ring-1 ring-black ring-opacity-5 z-10'
                    : 'hidden'
                }
                onBlur={() => {
                  profileOptionsTimeoutId = setTimeout(() => {
                    setProfileOptionsOn(false)
                  })
                }}
                onFocus={() => clearTimeout(profileOptionsTimeoutId)}
                role="menu"
              >
                <Link href="#">
                  <a
                    className="block px-4 py-2 text-sm hover:bg-carbon-500"
                    role="menuitem"
                    tabIndex={0}
                  >
                    Your Profile
                  </a>
                </Link>
                <Link href="#">
                  <a
                    className="block px-4 py-2 text-sm hover:bg-carbon-500"
                    role="menuitem"
                    tabIndex={0}
                  >
                    Settings
                  </a>
                </Link>
                <Link href="#">
                  <a
                    className="block px-4 py-2 text-sm hover:bg-carbon-500"
                    role="menuitem"
                    tabIndex={0}
                  >
                    Sign out
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${mobileMenuOn ? 'block' : 'hidden'} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="#">
            <a
              className="bg-carbon-900 dark:text-white block px-3 py-2 rounded-md text-base font-medium"
              href="#"
            >
              Browse
            </a>
          </Link>
          <Link href="#">
            <a className="text-carbon-300 hover:bg-carbon-700 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Your Snippets
            </a>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Nav
