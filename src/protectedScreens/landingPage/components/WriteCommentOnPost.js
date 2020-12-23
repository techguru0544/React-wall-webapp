import React, { useEffect, useState, useContext } from 'react';
import { Formik } from 'formik';
import { Dots } from 'react-activity';
import moment from 'moment';

import { addCommentOnPost } from '../../../api/Queries';
import { UserContext } from "../../../contexts/UserContext";

import '../LandingPage.css';
import { getTokenFromLocalStorage } from '../../../utils/localStorage';
import { AddCreateNewCommentOnPostSchema } from '../../../validation/AddCreateNewCommentOnPostSchema';

function WriteCommentOnPost(props) {
  const userState = useContext(UserContext);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if(errorMessage){
      setTimeout(() => {
        setErrorMessage("");
      }, 2000)
    }
  }, [errorMessage]);

  const addCreateCommentOnPost = async (values, resetForm) => {
		try {
			const data = await addCommentOnPost({data: values, token: userState?.token || getTokenFromLocalStorage()});
			if(data && data.status === 1){
        props.setUpdated(true);
				resetForm();
			} 

			if(data && data.status === 0) {
        setErrorMessage('The fields may not be a blank');
        resetForm();
			}
		} catch (e) {
			console.log(e);
			setErrorMessage('a network error occured');
      resetForm();
		}
  };
  
  return (
    <div className="Comment-section">
      <div className="comment-wrapper">
        {props.comments && props.comments.length > 0 ? props.comments.map((v, idx) => {
          return (
            <div className="comments" key={idx}>
              {v?.comment_content || ''} <span style={{ fontWeight: 'unset', fontSize: '11px', color: 'gray', fontStyle: 'italic' }}> just {v?.created_on ? moment(v.created_on).fromNow() : ''} </span><span className="float-right" style={{ fontWeight: '600'}}> posted by {`${v?.created_by}`}</span>
            </div>
          )
        }): undefined}
        
      </div>
      <Formik
        initialValues={{
          comment_content: "",
          wall: props.postId
        }}
        validationSchema={AddCreateNewCommentOnPostSchema}
        onSubmit={(values, { resetForm }) => {
          addCreateCommentOnPost(values, resetForm);
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
            <div className="comment-block">
              <textarea 
                name="comment_content"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.comment_content}
                placeholder="Write a comment.." 
                className="comment"
                maxLength="200" 
                rows="3"></textarea>
                <div className="has-error">{errors.comment_content && touched.comment_content && errors.comment_content}</div>
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
            {errorMessage && <div style={{ marginTop: 10 }} className="alert alert-danger alert-dismissible fade show" role="alert">{errorMessage}</div>}
          </form>
        )}
      </Formik>
    </div>
  );
}

export default WriteCommentOnPost;
