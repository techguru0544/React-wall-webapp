import React, {useState, useEffect} from 'react';
import { Formik } from 'formik';
import { Dots } from 'react-activity';

import {
    withRouter,
    useHistory,
} from "react-router-dom";

import { ForgotPasswordSchema } from '../../../validation/ForgotPasswordSchema';
import { forgotPasswordQuery } from '../../../api/Queries';

function ForgotPassword(props) {
	let history = useHistory();

  const [errorMessage, setErrorMessage] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);

	useEffect(() => {
		if (errorMessage) {
				setTimeout(() => {
							setErrorMessage("");
					}, 2000)
			}
	}, [errorMessage])

	const forgotPasswordHandler = async (creds, resetForm) => {
		setIsLoading(true);
		try {
				const data = await forgotPasswordQuery(creds);
				if (data && data.status === 'OK') {
						history.push('/Login');
				} else {
          setErrorMessage('There is no active user associated with this e-mail address or the password can not be changed');
          resetForm();
        }
				setIsLoading(false);
		} catch (e) {
				console.log(e);
				setIsLoading(false);
				resetForm();
				setErrorMessage('a network error occured');
		}
	};
		
  return (
      <div className="common-page-wrapper">
          <div className="login-form shadow">
              <div className="card-body">
                  <div className="card-head text-center">
                      <h2>Forgot Password</h2>
                  </div>
                  <div className="card-text">
                    <Formik
                        initialValues={{
													email: ""
                        }}
                        validationSchema={ForgotPasswordSchema}
                        onSubmit={(values, { resetForm }) => {
													forgotPasswordHandler(values, resetForm);
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
														<div className={`form-group ${errors.email && touched.email ? 'has-danger' : ''}`}>
																<label htmlFor="inputEmailAddress">Email address</label>
																<input
																		type="text"
																		name="email"
																		placeholder="Email address"
																		onChange={handleChange}
																		onBlur={handleBlur}
																		value={values.email}
																		id="inputEmailAddress"
																		aria-describedby="emailHelp"
																		className="form-control form-control-sm" />
																<div className="has-error">{errors.email && touched.email && errors.email}</div>
														</div>
														<button type="submit" style={{ marginTop: 30, alignItems: "center", display: "flex", justifyContent: 'center' }} disabled={isSubmitting} className="btn btn-primary btn-block">
															<span style={{marginRight:'20px'}}>Send password reset email</span>
															<Dots
																color={'#000'}
																animating={isSubmitting}
															/>
														</button>
													</form>
												)}
                    </Formik>
										{errorMessage && <div style={{ marginTop: 10 }} className="alert alert-danger alert-dismissible fade show" role="alert">{errorMessage}</div>}                  </div>
              </div>
          </div>
      </div>
  );
}

export default withRouter(ForgotPassword);