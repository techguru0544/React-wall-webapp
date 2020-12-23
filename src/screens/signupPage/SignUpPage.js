import React from 'react';
import SignUpForm from './components/SignUpForm';

import {
  Redirect,
  withRouter,
  useHistory,
  useLocation
} from "react-router-dom";

function SignUpPage(props) {
  return (
    <div>
      <SignUpForm />
    </div>
  );
}

export default withRouter(SignUpPage);
