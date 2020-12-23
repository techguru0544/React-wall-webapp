import React, { useEffect, useState, useContext } from 'react';
import { Formik } from 'formik';
import { Dots } from 'react-activity';

import { createNewPost } from '../../../api/Queries';
import { UserContext } from "../../../contexts/UserContext";
import { CreateNewPostSchema } from '../../../validation/CreateNewPostSchema';

import '../LandingPage.css';
import { getTokenFromLocalStorage } from '../../../utils/localStorage';

function rand(maxLimit = 1000000000) {
  let rand = Math.random() * maxLimit;
  return Math.floor(rand);
}

function WritePost(props) {
  const userState = useContext(UserContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(errorMessage){
      setTimeout(() => {
        setErrorMessage("");
      }, 2000)
    }
  }, [errorMessage])

  const createNewPostHandler = async (values, resetForm) => {
    setIsLoading(true);
		try {
			const data = await createNewPost({data: values, token: userState?.token || getTokenFromLocalStorage()});
			if(data && data.status === 1){
        props.setUpdated(true);
				resetForm();
			} 

			if(data && data.status === 0) {
        setErrorMessage('The fields may not be a blank');
        resetForm();
			}
			setIsLoading(false);
		} catch (e) {
			console.log(e);
      setIsLoading(false);
			setErrorMessage('a network error occured');
      resetForm();
		}
  };
  
  return (
    <div className="col-lg-5 right-section">
      <Formik
        initialValues={{
          title: `${userState?.first_name && userState?.last_name && `${userState?.first_name}_${userState?.last_name}_${rand()}`}`,
          content: "",
        }}
        validationSchema={CreateNewPostSchema}
        onSubmit={(values, { resetForm }) => {
          createNewPostHandler(values, resetForm);
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
            <div className="wall-right-wrapper">
              <div className="user-section">
                <div className="username">
                  <p>{userState?.first_name && userState?.last_name && `${userState?.first_name} ${userState?.last_name}`}</p>
                </div>
                <div className="post-content-wrapper">
                  <textarea 
                    name="content"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.content}
                    placeholder="What's on your mind?" 
                    className="post-content"
                    maxLength="200" 
                    rows="3"></textarea>
                    <div className="has-error">{errors.content && touched.content && errors.content}</div>
                </div>
              </div>
              <div className="post-btn-wrapper">
                <button type="submit" style={{ alignItems: "center", display: "flex" }} disabled={isSubmitting} className="btn-post btn btn-primary">
                  <span style={{marginRight:'20px'}}>Post</span>
                  <Dots
                    color={'#000'}
                    animating={isSubmitting}
                  />
                </button>
              </div>
            </div>
            {errorMessage && <div style={{ marginTop: 10 }} className="alert alert-danger alert-dismissible fade show" role="alert">{errorMessage}</div>}
          </form>
        )}
      </Formik>
    </div>
  );
}

export default WritePost;
