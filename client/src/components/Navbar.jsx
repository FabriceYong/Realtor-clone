import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const Navbar = () => {
  const [pageState, setPageState] = useState('Sign In')
  const location = useLocation()

  const path = (route) => {
    if (route === location.pathname) {
      return true
    }
  }

  const auth = getAuth()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        setPageState('Profile')
      } else{
        setPageState('Sign In')
      }
    })
  }, [auth])


  return (
    <header className="bg-white border-b shadow-sm sticky z-50 top-0 sm:py-5">
      <nav className="inline  sm:flex items-center justify-between max-w-7xl px-3 mx-auto">
        <div className='flex items-center justify-center mb-4'>
          <Link to={'/'}>
            <img
              src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
              alt="logo"
              className="h-8 sm:h-6 cursor-pointer"
            />
          </Link>
        </div>
        <div>
          <ul className="inline text-center sm:flex items-center sm:space-x-10 text-lg">
            <Link to={'/'}>
              <li
                className={`text-gray-500 font-medium border-b-[3px] border-b-transparent ${
                  path('/') && 'bg-red-600 my-2 sm:my-0 scale-125 px-2 rounded-2xl text-slate-300'
                } cursor-pointer`}
              >
                Home
              </li>
            </Link>
            <Link to={'/offers'}>
              <li
                className={`text-gray-500 font-medium border-b-[3px] border-b-transparent ${
                  path('/offers') && 'bg-red-600 my-2 sm:my-0 scale-125 px-2 rounded-2xl text-slate-300'
                } cursor-pointer`}
              >
                Offers
              </li>
            </Link>
            <Link to={auth.currentUser ? '/profile' : '/signin'}>
              <li
                className={`text-gray-500 font-medium border-b-[3px] border-b-transparent ${
                  (path('/signin') || path('/profile')) && 'bg-red-600 my-2 sm:my-0 scale-125 rounded-2xl px-2 text-slate-300'
                } cursor-pointer`}
              >
                { pageState }
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
