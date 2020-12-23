import {config} from '../config';
import { getTokenFromLocalStorage, getUserFromLocalStorage, clearLocalStorage } from '../utils/localStorage';

const baseUrl = config.apiBaseUrl;

/// Structure for handling errors/data loading
export function fetchData({setFetching, setFetchingErr, setData, setErrMsg, query, queryInput, fullResp, setPagination }){
  setFetching(true);
  setFetchingErr(false);
  query(queryInput)
  .then((resp)=> {
    console.log(resp);
    if(queryInput?.signal && !queryInput.signal.aborted){
      if(resp.status === 'success'){
        if(resp.pagination && setPagination){
          setPagination(resp.pagination);
        }
        {fullResp ? setData(resp) : setData(resp.data)}
      } else if(resp.status === 'unauthorized' || resp.status === 'error'){
        setFetchingErr(true)
        setErrMsg('message' in resp && resp.message ||'error' in resp && resp.error)
      } else{
        setFetchingErr(true)
        setErrMsg(resp.error)
      }
    }
    setFetching(false);
  })
  .catch((err)=>{
    console.log(err);
    setFetchingErr(true)
    setErrMsg('A network error has occured')
    setFetching(false);
  });
}

//creates new user
export async function signUpQuery(data) {
  const response = await fetch(`${baseUrl}/api/users/list/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}

// Log in for existing user
export async function signInQuery(data) {
  const response = await fetch(`${baseUrl}/api/token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}

// get existing user detail
export async function getCurrentUser({ id, token }) {
  const response = await fetch(`${baseUrl}/api/users/details/${id}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  return await response.json();
}


export async function isUserLoggedIn({ id, token }) {
  if (!token) {
    return false;
  }

  let user;

  try {
    user = await getCurrentUser({ id, token });
  } catch (err) {
    console.log(err);
    clearLocalStorage()
    return false;
  }
  if (!user) {
    clearLocalStorage()
    return false;
  }
  return user.data;
}

//creates new post for logged user
export async function createNewPost({data, token}) {
  const response = await fetch(`${baseUrl}/api/wall/walls/list/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}

// get all wall posts
export async function getAllLatestWallPosts({ currentPage = 1, pageSize = 10 }) {
  const response = await fetch(`${baseUrl}/api/wall/walls/list/?page=${currentPage}&page_size=${pageSize}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}

// creates/adds new comment on post
export async function addCommentOnPost({data, token}) {
  const response = await fetch(`${baseUrl}/api/wall/comment/list/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}

// forgot password
export async function forgotPasswordQuery(data) {
  const response = await fetch(`${baseUrl}/api/password_reset/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}

// reset password
export async function resetPasswordQuery(data) {
  const response = await fetch(`${baseUrl}/api/password_reset/confirm/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}
