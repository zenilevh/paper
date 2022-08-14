/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import getCookies from 'helper/getCookies'

import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import ProtectedRoutes from './ProtectedRoutes'
import Login from 'pages/Login'
import { useStoreActions } from 'easy-peasy'

const Routes = () => {
  const { setData, setLogout } = useStoreActions((state) => state)
  const { pathname } = useLocation()
  const auth = getCookies('auth')
  const isAuthenticated =
    auth !== null &&
    auth !== ''

  useEffect(() => {
    if (isAuthenticated) {
      setData()
    } else if (pathname !== '/login') {
      setLogout()
    }
  }, [isAuthenticated, pathname])

  return (
    <Switch>
      <PublicRoute path="/login" isAuthenticated={isAuthenticated}>
        <Login />
      </PublicRoute>
      <PrivateRoute path="/" isAuthenticated={isAuthenticated}>
        <ProtectedRoutes />
      </PrivateRoute>
      <Route>Not Found Page</Route>
    </Switch>
  )
}

export default Routes;