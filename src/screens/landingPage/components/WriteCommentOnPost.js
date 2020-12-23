import React, { useEffect, useState, useContext } from 'react';
import moment from 'moment';

import '../LandingPage.css';

function WriteCommentOnPost(props) {
  
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
    </div>
  );
}

export default WriteCommentOnPost;
