import React, { useState } from 'react'
import { getAuth, updateCurrentUser, updateProfile } from 'firebase/auth'
 import { doc, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../firebase'


const Profile = () => {
  const [editProfile, setEditProfile] = useState(false)
  const navigate = useNavigate()
  const auth = getAuth()
  const [formData, setFormData] = useState({ username: auth.currentUser.displayName, email: auth.currentUser.email })
  const { username, email } = formData

    // signout function
    const onLogout = () => {
      auth.signOut()
      navigate('/')
    }
    
    // edit profile function
    const handleEdit = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value
      })
    }

    // submit changes to the database
    const handleSubmit = async (e) => {
      try {
        if(auth.currentUser.displayName !== username) {
          // update the displayName in firebase authentication
          await updateProfile(auth.currentUser, {
            displayName: username
          })

          // update the name in firestore
          const docRef = doc(db, 'users', auth.currentUser.uid)
          await updateDoc(docRef, {
            username
          })
        }
        toast.success('Profile details updated successfully.')
      } catch(err) {
        toast.error('Could not update profile details')
      }
    }

  return (
    <>
      <section className="max-w-6xl flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            {/* Name input */}
            <input
              type="text"
              id="username"
              value={username}
              disabled={!editProfile}
              onChange={handleEdit}
              className={`w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${editProfile && 'bg-red-300 focus:bg-red-300'}`}
            />

            {/* Email input */}
            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out my-5"
            />

            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-5'>
              <p className='flex items-center font-medium'>
                Do you want to change your name?
                <span onClick={() => {
                  editProfile && handleSubmit()
                  setEditProfile(prevState => !prevState)}
                }
                  className='text-blue-500 hover:text-blue-700 transition ease-in-out duration-200 ml-1 cursor-pointer'>{editProfile ? <span className='text-red-500 hover:text-red-700'>Apply Change</span> : 'Edit Profile'}</span>
              </p>
              <p onClick={onLogout} className='text-red-500 font-medium hover:text-red-700 transition duration-200 ease-in-out cursor-pointer'>Sign Out</p>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Profile