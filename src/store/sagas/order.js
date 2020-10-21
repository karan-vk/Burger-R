import { put } from "redux-saga/effects";

import * as actions from "../actions";
import axios from "../../axios";

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());

  try {
    const queryParam = "?auth=" + action.token;
    const response = yield axios.post(
      "/orders.json" + queryParam,
      action.orderData
    );
    yield put(actions.prchaseBurgerSuccess(response.name, action.orderData));
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}
export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart());
  try {
    const queryParams =
      "?auth=" +
      action.token +
      '&orderBy="userId"&equalTo="' +
      action.userId +
      '"';
    const response = yield axios.get("/orders.json" + queryParams);
    const fetchedorders = [];
    for (let key in response.data) {
      fetchedorders.push({ ...response.data[key], id: key });
    }
    yield put(actions.fetchOrdersSuccess(fetchedorders));
  } catch (error) {
    yield put(actions.fetchOrdersFail(error));
  }
}
