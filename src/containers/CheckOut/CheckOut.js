import React, { Component, Suspense } from "react";
// import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
// import ContactactData from "../../containers/CheckOut/Contact data/ContactactData";
const CheckoutSummary = React.lazy(() =>
  import("../../components/Order/CheckoutSummary/CheckoutSummary")
);
const ContactactData = React.lazy(() =>
  import("./Contact data/ContactactData")
);

class CheckOut extends Component {
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
            ingredient={this.props.ings}
          />
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactactData}
          />
        </Suspense>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredient,
  };
};

export default connect(mapStateToProps)(CheckOut);
