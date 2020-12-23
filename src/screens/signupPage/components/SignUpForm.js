import React, { useEffect } from 'react';
import { Dots } from 'react-activity';

import {
    useHistory,
    Link
} from "react-router-dom";
import { Formik } from 'formik';
import { SignupSchema } from '../../../validation/SignupSchema';
import { signUpQuery } from '../../../api/Queries';

import LoadingSpinner from '../../../sharedComponents/LoadingSpinner';

function SignUpForm(props) {

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

    const registerHandler = async (creds, resetForm) => {
        setIsLoading(true);
        try {
            const data = await signUpQuery(creds);
            if (data && data.data && (Object.keys(data.data).length > 0 || data.status === 1)) {
                history.push('/Login');
            }

            if (data && data.message && (Object.keys(data.data).length === 0 || data.status === 0)) {
                setErrorMessage('The fields may not be a blank');
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
                        <h2>Register</h2>
                    </div>
                    <div className="card-text">
                        <Formik
                            initialValues={{
                                first_name: "",
                                last_name: "",
                                username: "",
                                email: "",
                                password: "",
                                phone_number: ""
                            }}
                            validationSchema={SignupSchema}
                            onSubmit={(values, { resetForm }) => {
                                registerHandler(values, resetForm);
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
                                        <div className={`form-group ${errors.first_name && touched.first_name ? 'has-danger' : ''}`}>
                                            <label htmlFor="inputFirstName">First name</label>
                                            <input
                                                type="text"
                                                name="first_name"
                                                placeholder="First name"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.first_name}
                                                id="inputFirstName"
                                                className="form-control form-control-sm" />
                                            <div className="has-error">{errors.first_name && touched.first_name && errors.first_name}</div>
                                        </div>
                                        <div className={`form-group ${errors.last_name && touched.last_name ? 'has-danger' : ''}`}>
                                            <label htmlFor="inputLastName">Last name</label>
                                            <input
                                                type="text"
                                                name="last_name"
                                                placeholder="Last name"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.last_name}
                                                id="inputLastName"
                                                className="form-control form-control-sm" />
                                            <div className="has-error">{errors.last_name && touched.last_name && errors.last_name}</div>
                                        </div>
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
                                        <div className={`form-group ${errors.username && touched.username ? 'has-danger' : ''}`}>
                                            <label htmlFor="inputUsername">Username</label>
                                            <input
                                                type="text"
                                                name="username"
                                                placeholder="Username"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.username}
                                                className="form-control form-control-sm"
                                                id="inputUsername"
                                            />
                                            <div className="has-error">{errors.username && touched.username && errors.username}</div>
                                        </div>
                                        <div className={`form-group ${errors.password && touched.password ? 'has-danger' : ''}`}>
                                            <label for="inputPassword">Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                                className="form-control form-control-sm"
                                                id="inputPassword"
                                            />
                                            <div className="has-error">{errors.password && touched.password && errors.password}</div>
                                        </div>
                                        <div className={`form-group ${errors.phone_number && touched.phone_number ? 'has-danger' : ''}`}>
                                            <label for="inputPhoneNumber">Phone number</label>
                                            <input
                                                type="text"
                                                name="phone_number"
                                                placeholder="Phone number (+XX-XXXX-XXXX)"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.phone_number}
                                                className="form-control form-control-sm"
                                                id="inputPhoneNumber"
                                            />
                                            <div className="has-error">{errors.phone_number && touched.phone_number && errors.phone_number}</div>
                                        </div>
                                        <button type="submit" style={{  marginTop: 30, alignItems: "center", display: "flex", justifyContent: 'center' }} disabled={isSubmitting} className="btn btn-primary btn-block">
                                          <span style={{marginRight:'20px'}}>Sign up</span>
                                          <Dots
                                              color={'#000'}
                                              animating={isSubmitting}
                                            />
                                        </button>
                                    </form>
                                )}
                        </Formik>
                        {errorMessage && <div style={{ marginTop: 10 }} className="alert alert-danger alert-dismissible fade show" role="alert">{errorMessage}</div>}
                        <div className="already-account sign-up">
                            <p>Already have an account? <Link to="/Login">Login</Link></p>
                        </div>
                        <div className="or">
                            <p>or</p>
                        </div>
                        <div className="guest-login">
                            Login as <Link to="/User/Guest">Guest</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpForm;