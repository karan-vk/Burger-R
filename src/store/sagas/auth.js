import { delay } from "redux-saga/effects";

import { put } from "redux-saga/effects";
import * as actions from "../actions/index";

import * as actionTypes from "../actions/actionTypes";

export function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(actions.logoutsucceed());
}

export function* checkAuthTimeoutSaga(action) {
  console.log("check");

  yield delay(action.expTime);
  yield put(actions.logout());
}
