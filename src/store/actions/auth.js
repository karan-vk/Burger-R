import axios from "axios";
import * as actionTypes from "./actionTypes";
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};
export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeOut = (expTime) => (dispatch) =>
  setTimeout(() => dispatch(logout()), expTime * 1000);

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    dispatch(authStart());
    // console.log(authData);
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7Qo112f6jIIImUptFtPracjhczTky_r4";
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7Qo112f6jIIImUptFtPracjhczTky_r4";
    }
    axios
      .post(url, authData)
      .then((res) => {
        console.log(res);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeOut(res.data.expiresIn));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};
