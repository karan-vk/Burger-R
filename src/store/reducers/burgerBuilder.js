import * as actionTypes from "../actions/actionTypes";

const inittalState = {
  ingredient: null,
  totalPrice: 5,
  error: false,
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
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredient: action.ingredient,
        error: false,
      };
    case actionTypes.FETCH_INGREDIENT_FAILED:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};
export default reducer;
