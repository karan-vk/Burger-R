import React, { Component } from "react";
import Aux from "../../HOC/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "./../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Swal from "sweetalert2";
const IGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class Burgerbuilder extends Component {
  state = {
    ingredient: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 5,
    purchasable: false,
    purchasing: false,
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  addIng = (type) => {
    const prevCount = this.state.ingredient[type];
    const upCount = prevCount + 1;
    const updatedIngredients = {
      ...this.state.ingredient,
    };
    updatedIngredients[type] = upCount;
    const priceAddition = IGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ totalPrice: newPrice, ingredient: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  remIng = (type) => {
    const prevCount = this.state.ingredient[type];
    if (prevCount <= 0) {
      return;
    }
    const upCount = prevCount - 1;
    const updatedIngredients = {
      ...this.state.ingredient,
    };
    updatedIngredients[type] = upCount;
    const priceDeduction = IGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({ totalPrice: newPrice, ingredient: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  purchasehandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    Swal.fire("You Continue", "", "success");
  };

  render() {
    const disbleInfo = {
      ...this.state.ingredient,
    };
    for (const key in disbleInfo) {
      disbleInfo[key] = disbleInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          Modalclosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            orderCancled={this.purchaseCancelHandler}
            purchaceContinued={this.purchaseContinueHandler}
            ingredients={this.state.ingredient}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredient={this.state.ingredient} />
        <BuildControls
          ingredientRemoved={this.remIng}
          ingredientAdded={this.addIng}
          disabled={disbleInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchasehandler}
        />
      </Aux>
    );
  }
}

export default Burgerbuilder;
