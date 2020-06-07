import * as actionTypes from "./actionTypes";
import axios from "../../axios";
export const prchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orederData: orderData,
  };
};
export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.FETCH_INGREDIENT_FAILED,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json", orderData)
      .then((res) => {
        console.log(res.data);

        dispatch(prchaseBurgerSuccess(res.data, orderData));
      })
      .catch((err) => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};
