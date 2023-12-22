import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import Offers from './pages/Offers'
import Navbar from './components/Navbar'
import PrivateRoutes from './components/PrivateRoutes'
import CreateListing from './components/CreateListing'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/profile" element={<PrivateRoutes />}>
            <Route exact path="/profile" element={<Profile />} />
          </Route>
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/offers" element={<Offers />} />
          <Route exact path='/create-listing' element={<PrivateRoutes />}>
            <Route exact path='/create-listing' element={ <CreateListing />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default App
