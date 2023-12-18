import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import { getDoc, serverTimestamp, setDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'


const OAuth = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const onGoggleClick = async () => {
    try {
      setLoading(true)
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      // check for the user
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      if(!docSnap.exists()) {
        await setDoc(docRef, {
          username: user.displayName,
          email: user.email, 
          timestamp: serverTimestamp(),
          photo: user.photoURL
        })
        toast.success('Account created successfully')
      } else {
        toast.warn('User already exists, please login')
      }
      console.log(user)
      setLoading(false)
      navigate('/')
    }catch (err) {
      toast.error('could nto authorize with Google')
      console.log(err)
      setLoading(false)
    }
  }
  
  return (
    <button disabled={loading} onClick={onGoggleClick} type='button' className='flex items-center gap-1 bg-red-500 w-full py-2 rounded-md justify-center uppercase text-sm text-white hover:bg-red-600 hover:shadow-lg transition duration-200 ease-in-out active:scale-[.98]'><FcGoogle className='text-2xl bg-white rounded-full' />continue with google</button>
  )
}

export default OAuth