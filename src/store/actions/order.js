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

        dispatch(prchaseBurgerSuccess(res.data.name, orderData));
      })
      .catch((err) => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};
export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};
export const fetchOrdersFail = (err) => {
  return { type: actionTypes.FETCH_ORDERS_FAIL, error: err };
};
export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};
export const fetchOrders = () => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    axios
      .get("/orders.json")
      .then((res) => {
        const fetchedorders = [];
        for (let key in res.data) {
          fetchedorders.push({ ...res.data[key], id: key });
        }
        dispatch(fetchOrdersSuccess(fetchedorders));
      })
      .catch((err) => {
        dispatch(fetchOrdersFail(err));
      });
  };
};
