import React from 'react';
import ResetPasswordForm from './components/ResetPasswordForm'
import {
  withRouter
} from "react-router-dom";

function ResetPasswordPage(props) {
  return (
    <div>
        <ResetPasswordForm />
    </div>
  );
}

export default withRouter(ResetPasswordPage)
