import React, { useEffect, useContext, useLayoutEffect } from 'react'
import LandingPage from './protectedScreens/landingPage/LandingPage'
import LoginPage from './screens/loginPage/LoginPage'
import SignUpPage from './screens/signupPage/SignUpPage'
import ResetPasswordPage from './screens/resetPassword/ResetPasswordPage';
import ForgotPassword from './screens/loginPage/components/ForgotPassword';
import NoContentPage from './screens/noContentPage/NoContentPage';

import GuestLandingPage from './screens/landingPage/LandingPage';

import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import { UserContext } from "./contexts/UserContext";
import { isUserLoggedIn } from './api/Queries';
import ProtectedRoute from './ProtectedRoute';
import { getTokenFromLocalStorage, getUserFromLocalStorage } from './utils/localStorage';

function AppRouter() {
  const userState = useContext(UserContext);
  useEffect(() => {
    const token = getTokenFromLocalStorage();
    const loggedUser = getUserFromLocalStorage();

    async function authenticate() {
      const user = await isUserLoggedIn({ id: loggedUser && loggedUser.id, token });
      if (!user) {
        userState.logout();
      } else {
        userState.login({ ...user, token: token });
      }
    }

    authenticate();
  }, [userState.isLoggedIn]);

  return (
    <>
      <Switch>
        <Route path="/Login">
          <LoginPage />
        </Route>
        <Route path="/Forgot-password">
          <ForgotPassword />
        </Route>
        <Route path="/Signup">
          <SignUpPage />
        </Route>
        <Route path="/Generate-password">
          <ResetPasswordPage />
        </Route>
        <Route path="/User/Guest">
          <GuestLandingPage />
        </Route>
        <ProtectedRoute exact path="/User/Dashboard" component={LandingPage} />
        <Route path={`/`}>
          <NoContentPage />
        </Route>
      </Switch>
    </>
  )
}

export default AppRouter;
