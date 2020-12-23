import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { Dots } from 'react-activity';

import {
    useHistory,
    useLocation,
} from "react-router-dom";
import { resetPasswordQuery } from '../../../api/Queries';
import { ResetPasswordSchema } from '../../../validation/ResetPasswordSchema';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function ResetPasswordForm(props) {
    let history = useHistory();
    let query = useQuery();

    const [errorMessage, setErrorMessage] = React.useState("");

    useEffect(() => {
      if (errorMessage) {
          setTimeout(() => {
                setErrorMessage("");
            }, 2000)
        }
    }, [errorMessage])  

    useEffect(() => {
        console.log(query.get('token'));
    }, [])

    const resetPasswordHandler = async (creds, resetForm) => {
      try {
          const data = await resetPasswordQuery(creds);
          if (data && data.status === 'OK') {
              history.push('/Login');
          } else {
            setErrorMessage('An error occured while attempting to set the password or new password may not be valid');
            resetForm();
          }
      } catch (e) {
          console.log(e);
          resetForm();
          setErrorMessage('a network error occured');
      }
    };

    return (
        <div className="common-page-wrapper">
            <div className="login-form shadow">
                <div className="card-body">
                    <div className="card-head text-center">
                        <h2>Reset Password</h2>
                    </div>
                    <div className="card-text">
                      <Formik
                          initialValues={{
                            password: "",
                            token: query.get('token'),
                            confirm_password: "",
                          }}
                          validationSchema={ResetPasswordSchema}
                          onSubmit={(values, { resetForm }) => {
                            resetPasswordHandler(values, resetForm);
                          }}
                      >
                          {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              isSubmitting,
                          }) => (
                            <form onSubmit={handleSubmit}>
                              <div className={`form-group ${errors.password && touched.password ? 'has-danger' : ''}`}>
                                  <label htmlFor="inputNewPassword">New password</label>
                                  <input
                                      type="password"
                                      name="password"
                                      placeholder="New password"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.password}
                                      id="inputNewPassword"
                                      className="form-control form-control-sm" />
                                  <div className="has-error">{errors.password && touched.password && errors.password}</div>
                              </div>
                              <div className={`form-group ${errors.confirm_password && touched.confirm_password ? 'has-danger' : ''}`}>
                                  <label htmlFor="inputConfirmPassword">Confirm password</label>
                                  <input
                                      type="password"
                                      name="confirm_password"
                                      placeholder="Confirm password"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.confirm_password}
                                      id="inputConfirmPassword"
                                      className="form-control form-control-sm" />
                                  <div className="has-error">{errors.confirm_password && touched.confirm_password && errors.confirm_password}</div>
                              </div>
                              <button type="submit" style={{ marginTop: 30, alignItems: "center", display: "flex", justifyContent: 'center' }} disabled={isSubmitting} className="btn btn-primary btn-block">
                                <span style={{marginRight:'20px'}}>Reset Password</span>
                                <Dots
                                  color={'#000'}
                                  animating={isSubmitting}
                                />
                              </button>
                            </form>
                          )}
                      </Formik>
                      {errorMessage && <div style={{ marginTop: 10 }} className="alert alert-danger alert-dismissible fade show" role="alert">{errorMessage}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordForm;