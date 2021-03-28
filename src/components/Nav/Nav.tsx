import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Nav = () => {
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
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-carbon-400 dark:hover:text-white hover:bg-carbon-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => {
                setMobileMenuOn(!mobileMenuOn)
              }}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
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
                      layout="fill"
                      objectFit="cover"
                      src="/logo.svg"
                      alt="SnippetHub Logo"
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
            <div className="ml-3 relative">
              <div>
                <button
                  type="button"
                  className="bg-carbon-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-carbon-800 focus:ring-white"
                  onClick={() => setProfileOptionsOn(!profileOptionsOn)}
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
                  id="user-menu"
                  aria-haspopup="true"
                  aria-expanded={profileOptionsOn}
                >
                  <span className="sr-only">Open user menu</span>

                  <div className="relative h-8 w-8">
                    <Image
                      className="rounded-full"
                      layout="fill"
                      objectFit="cover"
                      src="/profile_pic.png"
                      alt="Profile Picture"
                    />
                  </div>
                </button>
              </div>
              <div
                className={
                  profileOptionsOn
                    ? 'origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-carbon-700 dark:text-white font-medium ring-1 ring-black ring-opacity-5 z-10'
                    : 'hidden'
                }
                ref={profileOptionsContainer}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
                onBlur={() => {
                  profileOptionsTimeoutId = setTimeout(() => {
                    setProfileOptionsOn(false)
                  })
                }}
                onFocus={() => clearTimeout(profileOptionsTimeoutId)}
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
              href="#"
              className="bg-carbon-900 dark:text-white block px-3 py-2 rounded-md text-base font-medium"
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
