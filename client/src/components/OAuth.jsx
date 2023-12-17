import React from 'react'
import { FcGoogle } from 'react-icons/fc'

const OAuth = () => {
  return (
    <button className='flex items-center gap-1 bg-red-500 w-full py-2 rounded-md justify-center uppercase text-sm text-white hover:bg-red-600 hover:shadow-lg transition duration-200 ease-in-out active:scale-[.98]'><FcGoogle className='text-2xl bg-white rounded-full' />continue with google</button>
  )
}

export default OAuth