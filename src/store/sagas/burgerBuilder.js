import axios from "axios";
import { put } from "redux-saga/effects";
import * as actions from "../actions";

export function* initIngredientSaga(action) {
  try {
    const response = yield axios.get(
      "https://react--burger.firebaseio.com/ingredients.json"
    );
    yield put(actions.setIngredient(response.data));
  } catch (error) {
    yield put(actions.fetchIngredientFailed());
  }
}
