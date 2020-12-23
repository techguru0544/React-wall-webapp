import React, { useEffect, useState, useContext } from 'react';
import moment from 'moment';
import comment from '../../../assets/images/comment.svg';
import comment_active from '../../../assets/images/comment-active.svg';

import '../LandingPage.css';
import WriteCommentOnPost from './WriteCommentOnPost';

function DisplayPost({ setUpdated, post, key }) {
  const [wantToAddNewComment, setWantToAddNewComment] = useState(false);
  
  return (
    <div key={key} className="post-area-wrapper">
      <div className="user-section">
          <div className="username">
            <p>{post?.created_by ? post?.created_by : ''}</p>
          </div>
          <div className="date float-right">
            <p>{post?.created_on ? moment(post.created_on).fromNow() : ''}</p>
          </div>
          <div className="post-content-wrapper">
              <p className="post-area">{post?.content ? post?.content : ''}</p>
          </div>
          <div className="like-comment-wrapper">
              <ul>
                  {post && 'comments' in post && post.comments.length > 0 ? (
                    <li>
                        <a href="javascript:void(0)" onClick={() => {
                          if(!wantToAddNewComment){
                            setWantToAddNewComment(true)
                          } else {
                            setWantToAddNewComment(false)
                          }
                        }}>{post && 'comments' in post ? `${post.comments.length > 1 ? `${post.comments.length} Comments` : `${post.comments.length} Comment`}` : ''}</a>
                    </li>
                  ) : undefined}
              </ul>
          </div>
      </div>
      <div className="post-btn-wrapper">
          <ul>
              <li className={`${wantToAddNewComment ? 'active': ''}`} >
                  <a href="javascript:void(0)" className="icon-comment" onClick={() => setWantToAddNewComment(true)}><img src={comment} />Comment</a>
                  <a href="javascript:void(0)" className="icon-comment-active" onClick={() => setWantToAddNewComment(false)}><img src={comment_active} />Comment</a>
              </li>
          </ul>
      </div>
      {wantToAddNewComment ? (
        <WriteCommentOnPost comments={post?.comments} setUpdated={setUpdated} postId={post?.id ? post?.id : ''}/>
        ) : (undefined)}
    </div>
  );
}

export default DisplayPost;
