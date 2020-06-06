import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionType from "../../store/action";
import Burger from "../../components/Burger/Burger";
import BuildControls from "./../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from "../../HOC/Error/ErrorHandler";
// import Swal from "sweetalert2";
import axios from "../../axios";
import Spinner from "../../components/UI/Spinner/Spinner";

class Burgerbuilder extends Component {
  state = {
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
    return sum > 0;
  }

  purchasehandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    //Swal.fire("You Continue", "", "success");

    this.props.history.push("/checkout");
  };

  render() {
    const disbleInfo = {
      ...this.props.ings,
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
    if (this.props.ings) {
      burger = (
        <>
          <Burger ingredient={this.props.ings} />
          <BuildControls
            ingredientRemoved={this.props.onIngredientRemoved}
            ingredientAdded={this.props.onIngredientAdded}
            disabled={disbleInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchasehandler}
          />
        </>
      );

      OrederSummary = (
        <OrderSummary
          orderCancled={this.purchaseCancelHandler}
          purchaceContinued={this.purchaseContinueHandler}
          ingredients={this.props.ings}
          price={this.props.price}
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

const mapStateToProps = (state) => {
  return {
    ings: state.ingredient,
    price: state.totalPrice,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch({ type: actionType.ADD_INGREDIENT, indgredientName: ingName }),
    onIngredientRemoved: (ingName) =>
      dispatch({
        type: actionType.REMOVE_INGREDIENT,
        indgredientName: ingName,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Burgerbuilder, axios));
