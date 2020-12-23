import React, {useEffect} from 'react';
import LoginForm from './components/LoginForm'

import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";

function LoginPage() {
  let { path, url } = useRouteMatch();
  let location = useLocation();
  let history = useHistory();
  let user = useSelector(state=>state.auth.user);
  let { from } = location.state || { from: { pathname: "/" } };

  useEffect(()=>{
    if(user){
      history.replace(from)
    }
  }, [])

  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
