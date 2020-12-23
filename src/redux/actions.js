import {
  SET_MODAL,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP,
  LOG_IN,
  LOG_OUT,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SET_USER,
} from "./actionTypes";
import {
  signUpQuery,
  signInQuery,
} from '../api/Queries'

export const setModal = (modalState, modalComponent) => ({
  type: SET_MODAL,
  payload: { modalState, modalComponent }
});

//***Auth Actions**
export function createUser(fullName, password, email, companyRole, cb){
  return (dispatch) =>{
    dispatch(signUp());
    signUpQuery({
      "fullname": fullName,
    	"company_role": companyRole,
    	"email": email,
      "password": password
    })
    .then(data => {
      if(data.status === "success"){
        dispatch(signUpSuccess(data.data));
        localStorage.setItem("user_session", JSON.stringify(data.data));
        cb();
      }else{
        dispatch(signUpFailure(data.error));
      }
    })
    .catch(err => {
      dispatch(signUpFailure('A network error occured'));
    });
  }
}

export function setUser(user) {
  return {
    type: SET_USER,
    user
  }
}
function signUp() {
  return {
    type: SIGN_UP
  }
}

function signUpSuccess (user){
  return{
    type: SIGN_UP_SUCCESS,
    user
  }
}

function signUpFailure(err){
  return{
    type: SIGN_UP_FAILURE,
    err
  }
}

export function signInUser(email, password, cb){
  return (dispatch) => {
    dispatch(logIn());
    signInQuery({
      "username": email,
      "password": password
    }).then(data => {
      if(data && data.access || data.refresh){
        dispatch(logInSuccess(data.data));
        localStorage.setItem("user_session", JSON.stringify(data.data));
        cb();
      } else {
        dispatch(logInFailure(data.error));
      }
    })
    .catch(err => {
      dispatch(logInFailure('A network error occured'));
    });
  }
}

export function signOutUser(){
  return (dispatch)=>{
    dispatch(logOut())
    localStorage.removeItem('user_session');
    localStorage.removeItem('comp_searches');
    localStorage.removeItem('market_searches');
  }
}
function logIn() {
  return {
    type: LOG_IN
  }
}
function logOut() {
  return {
    type: LOG_OUT
  }
}

function logInSuccess(user) {
  return {
    type: LOG_IN_SUCCESS,
    user
  }
}

function logInFailure(error) {
  return {
    type: LOG_IN_FAILURE,
    error
  }
}