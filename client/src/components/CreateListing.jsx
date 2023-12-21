import React, { useState } from 'react'
import { BiCloudUpload } from 'react-icons/bi'

const CreateListing = () => {
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
  } = formData

  const handleClick = () => {}

  const handleChange = () => {}
  return (
    <main className="px-6">
      <div>
        <h1 className="text-3xl text-center mt-6 font-bold text-gray-700 uppercase border-b-2 border-gray-300 pb-1 inline-block relative left-2/4 -translate-x-2/4">
          Create a Listing
        </h1>
      </div>
      <form>
        <p className="text-lg mt-6 font-medium mb-4 text-gray-700">
          Sell / Rent
        </p>
        <div className="flex items-center">
          <button
            type="button"
            id="type"
            value="sale"
            onClick={handleClick}
            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-xl focus:shadow-lg active:scale-[.98] transition-all duration-200 ease-in-out w-full mr-3 ${
              type === 'sale'
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
            onClick={handleClick}
            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-xl focus:shadow-lg active:scale-[.98] transition-all duration-200 ease-in-out w-full ml-3 ${
              type === 'rent'
                ? 'bg-white text-gray-800'
                : 'bg-slate-600 text-gray-200'
            }`}
          >
            Rent
          </button>
        </div>

        <p className="text-lg mt-6 font-medium text-gray-700">Name</p>
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
            <p className="text-lg font-medium text-gray-700">Beds</p>
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
            <p className="text-lg font-medium text-gray-700">Baths</p>
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

        <p className="text-lg mt-6 font-medium mb-4 text-gray-700">Parking</p>
        <div className="flex items-center">
          <button
            type="button"
            id="parking"
            value={true}
            onClick={handleClick}
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
            onClick={handleClick}
            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-xl focus:shadow-lg active:scale-[.98] transition-all duration-200 ease-in-out w-full ml-3 ${
              parking ? 'bg-white text-gray-800' : 'bg-slate-600 text-gray-200'
            }`}
          >
            No
          </button>
        </div>

        <p className="text-lg mt-6 font-medium mb-4 text-gray-700">Furnished</p>
        <div className="flex items-center">
          <button
            type="button"
            id="furnished"
            value={true}
            onClick={handleClick}
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
            onClick={handleClick}
            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-xl focus:shadow-lg active:scale-[.98] transition-all duration-200 ease-in-out w-full ml-3 ${
              furnished
                ? 'bg-white text-gray-800'
                : 'bg-slate-600 text-gray-200'
            }`}
          >
            No
          </button>
        </div>

        <p className="text-lg mt-6 font-medium text-gray-700">Address</p>
        <textarea
          type="text"
          id="address"
          value={address}
          placeholder="Address"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border rounded border-gray-300 transition-all duration-200 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
          onChange={handleChange}
        />

        <p className="text-lg mt-6 font-medium text-gray-700">Description</p>
        <textarea
          type="text"
          id="description"
          value={description}
          placeholder="Description"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border rounded border-gray-300 transition-all duration-200 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
          onChange={handleChange}
        />

        <p className="text-lg mt-6 font-medium mb-4 text-gray-700">Offer</p>
        <div className="flex items-center mb-6">
          <button
            type="button"
            id="offer"
            value={true}
            onClick={handleClick}
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
            onClick={handleClick}
            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-xl focus:shadow-lg active:scale-[.98] transition-all duration-200 ease-in-out w-full ml-3 ${
              offer ? 'bg-white text-gray-800' : 'bg-slate-600 text-gray-200'
            }`}
          >
            No
          </button>
        </div>

        <div className="mb-6">
          <p className="text-lg font-medium text-gray-700">Regular Price</p>
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
                  $ / Month
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
                    $ / Month
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
          className="uppercase bg-red-500 w-full px-7 py-2 mb-6 text-slate-200 font-medium rounded shadow-md hover:bg-red-600 focus:bg-red-600 focus:shadow-xl hover:shadow-xl active:scale-[.98] transition-all duration-200 ease-in-out"
        >
          Create listing
        </button>
      </form>
    </main>
  )
}

export default CreateListing
