import * as actionTypes from "./action";

const inittalState = {
  ingredient: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 5,
};
const IGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const reducer = (state = inittalState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredient: {
          ...state.ingredient,
          [action.indgredientName]:
            state.ingredient[action.indgredientName] + 1,
        },
        totalPrice: state.totalPrice + IGREDIENT_PRICES[action.indgredientName],
      };

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredient: {
          ...state.ingredient,
          [action.indgredientName]:
            state.ingredient[action.indgredientName] - 1,
        },
        totalPrice: state.totalPrice - IGREDIENT_PRICES[action.indgredientName],
      };

    default:
      return state;
  }
};
export default reducer;
