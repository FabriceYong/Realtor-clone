import React, { useState } from 'react'
import { BiCloudUpload } from 'react-icons/bi'
import { MdAdd } from 'react-icons/md'
import Spinner from './Spinner'
import { toast } from 'react-toastify'
import { getAuth } from 'firebase/auth'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { addDoc, serverTimestamp, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigate } from 'react-router-dom'

const CreateListing = () => {
  const [geolocationEnabled, setGeolocationEnabled] = useState(true)
  const auth = getAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    type: 'rent',
    name: '',
    bedrooms: 1,
    bathrooms: 2,
    parking: false,
    furnished: false,
    address: '',
    description: '',
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    latitude: '0',
    longitude: '0',
    images: {},
  })
  const {
    type,
    name,
    address,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    description,
    offer,
    regularPrice,
    discountedPrice,
    latitude,
    longitude,
    images,
  } = formData

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (+discountedPrice >= +regularPrice) {
      setLoading(false)
      toast.error('Discounted price must be less than the Regular price')
      return
    }

    if (images.length > 6) {
      setLoading(false)
      toast.error('Images must be 6 files or less')
      return
    }

    let geolocation = {}
    let location
    if (geolocationEnabled) {
      // geting location data from the google maps geocode api
      try {
        setLoading(true)
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${
            import.meta.env.VITE_APP_GEOCODE_API_KEY
          }`
        )
        const data = await response.json()

        geolocation.lat = data.results[0]?.geometry.location.lat ?? 0
        geolocation.lng = data.results[0]?.geometry.location.lng ?? 0

        location = data.status === 'ZERO_RESULTS' && undefined

        if (location === undefined) {
          setLoading(false)
          toast.error('Please provide a valid place or address')
          return
        }
      } catch (error) {
        setLoading(false)
        toast.error('There was an error fetching the geolocation')
        console.log(error.message)
      }
    } else {
      // if geelocation is not enabled get the coordinates from the form input
      geolocation.lat = latitude
      geolocation.lng = longitude
    }

    // Handle image uploads to the server
    const storeImage = (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage()
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`
        console.log(filename)
        const storageRef = ref(storage, filename)
        const uploadTask = uploadBytesResumable(storageRef, image)

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            //Observe state change events such as progress, pause, and resume
            // Get tasks progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log(`Upload is ${progress}% done`)
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused')
                break
              case 'running':
                console.log('Upload is running')
                break
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error, error.message)
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the downlad URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL)
            })
          }
        )
      })
    }

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((err) => {
      setLoading(false)
      toast.error('Images not uploaded')
      return
    })
    const formDataCopy = {
      ...formData,
      imgUrls,
      geolocation,
      timestamps: serverTimestamp()
    }
    delete formDataCopy.images;
    delete formDataCopy.latitude;
    delete formDataCopy.longitude;
    !formDataCopy.offer && delete formDataCopy.discountedPrice
    const docRef = await addDoc(collection(db, 'listings'), formDataCopy)
    setLoading(false)
    toast.success('New Listing created successfully')
    navigate(`/category/${formDataCopy.type}/${docRef.id}`)
  }

  // console.log(import.meta.env.VITE_APP_GEOCODE_API_KEY)

  const handleChange = (e) => {
    let boolean = null
    if (e.target.value === 'true') {
      boolean = true
    }

    if (e.target.value === 'false') {
      boolean = false
    }

    if (e.target.files) {
      setFormData({
        ...formData,
        images: e.target.files,
      })
    }

    if (!e.target.files) {
      setFormData({
        ...formData,
        [e.target.id]: boolean ?? e.target.value,
      })
    }
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <main className="px-6 max-w-screen-lg mx-auto">
      <div>
        <h1 className="text-3xl text-center mt-6 font-bold text-gray-700 uppercase border-b-2 border-gray-300 pb-1 inline-block relative left-2/4 -translate-x-2/4">
          Create a Listing
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <p className="text-lg mt-6 font-medium mb-2 text-gray-700">
          Sell / Rent
        </p>
        <div className="flex items-center">
          <button
            type="button"
            id="type"
            value="sale"
            onClick={handleChange}
            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-xl focus:shadow-lg active:scale-[.98] transition-all duration-200 ease-in-out w-full mr-3 ${
              type === 'rent'
                ? 'bg-white text-gray-800 '
                : 'bg-slate-600 text-gray-200'
            }`}
          >
            Sell
          </button>
          <button
            type="button"
            id="type"
            value="rent"
            onClick={handleChange}
            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-xl focus:shadow-lg active:scale-[.98] transition-all duration-200 ease-in-out w-full ml-3 ${
              type === 'sale'
                ? 'bg-white text-gray-800'
                : 'bg-slate-600 text-gray-200'
            }`}
          >
            Rent
          </button>
        </div>

        <p className="text-lg mt-6 font-medium mb-2 text-gray-700">Name</p>
        <input
          type="text"
          id="name"
          value={name}
          placeholder="Name"
          maxLength={'32'}
          minLength={'10'}
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border rounded border-gray-300 transition-all duration-200 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
          onChange={handleChange}
        />

        <div className="flex space-x-6 mb-6 max-w-[50%]">
          <div className="w-full">
            <p className="text-lg mb-2 font-medium text-gray-700">Beds</p>
            <input
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={handleChange}
              min={1}
              max={50}
              required
              className="px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition-all duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center w-full"
            />
          </div>
          <div className="w-full">
            <p className="text-lg font-medium mb-2 text-gray-700">Baths</p>
            <input
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={handleChange}
              min={1}
              max={50}
              required
              className="px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition-all duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center w-full"
            />
          </div>
        </div>

        <p className="text-lg mt-6 font-medium mb-2 text-gray-700">Parking</p>
        <div className="flex items-center">
          <button
            type="button"
            id="parking"
            value={true}
            onClick={handleChange}
            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-xl focus:shadow-lg active:scale-[.98] transition-all duration-200 ease-in-out w-full mr-3 ${
              !parking
                ? 'bg-white text-gray-800 '
                : 'bg-slate-600 text-gray-200'
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="parking"
            value={false}
            onClick={handleChange}
            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-xl focus:shadow-lg active:scale-[.98] transition-all duration-200 ease-in-out w-full ml-3 ${
              parking ? 'bg-white text-gray-800' : 'bg-slate-600 text-gray-200'
            }`}
          >
            No
          </button>
        </div>

        <p className="text-lg mt-6 font-medium mb-2 text-gray-700">Furnished</p>
        <div className="flex items-center">
          <button
            type="button"
            id="furnished"
            value={true}
            onClick={handleChange}
            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-xl focus:shadow-lg active:scale-[.98] transition-all duration-200 ease-in-out w-full mr-3 ${
              !furnished
                ? 'bg-white text-gray-800 '
                : 'bg-slate-600 text-gray-200'
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="furnished"
            value={false}
            onClick={handleChange}
            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-xl focus:shadow-lg active:scale-[.98] transition-all duration-200 ease-in-out w-full ml-3 ${
              furnished
                ? 'bg-white text-gray-800'
                : 'bg-slate-600 text-gray-200'
            }`}
          >
            No
          </button>
        </div>
        <div className="w-full sm:flex sm:items-center gap-6 mt-5">
          <div className="w-full">
            <p className="text-lg mt-6 sm:mt-0 font-medium mb-2 text-gray-700">
              Address
            </p>
            <textarea
              type="text"
              id="address"
              value={address}
              placeholder="Address"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border rounded border-gray-300 transition-all duration-200 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
              onChange={handleChange}
            />
            {!geolocationEnabled && (
              <div className="flex space-x-4 mb-6">
                <div className="w-full">
                  <p className="font-medium text-lg text-gray-700 mb-2">
                    Latitude
                  </p>
                  <input
                    type="number"
                    id="latitude"
                    value={latitude}
                    onChange={handleChange}
                    min={-90}
                    max={90}
                    required
                    className="w-full py-2 px-4 text-lg text-gray-700 bg-white border border-gray-300 rounded transition-all duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center"
                  />
                </div>
                <div className="w-full">
                  <p className="font-medium text-lg text-gray-700 mb-2">
                    Longitude
                  </p>
                  <input
                    type="number"
                    id="longitude"
                    value={longitude}
                    min={-180}
                    max={108}
                    onChange={handleChange}
                    required
                    className="w-full py-2 px-4 text-lg text-gray-700 bg-white border border-gray-300 rounded transition-all duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="w-full">
            <p className="text-lg font-medium mb-2 text-gray-700">
              Description
            </p>
            <textarea
              type="text"
              id="description"
              value={description}
              placeholder="Description"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border rounded border-gray-300 transition-all duration-200 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
              onChange={handleChange}
            />
          </div>
        </div>

        <p className="text-lg font-medium mb-2 text-gray-700">Offer</p>
        <div className="flex items-center mb-6">
          <button
            type="button"
            id="offer"
            value={true}
            onClick={handleChange}
            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-xl focus:shadow-lg active:scale-[.98] transition-all duration-200 ease-in-out w-full mr-3 ${
              !offer ? 'bg-white text-gray-800 ' : 'bg-slate-600 text-gray-200'
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="offer"
            value={false}
            onClick={handleChange}
            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-xl focus:shadow-lg active:scale-[.98] transition-all duration-200 ease-in-out w-full ml-3 ${
              offer ? 'bg-white text-gray-800' : 'bg-slate-600 text-gray-200'
            }`}
          >
            No
          </button>
        </div>

        <div className="mb-6">
          <p className="text-lg mb-2 font-medium text-gray-700">
            Regular Price
          </p>
          <div className="w-full flex justify-between items-center space-x-4">
            <input
              type="number"
              id="regularPrice"
              value={regularPrice}
              onChange={handleChange}
              min={50}
              max={400000000}
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center"
            />

            {type === 'rent' && (
              <div className="w-full">
                <p className="text-md w-full whitespace-nowrap font-medium text-gray-700">
                  ${regularPrice} / Month
                </p>
              </div>
            )}
          </div>
        </div>

        {offer && (
          <div className="mb-6">
            <p className="text-lg font-medium text-gray-700">
              Discounted Price
            </p>
            <div className="w-full flex justify-between items-center space-x-4">
              <input
                type="number"
                id="discountedPrice"
                value={discountedPrice}
                onChange={handleChange}
                min={50}
                max={400000000}
                required={offer}
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center"
              />

              {type === 'rent' && (
                <div className="w-full">
                  <p className="text-md w-full whitespace-nowrap font-medium text-gray-700">
                    ${discountedPrice} / Month
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="mb-6">
          <p className="text-lg font-medium text-gray-700">Images</p>
          <p className="text-gray-400 font-medium">
            The first image will be the cover (max 6)
          </p>
          <input
            type="file"
            id="images"
            onChange={handleChange}
            accept=".jpg,.png,.jpeg"
            multiple
            required
            className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition-all duration-150 ease-in-out focus:border-slate-600"
          />
        </div>
        {/* <label className="border border-red-700 bg-red-500 w-32 h-28 flex items-center justify-center p-8 gap-2 bg-transparent rounded-2xl text-center text-gray-600 text-2xl cursor-pointer">
          <BiCloudUpload className='text-8xl' />
          <input type="file" multiple hidden={true} id='images' accept='.jpg, .png, .jpeg' required />
        </label> */}

        <button
          type="submit"
          className="uppercase bg-red-500 w-full px-7 py-2 mb-6 text-slate-200 font-medium rounded shadow-md hover:bg-slate-700 focus:bg-red-600 focus:shadow-xl hover:shadow-xl active:scale-[.98] transition-all duration-200 ease-in-out flex items-center justify-center gap-1"
        >
          <MdAdd className="text-3xl" />
          Create listing
        </button>
      </form>
    </main>
  )
}

export default CreateListing
