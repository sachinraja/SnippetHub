import React, { useState } from 'react';
import Image from 'next/image';

const Nav = () => {
  const [profileOptionsOn, setProfileOptionsOn]: [boolean, Function] = useState(false);
  const [mobileMenuOn, setMobileMenuOn]: [boolean, Function] = useState(false);

  return (
    <nav className="bg-carbon-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-carbon-400 hover:text-white hover:bg-carbon-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" onClick={() => setMobileMenuOn(!mobileMenuOn)} aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <a href="/">
              <div className="flex-shrink-0 flex items-center">
                <div className="relative w-8 h-8">
                  <Image layout="fill" objectFit="cover" src="/snippetsplace.svg" alt="SnippetsPlace Logo" />
                </div>
              </div>
            </a>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <a href="#" className="bg-carbon-900 text-white px-3 py-2 rounded-md text-sm font-medium">Browse</a>
                <a href="#" className="text-carbon-300 hover:bg-carbon-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Your Snippets</a>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 relative">
              <div>
                <button className="bg-carbon-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-carbon-800 focus:ring-white" onClick={() => setProfileOptionsOn(!profileOptionsOn)} onBlur={() => setProfileOptionsOn(false)} id="user-menu" aria-haspopup="true">
                  <span className="sr-only">Open user menu</span>

                  <div className="relative h-8 w-8">
                    <Image className="rounded-full" layout="fill" objectFit="cover" src="/profile_pic.png" alt="Profile Picture" />
                  </div>
                </button>
              </div>
              <div className={profileOptionsOn ? "origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-carbon-700 text-white font-medium   ring-1 ring-black ring-opacity-5 z-10" : "hidden"} role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                <a href="#" className="block px-4 py-2 text-sm hover:bg-carbon-500" role="menuitem">Your Profile</a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-carbon-500" role="menuitem">Settings</a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-carbon-500" role="menuitem">Sign out</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={(mobileMenuOn ? "block" : "hidden") + " sm:hidden"}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a href="#" className="bg-carbon-900 text-white block px-3 py-2 rounded-md text-base font-medium">Browse</a>
          <a href="#" className="text-carbon-300 hover:bg-carbon-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Your Snippets</a>
        </div>
      </div>
    </nav>
    )
}

export default Nav;