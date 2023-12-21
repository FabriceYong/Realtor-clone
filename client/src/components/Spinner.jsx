import React from 'react'
import spinner from '../assets/svg/spinner.svg'

const Spinner = () => {
  return (
    <div className='flex justify-center items-center bg-gray-800 bg-opacity-50 fixed left-0 right-0 top-0 bottom-0 z-40'>
        <div>
            <img src={spinner} alt="Loading..." />
        </div>
    </div>
  )
}

export default Spinner