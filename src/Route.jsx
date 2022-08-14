/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './input.css';
import BasePage from './BasePage';
import initialDB from './db.json';
import { Redirect, Route, Switch } from 'react-router-dom'
import UnauthorizedLayout from './UnauthorizedLayout';
import getCookies from 'helper/getCookies';
import { useStoreActions } from 'easy-peasy'

const Routing = () => {

  // ALAMAT DEPRACATED
  const persistDb = localStorage.getItem('db')
  const { setLogout, setData } = useStoreActions((state) => state)
  const auth = getCookies('auth');
  const isAuthorized = Boolean(auth);

  const listUser = localStorage.getItem('userList');

  useEffect(() => {
    if (listUser) {
      localStorage.setItem('userList', JSON.stringify(JSON.parse(listUser)))
    } else {
      localStorage.setItem('userList', JSON.stringify(initialDB))
    }
  }, [listUser]);

  useEffect(() => {
    if (isAuthorized) {
      setData(JSON.parse(persistDb));
    } else {
      setLogout()
    }
  }, [auth, persistDb]);

  if (!isAuthorized) {
    return <UnauthorizedLayout />
  }

  return (
    <Switch>
      <Route exact path="/login">
        <Redirect to="/" />
      </Route>
      <BasePage />
    </Switch>
  )
}

export default Routing;
