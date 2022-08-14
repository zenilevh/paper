import Navbar from 'components/Navbar'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from './routes' // route list

const ProtectedRoutes = () => (
  <Switch>
    {routes.map(({ component: Component, path, exact }) => (
      <Route path={`/${path}`} key={path} exact={exact}>
        <Navbar />
        <div className="absolute top-0 flex h-screen w-full flex-row overflow-hidden pt-20">
          <div className="relative z-0 flex h-full w-full overflow-auto pb-20 pt-4">
            <Component />
          </div>
        </div>
      </Route>
    ))}
  </Switch>
)

export default ProtectedRoutes
