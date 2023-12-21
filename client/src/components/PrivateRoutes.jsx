import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner'

const PrivateRoutes = () => {
    const [ loggedIn, loading ] = useAuthStatus()

    if(loading) {
        return <Spinner />
    }
  return loggedIn ? <Outlet /> : <Navigate to='/signin' />
}

export default PrivateRoutes