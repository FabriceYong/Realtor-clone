import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import OAuth from '../components/OAuth'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  return (
    <div>
      <h1 className="text-3xl text-center mt-6 font-bold text-gray-700">Reset Password</h1>
      <div className="flex justify-center items-center px-6 py-12 max-w-6xl  mx-auto flex-wrap">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://media.istockphoto.com/id/171261665/photo/key-for-you.jpg?s=612x612&w=0&k=20&c=qJjQlCaa21WJelffU2gUtq0ioBSGYQCAD29wzbsd7pA="
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <input
                type="email"
                id="email"
                value={email}
                placeholder="Email address"
                className="w-full px-4 py-2 text-xl text-gray-600 bg-white border-gray-300 rounded-md transition ease-in-out outline-orange-600"
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-between items-center whitespace-nowrap text-sm sm:text-lg">
              <p className="font-medium text-gray-700">
                Don't have an account?{' '}
                <Link
                  to={'/signup'}
                  className="underline text-orange-500 transition duration-200 hover:text-orange-600"
                >
                  Register
                </Link>
              </p>
              <p className="font-medium text-blue-500 hover:text-blue-700 transition duration-200">
                <Link to={'/signin'}>Sign In</Link>
              </p>
            </div>
            <button
              className="bg-blue-600 w-full py-2 mt-5 rounded-md font-medium uppercase hover:bg-blue-700 transition duration-200 ease-in-out text-white active:scale-[.98] hover:shadow-lg"
              type="submit"
            >
              Send reset password
            </button>

            <div className="flex items-center my-4 before:border-t  before:flex-1  before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
              <p className="text-center font-medium mx-4">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
