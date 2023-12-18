import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'
import { db } from '../firebase'
import { toast } from 'react-toastify'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '', username: '' })
  const { username, email, password } = formData
  
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      if(!username || !password || !email) {
        toast.error('All input fields are required.')
        setLoading(false)
        return
      }

      const auth = getAuth()
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password)

      updateProfile(auth.currentUser, {
        displayName: username
      })


      const user = userCredentials.user
      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()
  
      await setDoc(doc(db, 'users', user.uid), formDataCopy)
      console.log(user)
      toast.success('Account created successfully, You can log in now')
      setLoading(false)
      navigate('/signin')
    } catch(err) {
      setLoading(false)
      toast.error('Something went wrong with the signup process')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  return (
    <div>
      <h1 className="text-3xl text-center mt-6 font-bold text-gray-700">Sign Up</h1>
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
            <div>
              <input type="text" id='username' value={username} placeholder='Enter Username' className='w-full px-4 text-xl text-gray-600 bg-white border-gray-300 rounded-md transition ease-in-out mb-5' onChange={handleChange} />
            </div>
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
            <div className="relative mb-5">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                placeholder="Password"
                className="w-full px-4 py-2 text-xl text-gray-600 bg-white border-gray-300 rounded-md transition ease-in-out outline-orange-600 relative"
                onChange={handleChange}
              />
              {showPassword ? (
                <FaEye
                  className="absolute right-3 top-4 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <FaEyeSlash
                  className="absolute right-3 top-4 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
            <div className="flex justify-between items-center whitespace-nowrap text-sm sm:text-lg">
              <p className="font-medium text-gray-700">
                Already have an account?{' '}
                <Link
                  to={'/signin'}
                  className="underline text-blue-500 transition duration-200 hover:text-blue-700"
                >
                  Login
                </Link>
              </p>
              <p className="font-medium text-orange-600 hover:text-red-600 transition duration-200">
                <Link to={'/forgot-password'}>Forgot Password</Link>
              </p>
            </div>
            <button
              disabled={loading}
              className="bg-blue-600 w-full py-2 mt-5 rounded-md font-medium uppercase hover:bg-blue-700 transition duration-200 ease-in-out text-white active:scale-[.98] hover:shadow-lg"
              type="submit"
            >
              Sign Up
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

export default SignUp
