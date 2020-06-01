import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "./../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from "../../HOC/Error/ErrorHandler";
// import Swal from "sweetalert2";
import axios from "../../axios";
import Spinner from "../../components/UI/Spinner/Spinner";
const IGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class Burgerbuilder extends Component {
  state = {
    ingredient: null,
    totalPrice: 5,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };
  componentDidMount() {
    // console.log(this.props);

    let dataa = null;
    axios
      .get("https://react--burger.firebaseio.com/ingredients.json")
      .then((response) => {
        dataa = response.data;
        // this.setState.apply({ ingredient: dataa });
      })
      .then(() => {
        this.setState({ ingredient: dataa });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

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
    //Swal.fire("You Continue", "", "success");

    const queryParams = [];
    for (let i in this.state.ingredient) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredient[i])
      );
    }
    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  render() {
    const disbleInfo = {
      ...this.state.ingredient,
    };
    for (const key in disbleInfo) {
      disbleInfo[key] = disbleInfo[key] <= 0;
    }
    let OrederSummary = null;

    let burger = this.state.error ? (
      <p>Ingredients cannot be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredient) {
      burger = (
        <>
          <Burger ingredient={this.state.ingredient} />
          <BuildControls
            ingredientRemoved={this.remIng}
            ingredientAdded={this.addIng}
            disabled={disbleInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchasehandler}
          />
        </>
      );

      OrederSummary = (
        <OrderSummary
          orderCancled={this.purchaseCancelHandler}
          purchaceContinued={this.purchaseContinueHandler}
          ingredients={this.state.ingredient}
          price={this.state.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      OrederSummary = <Spinner />;
    }

    return (
      <>
        <Modal
          show={this.state.purchasing}
          Modalclosed={this.purchaseCancelHandler}
        >
          {OrederSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

export default withErrorHandler(Burgerbuilder, axios);
