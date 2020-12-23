import {
   SIGN_UP,
   SIGN_UP_SUCCESS,
   SIGN_UP_FAILURE,
   LOG_IN,
   LOG_OUT,
   LOG_IN_SUCCESS,
   LOG_IN_FAILURE,
   SET_USER
} from "../actionTypes";

const initialState = {
  isAuthenticating: false,
  user: null,
  token: null,

  signUpError: false,
  signInError: true,

  activeUser: false,
  showSignUpConfirmationModal: false,
  showSignInConfirmationModal: false,
  showForgotPasswordModal: false,

  signInErrorMessage: '',
  signUpErrorMessage: '',

  confirmSignUpError: false,
  confirmLoginError: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      }
    case SIGN_UP:
      return {
        ...state,
        isAuthenticating: true,
      }
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isAuthenticating: false
      }
    case SIGN_UP_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        signUpError: true,
        signUpErrorMessage: action.err
      }
      case LOG_IN:
      return {
        ...state,
        isAuthenticating: true,
        signInError: false
      }
      case LOG_OUT:
      return {
        ...state,
        user: initialState.user
      }
    case LOG_IN_SUCCESS:
      return {
        isAuthenticating: false,
        user: action.user,
        showSignInConfirmationModal: true
      }
    case LOG_IN_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        signInError: true,
        signInErrorMessage: action.error
      }
    default:
    return state;
  }
}
