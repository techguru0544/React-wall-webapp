import React, {useContext, useLayoutEffect} from 'react'
import {Redirect} from 'react-router-dom'

import { UserContext } from "./contexts/UserContext";
import { isUserLoggedIn } from './api/Queries';

const ProtectedRoute = ({component: Component, location}) => {
  const userState = useContext(UserContext);

  useLayoutEffect(() => {
    async function authenticate() {
        const user = await isUserLoggedIn({ id: userState.id, token: userState.token });
        if (!user) {
          userState.logout();
        } else {
          userState.login({ ...user, token: userState.token });
        }
    }

    authenticate();
  }, [userState.isLoggedIn]);

  return userState.isLoggedIn ? (
    <Component/>
  ) : (
    <Redirect to={{pathname: '/Login'}}/>
  );

}

export default ProtectedRoute;
