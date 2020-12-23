import React, { useEffect, useState, useContext }  from 'react';
import { Dots } from 'react-activity';

import './LandingPage.css';

import DisplayPost from './components/DisplayPost';
import LoadingOrError from '../../sharedComponents/LoadingOrError';

import { getAllLatestWallPosts } from '../../api/Queries';

import {
  withRouter,
  useHistory,
} from "react-router-dom";

function LandingPage() {
  let history = useHistory();

  const [fetching, setFetching] = useState(false);
  const [fetchingErr, setFetchingErr] = useState(false);
  const [fetchingErrMsg, setFetchingErrMsg] = useState(false);
  const [wallPostsData, setWallPostsData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5);
  const [pagination, setPagination] = useState({});

  const [updated, setUpdated] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  function getLatestWallPosts(isFromLoadMore = false){
    setFetching(true);
    setFetchingErr(false);
    setFetchingErrMsg('');

    getAllLatestWallPosts({ currentPage, pageSize }).then((response) => {
      if(response.status === 1){
        setWallPostsData(wallPostsData.concat(response.data));
        let temp = {};
        Object.keys(response).map((key, idx) => {
          if(!['message', 'data', 'status'].includes(key)){
            Object.assign(temp, { [key]: response[key] })
          }
        });
        setFetching(false);
        setPagination(temp);
      } else {
        console.log(response);
        setFetchingErrMsg(response.message);
        setFetchingErr(true);
        setWallPostsData([]);
        setFetching(false);
      }
      if(isFromLoadMore){
        setIsFetching(false)
      }
    }).catch((err)=>{
      console.log(err);
      setFetchingErr(true);
      setFetchingErrMsg("a network error occured")
      setWallPostsData([]);
      setFetching(false);
      if(isFromLoadMore){
        setIsFetching(false)
      }
    });
  }

  useEffect(() => {
    if (!isFetching) return;
    getLatestWallPosts(true);
  }, [isFetching]);

  useEffect(() => {
    if(wallPostsData.length === 0){
      getLatestWallPosts();
    }
  }, [wallPostsData])

  useEffect(() => {
    if(updated){
      getLatestWallPosts();
      setUpdated(false);
    }
  }, [updated]);

  return (
    <div className="wall-wrapper">
      <div className="user-profile shadow">
        <div className="username">
          <button type="button" className="btn-logout btn btn-primary" onClick={() => history.push('/Login')}>Login</button>
        </div>
      </div>
      <div className="main-wrapper container">
        <div className="row">
          <div className="col-lg-7 left-section">
            {(fetching || fetchingErr) ? (
              <div className="loader-overlay">
                <div className="loader-main-container">
                  <LoadingOrError
                    loading={fetching}
                    loadingMsg={'Fetching latest posts...'}
                    err={fetchingErr}
                    errMsg={fetchingErrMsg}
                  />
                </div>
              </div>
            ) : (
              <div className="wall-left-wrapper">
                {wallPostsData && wallPostsData.length > 0 ? wallPostsData.map((v, idx) => {
                  return (
                    <DisplayPost setUpdated={setUpdated} post={v} key={idx}/>
                  )
                }): undefined}
              </div>
            )}
            {((wallPostsData && wallPostsData.length > 0) && !isFetching && !fetchingErr && (pagination && pagination.count) && (wallPostsData.length < parseInt(pagination.count))) ? (
              <div style={{ justifyContent: 'center', display: "flex", margin: '20px 0px' }}>
                  <button type="button" style={{ alignItems: "center", display: "flex", width: 200, justifyContent: 'center' }} disabled={isFetching} className="btn-post btn btn-primary" onClick={() => {
                    setIsFetching(true);
                    setCurrentPage(currentPage + 1);
                  }}>
                    <span style={{marginRight:'20px', textAlign: 'center'}}>Load More</span>
                    <Dots
                      color={'#000'}
                      animating={isFetching}
                    />
                  </button>
              </div>
            ) : undefined}
          </div>
        </div>
      </div>

    </div>
  );
}

export default withRouter(LandingPage);