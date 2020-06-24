import { delay } from "redux-saga/effects";
import axios from "axios";
import { put } from "redux-saga/effects";
import * as actions from "../actions/index";

// import * as actionTypes from "../actions/actionTypes";

export function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(actions.logoutsucceed());
}

export function* checkAuthTimeoutSaga(action) {
  console.log("check");

  yield delay(action.expTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart);
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };

  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7Qo112f6jIIImUptFtPracjhczTky_r4";
  if (!action.isSignup) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7Qo112f6jIIImUptFtPracjhczTky_r4";
  }
  try {
    const res = yield axios.post(url, authData);

    const expDate = yield new Date(
      new Date().getTime() + res.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", res.data.idToken);
    yield localStorage.setItem("expirationDate", expDate);
    yield localStorage.setItem("userId", res.data.localId);

    yield put(actions.authSuccess(res.data.idToken, res.data.localId));
    yield put(actions.checkAuthTimeOut(res.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem("expirationDate")
    );
    if (expirationDate <= new Date()) {
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem("userId");
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimeOut(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}
