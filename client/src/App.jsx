import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import Offers from './pages/Offers'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route  exact path='/profile' element={<Profile />} />
          <Route exact path='/signin' element={<SignIn />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/forgot-password' element={<ForgotPassword />} />
          <Route exact path='/offers' element={<Offers />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
