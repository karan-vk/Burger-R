import React, { Component, Suspense } from "react";
// import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner";
// import ContactactData from "../../containers/CheckOut/Contact data/ContactactData";
const CheckoutSummary = React.lazy(() =>
  import("../../components/Order/CheckoutSummary/CheckoutSummary")
);
const ContactactData = React.lazy(() =>
  import("./Contact data/ContactactData")
);

class CheckOut extends Component {
  state = {
    ingredient: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1,
    },
    totlaPrice: 0,
  };

  componentDidMount = () => {
    const query = new URLSearchParams(this.props.location.search);
    const ingredient = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredient[param[0]] = +param[1];
      }
    }
    this.setState({ ingredient: ingredient, totlaPrice: price });
  };
  CheckoutCanceledHandler = () => {
    this.props.history.goBack();
  };
  CheckoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    return (
      <>
        <Suspense fallback={<Spinner />}>
          <CheckoutSummary
            CheckoutCancel={this.CheckoutCanceledHandler}
            CheckoutContinued={this.CheckoutContinuedHandler}
            ingredient={this.state.ingredient}
          />
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <Route
            path={this.props.match.path + "/contact-data"}
            render={(props) => (
              <ContactactData
                ingredient={this.state.ingredient}
                price={this.state.totlaPrice}
                {...props}
              />
            )}
          />
        </Suspense>
      </>
    );
  }
}

export default CheckOut;
