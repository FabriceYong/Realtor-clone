import React from 'react'
import { useLocation, Link } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()

  const path = (route) => {
    if (route === location.pathname) {
      return true
    }
  }

  return (
    <header className="bg-white border-b shadow-sm sticky z-50 top-0 py-4">
      <nav className="flex items-center justify-between max-w-7xl px-3 mx-auto">
        <div>
          <Link to={'/'}>
            <img
              src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
              alt="logo"
              className="h-5 cursor-pointer"
            />
          </Link>
        </div>
        <div>
          <ul className="flex items-center space-x-10">
            <Link to={'/'}>
              <li
                className={`text-gray-500 font-medium border-b-[3px] border-b-transparent ${
                  path('/') && 'text-gray-900 border-b-red-600'
                } cursor-pointer`}
              >
                Home
              </li>
            </Link>
            <Link to={'offers'}>
              <li
                className={`text-gray-500 font-medium border-b-[3px] border-b-transparent ${
                  path('/offers') && 'text-gray-900 border-b-red-600'
                } cursor-pointer`}
              >
                Offers
              </li>
            </Link>
            <Link to={'signin'}>
              <li
                className={`text-gray-500 font-medium border-b-[3px] border-b-transparent ${
                  path('/signin') && 'text-gray-900 border-b-red-600'
                } cursor-pointer`}
              >
                Sign in
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
