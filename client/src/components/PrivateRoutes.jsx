import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'

const PrivateRoutes = () => {
    const [ loggedIn, loading ] = useAuthStatus()
    console.log(loggedIn, loading)

    if(loading) {
        return <h2>Loading...</h2>
    }
  return loggedIn ? <Outlet /> : <Navigate to='/signin' />
}

export default PrivateRoutes