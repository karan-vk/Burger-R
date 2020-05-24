import React, { Component } from "react";
import Aux from "../../../HOC/Auxiliary";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  componentDidUpdate() {
    console.log("[OrderSummary.js]Will update");
  }
  render() {
    const ingredientsummary = Object.keys(this.props.ingredients).map(
      (igKeys) => {
        return (
          <li key={igKeys}>
            <span style={{ textTransform: "capitalize" }}>{igKeys}</span>:{" "}
            {this.props.ingredients[igKeys]}{" "}
          </li>
        );
      }
    );
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>Delicious burger with the foowing ingredients:</p>
        <ul>{ingredientsummary}</ul>
        <p>
          <strong>Total price :{this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout ?</p>
        <Button btnType="Danger" clicked={this.props.orderCancled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaceContinued}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
